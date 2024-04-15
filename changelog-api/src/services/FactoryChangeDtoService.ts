import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";
import TextExtractionService from "./TextExtractionService"
export default class  FactoryChangeDtoService{

    public static createEdited(field: string, valueOld:any, valueCurrent: any, path : string[]):ChangeDTO{
        let pathArray  = this.changePathWithEndpointCorrect(Object.assign([],path));


        const change : ChangeDTO =  {
            field : field,
            valueCurrent : valueCurrent, 
            valueOld : valueOld, 
            path : pathArray, 
            endpoint : TextExtractionService.getEndPoint(pathArray),
            typeChange : TypeChange.edited };


        return change;
}

    public static createAdded(field: string, value:any, path : string[]):ChangeDTO{
        let pathArray  = this.changePathWithEndpointCorrect(Object.assign([],path));

        const change : ChangeDTO =  {
            field : field,
            valueCurrent : value, 
            path : pathArray, 
            endpoint : TextExtractionService.getEndPoint(pathArray),
            typeChange : TypeChange.added };

        return change;
    }

    public  static createRemoved(field: string, value:any, path : string[]):ChangeDTO{
        let pathArray  = this.changePathWithEndpointCorrect(Object.assign([],path));

        const change : ChangeDTO =  {
            field : field,
            valueOld : value, 
            path : Object.assign([],path), 
            endpoint : TextExtractionService.getEndPoint(pathArray),
            typeChange : TypeChange.removed };

        return change;
    }

    private static changePathWithEndpointCorrect(path:string[]):string[]{
        let pathWithEndpointCorrect = TextExtractionService.changeCorrectEndpoint(path);

        return pathWithEndpointCorrect;
    }


}