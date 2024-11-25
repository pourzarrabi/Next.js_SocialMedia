import { User } from "@prisma/client";
import Ad from "../Ad";
import FriendRequests from "./FriendRequests";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import { Suspense } from "react";
import Birthdays from "./Birthdays";

const LeftMenu = ({ user }: { user?: User }) => {
  return (
    <div className='flex flex-col gap-6'>
      {user ? (
        <>
          <Suspense fallback='بارگیری...'>
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback='بارگیری...'>
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      <Birthdays />
      <Ad size='md' />
    </div>
  );
};

export default LeftMenu;
