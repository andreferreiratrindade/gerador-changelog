import ChangeLogViewOutputDTO from "./ChangeLogViewOutputDTO";

export default class ChangeLogSeparatePerEndpointDTO {
    endpoint!:string
    changeLogs: ChangeLogViewOutputDTO[] = []
}