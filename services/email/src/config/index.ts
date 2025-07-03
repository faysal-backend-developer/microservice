import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env')
});

export const config = {
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT || 4005,
    default_email_sender: process.env.DEFAULT_EMAIL_SENDER,
    smtp_host: process.env.SMTP_HOST || "localhost",
    smtp_port: process.env.SMTP_PORT || "2525"
};