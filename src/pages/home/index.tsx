// **
import axios from 'axios'
import { useEffect, useState } from 'react'
import { DBCUsersType } from 'src/types/apps/userTypes'
import { ApproveEntry } from 'src/model'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import MostSalesInCountries from 'src/views/home/MostSalesInCountries'
import ApproveEntryTable from 'src/views/home/ApproveEntryTable'

interface props {
  token: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.query
  if (code) {
    // return {
    //   redirect: {
    //     destination: '/',
    //     permanent: false,
    //   },
    // }
    const token = await axios
      .post('http://localhost:4000/getToken', {
        "code": `${code}`
      })
      .then(response => {
        if (response.data.header.HeaderStatus === 200) {
          return response.data.body.access_token;
        }
      })
      .catch((error) => {

      })


    return {
      props: { token }, // will be passed to the page component as props
    }
  } else {
    return {
      props: {}// will be passed to the page component as props
    }
  }
}

const Home = ({ token }: props) => {
  const [isApproveEntry, setApproveEntry] = useState<null | ApproveEntry[]>(null)
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    const storedToken: DBCUsersType = JSON.parse(window.localStorage.getItem('DBC')!)
    const company: string = window.localStorage.getItem('company')!
    axios
      .post('https://eteapi.sapware.net/approveEntry', {
        "user": `${storedToken.user}`,
        "pass": `${storedToken.pass}`,
        "companyName": `${company}`
      })
      .then(response => {
        setApproveEntry(response.data.body)
        setError(false)
      })
      .catch((error) => {
        setError(true)
        console.log(error);
      })
    if (token) {
      window.localStorage.setItem('authToken', token)
      axios
        .post('http://localhost:4000/approveEntry', {
          filter: `senderID eq 'NANTARWATH.KO' and documentType eq 'Order'&$expand=headers,lines`
        }, {
          headers: {
            "x-access-token": `${token}`
          }
        })
        .then(response => {
          console.log(response.data.body);
        })
        .catch((error) => {
        })
    }
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
