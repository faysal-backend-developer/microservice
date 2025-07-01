import { LoginAttempt, LoginHistory } from "@prisma/client";
import prisma from "../../../prisma";

type historyInputData = {
    userId: string,
    ipAddress?: string,
    userAgent?: string,
    attempt: LoginAttempt
}
const createLoginHistory = async (payload: historyInputData): Promise<LoginHistory> => {
    const create = await prisma.loginHistory.create({
        data: payload
    });

    return create;
}

export const LoginHistoryService = {
    createLoginHistory
}