"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import { useOptimistic, useState } from "react";

const UserInfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    userBlocked: isUserBlocked,
    following: isFollowing,
    followingSent: isFollowingSent,
    isFollowSending: false,
    isBlockSending: false,
  });

  const follow = async () => {
    addOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingSent: !prev.following && !prev.followingSent ? true : false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const block = async () => {
    addOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        ...prev,
        userBlocked: !prev.userBlocked,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticState, addOptimisticState] = useOptimistic(
    userState,
    (prev, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...prev,
            following: prev.following && false,
            followingSent:
              !prev.following && !prev.followingSent ? true : false,
            isFollowSending: true,
          }
        : {
            ...prev,
            userBlocked: !prev.userBlocked,
            isBlockSending: true,
          }
  );

  return (
    <div className='flex items-center gap-2 justify-between'>
      <form action={follow} className='w-full'>
        <button
          className='bg-blue-500 text-white text-sm font-medium rounded-md p-[6px] w-full disabled:bg-blue-300 disabled:cursor-not-allowed'
          disabled={optimisticState.isFollowSending}
        >
          {optimisticState.isFollowSending
            ? "ارسال..."
            : optimisticState.following
            ? "دنبال شده"
            : optimisticState.followingSent
            ? "درخواست شده"
            : "دنبال کردن"}
        </button>
      </form>
      <form action={block} className='w-full'>
        <button
          className='bg-red-500 text-white text-sm font-medium rounded-md p-[6px] w-full disabled:bg-red-300 disabled:cursor-not-allowed'
          disabled={optimisticState.isBlockSending}
        >
          {optimisticState.isBlockSending
            ? "ارسال..."
            : optimisticState.userBlocked
            ? "عدم مسدود"
            : "مسدود"}
        </button>
      </form>
    </div>
  );
};

export default UserInfoCardInteraction;
function res(): void {
  throw new Error("Function not implemented.");
}
