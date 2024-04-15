export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface ChangeLogPostModel{
    urlOld : string;
    urlCurrent : string;
    templateDescription: ChangeLogPostTemplateDescriptionModel;
    typeModel: number;
}

export interface ChangeLogPostTemplateDescriptionModel{
  templateAdded : string;
  templateEdited : string;
  templateRemoved : string;
  templateRequired: string;
}

export interface EndpointChangeLogListModel{

  endpoint: string;
  changes : ChangeLogListModel[];
}


export interface ChangeLogListModel{
  currentValue: string;
  description: string;
  endpoint: string;
  field: string;
  oldValue: string;
  path: string;
  changeType: string;
  changeTypeEnum : number // 1 - Adicionado /  2 - Alterado // 3 - Removido /
}

export interface InfoApiChangeLogModel{
  oldApi : InfoApisComparatorModel;
  currentApi :  InfoApisComparatorModel;
  changeLogPerEndPoint : ChangeLogPerEndPoint[];
}
 export interface ChangeLogPerEndPoint{
  endpoint : string,
  changeLogs : ChangeLogListModel[],
  countAdded: number, 
  countRemoved: number, 
  countEdited: number
 }

export interface InfoApisComparatorModel{
   version : string;
   url : string;
   apiName : string;
}
