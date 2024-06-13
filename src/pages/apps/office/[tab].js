import React from 'react'
import OfficeTabs from '../../../views/users/office/OfficeTabs'

const Offices = ({ tab }) => {
  return <OfficeTabs tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [{ params: { tab: 'branches' } }, { params: { tab: 'departments' } }],
    fallback: 'branches'
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      tab: params?.tab
    }
  }
}

export default Offices
