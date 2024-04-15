import ChangeLogSeparatePerEndpointDTO from "./ChangeLogSeparatePerEndpointDTO";
import InfoApisComparatorDTO from "./InfoApisComparatorDTO";

export default class ResultInfoChangeDTO{
    public oldApi !: InfoApisComparatorDTO
    public currentApi !:  InfoApisComparatorDTO
    public changeLogPerEndPoint?: ChangeLogSeparatePerEndpointDTO[]
}