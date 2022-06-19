// ** React Imports
import { useState, useEffect } from 'react'

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

// ** Third Party Components
import axios from 'axios'

// ** Types
import { DBCUsersType } from 'src/types/apps/userTypes'
import { ApproveEntryType } from 'src/types/apps/ApproveEntryTypes'
import { UserDBC } from 'src/types/apps/UserDBCType'

// View
import DocumentViewCenter from 'src/views/document/DocumentViewCenter'
import DocProjectTimeline from './DocProjectTimeline'
import DocWeeklyOverview from './DocWeeklyOverview'
import DocSocialNetworkVisits from './DocSocialNetworkVisits'
import DocTable from './DocTable'
import DocExternalLinks from './DocExternalLinks'

const currencyFormatter = new Intl.NumberFormat('th', {
    style: 'currency',
    currency: 'THB',
});

interface prop {
    documentId: string
}

const DocumentView = ({ documentId }: prop) => {

    // ** State
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<null | ApproveEntryType>(null)
    const [user, setUser] = useState<null | UserDBC[]>(null)

    useEffect(() => {
        const storedToken: DBCUsersType = JSON.parse(window.localStorage.getItem('DBC')!)
        const company: string = window.localStorage.getItem('company')!

        axios
            .post('https://eteapi.sapware.net/approveEntryAndDetailByDocumentId', {
                "user": `${storedToken.user}`,
                "pass": `${storedToken.pass}`,
                "documentId": `${documentId}`,
                "companyName": `${company}`
            })
            .then(response => {
                if (response.data.header.HeaderStatus === 200) {
                    setData(response.data.body[0])
                    setError(false)
                } else {
                    setData(null)
                    setError(true)
                }
            })
            .catch(() => {
                setData(null)
                setError(true)
            })
        axios
            .post('https://eteapi.sapware.net/getAllUserByCompany', {
                "user": `${storedToken.user}`,
                "pass": `${storedToken.pass}`,
                "companyName": `${company}`
            })
            .then(response => {
                if (response.data.header.HeaderStatus === 200) {
                    setUser(response.data.body)
                    setError(false)
                } else {
                    setUser(null)
                    setError(true)
                }
            })
            .catch(() => {
                setUser(null)
                setError(true)
            })
    }, [])

    if (data && user) {
        const calSumQuantity = currencyFormatter.format(data.jobdetail.reduce(function (a, b) { return a + b['Quantity']; }, 0));
        const calSumUnitCost = currencyFormatter.format(data.jobdetail.reduce(function (a, b) { return a + b['UnitCost']; }, 0));
        const calSumUnitPrice = currencyFormatter.format(data.jobdetail.reduce(function (a, b) { return a + b['UnitPrice']; }, 0));
        const calSumTotalPrice = currencyFormatter.format(data.jobdetail.reduce(function (a, b) { return a + b['TotalPrice']; }, 0));

        return (
            <ApexChartWrapper>
                <Grid container
                    justifyContent="center"
                    spacing={3}
                    alignItems="stretch"
                    className='match-height'>
                    <Grid item xs={12} md={3}>
                        <DocSocialNetworkVisits data2={data.steps} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <DocWeeklyOverview />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DocProjectTimeline />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Grid container
                            justifyContent="center"
                            spacing={3}
                            className='match-height'>
                            <Grid item xs={12}>
                                <Grid container
                                    direction="row"
                                    spacing={3}
                                    className='match-height'>
                                    <Grid item xs={6}>
                                        <CardStatisticsVertical
                                            stats={calSumUnitCost + ' บาท'}
                                            color='warning'
                                            trendNumber='+0%'
                                            icon={<CartPlus />}
                                            title='Total Cost'
                                            chipText='Last 1 Month'
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CardStatisticsVertical
                                            stats={calSumTotalPrice + ' บาท'}
                                            color='success'
                                            trendNumber='+0%'
                                            title='Total Price'
                                            icon={<CurrencyUsd />}
                                            chipText='Last 1 Month'
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <DocumentViewCenter data={data} user={user} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <DocExternalLinks rows={data.jobdetail} />
                    </Grid>
                    <Grid item xs={12}>
                        <DocTable row={data.jobdetail} />
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
    } else {
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

export default DocumentView
