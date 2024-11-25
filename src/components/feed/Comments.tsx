import prisma from "@/lib/client";
import CommentList from "./CommentList";

const Comments = async ({
  postId,
  currentUserId,
}: {
  postId: number;
  currentUserId: string;
}) => {
  const currentUser = await prisma.user.findFirst({
    where: {
      id: currentUserId,
    },
  });

  if (!currentUser) return null;

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <CommentList
      comments={comments}
      postId={postId}
      currentUserId={currentUserId}
      currentUser={currentUser}
    />
  );
};

export default Comments;
