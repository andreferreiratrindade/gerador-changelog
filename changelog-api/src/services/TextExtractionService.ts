
export default class TextExtractionService {

    private static ALTERACAO_REALIZACAO_FORA_DO_ENDPOINT : string = "Alterações realizadas fora do endpoint";
    private static TEXT_PATH : string =  "paths";
    private static TEXT_ENDPOINT_CHANGED : string =  "Endpoint";

    
    public static changesMadeInsideTheEndpoint(path:string[]){
        return path[0] == this.TEXT_PATH;
    }

    public static changeCorrectEndpoint(path:string[]){
        if(!this.changesMadeInsideTheEndpoint(path)){
            path.unshift(this.ALTERACAO_REALIZACAO_FORA_DO_ENDPOINT);
        }

        return path;
    }

    public static getEndPoint(path:string[]): string{
        let endpoint : string = ""
        if(this.changesMadeInsideTheEndpoint(path) && path.length > 1){
            endpoint = this.formatEndpoint(path.join('/'));
        }else{
            endpoint = this.ALTERACAO_REALIZACAO_FORA_DO_ENDPOINT
        }

       return endpoint;
    }

    private static formatEndpoint(path: string): string {
        const verbsHttp: string[] = ['get', 'post', 'patch', 'put', 'delete']; // format per verb
        path = path.replace(`${this.TEXT_PATH}/`, "");
        for (const verb of verbsHttp) {
            if (path.includes(verb)) {
                path = path.split(verb)[0];
                break;
            }
        }

        return path; // case not found return himself
    }
}