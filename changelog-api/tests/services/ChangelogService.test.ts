import ChangeLogService from "../../src/services/ChangeLogService";
import DiffChecker from "../../src/services/DiffCheckerService";

describe('testing changeLogService file', () => {
  test('field edited with subField', () => {

    const changeLogService = new ChangeLogService();

    const diff = new DiffChecker();

    var objOld = {
      release : {
        pattern: '\[w*]'
      }
    };

    var objCurrente = {
      release : {
        pattern: '/[w/W/s]*'
      }
    };

    let changes = diff.getChangeDiff(objOld, objCurrente);

    let result = changeLogService.getChangeLog(changes);
    expect(result[0].changeLogs[0].description).toBe("'pattern' alterado;");
    expect(result[0].changeLogs[0].currentValue).toBe("/[w/W/s]*");
    expect(result[0].changeLogs[0].oldValue).toBe("\[w*]");
    expect(result[0].changeLogs[0].path).toBe('release');
  });


  
  test('field added with subField', () => {

    const changeLogService = new ChangeLogService();

    const diff = new DiffChecker();

    var objOld = {
      release : {
        pattern: '\[w*]'
      }
    };

    var objCurrente = {
      release : {
        pattern: '\[w*]',
        maxItem: 2
      }
    };

    let changes = diff.getChangeDiff(objOld, objCurrente);

    let result = changeLogService.getChangeLog(changes);

    expect(result[0].changeLogs[0].description).toBe("'maxItem' adicionado;");
    expect(result[0].changeLogs[0].currentValue).toBe(2);
    expect(result[0].changeLogs[0].oldValue).toBe(undefined);
    expect(result[0].changeLogs[0].path).toBe('release');
  });

  test('field added with subField and 2 adjustments ', () => {

    const changeLogService = new ChangeLogService();

    const diff = new DiffChecker();

    var objOld = {
      release : {
        pattern: '\[w*]',
        maxItem:2,
        minItem:5
      },
      fee:{
        feeAmount:{
          pattern: '\[d*]',
        },
        feeCurrent:{
          pattern: '\[w*]',
        }
      }
    };

    var objCurrente = {
      release : {
        pattern: '\[w*]#',
        maxItem: 3
      },
      fee:{
        feeAmount:{
          pattern: '\[d*]',
          maxItem:1
        },
        feeCurrent:{
          pattern: '\[G*]',
        }
      }
    };

    let changes = diff.getChangeDiff(objOld, objCurrente);

    let result = changeLogService.getChangeLog(changes);

    expect(result.length).toBe(3);
  });
  
});