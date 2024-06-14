import React from 'react'
import ProfileTabs from '../../../views/users/profile/ProfileTabs'

const Profile = ({ tab }) => {
  return <ProfileTabs tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [{ params: { tab: 'profile' } }, { params: { tab: 'password' } }],
    fallback: 'profile'
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      tab: params?.tab
    }
  }
}

export default Profile
