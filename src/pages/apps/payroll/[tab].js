import React from 'react'
import PayrollTab from '../../../views/users/payroll/PayrollTab'


const UsersProducts = ({ tab }) => {
  return <PayrollTab tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'payroll' } },
      { params: { tab: 'deductions' } },
      { params: { tab: 'deductionCategories' } }
    ],
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

export default UsersProducts
