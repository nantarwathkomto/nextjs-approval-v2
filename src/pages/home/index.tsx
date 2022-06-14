// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Icon Imports
import CartPlus from 'mdi-material-ui/CartPlus'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'

// ** Custom Component Import
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import MostSalesInCountries from 'src/views/home/MostSalesInCountries'
import ApproveEntryTable from 'src/views/home/ApproveEntryTable'


// **
import axios from 'axios'
import { useEffect, useState } from 'react'
import { DBCUsersType } from 'src/types/apps/userTypes'
import { ApproveEntry } from 'src/model'

const Home = () => {
  const [isApproveEntry, setApproveEntry] = useState<null | ApproveEntry[]>(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const storedToken: DBCUsersType = JSON.parse(window.localStorage.getItem('DBC')!)
    axios
      .post('https://eteapi.sapware.net/approveEntry', {
        "user": `${storedToken.user}`,
        "pass": `${storedToken.pass}`
      })
      .then(response => {
        setApproveEntry(response.data.body)
        setError(false)
      })
      .catch((error) => {
        setError(true)
        console.log(error);
      })


  }, [])
  if (isApproveEntry) {
    return (
      <ApexChartWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={4}>
            <MostSalesInCountries />
          </Grid>
          <Grid item xs={12} md={8}>
            <ApproveEntryTable row={isApproveEntry} />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    )
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='error'>
            ดึงข้อมูลไม่ได้ Webservice ที่ business central 365 มีปัญหา
          </Alert>
        </Grid>
      </Grid>
    )
  }
  else {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity='warning'>
            กำลังดึงข้อมูลจาก business central 365
          </Alert>
        </Grid>
      </Grid>
    )
  }
}

export default Home
