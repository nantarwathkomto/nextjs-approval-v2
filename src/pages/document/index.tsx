// ** React Import
import { useEffect, useState } from 'react';

// ** Demo Components Imports
import DocumentViewPage from 'src/views/document/DocumentViewPage'

// ** mui
import { Alert, Button, Grid, Typography } from '@mui/material';

const DocDashboard = () => {
    const [documentId, setDocumentId] = useState("");

    useEffect(() => {
        setDocumentId(localStorage.getItem("documentId")!);
    }, []);
    if (documentId)
        return <DocumentViewPage documentId={`${documentId}`} />
    else
        return (
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Alert severity='error'>
                        ดึงข้อมูลไม่ได้ Webservice ที่ business central 365 มีปัญหา
                        <Button size='small' variant='contained' color='error' href={'/home'}>
                            <Typography variant='button' color={'white'}>
                                กลับไปหน้าแรก
                            </Typography>
                        </Button>
                    </Alert>
                </Grid>
            </Grid>
        )
}
export default DocDashboard
