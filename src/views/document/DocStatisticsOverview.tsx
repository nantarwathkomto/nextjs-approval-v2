// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Components
import clsx from 'clsx'
import { useKeenSlider } from 'keen-slider/react'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// NEW++
// ** MUI Imports
import Avatar from '@mui/material/Avatar'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

// ** Type
import Jobdetail from 'src/types/apps/ApproveEntryTypes'
// NEW--

interface props {
  data3: Jobdetail[]
}

interface SwiperData {
  img: string
  title: string
  details: { [key: string]: string }
}

const data: SwiperData[] = [
  {
    title: 'Marketing Expense',
    img: '/images/cards/marketing-expense-logo.png',
    details: {
      Operating: '5k',
      Financial: '2k',
      COGF: '6k',
      Expense: '1k'
    }
  },
  {
    title: 'Accounting',
    img: '/images/cards/accounting-logo.png',
    details: {
      Billing: '18',
      Sales: '28',
      Leads: '30',
      Impression: '80'
    }
  },
  {
    title: 'Sales Overview',
    img: '/images/cards/sales-overview-logo.png',
    details: {
      Open: '68',
      Converted: '52',
      Lost: '04',
      Quotations: '12'
    }
  }
]

// NEW ++
interface DataType {
  src: string
  title: string
  imgAlt: string
  subtitle: string
  chipText: string
  imgWidth: number
  imgHeight: number
}

const currencyFormatter = new Intl.NumberFormat('th', {
  style: 'currency',
  currency: 'THB',
});

// NEW --

const Slides = ({ data3 }: props) => {
  return (
    <>
      {data.map((slide: SwiperData, index: number) => {
        return (
          <Box key={index} className='keen-slider__slide' height={200}>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                sx={{
                  lineHeight: 2,
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  letterSpacing: '0.17px',
                  textTransform: 'uppercase'
                }}
              >
                Name
              </Typography>
              <Typography
                sx={{
                  lineHeight: 2,
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  letterSpacing: '0.17px',
                  textTransform: 'uppercase'
                }}
              >
                Amount
              </Typography>
            </Box>
            {data3.map((item: Jobdetail, index: number) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 5.5
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                      <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                        {item.Description}
                      </Typography>
                      <Typography variant='caption'>{item.JobTaskNo}</Typography>
                    </Box>
                    <CustomChip
                      skin='light'
                      size='small'
                      color='primary'
                      label={currencyFormatter.format(item.UnitCost)}
                      sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                    />
                  </Box>
                </Box>
              )
            })}
          </Box>
        )
      })}
    </>
  )
}

const CardStatisticsMarketingSales = ({ data3 }: props) => {
  // ** States
  const [loaded, setLoaded] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  console.log(data3);


  // ** Hook
  const theme = useTheme()
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    rtl: theme.direction === 'rtl',
    slides: {
      spacing: 16
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  })

  return (
    <Card>
      <CardHeader
        title='TOP Value Amount'
        titleTypographyProps={{ variant: 'h6' }}
        sx={{ '& .swiper-dots': { mt: 0.75, mr: -1.75 } }}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='caption' sx={{ mr: 1.5 }}>
              Total 245.8k Sales
            </Typography>
            <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
              +25%
            </Typography>
            <ChevronUp fontSize='small' sx={{ color: 'success.main' }} />
          </Box>
        }
        action={
          loaded &&
          instanceRef.current && (
            <Box className='swiper-dots'>
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map(idx => {
                return (
                  <Badge
                    key={idx}
                    variant='dot'
                    component='div'
                    className={clsx({
                      active: currentSlide === idx
                    })}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    sx={{
                      mr: theme => `${theme.spacing(2.5)} !important`,
                      '& .MuiBadge-dot': {
                        height: '6px !important',
                        width: '6px !important',
                        minWidth: '6px !important'
                      }
                    }}
                  ></Badge>
                )
              })}
            </Box>
          )
        }
      />
      <CardContent>
        <Box ref={sliderRef}
          className='keen-slider'
        >
          <Slides data3={data3} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardStatisticsMarketingSales
