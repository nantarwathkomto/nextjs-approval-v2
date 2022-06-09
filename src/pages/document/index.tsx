// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports
import axios from 'axios'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import DocumentViewPage from 'src/views/document/DocumentViewPage'

const DocDashboard = () => {
    return <DocumentViewPage />
}
export default DocDashboard
