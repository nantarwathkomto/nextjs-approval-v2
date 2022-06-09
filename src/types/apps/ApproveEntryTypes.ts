

export class ApproveEntryType {
    approver!: string;
    approverName!: string;
    requester!: string;
    requesterName!: string;
    documentNo!: string;
    documentType!: string;
    amount!: number;
    dueDate!: string;
    detail!: string;
    status!: string;
    entryNo!: number;
    instanceId!: string;
    companyName!: string;
    companyNameTH!: string;
    dateTimeToSent!: Date;
    lastDateModified!: Date;
    steps!: Step[];
    jobdetail!: Jobdetail[];
    greet() {
        return "Hello";
    }
}

class Step {
    approver!: string;
    approverName!: string;
    requester!: string;
    requesterName!: string;
    documentNo!: string;
    documentType!: string;
    amount!: number;
    dueDate!: string;
    detail!: string;
    status!: string;
    squenecNo!: number;
    entryNo!: number;
    companyName!: string;
    companyNameTH!: string;
    dateTimeToSent!: Date;
    lastDateModified!: Date;
}

export default class Jobdetail {
    JobTaskNo!: string;
    LineType!: string;
    LineNo!: number;
    PlanningDate!: string;
    Type!: string;
    No!: string;
    Description!: string;
    Quantity!: number;
    UnitCost!: number;
    UnitPrice!: number;
    TotalPrice!: number;
}

class ApproveEvent {
    public calTotalPrice(jobdetail: Jobdetail[]): number {
        return jobdetail.reduce((a, b) => a + (b['TotalPrice'] || 0), 0);
    }
}