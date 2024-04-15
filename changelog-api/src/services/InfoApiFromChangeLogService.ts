import InfoApisComparatorDTO from "../dtos/InfoApisComparatorDTO";
import ResultInfoChangeDTO from "../dtos/ResultInfoChangeDTO";

export default class InfoApiFromChangeLogService {
    constructor() {
    }

    public static  getInformationAboutApis(objOld: any, objCurrent: any, urlOld: string, urlCurrent: string): ResultInfoChangeDTO {

       
        let info : ResultInfoChangeDTO = {
            currentApi : this.CreateInfoApisComparator(objCurrent, urlCurrent),
            oldApi : this.CreateInfoApisComparator(objOld, urlOld)
        } 
        
        return info;
    }

    private static  CreateInfoApisComparator(obj : any, url: string) : InfoApisComparatorDTO{
        let info : InfoApisComparatorDTO = 
        {
            version: obj.info.version, 
            url: url, 
            apiName : "api_version"
        }

        return info;
    }

}