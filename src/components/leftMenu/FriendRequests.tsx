import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FriendRequestList from "./FriendRequestList";

const FriendRequests = async () => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) return null;

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: currentUserId,
    },
    include: {
      sender: true,
    },
  });

  if (requests.length === 0) return null;
  return (
    <div className='p-4 bg-white rounded-lg shadow-md flex flex-col gap-4'>
      <div className='flex items-center justify-between font-medium'>
        <span className='text-gray-500 text-sm'>درخواست دوستی</span>
        <Link href='/' className='text-blue-500 text-sm'>
          همه
        </Link>
      </div>
      <FriendRequestList requests={requests} />
    </div>
  );
};

export default FriendRequests;
