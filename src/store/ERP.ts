import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { MessageResponeBody } from 'src/model/message/MessageRespone'
import { ERPService } from 'src/service/ERPService'
import { ApproveEntry } from "src/model"

const eRPService = new ERPService();

const initialState = {
    body: <ApproveEntry[]>[],
    errorStatus: null,
    errorMessage: null
}

interface ReduxType {
    getState: any
    dispatch: Dispatch<any>
}

// ** Fetch Mails
export const fetchMails = createAsyncThunk('appErp/fetchApproveEntry', async (params: string) => {
    const approveEntry: MessageResponeBody = await eRPService.GetApproveEntryAndDetailByDocumentId('benz', 'P@ssw0rd@1', 'BOQ-202204012');
    return { ...approveEntry }
})

const erpSlice = createSlice({
    name: 'erp',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        // ** update the state.mails when the fetchMails action is fulfilled.
        builder.addCase(fetchMails.fulfilled, (state, action) => {
            state.body = action.payload.body as ApproveEntry[]
        })
    }
})

export default erpSlice.reducer