import Link from "next/link";
import Image from "next/image";
import ProfileCard from "./ProfileCard";
import Ad from "../Ad";

const RightMenu = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className='flex flex-col gap-6'>
      {type === "home" && <ProfileCard />}
      <div className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md text-gray-500 text-sm'>
        <Link
          href=''
          className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'
        >
          <Image src='/posts.png' alt='' width={20} height={20} />
          <span>پست</span>
        </Link>
        <hr className='border-t-1 border-gray-200 w-36 self-center' />
        <Link
          href=''
          className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'
        >
          <Image src='/activity.png' alt='' width={20} height={20} />
          <span>فعالیت</span>
        </Link>
        <hr className='border-t-1 border-gray-200 w-36 self-center' />
        <Link
          href=''
          className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'
        >
          <Image src='/market.png' alt='' width={20} height={20} />
          <span>فروشگاه</span>
        </Link>
        <hr className='border-t-1 border-gray-200 w-36 self-center' />
        <Link
          href=''
          className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'
        >
          <Image src='/events.png' alt='' width={20} height={20} />
          <span>رویداد</span>
        </Link>
        <hr className='border-t-1 border-gray-200 w-36 self-center' />
        <Link
          href=''
          className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'
        >
          <Image src='/albums.png' alt='' width={20} height={20} />
          <span>گالری</span>
        </Link>
        <hr className='border-t-1 border-gray-200 w-36 self-center' />
        <Link
          href=''
          className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'
        >
          <Image src='/videos.png' alt='' width={20} height={20} />
          <span>ویدیو</span>
        </Link>
        <hr className='border-t-1 border-gray-200 w-36 self-center' />
        <Link
          href=''
          className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'
        >
          <Image src='/news.png' alt='' width={20} height={20} />
          <span>اخبار</span>
        </Link>
        <hr className='border-t-1 border-gray-200 w-36 self-center' />
        <Link
          href=''
          className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'
        >
          <Image src='/courses.png' alt='' width={20} height={20} />
          <span>آموزش</span>
        </Link>
        <hr className='border-t-1 border-gray-200 w-36 self-center' />
        <Link
          href=''
          className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'
        >
          <Image src='/lists.png' alt='' width={20} height={20} />
          <span>لیست</span>
        </Link>
        <hr className='border-t-1 border-gray-200 w-36 self-center' />
        <Link
          href=''
          className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100'
        >
          <Image src='/settings.png' alt='' width={20} height={20} />
          <span>تنظیمات</span>
        </Link>
      </div>
      <Ad size='sm' />
    </div>
  );
};

export default RightMenu;
