export default class SwaggerPreparationDataService {

  public static Prepare(obj: any): any {
    const objOldWithComponents = this.removeComponente(obj);

    return obj;
  }

  public static removeComponente(obj: any): any {
    delete obj.components;

    return obj;
  }
}