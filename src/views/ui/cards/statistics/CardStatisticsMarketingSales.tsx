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

//** Type 
import Jobdetail from 'src/types/apps/ApproveEntryTypes'

// NEW++
// ** MUI Imports
import Avatar from '@mui/material/Avatar'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
// NEW--

interface SwiperData {
  img: string
  title: string
  details: { [key: string]: string }
}

interface props {
  rows: Jobdetail[]
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

const data2: DataType[] = [
  {
    imgWidth: 22,
    imgHeight: 22,
    chipText: '$6,500',
    title: '3D Illustration',
    imgAlt: '3d-illustration',
    subtitle: 'Blender Illustration',
    src: '/images/cards/3d-illustration.png'
  },
  {
    imgWidth: 33,
    imgHeight: 22,
    chipText: '$4,290',
    subtitle: 'Figma UI Kit',
    title: 'Finance App Design',
    imgAlt: 'finance-app-design',
    src: '/images/cards/finance-app-design.png'
  },
  {
    imgWidth: 20,
    imgHeight: 22,
    title: '4 Square',
    imgAlt: '4-square',
    chipText: '$44,500',
    subtitle: 'Android Application',
    src: '/images/cards/4-square.png'
  },
  {
    imgWidth: 19,
    imgHeight: 22,
    chipText: '$12,690',
    title: 'Delta Web App',
    imgAlt: 'delta-web-app',
    subtitle: 'React Dashboard',
    src: '/images/cards/delta-web-app.png'
  },
  {
    imgWidth: 23,
    imgHeight: 22,
    chipText: '$10,850',
    subtitle: 'Vue + Laravel',
    title: 'eCommerce Website',
    imgAlt: 'ecommerce-website',
    src: '/images/cards/ecommerce-website.png'
  }
]
// NEW --

const Slides = () => {
  return (
    <>
      {data.map((slide: SwiperData, index: number) => {
        return (
          <Box key={index} className='keen-slider__slide'>
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
                Budget
              </Typography>
            </Box>
            {data2.map((item: DataType, index: number) => {
              return (
                <Box
                  key={item.title}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: index !== data.length - 1 ? 5.5 : undefined
                  }}
                >
                  <Avatar variant='rounded' sx={{ mr: 3, width: 50, height: 42, backgroundColor: 'background.default' }}>
                    <img alt='avatar' src={item.src} width={item.imgWidth} height={item.imgHeight} />
                  </Avatar>
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
                        {item.title}
                      </Typography>
                      <Typography variant='caption'>{item.subtitle}</Typography>
                    </Box>
                    <CustomChip
                      skin='light'
                      size='small'
                      color='primary'
                      label={item.chipText}
                      sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                    />
                  </Box>
                </Box>
              )
            })}
            {/* <Box sx={{ mb: 4.5, display: 'flex', alignItems: 'center' }}>
              <Box component='img' src={slide.img} alt={slide.title} sx={{ mr: 5, width: 84, borderRadius: 1 }} />
              <Box sx={{ width: '100%' }}>
                <Typography sx={{ mb: 2.5, fontWeight: 600 }}>{slide.title}</Typography>
                <Grid container spacing={2.5}>
                  {Object.keys(slide.details).map((key: string, index: number) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomAvatar
                          skin='light'
                          color='secondary'
                          variant='rounded'
                          sx={{
                            mr: 1.5,
                            width: 36,
                            height: 24,
                            fontSize: '0.75rem',
                            borderRadius: '6px',
                            color: 'text.primary'
                          }}
                        >
                          {slide.details[key]}
                        </CustomAvatar>
                        <Typography variant='caption'>{key}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
            <div>
              <Button size='small' sx={{ mr: 3.5 }} variant='outlined'>
                Details
              </Button>
              <Button size='small' variant='contained'>
                Report
              </Button>
            </div> */}
          </Box>
        )
      })}
    </>
  )
} //test BANK

const CardStatisticsMarketingSales = ({ rows }: props) => {
  // ** States
  const [loaded, setLoaded] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

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
        title='Marketing & Sales'
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
        <Box ref={sliderRef} className='keen-slider'>
          <Slides />
        </Box>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', paddingTop: 5 }}>
          <Typography sx={{ mr: 4 }} variant='h5'>
            62%
          </Typography>
          <Typography variant='body2'>Your sales performance is 35% 😎 better compared to last month</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardStatisticsMarketingSales
