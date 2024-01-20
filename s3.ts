import {SQSClient, SendMessageCommand, GetQueueUrlCommand} from '@aws-sdk/client-sqs';
const client = new SQSClient({region: 'eu-central-1'});

export const getQueueUrlByName = async (queueName: string): Promise<string> => {
  const command = new GetQueueUrlCommand({QueueName: queueName});
  const response = await client.send(command);
  console.log('getQueueUrlByName', response);
  if (!response.QueueUrl) {
    throw new Error(`SQS Queue ${queueName} not exist!`);
  }
  return response.QueueUrl;
}

export const sendMessage = async (queueName: string, body: Record<string, unknown>, ) => {
  const queueUrl = await getQueueUrlByName(queueName);
  const stringifyBody = JSON.stringify(body);
  const sendMessageCommand = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: stringifyBody,
  });
  const response = await client.send(sendMessageCommand);
  if (!response.MessageId) {
    throw new Error(`Error sending ${stringifyBody} to ${queueName}`);
  }
  return response;
};
