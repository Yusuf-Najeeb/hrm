import React from 'react'
import CurrentPlanCard from '../../pages/account-settings/billing/CurrentPlanCard'
import BillingAddressCard from 'src/views/pages/account-settings/billing/BillingAddressCard'
import UserViewBilling from './BillingAddress'

const Billing = () => {
  return (
    <div>
      <CurrentPlanCard />
      <UserViewBilling />
    </div>
  )
}

export default Billing
