// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'
import { TableHead } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'


interface DataType {
  title: string
  sales: string
  trend: ReactNode
  trendNumber: string
}

const data: DataType[] = [
  {
    sales: '2',
    title: 'บริษัทที่ 1',
    trendNumber: '1',
    trend: <ChevronDown sx={{ color: 'error.main' }} />
  },
  {
    sales: '10',
    title: 'บริษัทที่ 2',
    trendNumber: '4',
    trend: <ChevronUp sx={{ color: 'success.main' }} />
  },
  {
    sales: '13',
    title: 'บริษัทที่ 3',
    trendNumber: '2',
    trend: <ChevronUp sx={{ color: 'success.main' }} />
  }
  // {
  //   sales: '899',
  //   title: 'US',
  //   trendNumber: '16%',
  //   trend: <ChevronDown sx={{ color: 'error.main' }} />
  // },
  // {
  //   sales: '43',
  //   title: 'Japan',
  //   trendNumber: '35%',
  //   trend: <ChevronUp sx={{ color: 'success.main' }} />
  // },
  // {
  //   sales: '18',
  //   title: 'Brazil',
  //   trendNumber: '12%',
  //   trend: <ChevronUp sx={{ color: 'success.main' }} />
  // }
]

const TrophyImg = styled('img')(({ theme }) => ({
  right: 10,
  top: 20,
  width: 240,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 190
  }
}))

const MostSalesInCountries = () => {
  return (
    <Card sx={{ position: 'relative' }}>
      <CardHeader
        title='เอกสารที่รอการอนุมัติ'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent sx={{ pb: theme => `${theme.spacing(1.75)} !important` }}>
        <Box sx={{ mb: 5, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 1.25, display: 'flex', alignItems: 'center' }}>
            <Typography variant='h3' sx={{ mr: 3.5 }}>
              25
            </Typography>
            {/* <CustomChip
              skin='light'
              size='small'
              label='+42%'
              color='success'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
            /> */}
          </Box>
          <Typography variant='caption'>วันจันทร์ที่ 14 มีนาคม 2565</Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontSize: '0.875rem' }}>ชื่อบริษัท</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ fontSize: '0.875rem' }}>จำนวนเอกสาร</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ fontSize: '0.875rem' }}>เอกสารวันนี้</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: DataType) => {
                return (
                  <TableRow
                    key={row.title}
                    sx={{
                      '&:last-of-type td': { border: 0, pb: 0 },
                      '&:first-of-type td': { borderTop: theme => `1px solid ${theme.palette.divider}` },
                      '& .MuiTableCell-root': {
                        '&:last-of-type': { pr: 0 },
                        '&:first-of-type': { pl: 0 },
                        py: theme => `${theme.spacing(2.75)} !important`
                      }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '0.875rem' }}>{row.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{row.sales}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography sx={{ mr: 1.5, fontWeight: 600, fontSize: '0.875rem' }}>
                          {row.trendNumber}
                        </Typography>
                        {row.trend}
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TrophyImg alt='trophy' src='/images/cards/illustration-daisy-light.png' />
      </CardContent>
    </Card>
  )
}

export default MostSalesInCountries
