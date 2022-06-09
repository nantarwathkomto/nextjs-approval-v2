// {"header":{"HeaderStatus":200,"HeaderMessage":"success"},"body":[]}
export class MessageResponeBody {
    header = new Header
    body = new Object
}
export class Header {
    HeaderStatus!: number
    HeaderMessage!: string
}