import TemplateDescriptionDTO from "./TemplateDescriptionDTO";

export default class ChangeLogRequestDTO {
    public urlOld!: string;
    public urlCurrent!: string;
    public templateDescription?: TemplateDescriptionDTO;
}