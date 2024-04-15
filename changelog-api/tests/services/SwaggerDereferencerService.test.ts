import SwaggerDereferencerService from "../../src/services/SwaggerDereferencerService";
import ChangeLogRequestDTO from "../../src/dtos/ChangeLogRequestDTO";

describe('testing dereferenced file generation', () => {

  let requestChangeLog = new ChangeLogRequestDTO();
  requestChangeLog.urlOld = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/1.0.2.yml";
  requestChangeLog.urlCurrent = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/2.0.0.yml";

  test('should dereference the spec', async () => {
    let objResult = await SwaggerDereferencerService.dereference("https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/2.0.0.yml")
    let objString = JSON.stringify(objResult);
    expect(objString.search(/(\$ref)/g)).toBe(-1)
  })
})