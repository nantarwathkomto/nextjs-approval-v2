import axios from "axios";
import { ApproveEntry } from "src/model";
import { MessageResponeBody } from "src/model/message/MessageRespone";

export class ERPService {
    constructor() {

    }
    public async GetApproveEntryAndDetailByDocumentId(user: string, pass: string, documentId: string): Promise<MessageResponeBody> {
        const respone = await axios.post('https://eteapi.sapware.net/approveEntryAndDetailByDocumentId', {
            "user": `${user}`,
            "pass": `${pass}`,
            "documentId": `${documentId}`
        });
        return respone.data as MessageResponeBody;
    }
    public async ApproveDocumentByEntryNo(user: string, pass: string, entryNo: number, company: string): Promise<MessageResponeBody> {
        const respone = await axios.post(`https://eteapi.sapware.net/approveDocument`, {
            "user": `${user}`,
            "pass": `${pass}`,
            "companyName": `${company}`,
            "entryNo": `${entryNo}`
        });
        console.log(respone.data)
        return respone.data as MessageResponeBody;
    }
}