import { TypeChange } from "src/constants/Constant"

export default class ChangeLogViewOutputDTO {
    public endpoint!: String
    public field!: String
    public description!: String
    public oldValue?: String
    public currentValue?: String
    public path!: String
    public changeType!: string;
    public changeTypeEnum!: TypeChange;
}