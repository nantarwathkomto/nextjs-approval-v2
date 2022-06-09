export interface Step {
    approver: string;
    approverName: string;
    requester: string;
    requesterName: string;
    documentNo: string;
    documentType: string;
    amount: number;
    dueDate: string;
    detail: string;
    status: string;
    squenecNo: number;
    entryNo: number;
    companyName: string;
    companyNameTH: string;
    dateTimeToSent: Date;
    lastDateModified: Date;
}

export interface ApproveEntry {
    approver: string;
    approverName: string;
    requester: string;
    requesterName: string;
    documentNo: string;
    documentType: string;
    amount: number;
    dueDate: string;
    detail: string;
    status: string;
    entryNo: number;
    instanceId: string;
    companyName: string;
    companyNameTH: string;
    dateTimeToSent: Date;
    lastDateModified: Date;
    steps: Step[];
}