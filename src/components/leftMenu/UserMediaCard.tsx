import prisma from "@/lib/client";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className='p-4 bg-white rounded-lg shadow-md flex flex-col gap-4'>
      <div className='flex items-center justify-between font-medium'>
        <span className='text-gray-500 text-sm'>عکس های ارسالی</span>
        <Link href='/' className='text-blue-500 text-sm'>
          همه
        </Link>
      </div>
      <div className='flex items-center justify-between gap-1 flex-wrap'>
        {postsWithMedia.length
          ? postsWithMedia.map((post) => (
              <div className='relative w-1/5 h-24 mb-2' key={post.id}>
                <Image
                  src={post.img!}
                  alt=''
                  fill
                  className='object-cover rounded-md'
                />
              </div>
            ))
          : "عکسی موجود نیست!"}
      </div>
    </div>
  );
};

export default UserMediaCard;
