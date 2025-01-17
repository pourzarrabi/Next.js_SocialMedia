"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageModalProps {
  imgSrc: string;
}

const ImageModal = ({ imgSrc }: ImageModalProps) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    if (isImageModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isImageModalOpen]);

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <>
      <div className='relative w-full h-[70vh]'>
        <Image
          src={imgSrc}
          alt=''
          fill
          className='object-contain rounded-md cursor-pointer'
          onClick={openImageModal}
        />
      </div>

      {isImageModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='relative max-w-full max-h-full'>
            <Image
              src={imgSrc}
              alt=''
              width={800}
              height={800}
              className='object-contain max-w-[90vw] max-h-[90vh] w-auto h-auto'
            />
            <button
              onClick={closeImageModal}
              aria-label='Close image'
              className='absolute top-3 right-3 bg-red-600 rounded-full px-3 py-1.5 shadow-lg hover:bg-red-500 focus:outline-none sm:px-2 sm:py-1 md:px-3 md:py-1.5'
            >
              <span className='text-xl font-bold text-red-100'>X</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageModal;
