// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import Circle from 'mdi-material-ui/Circle'
import StarOutline from 'mdi-material-ui/StarOutline'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { ApproveEntryType } from 'src/types/apps/ApproveEntryTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

interface Props {
    data: ApproveEntryType
}

interface ColorsType {
    [key: string]: ThemeColor
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
    top: '0.2rem',
    left: '-0.6rem',
    position: 'absolute',
    color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
    fontWeight: 400,
    fontSize: '.875rem',
    lineHeight: '1.25rem',
    alignSelf: 'flex-end'
})

const roleColors: ColorsType = {
    admin: 'error',
    editor: 'info',
    author: 'warning',
    maintainer: 'success',
    subscriber: 'primary'
}

const statusColors: ColorsType = {
    active: 'success',
    pending: 'warning',
    inactive: 'secondary'
}

const TrophyImg = styled('img')(({ theme }) => ({
    right: 0,
    bottom: 0,
    width: 106,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
        width: 95
    }
}))

const DocumentViewCenter = ({ data }: Props) => {
    // ** States
    const [openEdit, setOpenEdit] = useState<boolean>(false)

    // Handle Edit dialog
    const handleEditClickOpen = () => setOpenEdit(true)
    const handleEditClose = () => setOpenEdit(false)


    if (data) {
        return (
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card sx={{ position: 'relative' }}>
                        {/* <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Typography variant='h6' sx={{ mb: 4 }}>
                                {data.documentNo}
                            </Typography>
                            <CustomChip
                                skin='light'
                                size='small'
                                label={data.documentType}
                                color={roleColors[data.documentType]}
                                sx={{
                                    borderRadius: '4px',
                                    fontSize: '0.875rem',
                                    textTransform: 'capitalize',
                                    '& .MuiChip-label': { mt: -0.25 }
                                }}
                            />
                        </CardContent>

                        <CardContent sx={{ my: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
                                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                                        <Check />
                                    </CustomAvatar>
                                    <Box>
                                        <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                                            1.23k
                                        </Typography>
                                        <Typography variant='body2'>Task Done</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                                        <StarOutline />
                                    </CustomAvatar>
                                    <Box>
                                        <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                                            568
                                        </Typography>
                                        <Typography variant='body2'>Project Done</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent> */}

                        <CardContent>
                            <Typography variant='h6'>Details</Typography>
                            <Divider sx={{ mt: 4 }} />
                            <Box sx={{ pt: 2, pb: 1 }}>
                                <Box sx={{ display: 'flex', mb: 2.7 }}>
                                    <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                                        Request Name:
                                    </Typography>
                                    <Typography variant='body2'>@{data.approverName}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 2.7 }}>
                                    <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                                        Description:
                                    </Typography>
                                    <Typography variant='body2'>{data.detail}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 2.7 }}>
                                    <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                                        Status:
                                    </Typography>
                                    <CustomChip
                                        skin='light'
                                        size='small'
                                        label={data.status}
                                        color={statusColors[data.status]}
                                        sx={{
                                            height: 20,
                                            fontSize: '0.75rem',
                                            fontWeight: 500,
                                            borderRadius: '5px',
                                            textTransform: 'capitalize'
                                        }}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', mb: 2.7 }}>
                                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Document Type:</Typography>
                                    <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                                        {data.documentType}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 2.7 }}>
                                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Date:</Typography>
                                    <Typography variant='body2'>{data.dueDate}</Typography>
                                </Box>
                                {/*<Box sx={{ display: 'flex', mb: 2.7 }}>
                                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Contact:</Typography>
                                    <Typography variant='body2'>+1 {data.dueDate}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', mb: 2.7 }}>
                                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Language:</Typography>
                                    <Typography variant='body2'>English</Typography>
                                </Box> */}
                                <Box sx={{ display: 'flex' }}>
                                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Company Name:</Typography>
                                    <Typography variant='body2'>{data.companyName}</Typography>
                                </Box>
                            </Box>
                        </CardContent>

                        <CardActions sx={{ display: 'flex', justifyContent: 'start' }}>
                            <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                                อนุมัติเอกสาร
                            </Button>
                            <Button color='error' variant='outlined'>
                                ไม่อนุมัติ
                            </Button>
                        </CardActions>

                        <Dialog
                            open={openEdit}
                            onClose={handleEditClose}
                            aria-labelledby='user-view-plans'
                            aria-describedby='user-view-plans-description'
                            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, pt: 8, pb: 8 } }}
                        >
                            <DialogTitle id='user-view-plans' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                                ยืนยันการอนุมัติเอกสาร
                            </DialogTitle>

                            <DialogContent>
                                <DialogContentText variant='body2' sx={{ textAlign: 'center' }} id='user-view-plans-description'>
                                    เลือกคนที่อนุมัติแทน
                                </DialogContentText>
                            </DialogContent>

                            <DialogContent
                                sx={{
                                    display: 'flex',
                                    pb: 8,
                                    pl: [6, 15],
                                    pr: [6, 15],
                                    alignItems: 'center',
                                    flexWrap: ['wrap', 'nowrap'],
                                    pt: theme => `${theme.spacing(2)} !important`
                                }}
                            >
                                <FormControl fullWidth size='small' sx={{ mr: [0, 3], mb: [3, 0] }}>
                                    <InputLabel id='user-view-plans-select-label'>ผู้อนุมัติแทน</InputLabel>
                                    <Select
                                        label='Choose Plan'
                                        defaultValue='Standard'
                                        id='user-view-plans-select'
                                        labelId='user-view-plans-select-label'
                                    >
                                        <MenuItem value='Basic'>นันทวัฒน์ คำโท</MenuItem>
                                        <MenuItem value='Standard'>นันทวัฒน์ คำโท 2</MenuItem>
                                        <MenuItem value='Enterprise'>นันทวัฒน์ คำโท 3</MenuItem>
                                        <MenuItem value='Company'>นันทวัฒน์ คำโท 4</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button variant='contained' sx={{ minWidth: ['100%', 0] }}>
                                    ยืนยัน
                                </Button>
                            </DialogContent>

                            <Divider sx={{ m: 0 }} />

                            {/* <DialogContent sx={{ pt: 8, pl: [6, 15], pr: [6, 15] }}>
                                <Typography sx={{ fontWeight: 500, mb: 2, fontSize: '0.875rem' }}>
                                    User current plan is standard plan
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: ['wrap', 'nowrap'],
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <Box sx={{ mr: 3, display: 'flex', ml: 2.4, position: 'relative' }}>
                                        <Sup>$</Sup>
                                        <Typography
                                            variant='h3'
                                            sx={{
                                                mb: -1.2,
                                                lineHeight: 1,
                                                color: 'primary.main',
                                                fontSize: '3rem !important'
                                            }}
                                        >
                                            99
                                        </Typography>
                                        <Sub>/ month</Sub>
                                    </Box>
                                    <Button color='error' variant='outlined' sx={{ mt: 2 }}>
                                        Cancel Subscription
                                    </Button>
                                </Box>
                            </DialogContent> */}
                        </Dialog>
                        <TrophyImg alt='trophy' src='/images/cards/trophy.png' />
                    </Card>
                </Grid>
            </Grid>
        )
    } else {
        return null
    }
}

export default DocumentViewCenter
