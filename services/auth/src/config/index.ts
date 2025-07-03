import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env')
});

export const config = {
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT || 4004,
    user_url: process.env.USER_URL || "http://localhost:4003/" || "http://127.0.0.1:4003",
    salt_round: process.env.SALT_ROUND,
    jwt_secret: process.env.JWT_TOKEN_SECRET,
    jwt_expireIn: process.env.JWT_EXPIRE_IN || "30d",
    email_url: process.env.EMAIL_URL || "http://localhost:4005/",
    default_mail: process.env.DEFAULT_MAIL
};