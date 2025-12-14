import jwt from "jsonwebtoken";

const createToken = {
  accesToken: (payload) => {
    return jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: "1h",
    });
  },
  
  refreshToken: (payload) => {
    return jwt.sign(payload, process.env.JWTREFRESHSECRET, {
      expiresIn: "7d",
    });
  },
};

export default createToken;
