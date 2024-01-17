import React from 'react'
import { getUserRole } from '../../../@core/utils/checkUserRole'
import PayslipTable from './Payslips'
import PayslipTableForNonAdmin from './PayslipTableForNonAdmin'


const PayslipsHome = () => {

    const activeUser = getUserRole()

    if(activeUser?.role?.name == 'admin') {
  return <PayslipTable />
    }  else {
    return <PayslipTableForNonAdmin />
  }
}

export default PayslipsHome