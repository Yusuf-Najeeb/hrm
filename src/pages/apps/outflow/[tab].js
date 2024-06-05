import React from 'react'
import OutflowTabs from '../../../views/users/outflow/OutflowTabs'

const Cashflow = ({ tab }) => {
  return <OutflowTabs tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [{ params: { tab: 'operating' } }, { params: { tab: 'Purchase' } }],
    fallback: 'operating'
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
