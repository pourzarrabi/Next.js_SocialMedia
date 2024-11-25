import Image from "next/image";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md'>
      <div className='flex items-center justify-between text-gray-500 font-medium'>
        <span>تبلیغات</span>
        <Image
          src='/more.png'
          alt=''
          width={16}
          height={16}
          className='cursor-pointer'
        />
      </div>
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src='https://img.freepik.com/free-photo/scary-halloween-pumpkins-stairs-arrangement_23-2149843172.jpg?t=st=1730303852~exp=1730307452~hmac=0b8df04c6a592ab7a817021a0d08e2d7cac0eed2fe6318580f4b9b4a9ca6363d&w=1060'
            alt=''
            fill
            className='rounded-lg object-cover'
          />
        </div>
        <div className='flex items-center gap-4'>
          <Image
            src='https://img.freepik.com/free-photo/scary-halloween-pumpkins-stairs-arrangement_23-2149843172.jpg?t=st=1730303852~exp=1730307452~hmac=0b8df04c6a592ab7a817021a0d08e2d7cac0eed2fe6318580f4b9b4a9ca6363d&w=1060'
            alt=''
            width={24}
            height={24}
            className='rounded-full w-6 h-6 object-cover'
          />
          <span className='text-blue-500 font-medium text-sm'>
            شب های هالوینی
          </span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و"
            : size === "md"
            ? "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است"
            : "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد"}
        </p>
        <button className='bg-gray-200 text-gray-500 p-2 text-sm rounded-lg'>
          بیشتر بخوانید
        </button>
      </div>
    </div>
  );
};

export default Ad;
