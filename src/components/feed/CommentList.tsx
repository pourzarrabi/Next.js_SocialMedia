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
            <p className='text-gray-500'>{c.desc}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentList;
