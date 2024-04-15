import ChangeDTO from "./ChangeDTO"

export default class ChangeLogDTO {
    public change!: ChangeDTO;
    public description!: String;
    public currentValue?: String;
    public oldValue?: String
    public path!: string;
    public field!: string;
    public changeType!: string;
}