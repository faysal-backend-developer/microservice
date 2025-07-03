import { Email } from "@prisma/client";
import { config } from "../../../config";
import { transporter } from "../../helpers/mail.transporter";
import prisma from "../../../prisma";

const sendEmail = async (payload: Email): Promise<Email | null> => {
    const from = payload.sender || config.default_email_sender;
    const mainOption = {
        from,
        to: payload?.recipient,
        subject: payload?.subject,
        html: payload?.body
    }

    const { rejected } = await transporter.sendMail(mainOption)

    if (rejected.length > 0) {
        throw new Error("Mail Sent Rejected")
    }

    const result = await prisma.email.create({
        data: {
            ...payload,
            sender: from as string
        }
    })

    return result
};


const getMail = async (): Promise<Email[]> => {
    const result = await prisma.email.findMany();

    if (result.length <= 0) {
        throw new Error("Not Founded Any Mail")
    }

    return result;
}

export const emailService = {
    sendEmail,
    getMail
}