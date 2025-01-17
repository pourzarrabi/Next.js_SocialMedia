import Image from "next/image";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import { auth } from "@clerk/nextjs/server";
import PostInfo from "./PostInfo";
import ImageModal from "./ImageModal";

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & { _count: { comments: number } };

const Post = async ({ post }: { post: FeedPostType }) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) return null;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt=''
            className='w-10 h-10 rounded-full'
            width={40}
            height={40}
          />
          <span className='font-medium'>
            {post.user.firstName && post.user.lastName
              ? post.user.firstName + " " + post.user.lastName
              : post.user.username}
          </span>
        </div>
        {currentUserId === post.user.id && <PostInfo postId={post.id} />}
      </div>
      <div className='flex flex-col gap-4'>
        {post.img && <ImageModal imgSrc={post.img} />}
        <p>{post.desc}</p>
      </div>
      <PostInteraction
        currentUserId={currentUserId}
        postId={post.id}
        likes={post.likes.map((like) => like.userId)}
        commentNum={post._count.comments}
      />
      <Comments postId={post.id} currentUserId={currentUserId} />
    </div>
  );
};

export default Post;
