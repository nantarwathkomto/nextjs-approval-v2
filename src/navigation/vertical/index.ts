// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import ShieldOutline from 'mdi-material-ui/ShieldOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { CartOutline, ChartDonut, ChartTimelineVariant } from 'mdi-material-ui'

const navigation = (): VerticalNavItemsType => {
  return [
    // {
    //   title: 'Home',
    //   icon: HomeOutline,
    //   path: '/home'
    // },
    // {
    //   title: 'Second Page',
    //   icon: EmailOutline,
    //   path: '/second-page'
    // },
    // {
    //   title: 'Access Control',
    //   icon: ShieldOutline,
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page'
    // }
    {
      icon: HomeOutline,
      title: 'Dashboards',
      children: [
        {
          icon: ChartDonut,
          title: 'Home',
          path: '/crm'
        },
        {
          icon: ChartTimelineVariant,
          title: 'Document',
          path: '/document'
        },
        {
          icon: CartOutline,
          title: 'eCommerce',
          path: '/apps/user/list'
        }
      ]
    }
  ]
}

export default navigation
