"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cover, setCover] = useState<any>("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
    errors: {},
  });

  const router = useRouter();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    state.success && router.refresh();
  };

  return (
    <div>
      <span
        className='text-blue-500 text-sm cursor-pointer font-medium max-sm:hidden'
        onClick={handleOpen}
      >
        ویرایش
      </span>
      {isOpen && (
        <div className='absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50'>
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || user.cover })
            }
            className='relative p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3'
          >
            <h1 className='text-blue-500'>ویرایش پروفایل</h1>

            <CldUploadWidget
              uploadPreset='yektaSocial'
              onSuccess={(res) => setCover(res.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className='flex flex-col gap-4 my-4'
                    onClick={() => open()}
                  >
                    <label htmlFor=''>عکس زمینه</label>
                    <div className='flex items-center gap-2 cursor-pointer'>
                      <span className='text-xs text-blue-500'>تغییر عکس</span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            <div className='flex flex-wrap justify-between gap-2 xl:gap-4'>
              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  نام
                </label>
                <input
                  type='text'
                  name='firstName'
                  placeholder={user.firstName || "حسین"}
                  className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm'
                />
                {state.errors?.firstName && (
                  <span className='text-red-500 text-xs'>
                    {state.errors.firstName}
                  </span>
                )}
              </div>

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  نام خانوادگی
                </label>
                <input
                  type='text'
                  name='lastName'
                  placeholder={user.lastName || "علیزاده"}
                  className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm'
                />
                {state.errors?.lastName && (
                  <span className='text-red-500 text-xs'>
                    {state.errors.lastName}
                  </span>
                )}
              </div>

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  توضیحات
                </label>
                <input
                  type='text'
                  name='desc'
                  placeholder={user.desc || "زندگی زیباست..."}
                  className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm'
                />
                {state.errors?.desc && (
                  <span className='text-red-500 text-xs'>
                    {state.errors.desc}
                  </span>
                )}
              </div>

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  شهر
                </label>
                <input
                  type='text'
                  name='city'
                  placeholder={user.city || "تهران"}
                  className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm'
                />
                {state.errors?.city && (
                  <span className='text-red-500 text-xs'>
                    {state.errors.city}
                  </span>
                )}
              </div>

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  دانشگاه
                </label>
                <input
                  type='text'
                  name='school'
                  placeholder={user.school || "آزاد"}
                  className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm'
                />
                {state.errors?.school && (
                  <span className='text-red-500 text-xs'>
                    {state.errors.school}
                  </span>
                )}
              </div>

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  شغل
                </label>
                <input
                  type='text'
                  name='career'
                  placeholder={user.career || "مکانیک"}
                  className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm'
                />
                {state.errors?.career && (
                  <span className='text-red-500 text-xs'>
                    {state.errors.career}
                  </span>
                )}
              </div>

              <div className='flex flex-col gap-4'>
                <label htmlFor='' className='text-xs text-gray-500'>
                  وبسایت
                </label>
                <input
                  type='text'
                  name='website'
                  placeholder={user.website || "mywebsite.com"}
                  className='ring-1 ring-gray-300 p-[13px] rounded-md text-sm'
                />
                {state.errors?.website && (
                  <span className='text-red-500 text-xs'>
                    {state.errors.website}
                  </span>
                )}
              </div>
            </div>
            <UpdateButton />
            {state.success && (
              <span className='text-green-500 font-medium text-sm'>
                پروفایل با موفقیت ویرایش گردید.
              </span>
            )}
            {state.error && (
              <span className='text-red-500 font-medium text-sm'>
                متاسفانه مشکلی پیش آمده است.
              </span>
            )}

            <div
              className='absolute right-2 top-1 cursor-pointer text-red-500'
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
