import React from 'react'
import OffBoarding from '../../../views/users/offBoarding/OffBoardingTab'
import CashflowTabs from '../../../views/users/cashflow/CashflowTabs'

const Cashflow = ({ tab }) => {
  return <CashflowTabs tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [{ params: { tab: 'inflow' } }, { params: { tab: 'outflow' } }],
    fallback: 'inflow'
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      tab: params?.tab
    }
  }
}

export default Cashflow
