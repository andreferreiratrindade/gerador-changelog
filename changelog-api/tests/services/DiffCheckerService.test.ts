import DiffChecker from "../../src/services/DiffCheckerService";

describe('testing diffCheckers file', () => {
  test('field edited', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1'
    };

    var objCurrente = {
      campo: 'teste2'
    };
    let result = diff.getChangeDiff(objOld, objCurrente);

    expect(result[0].valueCurrent).toBe('teste2');
    expect(result[0].valueOld).toBe('teste1');
    expect(result[0].path.length).toBe(0);

  });

  test('field Added', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1'
    };

    var objCurrente = {
      campo: 'teste1',
      nome: 'andre'
    };
    let result = diff.getChangeDiff(objOld, objCurrente);

    expect(result[0].valueCurrent).toBe('andre');
    expect(result[0].valueOld).toBe(undefined);
    expect(result[0].path.length).toBe(0);

  });

  test('field removed', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1',
      amount: 123
    };

    var objCurrente = {
      campo: 'teste1'
    };
    let result = diff.getChangeDiff(objOld, objCurrente);

    expect(result[0].valueCurrent).toBe(undefined);
    expect(result[0].valueOld).toBe(123);
    expect(result[0].path.length).toBe(0);
  });

  test('field edited with subField', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1',
      fee: {
        feeName: 'saque coberto'
      }
    };



    var objCurrente = {
      campo: 'teste1',
      fee: {
        feeName: 'saque a descoberto'
      }
    };
    let result = diff.getChangeDiff(objOld, objCurrente);
    expect(result[0].valueOld).toBe('saque coberto');
    expect(result[0].valueCurrent).toBe('saque a descoberto');
    expect(result[0].path[0]).toBe('fee');
  });

  test('field removed with subField', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1',
      fee: {
        feeAmount: 12.33,
        feeName: 'saque coberto'
      }
    };



    var objCurrente = {
      campo: 'teste1',
      fee: {
        feeName: 'saque coberto'
      }
    };
    let result = diff.getChangeDiff(objOld, objCurrente);
    expect(result[0].valueOld).toBe(12.33);
    expect(result[0].valueCurrent).toBe(undefined);
    expect(result[0].path[0]).toBe('fee');
  });

  test('field added with subField', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1',
      fee: {
        feeName: 'saque coberto'
      }
    };



    var objCurrente = {
      campo: 'teste1',
      fee: {
        feeAmount: 12.33,
        feeName: 'saque coberto'
      }
    };
    let result = diff.getChangeDiff(objOld, objCurrente);
    expect(result[0].valueOld).toBe(undefined);
    expect(result[0].valueCurrent).toBe(12.33);
    expect(result[0].path[0]).toBe('fee');
  });

  test('field added with array', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1',
      fee: [{
        feeName: 'saque coberto'
      }]
    };



    var objCurrente = {
      campo: 'teste1',
      fee: [{
        feeAmount: 12.33,
        feeName: 'saque coberto'
      }]
    };
    let result = diff.getChangeDiff(objOld, objCurrente);
    expect(result[0].valueOld).toBe(undefined);
    expect(result[0].valueCurrent).toBe(12.33);
    expect(result[0].path[0]).toBe('fee');
  });

  test('field edited with array', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1',
      fee: [{
        feeAmount: 12.33,
        feeName: 'saque coberto'
      }]
    };



    var objCurrente = {
      campo: 'teste1',
      fee: [{
        feeAmount: 12.33,
        feeName: 'saque a desberto'
      }]
    };
    let result = diff.getChangeDiff(objOld, objCurrente);
    expect(result[0].valueOld).toBe("saque coberto");
    expect(result[0].valueCurrent).toBe("saque a desberto");
    expect(result[0].path[0]).toBe('fee');
  });


  test('field edited with array and more path', () => {

    const diff = new DiffChecker();

    var objOld = {
      fee: [{
        feeAmount: 12.33,
        feeName: 'saque coberto'
      }],
      component: {
        name: "andre",
        address:
        {
          number: 2
        }
      }
    };



    var objCurrente = {
      fee: [{
        feeAmount: 12.33,
        feeName: 'saque coberto'
      }],
      component: {
        name: "andre",
        address:
        {
          number: 3
        }
      }
    };
    let result = diff.getChangeDiff(objOld, objCurrente);
    expect(result[0].path[0]).toBe('component');
    expect(result[0].path[1]).toBe('address');
  });

  test('field removed with array', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1',
      release: {
        fee: [{
          feeAmount: 12.33,
          feeName: 'saque coberto'
        }]
      }
    };

    var objCurrente = {
      campo: 'teste1',
      release: {
        fee: [{
          feeName: 'saque a desberto'
        }]
      }
    };
    let result = diff.getChangeDiff(objOld, objCurrente);
    expect(result[0].valueOld).toBe(12.33);
    expect(result[0].valueCurrent).toBe(undefined);
    expect(result[0].path[0]).toBe('release');
    expect(result[0].path[1]).toBe('fee');
  });


  test('field added item string in array', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1',
      release: {
        fee: [
          "teste1",
          "teste2"
        ]
      }
    };

    var objCurrente = {
      campo: 'teste1',
      release: {
        fee: [
          "teste1",
          "teste2",
          "teste3"
        ]
      }
    };
    let result = diff.getChangeDiff(objOld, objCurrente);
    expect(result[0].valueOld).toBe(undefined);
    expect(result[0].valueCurrent).toBe("fee");
    expect(result[0].path[0]).toBe('release');
    expect(result[0].path[1]).toBe('fee');
  });

  test('field removed item string in array', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1',
      release: {
        fee: [
          "teste1",
          "teste2",
          "teste3"
        ]
      }
    };

    var objCurrente = {
      campo: 'teste1',
      release: {
        fee: [
          "teste1",
          "teste2"
        ]
      }
    };
    let result = diff.getChangeDiff(objOld, objCurrente);
    expect(result[0].valueOld).toBe("fee");
    expect(result[0].valueCurrent).toBe(undefined);
    expect(result[0].path[0]).toBe('release');
    expect(result[0].path[1]).toBe('fee');
  });
  test('field edited item string in array', () => {

    const diff = new DiffChecker();

    var objOld = {
      campo: 'teste1',
      release: {
        fee: [
          "teste1",
          "teste2",
          "teste3"
        ]
      }
    };

    var objCurrente = {
      campo: 'teste1',
      release: {
        fee: [
          "teste1",
          "teste2",
          "teste4"
        ]
      }
    };
    let result = diff.getChangeDiff(objOld, objCurrente);
    let itemAdded = result[0]
    let itemRemoved = result[1]
    expect(itemAdded.valueOld).toBe(undefined);
    expect(itemAdded.typeChange).toBe(1);
    expect(itemAdded.valueCurrent).toBe("fee");
    expect(itemAdded.field).toBe("teste4");
    expect(itemAdded.path[0]).toBe('release');
    expect(itemAdded.path[1]).toBe('fee');

    expect(itemRemoved.valueOld).toBe("fee");
    expect(itemRemoved.field).toBe("teste3");
    expect(itemRemoved.typeChange).toBe(3);
    expect(itemRemoved.valueCurrent).toBe(undefined);
    expect(itemRemoved.path[0]).toBe('release');
    expect(itemRemoved.path[1]).toBe('fee');
  });


  // test('field edited item string in array', () => {

  //   const diff = new DiffChecker();

  //   let changes : ChangeDTO[] = [{
  //      path: ["path/contratoId/get/shema/meta/totalRecords"] ,
  //      typeChange : 1,
  //      field : "string" ,
  //      valueOld :"string",
  //      valueCurrent :"string"
  // }]

  //   let result = diff.groupFieldChangeDiff(changes);
  //   let itemAdded = result[0]
  //   let itemRemoved = result[1]
  //   expect(itemAdded.valueOld).toBe(undefined);
  //   expect(itemAdded.valueCurrent).toBe("teste4");
  //   expect(itemAdded.path[0]).toBe('release');
  //   expect(itemAdded.path[1]).toBe('fee');

  //   expect(itemRemoved.valueOld).toBe("teste3");
  //   expect(itemRemoved.valueCurrent).toBe(undefined);
  //   expect(itemRemoved.path[0]).toBe('release');
  //   expect(itemRemoved.path[1]).toBe('fee');
  // });
});