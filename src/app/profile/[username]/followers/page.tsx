import prisma from "@/lib/client";
import Link from "next/link";

const page = async ({ params }: { params: { username: string } }) => {
  const username = params.username;

  const userFollowers = await prisma.user.findMany({
    where: {
      username,
    },
    include: {
      followers: true,
    },
  });

  const followers = userFollowers[0]?.followers || [];

  const followerUsers = await Promise.all(
    followers.map(async (follower) => {
      const user = await prisma.user.findFirst({
        where: {
          id: follower.followingId,
        },
      });
      return user;
    })
  );

  return (
    <div className='space-y-4 mt-10'>
      {followerUsers.map((user) => (
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
