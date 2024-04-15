import ChangeLogRequestDTO from "src/dtos/ChangeLogRequestDTO";
import ChangeLogService from "./ChangeLogService";
import DiffCheckerService from "./DiffCheckerService";
import SwaggerDereferencerService from "./SwaggerDereferencerService";
import SwaggerPreparationDataService from "./SwaggerPreparationDataService";
import InfoApiFromChangeLogService from "./InfoApiFromChangeLogService";
import TemplateDescriptionDTO from '../dtos/TemplateDescriptionDTO';
import ResultInfoChangeDTO from "../dtos/ResultInfoChangeDTO";
import { from } from "linq-to-typescript"
import ChangeLogSeparatePerEndpointDTO from "src/dtos/ChangeLogSeparatePerEndpointDTO";

export default class VersionCompareService {
    private _changeLogService: ChangeLogService;
    private _diffCheckerService: DiffCheckerService;

    constructor() {
        this._changeLogService = new ChangeLogService();
        this._diffCheckerService = new DiffCheckerService();
    }

    private  getChanges(objOld: any, objCurrent: any, templateDescription?: TemplateDescriptionDTO): ChangeLogSeparatePerEndpointDTO[]{

        let changes = this._diffCheckerService.getChangeDiff(objOld, objCurrent);

        let lst = from(changes)
        .orderBy(x => x.endpoint)
        .thenBy(x => x.path)
        .thenBy(x => x.field).toArray();

        let changeLogs = this._changeLogService.getChangeLog(lst, templateDescription);

        return from(changeLogs).orderBy(x=> x.endpoint).toArray();
    }

    public async compare(request: ChangeLogRequestDTO): Promise<ResultInfoChangeDTO> {
        const { urlOld, urlCurrent, templateDescription } = request;

        const taskObjOld = SwaggerDereferencerService.dereference(request.urlOld);

        const taskObjCurrent = SwaggerDereferencerService.dereference(request.urlCurrent);

        const [objOld, objCurrent] = await Promise.all([taskObjOld, taskObjCurrent]);
        
        let objOldWithComponents =   SwaggerPreparationDataService.Prepare(objOld);
        let objCurrentWithComponents =   SwaggerPreparationDataService.Prepare(objCurrent);

        let changesView =  this.getChanges(objOldWithComponents, objCurrentWithComponents, templateDescription);
        let result  = InfoApiFromChangeLogService.getInformationAboutApis(objOldWithComponents, objCurrentWithComponents, urlOld, urlCurrent   );
        result.changeLogPerEndPoint = changesView;
        return result;
    }

}