import Image from 'next/image'
import React from 'react'

const Feed = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        {/* USER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={"/noAvatar.png"}
              width={40}
              height={40}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium">
              Tejas
            </span>
          </div>
          <div className="relative">
            <Image
              src="/more.png"
              width={16}
              height={16}
              alt=""

              className="cursor-pointer"
            />

          </div>
        </div>
        {/* DESC */}
        <div className="flex flex-col gap-4">

          <div className="w-full min-h-96 relative">
            <Image
              src={"https://plus.unsplash.com/premium_photo-1718146018251-1e59e5d6f2a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              fill
              className="object-cover rounded-md"
              alt=""
            />
          </div>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis possimus assumenda maxime, aspernatur perspiciatis ab, harum ipsum rem quia molestiae aperiam inventore quisquam earum sapiente?
          </p>
        </div>
        {/* INTERACTION */}
        <div className="flex items-center justify-between text-sm my-4">
          <div className="flex gap-8">
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
              <form >
                <button>
                  <Image
                    src={ "/liked.png"}
                    width={16}
                    height={16}
                    alt=""
                    className="cursor-pointer"
                  />
                </button>
              </form>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">
                123
                <span className="hidden md:inline"> Likes</span>
              </span>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
              <Image
                src="/comment.png"
                width={16}
                height={16}
                alt=""
                className="cursor-pointer"
              />
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">
                12<span className="hidden md:inline"> Comments</span>
              </span>
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
              <Image
                src="/share.png"
                width={16}
                height={16}
                alt=""
                className="cursor-pointer"
              />
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">
                <span className="hidden md:inline"> Share</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed