import 'dotenv/config';

const requiredEnvVars = [
    'DBHOST', 'DBUSER', 'DBPASS', 'DBPORT', 'DBNAME',
    'MAILSERVICE', 'MAILUSER', 'MAILPASS',
    'JWTSECRET', 'JWTREFRESHSECRET',
    'CLOUDINARYNAME', 'CLOUDINARYAPIKEY', 'CLOUDINARYAPISECRET'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    db: {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        pass: process.env.DBPASS,
        port: process.env.DBPORT,
        name: process.env.DBNAME,
    },
    mail: {
        service: process.env.MAILSERVICE,
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS,
    },
    jwt: {
        secret: process.env.JWTSECRET,
        refreshSecret: process.env.JWTREFRESHSECRET,
    },
    cloudinary: {
        name: process.env.CLOUDINARYNAME,
        apiKey: process.env.CLOUDINARYAPIKEY,
        apiSecret: process.env.CLOUDINARYAPISECRET,
    },
    corsOrigin: process.env.CORS_ORIGIN || 'https://localhost:3000',
};

export default config;
