import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const region = "ap-northeast-1";
const TableName = "dynamo-test";
const ddbClient = new DynamoDBClient({ region });

export const getAllItemsHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
  }

  const params = {
    TableName,
    Key: {
      userId: "2",
      timestamp: "0109",
    },
  };

  try {
    const data = await ddbClient.send(new GetCommand(params));
    console.log("DynamoDBからのレスポンス:", data);
    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
      isBase64Encoded: false,
    };
    return response;
  } catch (err) {
    console.log("エラー：", err);
  }
};
