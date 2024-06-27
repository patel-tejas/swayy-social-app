import React, { Suspense } from 'react'
import FriendRequests from './rightmenu/FriendRequests'
import Birthdays from './rightmenu/Birthdays'
import Ad from './Ad'
import UserInfoCard from './rightmenu/UserInfoCard'
import UserMediaCard from './rightmenu/UserMediaCard'
import { User } from '@prisma/client'

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className='flex flex-col gap-6'>
      {user ? (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequests />
      <Birthdays />
      <Ad size='md' />
    </div>
  )
}

export default RightMenu