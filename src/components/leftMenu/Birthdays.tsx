import Image from "next/image";
import Link from "next/link";

const Birthdays = async () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md flex flex-col gap-4'>
      <div className='flex items-center justify-between font-medium'>
        <span className='text-gray-500'>تولد</span>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Image
            src='https://img.freepik.com/free-photo/adorable-black-white-kitty-with-monochrome-wall-her_23-2148955182.jpg?t=st=1730302418~exp=1730306018~hmac=2de3b3da81dbfc4a3100c656e2a623599032e397470e410da2f03c0c7da666b7&w=740'
            alt=''
            className='w-10 h-10 rounded-full object-cover'
            width={40}
            height={40}
          />
          <span className='font-medium text-sm'>علیرضا</span>
        </div>
        <div className='flex justify-end gap-3'>
          <button className='bg-blue-500 text-white text-xs px-2 py-1 rounded-md'>
            تبریک
          </button>
        </div>
      </div>
      <div className='p-4 bg-slate-100 rounded-lg flex items-center gap-4'>
        <Image src='/gift.png' alt='' width={24} height={24} />
        <Link href='' className='flex flex-col gap-1 text-sm'>
          <span className='text-gra-700 font-medium'>تولد های نزدیک</span>
          <span className='text-gray-500'>تولد 5 دوست نزدیک است.</span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
