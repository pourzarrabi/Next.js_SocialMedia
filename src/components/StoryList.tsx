"use client";

import { addStory } from "@/lib/actions";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type StoryWithUser = Story & { user: User };

const StoryList = ({
  stories,
  currentUser,
}: {
  stories: StoryWithUser[];
  currentUser: User;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [image, setImage] = useState<any>("");

  const [optimisticStories, addOptimisticStories] = useOptimistic(
    storyList,
    (prev, value: StoryWithUser) => [
      value,
      ...prev.filter((s) => s.user.id !== currentUser.id),
    ]
  );

  const add = async () => {
    if (!image?.secure_url) return;

    addOptimisticStories({
      id: Math.random(),
      img: image.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: currentUser.id,
      user: {
        ...currentUser,
      },
    });

    try {
      const createdStory = await addStory(image.secure_url);
      setStoryList((prev) => [
        createdStory,
        ...prev.filter((s) => s.user.id !== currentUser.id),
      ]);
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CldUploadWidget
        uploadPreset='yektaSocial'
        onSuccess={(res, { widget }) => {
          setImage(res.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className='flex flex-col items-center gap-2 cursor-pointer relative'>
              <Image
                src={image?.secure_url || currentUser.avatar}
                alt=''
                width={80}
                height={80}
                className='w-20 h-20 rounded-full ring-2 object-cover'
              />
              {image ? (
                <form action={add}>
                  <button className='text-xs bg-blue-500 py-1 px-2 rounded-md text-white font-medium'>
                    ارسال
                  </button>
                </form>
              ) : (
                <span className='font-medium text-sm text-blue-500'>
                  داستان
                </span>
              )}
              <div
                className='absolute text-6xl text-gray-300 top-3'
                onClick={() => open()}
              >
                +
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
      {optimisticStories.map((s) => (
        <div
          className='flex flex-col items-center gap-2 cursor-pointer'
          key={s.id}
        >
          <Image
            src={s.img || s.user.avatar || "/noAvatar.png"}
            alt=''
            width={80}
            height={80}
            className='w-20 h-20 rounded-full ring-2 object-cover'
          />
          <span className='text-sm font-medium'>
            {s.user.firstName || s.user.username}
          </span>
        </div>
      ))}
    </>
  );
};

export default StoryList;
