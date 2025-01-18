"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existedFollow = await prisma.user.findFirst({
      where: {
        id: currentUserId,
        followings: {
          some: {
            followerId: userId,
          },
        },
      },
    });

    if (existedFollow) {
      await prisma.user.update({
        where: {
          id: currentUserId,
        },
        data: {
          followings: {
            deleteMany: {
              followerId: userId,
            },
          },
        },
      });
    } else {
      const existedFollowReq = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });
      if (existedFollowReq) {
        await prisma.followRequest.delete({
          where: {
            id: existedFollowReq.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existedBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existedBlock) {
      await prisma.block.delete({
        where: {
          id: existedBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!");
  }

  try {
    const existedFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existedFollowReq) {
      await prisma.followRequest.delete({
        where: {
          id: existedFollowReq.id,
        },
      });

      await prisma.follow.create({
        data: {
          followerId: currentUserId,
          followingId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    throw new Error("User is not Authenticated!");
  }

  try {
    const existedFollowReq = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existedFollowReq) {
      await prisma.followRequest.delete({
        where: {
          id: existedFollowReq.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; cover: string }
) => {
  const { formData, cover } = payload;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([key, value]) => value !== "")
  );

  const profile = z.object({
    cover: z.string().optional(),
    firstName: z
      .string()
      .min(2, { message: "نام باید طول بیشتری داشته باشد." })
      .max(20)
      .optional()
      .refine((val) => isNaN(Number(val)), {
        message: "تنها از حروف استفاده نمایید.",
      }),
    lastName: z
      .string()
      .min(2, { message: "نام خانوادگی باید طول بیشتری داشته باشد." })
      .max(20)
      .optional(),
    desc: z
      .string()
      .min(2, { message: "توضیحات باید طول بیشتری داشته باشد." })
      .max(100)
      .optional(),
    city: z
      .string()
      .min(2, { message: "شهر باید طول بیشتری داشته باشد." })
      .max(20)
      .optional(),
    school: z
      .string()
      .min(2, { message: "دانشگاه باید طول بیشتری داشته باشد." })
      .max(20)
      .optional(),
    career: z
      .string()
      .min(2, { message: "شغل باید طول بیشتری داشته باشد." })
      .max(20)
      .optional(),
    website: z
      .string()
      .min(2, { message: "وبسایت باید طول بیشتری داشته باشد." })
      .max(30)
      .optional(),
  });

  const validatedFields = profile.safeParse({ cover, ...filteredFields });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return { success: false, error: true, errors };
  }

  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: number) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not Authenticated!");

  try {
    const existedLike = await prisma.like.findFirst({
      where: {
        postId,
        userId: currentUserId,
      },
    });

    if (existedLike) {
      await prisma.like.delete({
        where: {
          id: existedLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId: currentUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const addComment = async (postId: number, desc: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not authenticated!");

  try {
    const createdComment = prisma.comment.create({
      data: {
        userId: currentUserId,
        postId,
        desc,
      },
      include: {
        user: true,
      },
    });

    return createdComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;

  const descSchema = z.string().min(1).max(255);

  const validatedDesc = descSchema.safeParse(desc);

  if (!validatedDesc.success) {
    const errors = validatedDesc.error.flatten().fieldErrors;
    return { errors };
  }

  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.create({
      data: {
        desc: validatedDesc.data,
        userId: currentUserId,
        img,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const addStory = async (img: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not authenticated!");

  try {
    const existedStory = await prisma.story.findFirst({
      where: {
        userId: currentUserId,
      },
    });

    if (existedStory) {
      await prisma.story.delete({
        where: {
          id: existedStory.id,
        },
      });
    }

    const createdStory = await prisma.story.create({
      data: {
        userId: currentUserId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const deletePost = async (postId: number) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId: currentUserId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};
