import AddPost from '@/components/AddPost'
import Feed from '@/components/Feed'
import LeftMenu from '@/components/LeftMenu'
import RightMenu from '@/components/RightMenu'
import Stories from '@/components/Stories'
import prisma from '@/lib/client'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import React from 'react'

const page = async ({ params }: { params: { username: string } }) => {
  const user = await prisma.user.findFirst({
    where: {
      username: params.username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true
        }
      }
    }
  })

  // console.log(user);

  const { userId: currentUserId } = auth();
  let isBlocked;

  if (currentUserId && user) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId
      }
    })

    if (res) {
      isBlocked = true
    }

  }else{
    isBlocked = false
  }

  if (!user || isBlocked) {
    {
      return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
          <h1 className='text-3xl font-bold'>Oops ! User not found</h1>
        </div>
      )
    }
  }

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src={user.cover ||"/noCover.avif"}
                alt=""
                fill
                className="rounded-md object-cover"
              />
              <Image
                src={user.avatar || "noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {user.name}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  )
}

export default page