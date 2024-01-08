// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import auth from 'src/store/apps/auth'
import salaryItems from 'src/store/apps/salaryItems'
import departments from 'src/store/apps/departments'
import staffs from 'src/store/apps/staffs'
import roles from 'src/store/apps/roles'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    auth,
    salaryItems,
    departments,
    staffs,
    roles
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
