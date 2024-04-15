import { TypeChange } from "../constants/Constant"

export default class ChangeDTO{
    public path!: string[] 
    public typeChange!: TypeChange
    public field !: string 
    public valueOld ?:string
    public valueCurrent ?:string
    public endpoint?:string
}