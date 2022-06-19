// ** React Import
import { ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Type Import
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import Jobdetail from 'src/types/apps/ApproveEntryTypes'

interface DataType {
  title: string
  amount: number
  icon: ReactNode
  color: ThemeColor
  trendAmount: number
}

interface prop {
  rows: Jobdetail[]
}

const currencyFormatter = new Intl.NumberFormat('th', {
  style: 'currency',
  currency: 'THB',
});

// const data: DataType[] = [
//   {
//     amount: '$845k',
//     trendAmount: 82,
//     color: 'primary',
//     title: 'Google Analytics',
//     icon: <ChevronUp sx={{ color: 'success.main' }} />
//   }
// ]

// const series = [
//   {
//     name: 'Google Analytics',
//     data: [155, 135, 320, 100, 150, 335, 160]
//   },
//   {
//     name: 'Google Analytics',
//     data: [155, 135, 320, 100, 150, 335, 160]
//   }
// ]


const DocExternalLinks = ({ rows }: prop) => {
  const JobTasks = rows.filter((row) => {
    return (row.TotalPrice > 0 || row.UnitCost > 0 || row.UnitPrice > 0)
  })

  const dataTotalPrice = JobTasks.map((data) => {
    return data.TotalPrice
  })
  const dataUnitPrice = JobTasks.map((data) => {
    return data.UnitPrice
  })
  const dataUnitCost = JobTasks.map((data) => {
    return data.UnitCost
  })
  const labelJobTask = JobTasks.map((data) => {
    return (data.JobTaskNo + ':' + data.Description)
  })

  const SumDataTotalPrice = dataTotalPrice.reduce((partialSum, a) => partialSum + a, 0);
  const SumDataUnitPrice = dataUnitPrice.reduce((partialSum, a) => partialSum + a, 0);
  const SumDataUnitCost = dataUnitCost.reduce((partialSum, a) => partialSum + a, 0);


  const data: DataType[] = [
    {
      amount: SumDataTotalPrice,
      trendAmount: 82,
      color: 'primary',
      title: 'Total Price',
      icon: <ChevronUp sx={{ color: 'success.main' }} />
    },
    {
      amount: SumDataUnitPrice,
      trendAmount: 82,
      color: 'info',
      title: 'Unit Price',
      icon: <ChevronUp sx={{ color: 'success.main' }} />
    },
    {
      amount: SumDataUnitCost,
      trendAmount: 82,
      color: 'error',
      title: 'Unit Cost',
      icon: <ChevronUp sx={{ color: 'success.main' }} />
    }
  ]


  const series = [
    {
      name: 'Unit Price',
      data: [SumDataUnitPrice]
    },
    {
      name: 'Unit Cost',
      data: [SumDataUnitCost]
    },
    {
      name: 'Total Price',
      data: [SumDataTotalPrice]
    }
  ]

  // ** Hook
  const theme = useTheme()

  const options: ApexOptions = {
    chart: {
      offsetY: -9,
      offsetX: -16,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '35%',
        endingShape: 'rounded',
        startingShape: 'rounded',
        // colors: {
        //   ranges: [
        //     {
        //       from: 40,
        //       to: 50,
        //       color: hexToRGBA(theme.palette.primary.main, 1)
        //     }
        //   ]
        // }
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: ['Total Price', 'Unit Price', 'Unit Cost']
      // categories: labelJobTask
    },
    yaxis: {
      show: true,
      tickAmount: 3,
      labels: {
        // formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
        formatter: value => currencyFormatter.format(value)
      }
    },
    colors: [hexToRGBA(theme.palette.secondary.main, 1), hexToRGBA(theme.palette.error.dark, 1), hexToRGBA(theme.palette.primary.main, 1)],
    grid: {
      strokeDashArray: 10,
      padding: {
        top: 0,
        left: -4,
        right: -5,
        bottom: -14
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round',
      colors: [theme.palette.background.paper]
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      },
      {
        breakpoint: 430,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='External Links'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' series={series} options={options} />
      </CardContent>
      {/* <TableContainer sx={{ mb: 3.75 }}>
        <Table>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '& .MuiTableCell-root': { borderBottomWidth: 0, py: `${theme.spacing(1.125)} !important` } }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Circle sx={{ mr: 2.25, fontSize: '0.75rem', color: `${theme.palette[item.color].main}` }} />
                    <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
                      {item.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant='body2'>{item.amount}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography
                      variant='body2'
                      sx={{ mr: 2.5, fontWeight: 600, color: 'text.primary' }}
                    >{`${item.trendAmount}%`}</Typography>
                    {item.icon}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Card>
  )
}

export default DocExternalLinks
