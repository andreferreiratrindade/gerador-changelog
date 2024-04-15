
export default class FormattingChangeService {

    public formatValueAsString(value: any): String {
        if (typeof value == "object" || !value) {
            return ""
        }
        return value.toString();
    }

    public replaceWord(text: string): string {
        let lstReplace = this.wordsForRemove();
        lstReplace.forEach(x => {
            text = text.split(x.from).join(x.to);
        })
        return text
    }

    public wordsForRemove(): any[] {
        let lst: any[] = [
            { from: "content/application/json; charset=utf-8", to: "" },
            { from: "application/json/", to: "" },
            { from: "paths/", to: "" },
            { from: "/content", to: "" },
            { from: "/schema", to: "" },
            { from: "properties/", to: "" },
            { from: "application/jwt/", to: "" },
            { from: "//", to: "/" },
        ]

        return lst;
    }
}