import { v4 as uuidv4 } from 'uuid';

function getRandomName() {
  let hexString = uuidv4();
  console.log('hex:   ', hexString);

  // remove decoration
  hexString = hexString.replace('-', '');

  const base64String = Buffer.from(hexString, 'hex').toString('base64');
  console.log('base64:', base64String);

  return base64String;
}

export default class Reimbursement {
  constructor(
    public employeeName: string,
    public submissionDate: string,
    public eventDate: string,
    public eventLocation: string,
    public eventDescription: string,
    public eventCost: number,
    public gradeFormat: string,
    public eventType: string,
    public workRelatedJustification: string,
    public workTimeMissed: string,
    public projectedReimbursement: number,
    public eventStatus: string = 'normal',
    public aprovalStatus: string = '"Pending Direct Supervisor"',
    public additionalInfo: string = '',
    public grade: string = '',
    public id: string = getRandomName(),
  ) {}
}

export type gradeFormat = 'Letter' | 'Presentation';
export type eventType = 'University course'
| 'Seminar'
| 'Certification preparation class'
| 'Certification'
| 'Technical training'
| 'Other';
export type eventStatus = 'normal' | 'urgent';
export type approvalStatus = 'Pending direct supervisor'
| 'Pending department head'
| 'Pending benefits coordnator'
| 'Pending grade submission'
| 'Pending grade approval'
| 'Aproved'
| 'Denied';
