import React from 'react'
import OffBoarding from '../../../views/users/offBoarding/OffBoardingTab'

const OffBoard = ({ tab }) => {
  return <OffBoarding tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [{ params: { tab: 'retirement' } }, { params: { tab: 'termination' } }],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      tab: params?.tab
    }
  }
}

export default Payroll
