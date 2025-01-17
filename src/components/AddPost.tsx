"use client";

import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>("");
  const [preview, setPreview] = useState<any>();
  const [error, setError] = useState<string>(""); // State to store error messages

  const { user: currentUser } = useUser();

  if (!currentUser) return null;

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate desc and img before submitting
    if (!desc.trim() || !img?.secure_url) {
      setError("فیلد متن و عکس اجباری است."); // Set error message
      return; // Prevent form submission
    }

    try {
      // Create FormData to hold the description
      const formData = new FormData();
      formData.append("desc", desc);

      // Call addPost function with formData and img.secure_url
      await addPost(formData, img.secure_url || "");

      // Reset the form and states after successful post
      setDesc(""); // Reset description
      setImg(""); // Reset image
      setPreview(""); // Reset preview
      setError(""); // Clear error message
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div className='dir-rtl p-4 bg-white shadow-md rounded-lg'>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder='چی تو ذهنت میگذره...؟'
          className='flex-1 bg-slate-100 rounded-lg p-2 w-full'
          name='desc'
          value={desc} // Bind the value of desc to the state
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <div className='mt-4'>
          <CldUploadWidget
            uploadPreset='yektaSocial'
            onSuccess={(res) => {
              setImg(res.info); // Set the uploaded image information
              setPreview(res.info); // Set the preview for the uploaded image
            }}
          >
            {({ open }) => (
              <div
                className='flex items-center gap-2 cursor-pointer text-blue-500 text-xs font-medium border p-2 max-w-max rounded-lg bg-slate-100 border-white'
                onClick={() => open()}
              >
                <Image src='/addImage.png' alt='' width={20} height={20} />
              </div>
            )}
          </CldUploadWidget>
        </div>

        {preview && (
          <div className='mt-4 flex justify-center'>
            <Image src={preview.secure_url} height={100} width={100} alt='' />
          </div>
        )}

        <AddPostButton />
      </form>
      {error && (
        <p className='text-red-500 text-sm font-medium mt-3'>{error}</p>
      )}
    </div>
  );
};

export default AddPost;
