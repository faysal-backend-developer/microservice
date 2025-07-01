import { User } from "@prisma/client";
import prisma from "../../../prisma";
import bcrypt from 'bcrypt'
import { config } from "../../../config";
import jwt, { SignOptions } from 'jsonwebtoken';
import { LoginHistoryService } from "../LoginHistory/LoginHistory.service";

const signupUser = async (payload: User): Promise<Partial<User>> => {

    const existingUser = await prisma.user.findUnique({
        where: {
            email: payload?.email
        }
    })

    if (existingUser) {
        throw new Error("Already have an Account")
    }


    const hashedPassword = await bcrypt.hash(payload?.password, Number(config.salt_round))

    const newUser = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword
        },
        select: {
            email: true,
            name: true,
            role: true,
            status: true,
            verified: true
        }
    })

    return newUser;


};

// TODO : generate Verification Code 
// TODO : Send Verification Email 

// *NOTE : LoginHistory 


const loginUser = async (payload: Partial<User>, ipAddress: string, userAgent: string): Promise<string | null> => {

    const user = await prisma.user.findUnique({
        where: {
            email: payload?.email
        }
    });

    if (!user) {
        throw new Error("User not Founded")
    }

    const isPasswordValid = await bcrypt.compare(payload?.password!, user?.password)

    if (!isPasswordValid) {
        await LoginHistoryService.createLoginHistory({
            userId: user?.id!,
            userAgent,
            ipAddress,
            attempt: "FAILED"

        })
        throw new Error("Wrong Password")
    }

    if (!user.verified) {
        await LoginHistoryService.createLoginHistory({
            userId: user?.id!,
            userAgent,
            ipAddress,
            attempt: "FAILED"

        })
        throw new Error("User Not Verified")
    };


    if (user?.status !== "ACTIVE") {
        await LoginHistoryService.createLoginHistory({
            userId: user?.id!,
            userAgent,
            ipAddress,
            attempt: "FAILED"

        })
        throw new Error("User Account Not Activate now")
    }

    const optionJwt: SignOptions = {
        expiresIn: "30d"
    }

    const accessToken = jwt.sign({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }, config.jwt_secret as string, optionJwt)

    await LoginHistoryService.createLoginHistory({
        userId: user?.id!,
        userAgent,
        ipAddress,
        attempt: "SUCCESS"

    })

    return accessToken

}


// *NOTE - Verified Token

const verifiedToken = async (accessToken: string): Promise<Partial<User | null>> => {
    const decoded = jwt.verify(accessToken, config.jwt_secret as string);

    const user = await prisma.user.findUnique({
        where: {
            id: (decoded as any).userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }

    })


    return user;
}



export const UserService = {
    signupUser,
    loginUser,
    verifiedToken
}