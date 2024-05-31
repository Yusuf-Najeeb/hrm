const navigation = () => {
  return [
    {
      title: 'Dashboards',
      icon: 'tabler:smart-home',

      path: '/dashboards/analytics'
    },
    {
      sectionTitle: ' Staff MANAGER'
    },
    {
      title: 'Departments',
      icon: 'fluent-emoji-high-contrast:department-store',
      path: '/apps/departments'
    },
    {
      title: 'Staffs',
      icon: 'tabler:user-hexagon',
      path: '/apps/staffs'
    },

    // {
    //   title: 'New Staff',
    //   icon: 'wpf:add-user',
    //   path: '/apps/new-staff'
    // },
    {
      title: 'Payroll',
      icon: 'fluent:payment-16-regular',
      path: '/apps/payroll'
    },
    {
      title: 'Duty-Roster',
      icon: 'tabler:address-book',
      path: '/apps/dutyRoster'
    },
    {
      sectionTitle: 'Human Resource'
    },
    {
      title: 'Transfer',
      icon: 'tabler:transfer',
      path: '/apps/transfer'
    },
    {
      title: 'Leave',
      icon: 'fluent-mdl2:leave',
      path: '/apps/leaveManager'
    },
    {
      title: 'Query',
      icon: 'carbon:query',
      path: '/apps/query'
    },
    {
      title: 'Suspension',
      icon: 'fluent:clock-pause-20-regular',
      path: '/apps/suspension'
    },
    {
      title: 'Promotion',
      icon: 'carbon:upgrade',
      path: '/apps/promotion'
    },
    {
      title: 'Off-Boarding',
      icon: 'material-symbols-light:indeterminate-check-box-outline',
      path: '/apps/offboarding'
    },

    // {
    //   title: 'Attendence',
    //   icon: 'tabler:alarm-plus',
    //   path: '/apps/Attendence'
    // },

    {
      sectionTitle: 'Settings'
    },
    {
      title: 'Roles',
      icon: 'tabler:arrow-fork',
      path: '/apps/roles'
    },

    // {
    //   title: 'Permissions',
    //   icon: 'tabler:arrow-left-right',
    //   path: '/apps/permissions'
    // },

    // {
    //   title: 'Payments history',
    //   icon: 'tabler:accessible',
    //   path: '/apps/user/view/account'
    // },

    // {
    //   title: 'Security',
    //   icon: 'tabler:air-conditioning-disabled',
    //   path: '/apps/user/view/security'
    // },

    // {
    //   title: 'Billing & Plans',
    //   icon: 'tabler:air-balloon',
    //   path: '/apps/user/view/billing-plan'
    // },
    {
      title: 'Payslip Settings',
      icon: 'tabler:currency-dollar',
      path: '/apps/payslips'
    }
  ]
}

export default navigation
