"use client";

import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>("");

  const { user: currentUser } = useUser();

  if (!currentUser) return null;

  return (
    <div className='dir-rtl p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between'>
      <Image
        src={currentUser?.imageUrl || "/noAvatar.png"}
        alt=''
        className='w-12 h-12 object-cover rounded-full'
        width={48}
        height={48}
      />

      <div className='flex-1'>
        <form
          action={(formData) => addPost(formData, img.secure_url || "")}
          className='flex gap-4'
        >
          <textarea
            placeholder='چی تو ذهنت میگذره؟'
            className='flex-1 bg-slate-100 rounded-lg p-2'
            name='desc'
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div>
            <Image
              src='/emoji.png'
              alt=''
              className='w-5 h-5 cursor-pointer self-end'
              width={20}
              height={20}
            />
            <AddPostButton />
          </div>
        </form>
        <div className='flex flex-wrap items-center gap-4 mt-4 text-gray-400 '>
          <CldUploadWidget
            uploadPreset='yektaSocial'
            onSuccess={(res, { widget }) => {
              setImg(res.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className='flex items-center gap-2 cursor-pointer'
                  onClick={() => open()}
                >
                  <Image src='/addImage.png' alt='' width={20} height={20} />
                  عکس
                </div>
              );
            }}
          </CldUploadWidget>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src='/addVideo.png' alt='' width={20} height={20} />
            ویدیو
          </div>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src='/poll.png' alt='' width={20} height={20} />
            آرا
          </div>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src='/addEvent.png' alt='' width={20} height={20} />
            رویداد
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
