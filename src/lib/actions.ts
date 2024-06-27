"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "./client";
import { z } from "zod";

export const switchFollow = async (userId: string) => {
    const { userId: currentUserId } = auth();
    if (!currentUserId) {
        throw new Error("Not logged in")
    }

    try {
        const existingFollow = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,
                followingId: userId
            }
        })

        if (existingFollow) {
            await prisma.follower.delete({
                where: {
                    id: existingFollow.id
                }
            })
        } else {
            const existingFollowReq = await prisma.followRequest.findFirst({
                where: {
                    senderId: currentUserId,
                    receiverId: userId
                }
            })
            if (existingFollowReq) {
                await prisma.followRequest.delete({
                    where: {
                        id: existingFollowReq.id
                    }
                })
            } else {

                await prisma.followRequest.create({
                    data: {
                        senderId: currentUserId,
                        receiverId: userId
                    }
                })
            }
        }
    } catch (error) {
        throw new Error("Something went wrong")
    }
}

export const switchBlock = async (userId: string) => {
    const { userId: currentUserId } = auth();
    if (!currentUserId) {
        throw new Error("Not logged in")
    }
    try {
        const existingBlock = await prisma.block.findFirst({
            where: {
                blockerId: currentUserId,
                blockedId: userId
            }
        })
        if (existingBlock) {
            await prisma.block.delete({
                where: {
                    id: existingBlock.id
                }
            })
        } else {
            await prisma.block.create({
                data: {
                    blockerId: currentUserId,
                    blockedId: userId
                }
            })
        }
    } catch (error) {
        throw new Error("Something went wrong")
    }
}

export const acceptFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth();
    if (!currentUserId) {
        throw new Error("Not logged in")
        return
    }
    try {

        const existingFollowRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId
            }
        })
        if (existingFollowRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: existingFollowRequest.id
                }
            })
        }
        await prisma.follower.create({
            data: {
                followerId: userId,
                followingId: currentUserId
            }
        })
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong")

    }
}

export const declineFollowRequest = async (userId: string) => {
    const { userId: currentUserId } = auth();
    if (!currentUserId) {
        throw new Error("Not logged in")
        return
    }
    try {

        const existingFollowRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId
            }
        })
        if (existingFollowRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: existingFollowRequest.id
                }
            })
        }

    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong")

    }
}

export const updateProfile = async (
    prevState: { success: boolean; error: boolean },
    payload: { formData: FormData; cover: string }
) => {
    const { formData, cover } = payload;
    const fields = Object.fromEntries(formData);

    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([_, value]) => value !== "")
    );

    const Profile = z.object({
        cover: z.string().optional(),
        name: z.string().max(60).optional(),
        surname: z.string().max(60).optional(),
        description: z.string().max(255).optional(),
        city: z.string().max(60).optional(),
        school: z.string().max(60).optional(),
        work: z.string().max(60).optional(),
        website: z.string().max(60).optional(),
    });

    const validatedFields = Profile.safeParse({ cover, ...filteredFields });

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return { success: false, error: true };
    }

    const { userId } = auth();

    if (!userId) {
        return { success: false, error: true };
    }

    try {
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: validatedFields.data,
        });
        return { success: true, error: false };
    } catch (err) {
        console.log(err);
        return { success: false, error: true };
    }
};