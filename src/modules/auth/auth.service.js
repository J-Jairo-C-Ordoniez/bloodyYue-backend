import authRepository from './auth.repository.js';
import validators from '../../utils/validators/index.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import sendMail from '../../utils/mailer/index.js';
import createToken from '../../utils/tokens/create.token.js';
import verifyToken from '../../utils/tokens/verify.token.js';


const authService = {
    register: async (data) => {
        const { name, email, password } = data;

        if (
            !validators.isEmail(email) ||
            !validators.isPassword(password) ||
            !validators.isString(name)
        ) {
            throw ({ message: "Invalid input data", statusCode: 400 });
        }

        const existing = await authRepository.getByEmail(email);
        if (existing) {
            throw ({ message: "Email already registered", statusCode: 409 });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await authRepository.createUser({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashPassword,
            rolId: 2
        });

        if (!user) {
            throw ({ message: "User creation failed", statusCode: 500 });
        }

        const cart = await authRepository.createCart({
            userId: user.userId
        });

        if (!cart) {
            throw ({ message: "Cart creation failed", statusCode: 500 });
        }

        return {
            userId: user.userId,
            email: user.email,
        };
    },

    login: async (data) => {
        const { email, password } = data;

        if (!validators.isEmail(email) || !password) {
            throw ({ message: "Invalid input data", statusCode: 400 });
        }

        const user = await authRepository.getByEmail(email);
        if (!user) {
            throw ({ message: "Invalid credentials", statusCode: 401 });
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            throw ({ message: "Invalid credentials", statusCode: 401 });
        }

        if (!user.isVerified) {
            throw ({ message: "Account not verified", statusCode: 401 });
        }

        const isActiveUser = await authRepository.isActiveUser(user.userId, true);

        if (!isActiveUser) {
            throw ({ message: "User not active", statusCode: 401 });
        }

        const accessToken = createToken.accesToken({ userId: user.userId, rolId: user.rolId });
        const refreshToken = createToken.refreshToken({ userId: user.userId });

        const refresh = await authRepository.createRefreshToken({
            userId: user.userId,
            token: refreshToken,
        });

        if (!refresh) {
            throw ({ message: "Refresh token creation failed", statusCode: 500 });
        }

        return {
            accessToken,
            refreshToken,
            user: {
                userId: user.userId,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                rolId: user.rolId,
                isVerified: user.isVerified,
                isActive: isActiveUser.isActive
            }
        };
    },

    logout: async (data) => {
        if (!data) {
            throw ({ message: "Invalid input data", statusCode: 400 });
        }

        await authRepository.revokedRefreshToken(data);
        return
    },

    sendCodeVerification: async (data) => {
        const { email, type } = data;

        if (!validators.isEmail(email)) {
            throw ({ message: "Invalid email", statusCode: 400 });
        }

        const user = await authRepository.getByEmail(email);
        if (!user) {
            throw ({ message: "User not found", statusCode: 404 });
        }

        const code = crypto.randomInt(100000, 999999).toString();
        const hashCode = await bcrypt.hash(code, 10);

        const registerCode = await authRepository.createVerificationCode({
            code: hashCode,
            userId: user.userId,
            type
        });

        if (!registerCode) {
            throw ({ message: "Verification code creation failed", statusCode: 500 });
        }

        await sendMail.sendVerification(email, code);
        return
    },

    verifyCode: async (data) => {
        const { code, email } = data;

        if (!code || !email) {
            throw ({ message: "Invalid input data", statusCode: 400 });
        }

        const user = await authRepository.getByEmail(email);
        if (!user) {
            throw ({ message: "User not found", statusCode: 404 });
        }

        const verifyCode = await authRepository.getCodeByUserId(user.userId);
        if (!verifyCode) {
            throw ({ message: "Code expired", statusCode: 401 });
        }

        if (user.isVerified && verifyCode.type === 'verify') {
            throw ({ message: "Account already verified", statusCode: 401 });
        }

        const ok = await bcrypt.compare(code, verifyCode.code);
        if (!ok) {
            throw ({ message: "Invalid code", statusCode: 401 });
        }

        if (verifyCode.type === 'restartPassword') {
            return {message: 'Code verified'}
        }

        const updated = await authRepository.updateVerification({
            userId: user.userId,
            isVerified: true
        });

        if (!updated) {
            throw ({ message: "Account verification failed", statusCode: 500 });
        }

        return { message: "Account verified" };
    },

    resetPassword: async (data) => {
        const { password, email } = data;

        if (!validators.isPassword(password) || !validators.isEmail(email)) {
            throw ({ message: "Invalid input data", statusCode: 400 });
        }

        const user = await authRepository.getByEmail(email);
        if (!user) {
            throw ({ message: "User not found", statusCode: 404 });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const updated = await authRepository.updatePassword({
            userId: user.userId,
            password: hashPassword
        });

        if (!updated) {
            throw ({ message: "Password change failed", statusCode: 500 });
        }

        return { message: "Password changed" };
    },

    changeRole: async (data) => {
        const { userId, rolId } = data;

        if (!userId || !rolId) {
            throw ({ message: "Invalid input data", statusCode: 400 });
        }

        const user = await authRepository.getByUserId(userId);
        if (!user) {
            throw ({ message: "User not found", statusCode: 404 });
        }

        const rol = await authRepository.getRolById(rolId);
        if (!rol) {
            throw ({ message: "Role not found", statusCode: 404 });
        }

        const updated = await authRepository.updateRol({
            userId,
            rolId
        });

        if (!updated) {
            throw ({ message: "Role change failed", statusCode: 500 });
        }

        return { message: "Role changed" };
    },

    refreshToken: async (data) => {

        if (!data) throw ({ message: "Unauthorized", statusCode: 401 });

        let payload = verifyToken.refreshToken(data);

        if (!payload) throw ({ message: "Invalid refresh token", statusCode: 401 });

        const stored = await authRepository.getRefreshToken(payload.userId);
        if (!stored || stored.isRevoked) {
            throw ({ message: "Refresh token revoked", statusCode: 401 });
        }

        const user = await authRepository.getByUserId(stored.userId);
        if (!user) {
            throw ({ message: "User not found", statusCode: 404 });
        }

        const newAccessToken = createToken.accesToken({
            userId: stored.userId,
            rolId: user.rolId,
        });

        return { accessToken: newAccessToken };
    },

    changeStatus: async (data) => {
        if ((!data.userId) || (!data.status && validators.isString(data.status))) {
            throw ({ message: "Input invalid data", statusCode: 400 });
        }

        const updateStatus = await authRepository.changeStatus(data.userId, data.status);

        if (!updateStatus) {
            throw ({ message: "Field Not Updated", statusCode: 404 });
        }

        return { message: "Status changed" };
    },
};

export default authService;