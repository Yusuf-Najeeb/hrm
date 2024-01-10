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
      title: 'Staff & Payroll',
      icon: 'tabler:user-hexagon',
      path: '/apps/staff'
    },
    {
      title: 'New Staff',
      icon: 'wpf:add-user',
      path: '/apps/new-staff'
    },
    {
      title: 'Payroll',
      icon: 'wpf:add-user',
      path: '/apps/payroll'
    },
    {
      title: 'Duty-Roster',
      icon: 'tabler:address-book',
      path: '/apps/duty-roster'
    },

    {
      title: 'Leave Manager',
      icon: 'tabler:file',
      path: '/apps/Leave-Manager'
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
    {
      title: 'Permissions',
      icon: 'tabler:arrow-left-right',
      path: '/apps/permissions'
    },

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
