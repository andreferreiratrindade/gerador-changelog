import TemplateDescriptionDTO from "src/dtos/TemplateDescriptionDTO";
import { TypeChange } from "../constants/Constant";
import ChangeDTO from "../dtos/ChangeDTO";

export default class CustomDescriptionChangeLogService {
  public static REQUIRED_TEXT: string = "required";

  public static addCustomChangeDescription(
    change: ChangeDTO,
    templateDescription?: TemplateDescriptionDTO
  ): string {
    const { field, valueCurrent, valueOld } = change;

    let description: string = "";

    let { templateAdded, templateEdited, templateRemoved, templateRequired } =
      templateDescription || {};

    templateAdded = this.replaceTemplateField(templateAdded, change);
    templateEdited = this.replaceTemplateField(templateEdited, change);
    templateRemoved = this.replaceTemplateField(templateRemoved, change);

    switch (change.typeChange) {
      case TypeChange.added:
        description = templateAdded || `'${field}' adicionado;`;

        if (
          valueCurrent == this.REQUIRED_TEXT ||
          valueOld == this.REQUIRED_TEXT
        ) {
          description = `Adicionado obrigatóriedade no campo '${field}'`;
        }
        break;
      case TypeChange.removed:
        description = templateRemoved || `'${field}' removido;`;

        if (
          valueCurrent == this.REQUIRED_TEXT ||
          valueOld == this.REQUIRED_TEXT
        ) {
          description = `Removido obrigatóriedade no campo '${field}'`;
        }

        break;
      case TypeChange.edited:
        description = templateEdited || `'${field}' alterado;`;
        break;
    }

    return description;
  }

  public static getChangeTypeDescription(
    changeTypeDescription: TypeChange
  ): string {
    let type = "";
    switch (changeTypeDescription) {
      case TypeChange.added:
        type = "Adição";
        break;
      case TypeChange.removed:
        type = "Remoção";
        break;
      case TypeChange.edited:
        type = "Alteração";
        break;
    }

    return type;
  }


  private static replaceTemplateField(
    template: string | undefined,
    change: ChangeDTO
  ): string | undefined {
    return template?.replace("${field}", `${change.field}`);
  }
}
