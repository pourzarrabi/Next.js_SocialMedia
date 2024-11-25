"use client";

import { switchLike } from "@/lib/actions";
import Image from "next/image";
import { useOptimistic, useState } from "react";

const PostInteraction = ({
  postId,
  likes,
  commentNum,
  currentUserId,
}: {
  postId: number;
  likes: string[];
  commentNum: number;
  currentUserId: string;
}) => {
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: likes.includes(currentUserId) ? true : false,
  });

  const [optimisticLike, addOptimisticLike] = useOptimistic(
    likeState,
    (prev, value) => {
      return {
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        isLiked: !prev.isLiked,
      };
    }
  );

  const likeAction = async () => {
    addOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((prev) => ({
        likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
        isLiked: !prev.isLiked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex items-center justify-between my-4'>
      <div className=''>
        <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
          <span className='text-gray-500'>
            <span className='hidden md:inline'>اشتراک</span>
          </span>
          <span className='text-gray-300'>|</span>
          <Image
            src='/share.png'
            alt=''
            width={16}
            height={16}
            className='cursor-pointer'
          />
        </div>
      </div>
      <div className='flex gap-2'>
        <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
          <span className='text-gray-500'>
            {commentNum}
            <span className='hidden md:inline'> نظر</span>
          </span>
          <span className='text-gray-300'>|</span>
          <Image
            src='/comment.png'
            alt=''
            width={16}
            height={16}
            className='cursor-pointer'
          />
        </div>
        <div className='flex items-center gap-4 bg-slate-50 p-2 rounded-xl'>
          <span className='text-gray-500'>
            {optimisticLike.likeCount}
            <span className='hidden md:inline'> پسند</span>
          </span>
          <span className='text-gray-300'>|</span>
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                alt=''
                width={16}
                height={16}
                className='cursor-pointer'
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
