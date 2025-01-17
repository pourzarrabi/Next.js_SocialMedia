"use client";

import { useFormStatus } from "react-dom";

const AddPostButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className='bg-blue-500 p-2 mt-5 rounded-md text-xs font-medium text-white disabled:bg-blue-300 disabled:cursor-not-allowed w-full'
      disabled={pending}
    >
      {pending ? (
        <div className='inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]' />
      ) : (
        "ارسال"
      )}
    </button>
  );
};

export default AddPostButton;
