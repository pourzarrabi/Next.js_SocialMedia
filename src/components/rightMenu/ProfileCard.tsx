import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const ProfileCard = async () => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: currentUserId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!user) return null;

  return (
    <div className='flex flex-col gap-6 p-4 bg-white rounded-lg shadow-md'>
      <div className='h-20 relative'>
        <Image
          src={user.cover || "/noCover.png"}
          alt=''
          fill
          className='rounded-md object-cover'
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=''
          width={48}
          height={48}
          className='rounded-full w-12 h-12 object-cover absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10'
        />
      </div>
      <div className='flex flex-col items-center h-20 gap-2 mt-2 mb-4'>
        <span className='font-semibold'>
          {user.firstName && user.lastName
            ? user.firstName + " " + user.lastName
            : user.username}
        </span>
        <div className='flex items-center gap-2'>
          <div className='flex'>
            <Image
              src='https://img.freepik.com/free-photo/portrait-blonde-woman-looking-photographer_23-2148348970.jpg?t=st=1730565711~exp=1730569311~hmac=786ffb666d9cc11db39709a2ad32b364b4fba9d215e29cf1cb9796e350470799&w=740'
              alt=''
              width={12}
              height={12}
              className='rounded-full w-3 h-3 object-cover'
            />
            <Image
              src='https://img.freepik.com/free-photo/portrait-blonde-woman-looking-photographer_23-2148348970.jpg?t=st=1730565711~exp=1730569311~hmac=786ffb666d9cc11db39709a2ad32b364b4fba9d215e29cf1cb9796e350470799&w=740'
              alt=''
              width={12}
              height={12}
              className='rounded-full w-3 h-3 object-cover'
            />
            <Image
              src='https://img.freepik.com/free-photo/portrait-blonde-woman-looking-photographer_23-2148348970.jpg?t=st=1730565711~exp=1730569311~hmac=786ffb666d9cc11db39709a2ad32b364b4fba9d215e29cf1cb9796e350470799&w=740'
              alt=''
              width={12}
              height={12}
              className='rounded-full w-3 h-3 object-cover'
            />
          </div>
          <span className='text-xs text-gray-500'>
            {user._count.followers} دنبال کننده
          </span>
        </div>
        <button className='bg-blue-500 text-white text-xs font-medium p-2 mt-2 rounded-md w-full'>
          <Link href={`/profile/${user.username}`}>پروفایل</Link>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
