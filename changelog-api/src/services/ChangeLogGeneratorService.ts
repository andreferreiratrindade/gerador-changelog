import ChangeLogRequestDTO from "src/dtos/ChangeLogRequestDTO";
import VersionCompareService from "./VersionCompareService";
import ResultInfoChangeDTO from "src/dtos/ResultInfoChangeDTO";

export default class ChangeLogGeneratorService {
    private _versionCompareService: VersionCompareService;
    constructor() {
        this._versionCompareService = new VersionCompareService();
    }

    public async GenerateChangeLogWithUrlYaml(request: ChangeLogRequestDTO): Promise<ResultInfoChangeDTO> {
                

        let result = await this._versionCompareService.compare(request);
        
        return result;
    }  
}