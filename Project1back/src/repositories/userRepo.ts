import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import User from '../models/users';

export class UserRepo {
private docClient: DocumentClient;

constructor() {
  this.docClient = dynamo;
}

async addUser(user: User): Promise<boolean> {
  const params: DocumentClient.PutItemInput = {
    TableName: 'user',
    Item: user,
  };

  try {
    await this.docClient.put(params).promise();

    console.log('successfully added User');
    return true;
  } catch(error) {
    console.log(error);
    return false;
  }
}

async getAll(): Promise<User[]> {
  const params: DocumentClient.QueryInput = {
    TableName: 'user',
  };

  const data = await this.docClient.query(params).promise();

  return data.Items as User[];
}

async getByUsername(username: string): Promise<User> {
  const params: DocumentClient.GetItemInput = {

    TableName: 'user',
    Key: {
      username,
    },

  };

  const result = await this.docClient.get(params).promise();

  return result.Item as User;
}

async update(user: User): Promise<boolean> {
  const params: DocumentClient.PutItemInput = {
    TableName: 'user',
    Item: {
      ...user,
    },
    ConditionExpression: 'userName = :username',
    ExpressionAttributeValues: {
      ':username': user.username,
    },
  };

  try {
    await this.docClient.put(params).promise();

    return true;
  } catch(error) {
    console.log('Failed to update User: ', error);
    return false;
  }
}

async delete(username: string): Promise<boolean> {
  const params: DocumentClient.DeleteItemInput = {
    TableName: 'user',
    Key: {

      username,
    },
  };

  try {
    await this.docClient.delete(params).promise();

    return true;
  } catch(error) {
    console.log('Failed to delete User: ', error);
    return false;
  }
}
}

const userRepo = new UserRepo();
export default userRepo;
