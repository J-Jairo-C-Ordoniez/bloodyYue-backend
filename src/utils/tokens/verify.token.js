import jwt from "jsonwebtoken";

const verifyToken = {
    accessToken: (token) => {
        return jwt.verify(token, process.env.JWTSECRET);
    },
    
    refreshToken: (token) => {
        return jwt.verify(token, process.env.JWTREFRESHSECRET);
    }
}

export default verifyToken;