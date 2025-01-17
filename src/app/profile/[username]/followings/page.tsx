import prisma from "@/lib/client";
import Link from "next/link";

const page = async ({ params }: { params: { username: string } }) => {
  const username = params.username;

  const userFollowings = await prisma.user.findMany({
    where: {
      username,
    },
    include: {
      followings: true,
    },
  });

  const followings = userFollowings[0]?.followings || [];

  const followingUsers = await Promise.all(
    followings.map(async (following) => {
      const user = await prisma.user.findFirst({
        where: {
          id: following.followerId,
        },
      });
      return user;
    })
  );

  return (
    <div className='space-y-4 mt-10'>
      {followingUsers.map((user) => (
        <Link
          key={user?.id}
          href={`/profile/${user?.username}`}
          className='block rounded-lg bg-blue-500 py-2 text-lg font-semibold text-center text-white shadow-lg'
        >
          {user?.username}
        </Link>
      ))}
    </div>
  );
};

export default page;
