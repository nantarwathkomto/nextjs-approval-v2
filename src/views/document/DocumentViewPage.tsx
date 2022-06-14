// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Masonry from '@mui/lab/Masonry'

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
import { InvoiceType } from 'src/types/apps/invoiceTypes'
// import { UserLayoutType, UsersType } from 'src/types/apps/userTypes'
import { DBCUsersType, UserLayoutType } from 'src/types/apps/userTypes'
import { ApproveEntryType } from 'src/types/apps/ApproveEntryTypes'
import Jobdetail from 'src/types/apps/ApproveEntryTypes'

// View
import DocumentViewCenter from 'src/views/document/DocumentViewCenter'
import DocAward from './DocAward'
import DocTotalProfit from './DocTotalProfit'
import DocTotalGrowth from './DocTotalGrowth'
import DocOrganicSessions from './DocOrganicSessions'
import DocProjectTimeline from './DocProjectTimeline'
import DocWeeklyOverview from './DocWeeklyOverview'
import DocSocialNetworkVisits from './DocSocialNetworkVisits'
import DocMonthlyBudget from './DocMonthlyBudget'
import DocTable from './DocTable'
import DocExternalLinks from './DocExternalLinks'

const DocumentView = () => {

    // ** State
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<null | ApproveEntryType>(null)

    const currencyFormatter = new Intl.NumberFormat('th', {
        style: 'currency',
        currency: 'THB',
    });


    useEffect(() => {
        const storedToken: DBCUsersType = JSON.parse(window.localStorage.getItem('DBC')!)
        axios
            .post('https://eteapi.sapware.net/approveEntryAndDetailByDocumentId', {
                "user": `${storedToken.user}`,
                "pass": `${storedToken.pass}`,
                "documentId": `ETEM-MM-63/180`
                // "user": `benz`,
                // "pass": `P@ssw0rd@1`,
                // "documentId": `BOQR-202204018`
            })
            .then(response => {
                console.log(response.data.body);
                setData(response.data.body[0])
                setError(false)
            })
            .catch(() => {
                setData(null)
                setError(true)
            })
    }, [])

    if (data) {
        const calSumQuantity = currencyFormatter.format(data.jobdetail.reduce(function (a, b) { return a + b['Quantity']; }, 0));
        const calSumUnitCost = currencyFormatter.format(data.jobdetail.reduce(function (a, b) { return a + b['UnitCost']; }, 0));
        const calSumUnitPrice = currencyFormatter.format(data.jobdetail.reduce(function (a, b) { return a + b['UnitPrice']; }, 0));
        const calSumTotalPrice = currencyFormatter.format(data.jobdetail.reduce(function (a, b) { return a + b['TotalPrice']; }, 0));

        return (
            //     <CardStatisticsVertical
            //     stats={calSumUnitCost + ' บาท'}
            //     color='warning'
            //     trendNumber='+0%'
            //     icon={<CartPlus />}
            //     title='Total Cost'
            //     chipText='Last 1 Month'
            // />
            // <CardStatisticsVertical
            //     stats={calSumTotalPrice + ' บาท'}
            //     color='success'
            //     trendNumber='+0%'
            //     title='Total Price'
            //     icon={<CurrencyUsd />}
            //     chipText='Last 1 Month'
            // />
            // 
            // <DocTable row={data.jobdetail} />
            // <DocExternalLinks />
            // <DocumentViewCenter data={data} />
            <ApexChartWrapper>
                <Grid container
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={3}
                    className='match-height'>
                    <Grid item xs={12} md={6} >
                        <Grid container
                            justifyContent="center"
                            alignItems="flex-start"
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
                                <DocumentViewCenter data={data} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <DocExternalLinks />
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
