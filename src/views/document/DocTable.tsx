// ** React Import
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'


// ** Icons Imports
import Cog from 'mdi-material-ui/Cog'
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import Jobdetail from 'src/types/apps/ApproveEntryTypes'

// JobLedEntry

interface Props {
  row: Jobdetail[]
}

// interface TableBodyRowType {
//   LineNo: number
//   No: number
//   JobTaskNo: string
//   Description: string
//   LineType: string
//   PlanningDate: string
//   Quantity: number
//   TotalPrice: number
//   Type: string
//   UnitCost: string
//   UnitPrice: string
//   // avatarSrc?: string
//   // status: 'active' | 'pending' | 'inactive'
//   // role: 'admin' | 'editor' | 'author' | 'maintainer' | 'subscriber'
// }

interface CellType {
  row: Jobdetail
}

interface RoleObj {
  [key: string]: {
    icon: ReactElement
  }
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const roleObj: RoleObj = {
  admin: {
    icon: <Laptop sx={{ mr: 2, color: 'error.main' }} />
  },
  author: {
    icon: <Cog sx={{ mr: 2, color: 'warning.main' }} />
  },
  maintainer: {
    icon: <ChartDonut sx={{ mr: 2, color: 'success.main' }} />
  },
  editor: {
    icon: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />
  },
  subscriber: {
    icon: <AccountOutline sx={{ mr: 2, color: 'primary.main' }} />
  }
}

const statusObj: StatusObj = {
  active: { color: 'success' },
  pending: { color: 'warning' },
  inactive: { color: 'secondary' }
}

const currencyFormatter = new Intl.NumberFormat('th', {
  style: 'currency',
  currency: 'THB',
});

// const rows: TableBodyRowType[] = [
//   {
//     id: 1,
//     role: 'admin',
//     status: 'pending',
//     name: 'Jordan Stevenson',
//     username: '@jstevenson5c',
//     email: 'susanna.Lind57@gmail.com',
//     avatarSrc: '/images/avatars/1.png'
//   },
//   {
//     id: 2,
//     role: 'editor',
//     status: 'active',
//     name: 'Robert Crawford',
//     username: '@rcrawford1d',
//     avatarSrc: '/images/avatars/3.png',
//     email: 'estelle.Bailey10@gmail.com'
//   },
//   {
//     id: 3,
//     role: 'author',
//     status: 'inactive',
//     name: 'Lydia Reese',
//     username: '@lreese3b',
//     email: 'milo86@hotmail.com',
//     avatarSrc: '/images/avatars/2.png'
//   },
//   {
//     id: 4,
//     role: 'editor',
//     status: 'pending',
//     name: 'Richard Sims',
//     username: '@rsims6f',
//     email: 'lonnie35@hotmail.com',
//     avatarSrc: '/images/avatars/5.png'
//   },
//   {
//     id: 5,
//     status: 'active',
//     role: 'maintainer',
//     name: 'Lucile Young',
//     username: '@lyoung4a',
//     email: 'ahmad_Collins@yahoo.com',
//     avatarSrc: '/images/avatars/4.png'
//   },
//   {
//     id: 6,
//     role: 'editor',
//     status: 'pending',
//     name: 'Francis Frank',
//     username: '@ffrank7e',
//     avatarSrc: '/images/avatars/7.png',
//     email: 'tillman.Gleason68@hotmail.com'
//   },
//   {
//     id: 7,
//     role: 'subscriber',
//     status: 'inactive',
//     name: 'Phoebe Patterson',
//     email: 'otho21@gmail.com',
//     username: '@ppatterson2g',
//     avatarSrc: '/images/avatars/8.png'
//   },
//   {
//     id: 8,
//     status: 'active',
//     role: 'subscriber',
//     name: 'Curtis Underwood',
//     username: '@cunderwood8h',
//     avatarSrc: '/images/avatars/3.png',
//     email: 'florencio.Little@hotmail.com'
//   }
// ]

// const renderUserAvatar = (row: TableBodyRowType) => {
//   if (row.avatarSrc) {
//     return <CustomAvatar src={row.avatarSrc} sx={{ mr: 3, width: 34, height: 34 }} />
//   } else {
//     return (
//       <CustomAvatar skin='light' sx={{ mr: 3, width: 34, height: 34, fontSize: '.8rem' }}>
//         {getInitials(row.name ? row.name : 'John Doe')}
//       </CustomAvatar>
//     )
//   }
// }

const columns: GridColDef[] = [
  {
    flex: 0.25,
    field: 'JobTaskNo',
    minWidth: 200,
    headerName: 'Job Task No.',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderUserAvatar(row)} */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
              {row.JobTaskNo}
            </Typography>
            <Typography variant='caption' sx={{ lineHeight: 1.6667 }}>
              {row.Description}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.3,
    minWidth: 250,
    field: 'Type',
    headerName: 'Type',

  },
  {
    flex: 0.2,
    minWidth: 130,
    field: 'Quantity',
    headerName: 'Quantity',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{currencyFormatter.format(Number(row.Quantity))}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 130,
    field: 'UnitCost',
    headerName: 'Unit Cost',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{currencyFormatter.format(Number(row.UnitCost))}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 130,
    field: 'UnitPrice',
    headerName: 'Unit Price',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{currencyFormatter.format(Number(row.UnitPrice))}</Typography>
    // renderCell: ({ row }: CellType) => (
    //   <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //     {roleObj[row.role].icon}
    //     <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{row.role}</Typography>
    //   </Box>
    // )
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'TotalPrice',
    headerName: 'Total Price',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{currencyFormatter.format(Number(row.TotalPrice))}</Typography>

    // renderCell: ({ row }: CellType) => (
    //   <CustomChip
    //     skin='light'
    //     size='small'
    //     label={row.status}
    //     color={statusObj[row.status].color}
    //     sx={{ textTransform: 'capitalize', '& .MuiChip-label': { px: 2.5, lineHeight: 1.385 } }}
    //   />
    // )
  }
]

const DocTable = ({ row }: Props) => {
  return (
    <Card>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.id}
          hideFooter
          rows={row}
          columns={columns}
          disableSelectionOnClick
          pagination={undefined} />

      </div>
    </Card>
  )
}

export default DocTable
