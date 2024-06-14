import React, { useEffect } from 'react'
import ProfileTabs from '../../../views/users/profile/ProfileTabs'

import { useAppDispatch } from '../../../hooks'

const ProfileHome = () => {
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(fetchDepartments())

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return <ProfileTabs tab='account' />
}

export default ProfileHome
