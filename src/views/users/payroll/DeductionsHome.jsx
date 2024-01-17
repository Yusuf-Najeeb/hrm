import React from 'react'
import { getUserRole } from '../../../@core/utils/checkUserRole'
import DeductionsTable from './Deductions'
import DeductionsTableForNonAdminStaff from './DeductionsTableData'


const DeductionsHome = () => {

    const activeUser = getUserRole()

    if(activeUser?.role?.name == 'admin') {
  return <DeductionsTable />
    }  else {
    return <DeductionsTableForNonAdminStaff />
  }
}

export default DeductionsHome