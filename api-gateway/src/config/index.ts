import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env')
});

export const config = {
    port: process.env.PORT || 8080,
    name: process.env.NAME || "API GATEWAY"
}