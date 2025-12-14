import authRepository from './auth.repository.js';
import validators from '../../utils/validators/index.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import sendMail from '../../utils/mailer/index.js';
import createToken from '../../utils/tokens/create.token.js';


const authService = {
    register: async (data) => {
        const { name, email, password } = data;

        if (
            !validators.isEmail(email) ||
            !validators.isPassword(password) ||
            !validators.isString(name)
        ) {
            throw new AppError("Invalid input data", 400);
        }

        const existing = await authRepository.getByEmail(email);
        if (existing) {
            throw new AppError("Email already registered", 409);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await authRepository.createUser({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashPassword,
            rolId: 1
        });

        if (!user) {
            throw new AppError("User creation failed", 500);
        }

        return {
            userId: user.userId,
            email: user.email,
        };
    },

    login: async (data) => {
        const { email, password } = data;

        if (!validators.isEmail(email) || !password) {
            throw new AppError("Invalid input data", 400);
        }

        const user = await authRepository.getByEmail(email);
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            throw new AppError("Invalid credentials", 401);
        }

        if (!user.isVerified) {
            throw new AppError("Account not verified", 401);
        }

        const isActiveUser = await authRepository.isActiveUser(user.userId, true);

        if (!isActiveUser) {
            throw new AppError("User status change failed", 500);
        }

        const accessToken = createToken.accesToken({ userId: user.userId, rolId: user.rolId });
        const refreshToken = createToken.refreshToken({ userId: user.userId });

        const refresh = await authRepository.createRefreshToken({
            userId: user.userId,
            refreshToken,
        });

        if (!refresh) {
            throw new AppError("Refresh token creation failed", 500);
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
            throw new AppError("Invalid input data", 400);
        }

        await authRepository.revokedRefreshToken(data);
        return
    },

    sendCodeVerification: async (data) => {
        const { email, type } = data;

        if (!validators.isEmail(email)) {
            throw new AppError("Invalid email", 400);
        }

        const user = await authRepository.getByEmail(email);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const code = await bcrypt.hash(crypto.randomInt(100000, 999999).toString(), 10);
        const registerCode = await authRepository.createVerificationCode({
            code,
            userId: user.userId,
            type
        });

        if (!registerCode) {
            throw new AppError("Verification code creation failed", 500);
        }

        await sendMail.sendVerification(email, code);
        return
    },

    verifyCode: async (data) => {
        const { code, userId } = data;

        if (!code || !userId) {
            throw new AppError("Invalid input data", 400);
        }

        const verifyCode = await authRepository.getCodeByUserId(userId);
        if (!verifyCode) {
            throw new AppError("Code expired", 401);
        }

        const ok = await bcrypt.compare(code, verifyCode.code);
        if (!ok) {
            throw new AppError("Invalid code", 401);
        }

        return { message: "Code verified" };
    },

    resetPassword: async (data) => {
        const { password, email } = data;

        if (!validators.isPassword(password) || !validators.isEmail(email)) {
            throw new AppError("Invalid input data", 400);
        }

        const user = await authRepository.getByEmail(email);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const updated = await authRepository.updatePassword({
            userId: user.userId,
            password: hashPassword
        });

        if (!updated) {
            throw new AppError("Password change failed", 500);
        }

        return { message: "Password changed" };
    },

    changeRole: async (data) => {
        const { userId, rolId } = data;

        if (!userId || !rolId) {
            throw new AppError("Invalid input data", 400);
        }

        const user = await authRepository.getByUserId(userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const rol = await authRepository.getRolById(rolId);
        if (!rol) {
            throw new AppError("Role not found", 404);
        }

        const updated = await authRepository.updateRol({
            userId,
            rolId
        });

        if (!updated) {
            throw new AppError("Role change failed", 500);
        }

        return { message: "Role changed" };
    },

    refreshToken: async (data) => {

        if (!data) throw new AppError("Unauthorized", 401);

        let payload;

        try {
            payload = verifyToken.refreshToken(data);
        } catch {
            throw new AppError("Invalid refresh token", 401);
        }

        const stored = await authRepository.getRefreshToken(payload.userId);
        if (!stored || stored.isRevoked) {
            throw new AppError("Refresh token revoked", 401);
        }

        const user = await authRepository.getByUserId(stored.userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        const newAccessToken = createToken.accesToken({
            userId: stored.userId,
            rolId: user.rolId,
        });

        return { accessToken: newAccessToken };
    }
};

export default authService;
