import ChangeLogRequestDTO from "../../src/dtos/ChangeLogRequestDTO";
import request from 'supertest';
import app from '../../index';
import ChangeLogViewOutputDTO from "../../src/dtos/ChangeLogViewOutputDTO";
import TemplateDescriptionDTO from '../../src/dtos/TemplateDescriptionDTO';

describe('POST /change-log/generate-change-log', () => {

    let requestChangeLog = new ChangeLogRequestDTO();
    requestChangeLog.urlOld = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/1.0.2.yml";
    requestChangeLog.urlCurrent = "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/2.0.0.yml";

    test('returns status code 200 if works properly', async () => {
  
      const response = await request(app).post('/change-log/generate-change-log').send(requestChangeLog);
  
      expect(response.statusCode).toEqual(200);
    });

    test('works properly with template added request', async () => {

        const templateDescription = new TemplateDescriptionDTO();
        templateDescription.templateAdded = 'test ok ${field}';

        requestChangeLog.templateDescription = templateDescription;
  
        const response = await request(app).post('/change-log/generate-change-log').send(requestChangeLog);
        
        const changesLog: ChangeLogViewOutputDTO[] = response.body.obj.changesLog;
        
        const changeLogSpecific: ChangeLogViewOutputDTO | undefined = changesLog.find(log => {
            return log.endpoint === 'resources/' && log.field === 'pagination-key'
        });

        expect(changeLogSpecific?.description).toBe('test ok pagination-key')
    });
});