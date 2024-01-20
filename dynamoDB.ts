const { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const region = "your-aws-region"; // e.g., "us-east-1"

// Create a DynamoDB client
const dynamoDBClient = new DynamoDBClient({ region });

// Specify your DynamoDB table name
const tableName = "YourTableName";

// Function to create an item in DynamoDB
async function createItem() {
  const params = {
    TableName: tableName,
    Item: {
      // Define your item attributes
      id: { N: "1" }, // Numeric attribute
      name: { S: "John Doe" }, // String attribute
    },
  };

  const command = new PutItemCommand(params);

  try {
    await dynamoDBClient.send(command);
    console.log("Item created successfully");
  } catch (error) {
    console.error("Error creating item:", error);
  }
}

// Function to get an item from DynamoDB
async function getItem() {
  const params = {
    TableName: tableName,
    Key: {
      id: { N: "1" }, // Numeric attribute matching the primary key
    },
  };

  const command = new GetItemCommand(params);

  try {
    const response = await dynamoDBClient.send(command);
    console.log("Item retrieved successfully:", response.Item);
  } catch (error) {
    console.error("Error getting item:", error);
  }
}

// Function to update an item in DynamoDB
async function updateItem() {
  const params = {
    TableName: tableName,
    Key: {
      id: { N: "1" }, // Numeric attribute matching the primary key
    },
    UpdateExpression: "SET #name = :name", // Update the 'name' attribute
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": { S: "Updated Name" }, // New value for 'name'
    },
  };

  const command = new UpdateItemCommand(params);

  try {
    await dynamoDBClient.send(command);
    console.log("Item updated successfully");
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

// Function to delete an item from DynamoDB
async function deleteItem() {
  const params = {
    TableName: tableName,
    Key: {
      id: { N: "1" }, // Numeric attribute matching the primary key
    },
  };

  const command = new DeleteItemCommand(params);

  try {
    await dynamoDBClient.send(command);
    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}
