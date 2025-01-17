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
      <div className='h-32 relative'>
        <Image
          src={user.cover || "/noCover.png"}
          alt=''
          fill
          className='rounded-md object-cover'
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=''
          width={64}
          height={64}
          className='rounded-full w-16 h-16 object-cover absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10'
        />
      </div>
      <div className='flex flex-col items-center h-20 gap-2 mt-2 mb-4'>
        <span className='font-semibold'>
          {user.firstName && user.lastName
            ? user.firstName + " " + user.lastName
            : user.username}
        </span>

        <Link href={`/profile/${user.username}`} className='w-full'>
          <button className='bg-blue-500 text-white text-xs font-medium p-2 mt-2 rounded-md w-full'>
            پروفایل
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
