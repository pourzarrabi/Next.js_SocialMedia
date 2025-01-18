"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type RequestWithUser = FollowRequest & {
  sender: User;
};

const FriendRequestList = ({ requests }: { requests: RequestWithUser[] }) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: number, userId: string) => {
    addOptimisticState(requestId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const decline = async (requestId: number, userId: string) => {
    addOptimisticState(requestId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticState, addOptimisticState] = useOptimistic(
    requestState,
    (prev, value: number) => prev.filter((req) => req.id !== value)
  );
  return (
    <>
      {optimisticState.map((req) => (
        <div className='flex items-center justify-between' key={req.id}>
          <div className='flex items-center gap-4'>
            <Image
              src={req.sender.avatar || "/noAvatar.png"}
              alt=''
              className='w-10 h-10 rounded-full object-cover'
              width={40}
              height={40}
            />
            <span className='font-medium text-sm'>
              {req.sender.firstName && req.sender.lastName
                ? req.sender.firstName + " " + req.sender.lastName
                : req.sender.username}
            </span>
          </div>
          <div className='flex justify-end gap-3'>
            <form action={() => accept(req.id, req.sender.id)}>
              <button>
                <Image
                  src='/accept.png'
                  alt=''
                  className='cursor-pointer'
                  width={20}
                  height={20}
                />
              </button>
            </form>
            <form action={() => decline(req.id, req.sender.id)}>
              <button>
                <Image
                  src='/reject.png'
                  alt=''
                  className='cursor-pointer'
                  width={20}
                  height={20}
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendRequestList;
