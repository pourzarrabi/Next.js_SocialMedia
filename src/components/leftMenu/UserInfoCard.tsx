import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./UpdateUser";

const UserInfoCard = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUserId } = await auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });

    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);

    const followingRes = await prisma.follow.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    followingRes ? (isFollowing = true) : (isFollowing = false);

    const followingSentRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.id,
      },
    });

    followingSentRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }

  return (
    <div className='p-4 bg-white rounded-lg shadow-md flex flex-col gap-4'>
      <div className='flex items-center justify-between font-medium'>
        <span className='text-gray-500 text-sm'>اطلاعات کاربری</span>
        {currentUserId && currentUserId === user.id ? (
          <UpdateUser user={user} />
        ) : (
          <Link href='/' className='text-blue-500 text-sm'>
            همه
          </Link>
        )}
      </div>
      <div className='flex flex-col gap-4 text-gray-500'>
        <div className='flex items-center justify-between'>
          <span className='text-xl text-black'>
            {user.firstName && user.lastName
              ? user.firstName + " " + user.lastName
              : user.username}
          </span>
          <span className='dir-ltr text-sm'>@{user.username}</span>
        </div>
        {user.desc && <p>{user.desc}</p>}
        {user.city && (
          <div className='flex items-center gap-2'>
            <Image src='/map.png' alt='' width={16} height={16} />
            <span>
              ساکن<b>&nbsp;{user.city}</b>
            </span>
          </div>
        )}
        {user.school && (
          <div className='flex items-center gap-2'>
            <Image src='/school.png' alt='' width={16} height={16} />
            <span>
              فارغ التحصیل از<b>&nbsp;{user.school}</b>
            </span>
          </div>
        )}
        {user.career && (
          <div className='flex items-center gap-2'>
            <Image src='/work.png' alt='' width={16} height={16} />
            <span>
              کارمند<b>&nbsp;{user.career}</b>
            </span>
          </div>
        )}
        {user.website && (
          <div className='flex items-center gap-1'>
            <Image src='/link.png' alt='' width={16} height={16} />
            <Link href={user.website} className='text-blue-500 font-medium'>
              {user.website}
            </Link>
          </div>
        )}
        <div className='flex items-center gap-1'>
          <Image src='/date.png' alt='' width={16} height={16} />
          <span>عضویت&nbsp;{formattedDate}</span>
        </div>
        {currentUserId && currentUserId !== user.id && (
          <UserInfoCardInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
