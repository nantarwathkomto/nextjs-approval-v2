// ** Icon imports
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CartOutline from 'mdi-material-ui/CartOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ChartTimelineVariant from 'mdi-material-ui/ChartTimelineVariant'

// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => {
  return [
    {
      icon: HomeOutline,
      title: 'Dashboards',
      children: [
        {
          icon: ChartDonut,
          title: 'Home',
          path: '/home'
        },
        {
          icon: ChartTimelineVariant,
          title: 'Document',
          path: '/document'
        }
      ]
    }
  ]
}

export default navigation
