import {APIGatewayEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import ChangeLogGeneratorService from './src/services/ChangeLogGeneratorService';
import HttpStatusCode from './src/constants/HttpStatusCode';
import { RetornoRequest } from './src/utils/retornoRequest';
/**
 * Follow the guide https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
 * @param event
 * @param context
 */
export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {

  let changeLogGeneratorService = new ChangeLogGeneratorService();
  try{
    
  let result = await changeLogGeneratorService.GenerateChangeLogWithUrlYaml(JSON.parse(event.body || ""));
  return {
    statusCode: 200,
    headers: getheards().headers,

    body: JSON.stringify(result),
  };
}catch(error){
  return {
    headers: getheards().headers,
    statusCode: 400,
    body: JSON.stringify(error),
  };
}
};

function getheards(){
  return { headers: {
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": process.env.AWS_CORS || "",
    "Access-Control-Allow-Methods": "POST"
}}
}
