import TemplateDescriptionDTO from "src/dtos/TemplateDescriptionDTO";
import ChangeDTO from "../dtos/ChangeDTO";
import ChangeLogSeparatePerEndpointDTO from "../dtos/ChangeLogSeparatePerEndpointDTO";
import CustomDescriptionChangeLogService from "./CustomDescriptionChangeLogService";
import ChangeLogViewOutputDTO from "src/dtos/ChangeLogViewOutputDTO";
import FormattingChangeService from "./FormattingChangeService";
import { TypeChange } from "../constants/Constant"


export default class ChangeLogService {

    public readonly ALTERACAO_REALIZACAO_FORA_DO_ENDPOINT : string = "Alterações realizadas fora do endpoint";
    private _formattingChangeService: FormattingChangeService;


    /**
     *
     */
    constructor() {
        this._formattingChangeService = new FormattingChangeService();

    }
    private createChangeLog(change: ChangeDTO, templateDescription?: TemplateDescriptionDTO): ChangeLogViewOutputDTO {

        let description = CustomDescriptionChangeLogService.addCustomChangeDescription(change, templateDescription);
        let changeTypeText = CustomDescriptionChangeLogService.getChangeTypeDescription(change.typeChange)

        let endpoint = change.endpoint || "";
        let pathJoin = change.path.join('/')
        let changeLogViewOutputDto: ChangeLogViewOutputDTO = {
            endpoint: this._formattingChangeService.replaceWord(endpoint),
            field: this._formattingChangeService.replaceWord(change.field),
            description: description,
            currentValue: this._formattingChangeService.formatValueAsString(change.valueCurrent),
            oldValue: this._formattingChangeService.formatValueAsString(change.valueOld ),
            path: this._formattingChangeService.replaceWord(pathJoin.replace(endpoint, "")),
            changeType : changeTypeText,
            changeTypeEnum: change.typeChange
        };

        return changeLogViewOutputDto
    }

    public getChangeLog(changes: ChangeDTO[], templateDescription?: TemplateDescriptionDTO): ChangeLogSeparatePerEndpointDTO[] {
        const changeLogViewOutputMap = new Map<string, ChangeLogViewOutputDTO[]>();
        changes.forEach(change => {
            const changeLogview = this.createChangeLog(change, templateDescription);
            const endpoint = changeLogview.endpoint.toString();
    
            if (!changeLogViewOutputMap.has(endpoint)) {
                changeLogViewOutputMap.set(endpoint, []);
            }

            changeLogViewOutputMap.get(endpoint)!.push(changeLogview);
        });
        
        return Array.from(changeLogViewOutputMap.entries()).map(([endpoint, changeLogs]) => ({
            endpoint,
            changeLogs
        }));
    }
}