// import useMediaQuery from '@mui/material/useMediaQuery'

// // ** Layout Imports
// // !Do not remove this Layout import
// import Layout from 'src/@core/layouts/Layout'

// // ** Navigation Imports
// import VerticalNavItems from 'src/navigation/vertical'
// import HorizontalNavItems from 'src/navigation/horizontal'

// // ** Component Import
// // Uncomment the below line (according to the layout type) when using server-side menu
// // import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// // import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

// import VerticalAppBarContent from './components/vertical/AppBarContent'
// import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// // ** Hook Import
// import { useSettings } from 'src/@core/hooks/useSettings'

// const UserLayout = ({ children, contentHeightFixed }) => {
//   // ** Hooks
//   const { settings, saveSettings } = useSettings()

//   // ** Vars for server side navigation
//   // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
//   // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()
//   /**
//    *  The below variable will hide the current layout menu at given screen size.
//    *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
//    *  You can change the screen size from which you want to hide the current layout menu.
//    *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
//    *  to know more about what values can be passed to this hook.
//    *  ! Do not change this value unless you know what you are doing. It can break the template.
//    */
//   const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
//   if (hidden && settings.layout === 'horizontal') {
//     settings.layout = 'vertical'
//   }

//   return (
//     <Layout
//       hidden={hidden}
//       settings={settings}
//       saveSettings={saveSettings}
//       contentHeightFixed={contentHeightFixed}
//       verticalLayoutProps={{
//         navMenu: {
//           navItems: VerticalNavItems()

//           // Uncomment the below line when using server-side menu in vertical layout and comment the above line
//           // navItems: verticalMenuItems
//         },
//         appBar: {
//           content: props => (
//             <VerticalAppBarContent
//               hidden={hidden}
//               settings={settings}
//               saveSettings={saveSettings}
//               toggleNavVisibility={props.toggleNavVisibility}
//             />
//           )
//         }
//       }}
//       {...(settings.layout === 'horizontal' && {
//         horizontalLayoutProps: {
//           navMenu: {
//             navItems: HorizontalNavItems()

//             // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
//             // navItems: horizontalMenuItems
//           },
//           appBar: {
//             content: () => <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />
//           }
//         }
//       })}
//     >
//       {children}

//     </Layout>
//   )
// }

// export default UserLayout

// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'

// ** Component Import
import FallbackSpinner from '../@core/components/spinner'

// Uncomment the below line (according to the layout type) when using server-side menu
// import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
// import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'

import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { useAuthContext } from '../@core/hooks/useAuthContext'
import { useSelector } from 'react-redux'

// ** GetLoginStatus
import getLoginStatus from '../@core/utils/getLoginStatus'

const UserLayout = ({ children, contentHeightFixed }) => {
  // ** Hooks
  const { settings, saveSettings } = useSettings()

  // const { loading } = useAuthContext()
  const session = getLoginStatus()
  const loading = useSelector(state => state?.auth?.loading)

  // console.log(loading, 'loading user layout')

  // ** Vars for server side navigation
  // const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
  // const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return loading ? (
    <FallbackSpinner />
  ) : (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems()

          // Uncomment the below line when using server-side menu in vertical layout and comment the above line
          // navItems: verticalMenuItems
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems()

            // Uncomment the below line when using server-side menu in horizontal layout and comment the above line
            // navItems: horizontalMenuItems
          },
          appBar: {
            content: () => <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />
          }
        }
      })}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
