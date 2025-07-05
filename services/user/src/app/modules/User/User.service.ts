import { User } from "@prisma/client";
import prisma from "../../../prisma";
import { TField } from "../../helpers/types";


const create = async (payload: User): Promise<User | null> => {

    const existingUser = await prisma.user.findUnique({
        where: {
            authUserId: payload?.authUserId
        }
    });

    if (existingUser) {
        throw new Error("User Already Existing")
    }

    const result = await prisma.user.create({
        data: payload
    });

    if (!result) {
        throw new Error("User creation failed");
    }

    return result;
};


const findUser = async (): Promise<User[]> => {
    return await prisma.user.findMany();
}

const findUserById = async (id: string, field: TField): Promise<User | null> => {

    let whereClause: { id: string } | { authUserId: string };



    if (field === 'id') {
        whereClause = { id };

        console.log(whereClause)
    } else {
        whereClause = { authUserId: id };

    }
    const user = await prisma.user.findUnique({
        where: whereClause
    })


    if (!user) {
        throw new Error("User Not Founded")
    }

    return user;
}




const updateUser = async (id: string, field: TField, payload: Partial<User>): Promise<User | null> => {

    let whereClause: { id: string } | { authUserId: string };

    if (field === 'id') {
        whereClause = { id };
    } else {
        whereClause = { authUserId: id };
    }

    const user = await prisma.user.findUnique({
        where: whereClause
    })

    if (!user) {
        throw new Error("User Not Founded")
    }
    let existingUserEmail
    if (payload?.email) {
        existingUserEmail = await prisma.user.findUnique({
            where: {
                email: payload?.email
            }
        })
    }

    if (existingUserEmail?.email === user?.email) {
        throw new Error("This is your Old Mail, please Try a new Mail")
    }

    if (existingUserEmail) {
        throw new Error("Email already Exist, Please Try again a new Email")
    }


    const updateUser = await prisma.user.update({
        where: whereClause,
        data: payload
    })


    return updateUser
}


const deleteUser = async (id: string, field: TField) => {

    let whereClause: { id: string } | { authUserId: string };

    if (field === "id") {
        whereClause = { id }
    } else {
        whereClause = { authUserId: id }
    }
    const findUser = await prisma.user.findUnique({
        where: whereClause
    })

    if (!findUser) {
        throw new Error("User Not Founded")
    }

    const result = await prisma.user.delete({
        where: whereClause
    });

    return result;
}

export const UserService = {
    create,
    findUser,
    findUserById,
    updateUser,
    deleteUser
}