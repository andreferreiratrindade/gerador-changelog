
import SwaggerPreparationDataService from "../../src/services/SwaggerPreparationDataService";

describe('testing yamlToObjectJsonService file', () => {
  test('read yaml from file', () => {

    let obj = {campo1: 123, cammpo2:123, components: 222 };

    expect(obj.components).toBe(222);


    let result = SwaggerPreparationDataService.Prepare(obj);
    expect(result.components).toBe(undefined);


  });
});