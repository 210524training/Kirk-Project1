import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import Reimbursement from '../models/reimbursment';

export class ReimbursementRepo {
private docClient: DocumentClient;

constructor() {
  this.docClient = dynamo;
}

async addReimbursement(reimbursement: Reimbursement): Promise<boolean> {
  const params: DocumentClient.PutItemInput = {
    TableName: 'rem',
    Item: reimbursement,
  };
  console.log(reimbursement);
  try {
    const result = await this.docClient.put(params).promise();

    console.log('successfully submitted reimbursement', result);
    return true;
  } catch(error) {
    console.log('failed to submit');
    return false;
  }
}

async getAllReimbursements(): Promise<Reimbursement[]> {
  const params: DocumentClient.ScanInput = {
    TableName: 'rem',
  };

  const data = await this.docClient.scan(params).promise();

  if(data.Items) {
    return data.Items as [];
  }

  return [];
}

async updateStatus(id: string, aprovalStatus: string): Promise<void> {
  const params: DocumentClient.UpdateItemInput = {
    TableName: 'rem',
    Key: {
      id,
    },
    UpdateExpression: 'SET #DYNOBASE_aprovalStatus = :ap',
    ExpressionAttributeValues: {
      ':ap': aprovalStatus,
    },
    ExpressionAttributeNames: {
      '#DYNOBASE_aprovalStatus': 'aprovalStatus',
    },
  };

  await this.docClient.update(params).promise();
}

async updateAdditionalInfo(id: string, additionalInfo: string): Promise<void> {
  const params: DocumentClient.UpdateItemInput = {
    TableName: 'rem',
    Key: {
      id,
    },
    UpdateExpression: 'SET #DYNOBASE_additionalinfo = :ad',
    ExpressionAttributeValues: {
      ':ad': additionalInfo,
    },
    ExpressionAttributeNames: {
      '#DYNOBASE_additionalinfo': 'additionalInfo',
    },
  };

  await this.docClient.update(params).promise();
}

async updateProjectedReimbursement(id: string, projectedReimbursement: number): Promise<void> {
  const params: DocumentClient.UpdateItemInput = {
    TableName: 'rem',
    Key: {
      id,
    },
    UpdateExpression: 'SET #DYNOBASE_projectedReimbursement = :pr',
    ExpressionAttributeValues: {
      ':pr': projectedReimbursement,
    },
    ExpressionAttributeNames: {
      '#DYNOBASE_projectedReimbursement': 'projectedReimbursement',
    },
  };

  await this.docClient.update(params).promise();
}

async updateGrade(id: string, grade: string): Promise<void> {
  const params: DocumentClient.UpdateItemInput = {
    TableName: 'rem',
    Key: {
      id,
    },
    UpdateExpression: 'SET #DYNOBASE_grade = :g',
    ExpressionAttributeValues: {
      ':g': grade,
    },
    ExpressionAttributeNames: {
      '#DYNOBASE_grade': 'grade',
    },
  };

  await this.docClient.update(params).promise();
}

async delete(id: string): Promise<boolean> {
  const params: DocumentClient.DeleteItemInput = {
    TableName: 'rem',
    Key: {

      id,
    },
  };

  try {
    await this.docClient.delete(params).promise();

    return true;
  } catch(error) {
    console.log('Failed to delete Reimbursement: ', error);
    return false;
  }
}

async getById(id: string): Promise<Reimbursement> {
  const params: DocumentClient.GetItemInput = {

    TableName: 'rem',
    Key: {
      id,
    },

  };

  const result = await this.docClient.get(params).promise();

  return result.Item as Reimbursement;
}
}

const reimbursementRepo = new ReimbursementRepo();
export default reimbursementRepo;
