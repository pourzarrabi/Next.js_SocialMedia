"use client";

import { addComment } from "@/lib/actions";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
  currentUserId,
  currentUser,
}: {
  comments: CommentWithUser[];
  postId: number;
  currentUserId: string;
  currentUser: User;
}) => {
  const [comment, setComment] = useState(comments);
  const [desc, setDesc] = useState("");

  const add = async () => {
    if (!currentUser || !desc) return;

    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: currentUserId,
      postId: postId,
      user: {
        ...currentUser,
      },
    });
    try {
      const createdComment = await addComment(postId, desc);
      setComment((prev) => [createdComment, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticComment, addOptimisticComment] = useOptimistic(
    comment,
    (prev, value: CommentWithUser) => [value, ...prev]
  );

  return (
    <>
      {currentUser && (
        <div className='flex items-center gap-4'>
          <Image
            src={currentUser.avatar || "/noAvatar.png"}
            alt=''
            className='w-8 h-8 rounded-full'
            width={32}
            height={32}
          />
          <form
            action={add}
            className='flex-1 flex items-center justify-between bg-slate-100 rounded-xl px-6 py-2 w-full'
          >
            <input
              type='text'
              placeholder='نظری بنویسید...'
              className='bg-transparent outline-none flex-1'
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src='/emoji.png'
              alt=''
              width={16}
              height={16}
              className='cursor-pointer'
            />
          </form>
        </div>
      )}
      {optimisticComment.map((c) => (
        <div key={c.id} className='flex gap-4 justify-between mt-6'>
          <Image
            src={c.user.avatar || "/noAvatar.png"}
            alt=''
            className='w-10 h-10 rounded-full'
            width={40}
            height={40}
          />
          <div className='flex flex-col gap-2 flex-1'>
            <span className='font-medium'>
              {c.user.firstName && c.user.lastName
                ? c.user.firstName + " " + c.user.lastName
                : c.user.username}
            </span>
            <p>{c.desc}</p>
            <div className='flex items-center gap-8 text-gray-500 mt-2 justify-end'>
              <div className=''>پاسخ</div>

              <div className='flex items-center gap-4'>
                <span className='text-gray-500'>
                  0<span className='hidden md:inline'> پسند</span>
                </span>
                <span className='text-gray-300'>|</span>
                <Image
                  src='/like.png'
                  alt=''
                  width={12}
                  height={12}
                  className='cursor-pointer w-3 h-3'
                />
              </div>
            </div>
          </div>
          <Image
            src='/more.png'
            alt=''
            width={16}
            height={16}
            className='cursor-pointer w-4 h-4'
          />
        </div>
      ))}
    </>
  );
};

export default CommentList;
