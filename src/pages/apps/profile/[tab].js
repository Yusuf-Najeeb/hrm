import React from 'react'
import ProfileTabs from '../../../views/users/profile/ProfileTabs'

const Profile = ({ tab }) => {
  return <ProfileTabs tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'account' } },
      { params: { tab: 'security' } },
      { params: { tab: 'billing' } },
      { params: { tab: 'notification' } },
      { params: { tab: 'connection' } }
    ],
    fallback: 'account'
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
