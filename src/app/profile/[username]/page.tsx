import Feed from "@/components/feed/Feed";
import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { username: string } }) => {
  const username = params.username;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const { userId: currentUserId } = await auth();

  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });
    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  if (isBlocked) return notFound();

  return (
    <div className='dir-rtl flex gap-6 pt-6'>
      <div className='hidden xl:block w-[20%]'>
        <RightMenu type='profile' />
      </div>
      <div className='w-full lg:w-[70%] xl:w-[50%]'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col items-center justify-center'>
            <div className='w-full h-64 relative'>
              <Image
                src={user.cover || "/noCover.png"}
                alt=''
                fill
                className='object-cover rounded-md'
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt=''
                width={128}
                height={128}
                className='w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover'
              />
            </div>
            <h1 className='mt-20 mb-4 text-2xl font-medium'>
              {user.firstName && user.lastName
                ? user.firstName + " " + user.lastName
                : user.username}
            </h1>
            <div className='flex items-center mb-4'>
              <div className='flex flex-col items-center min-w-[150px]'>
                <span className='font-medium'>{user._count.posts}</span>
                <span className='text-sm'>پست</span>
              </div>
              <div className='flex flex-col items-center min-w-[150px]'>
                <span className='font-medium'>{user._count.followers}</span>
                <span className='text-sm'>دنبال کننده</span>
              </div>
              <div className='flex flex-col items-center min-w-[150px]'>
                <span className='font-medium'>{user._count.followings}</span>
                <span className='text-sm'>دنبال شده</span>
              </div>
            </div>
          </div>
          <Feed username={user.username} />
        </div>
      </div>
      <div className='hidden lg:block w-[30%]'>
        <LeftMenu user={user} />
      </div>
    </div>
  );
};

export default page;
