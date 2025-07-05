import { User } from "@prisma/client";
import prisma from "../../../prisma";
import bcrypt from 'bcrypt'
import { config } from "../../../config";
import jwt, { SignOptions } from 'jsonwebtoken';
import { LoginHistoryService } from "../LoginHistory/LoginHistory.service";
import { generateCode, getAccountActivatedEmailHTML, getVerificationEmailHTML } from "../../helpers/utils";
import axios from "axios";

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
            verified: true,
            id: true
        }
    })

    const code = generateCode();

    try {
        const emailURL = `${config.email_url}email/`
        await axios.post(emailURL, {
            recipient: newUser.email,
            subject: "Welcome! Here’s Your Account Verification Code",
            body: getVerificationEmailHTML(newUser?.name || "Anonymous", code),
            source: "Account Activation"
        })

        const userURL = `${config.user_url}user/`
        await axios.post(userURL, {
            authUserId: newUser?.id,
            email: newUser?.email,
            name: newUser?.name
        })
    } catch (error) {
        console.log(error, "Axios Error")
    }





    await prisma.verificationCode.create({
        data: {
            userId: newUser?.id,
            code,
            expireAt: new Date(Date.now() + 2 * 60 * 60 * 1000)

        }
    })

    return newUser;


};

// *NOTE: Generate Code 
// *NOTE: Sent Email --> Save Code --> Save Email


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


// *NOTE - Verified Token for login User and Password Matching 

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
};



// TODO: Account Verifying using OTP Code > http://localhost:4004/verifying/email 
const verifyingAccount = async (code: string, email: string) => {

    // if (!email) {
    //     console.log(email)
    //     throw new Error("Email Must by provided")
    // }
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!existingUser) {
        throw new Error("User Not Founded")
    };

    const verifiedUser = await prisma.verificationCode.findUnique({
        where: {
            userId_code: {
                userId: existingUser?.id,
                code
            }
        }
    });

    if (!verifiedUser) {
        throw new Error("Invalid verification code");
    }


    const now = new Date();
    if (verifiedUser.expireAt < now) {
        throw new Error("Verification code has expired");
    }

    await prisma.verificationCode.update({
        where: {
            id: verifiedUser?.id
        },
        data: {
            status: "USED",
            verifiedAt: now
        }
    })


    await prisma.user.update({
        where: {
            id: existingUser?.id
        },
        data: {
            verified: true,
            status: "ACTIVE"
        }
    })


    try {
        const emailURL = `${config.email_url}email/`
        await axios.post(emailURL, {
            recipient: existingUser?.email,
            subject: "Welcome Aboard! Your Account Has Been Verified",
            body: getAccountActivatedEmailHTML(existingUser?.name),
            source: "Account Activate"
        })
    } catch (error) {
        console.log(error, "Axios Error")
    }



    return {
        message: "Account Verified Successful"
    }



}



export const UserService = {
    signupUser,
    loginUser,
    verifiedToken,
    verifyingAccount
}