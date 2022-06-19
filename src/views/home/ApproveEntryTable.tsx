// ** React Import
import { ReactElement, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Button } from '@mui/material'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { ApproveEntry } from 'src/model'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

interface props {
  row: ApproveEntry[]
}

interface TableBodyRowType {
  id: number
  name: string
  email: string
  username: string
  avatarSrc?: string
  status: 'active' | 'pending' | 'inactive'
  role: 'admin' | 'editor' | 'author' | 'maintainer' | 'subscriber'
}

interface CellType {
  row: ApproveEntry
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}


const statusObj: StatusObj = {
  Approved: { color: 'success' },
  Open: { color: 'warning' },
  Canceled: { color: 'secondary' },
  Reject: { color: 'info' }
}


const renderUserAvatar = (row: ApproveEntry) => {
  return (
    <CustomAvatar skin='light' sx={{ mr: 3, width: 34, height: 34, fontSize: '.8rem' }}>
      {getInitials(row.requester ? row.requester : 'John Doe')}
    </CustomAvatar>
  )
}

const getFullName = async (row: ApproveEntry) => {
  await window.localStorage.setItem('documentId', row.documentNo)
}
// toast(
//   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//       <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
//         {row.documentNo}
//       </Typography>
//     </Box>
//   </Box>
// )


const columns: GridColDef[] = [
  {
    flex: 0.125,
    minWidth: 140,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => {
      return (
        <Link href="/document">
          <Button size='small' variant='outlined' color='secondary' onClick={() => getFullName(row)}>
            Open
          </Button>
        </Link >
      )
    }
  },
  {
    flex: 0.25,
    field: 'requester',
    minWidth: 200,
    headerName: 'User',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderUserAvatar(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {row.requester}
            </Typography>
            <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
              {row.requesterName ? row.requesterName : "นางสาว ทางทอง สุขใจ"}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 250,
    field: 'documentNo',
    headerName: 'documentNo',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.documentNo}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 130,
    field: 'companyName',
    headerName: 'companyName',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.companyName}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => (
      <CustomChip
        skin='light'
        size='small'
        label={row.status}
        color={statusObj[row.status].color}
        sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
      />
    )
  }
]

const ApproveEntryTable = ({ row }: props) => {
  useEffect(() => {
    console.log(row);
  }, [])
  return (
    <Card>
      <div style={{ height: 450, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.entryNo}
          hideFooter
          rows={row}
          columns={columns}
          disableSelectionOnClick
          pagination={undefined}
        />
      </div>
    </Card>
  )
}

export default ApproveEntryTable
