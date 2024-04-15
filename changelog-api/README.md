# changeLogOpenAPI
This repository provides a useful tool to generate change logs from OpenAPI specifications.

The API does a deep comparison between two spec files to create a detailed  result that contains all the data needed to create the changelog.

It also provides a way to customize the change message returned by passing a custom message template in the request body.


## Setup project
```
npm install
```
### Running locally:
```
npx ts-node index.ts
```
## Execute the tests
```
npm test
```

## Generating changelog

```
POST /change-log/generate-change-log

Request payload example:
{
    "urlOld": "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/2.0.0.yml",
    "urlCurrent": "https://raw.githubusercontent.com/Sensedia/draft-openapi/main/swagger-apis/resources/2.0.1.yml",
    "templateDescription":{
        "templateAdded": "Adicionado ${field}",
        "templateEdited": "Alterado ${field}",
        "templateRemoved": "Removido ${field}",
        "templateRequired": "Alterado mandatoriedade"
    }
}
```

```
Response example:
{
    "obj": {
        "changesLog": [
            {
                "endpoint": "info",
                "field": "version",
                "description": "Alterado version",
                "currentValue": "2.0.1",
                "oldValue": "2.0.0",
                "path": ""
            }, 
            {...}
        ]
    }
}
```