import nodemailer from 'nodemailer'
import { config } from '../../config'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
export const transporter = nodemailer.createTransport(<SMTPTransport.Options>{
    host: config.smtp_host || "localhost",
    port: parseInt(config.smtp_port || "2525"),
    secure: false
})