"use client";

import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);
  const deletePostWithId = deletePost.bind(null, postId);
  return (
    <div className='relative'>
      <Image
        src='/more.png'
        alt=''
        width={16}
        height={16}
        onClick={() => setOpen((prev) => !prev)}
        className='cursor-pointer'
      />
      {open && (
        <div className='absolute left-0 bg-white p-4 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30'>
          <form action={deletePostWithId}>
            <button className='text-red-500 font-medium'>حذف</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
