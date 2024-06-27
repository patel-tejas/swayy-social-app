import prisma from '@/lib/client';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import React from 'react'

const AddPost = () => {
  const {userId} = auth()
  
  const testAction = async (formData: FormData) => {
    "use server";
    const desc = formData.get('desc') as string;
    if (!userId) return;
    try {
      const res = await prisma.post.create({
        data :{
          desc: desc,
          userId: userId,
        }
      })
      // console.log(res);
      
    } catch (error) {
      
    }
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src={"/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className="flex-1">

        {/* TEXT INPUT */}
        <form action={testAction} className='flex gap-4'>
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            name="desc"
          // onChange={(e) => setDesc(e.target.value)}
          >

          </textarea>
          
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer self-end"
            />

            <button type="submit" className="text-blue-500 font-bold">Post</button>

        </form>
        
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">

          <div
            className="flex items-center gap-2 cursor-pointer"

          >
            <Image src="/addimage.png" alt="" width={20} height={20} />
            Photo
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost