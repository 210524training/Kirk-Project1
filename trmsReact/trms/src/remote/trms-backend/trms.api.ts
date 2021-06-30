import User from "../../models/user";
import trmsClient from "./trms";
import Reimbursement from "../../models/reimbursements";
export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await trmsClient.post<User>('/login', {
    username,
    password,
  });

  return user;
}
function calcDays(submissionDate: string, eventDate: string){
  let date1 = new Date(submissionDate);
  let date2 = new Date(eventDate);
  let timedifference = date2.getTime() - date1.getTime();
  let daysdifference  = timedifference / (1000 * 60 * 60 * 24);
  return daysdifference;
  }

export const sendReimbursement = async (employeeName: string, submissionDate: string, eventDate: string, eventLocation: string,
   eventDescription: string, eventCost: number, gradeFormat: string, eventType: string,
    workRelatedJustification: string, workTimeMissed: string): Promise<Reimbursement> => {
     let eventStatus;
      let projectedReimbursement;

      switch (eventType) {
        case 'Other':          
          projectedReimbursement = eventCost * .30;
          break;
        case "University Courses":      
          projectedReimbursement = eventCost * .80;
          break;
        case "Seminars":        
          projectedReimbursement = eventCost * .60;
          break;
        case "Certification Preparation Class":
          projectedReimbursement = eventCost * .75;
          break;
        case "Certification":         
          projectedReimbursement = eventCost * 1;
          break;
        case "Technical Training":          
          projectedReimbursement = eventCost * .90;
          break;
}

if (calcDays(submissionDate, eventDate) > 7 && calcDays(submissionDate, eventDate) <= 14){
  eventStatus = "Urgent";
}else{
  eventStatus = "Normal";
}


  const {data: reimbursement} = await trmsClient.post<Reimbursement>('/api/v1/reimbursements', {
    employeeName,
    submissionDate,
    eventDate,
    eventLocation,
    eventDescription,
    eventCost,
    gradeFormat,
    eventType,
    workRelatedJustification,
    workTimeMissed,
    projectedReimbursement,
    eventStatus
  });
  return reimbursement;
}

export const getReimbursements = async (): Promise<Reimbursement[]> => {
  const result = await trmsClient.get<Reimbursement[]>('/api/v1/reimbursements', {
  
  });
  return result.data ;
}

export const updateReimbursement = async ( id: string, aprovalStatus: string, additionalInfo: string): Promise<Reimbursement> => {
 const {data: reimbursement} = await trmsClient.put<Reimbursement>('/api/v1/reimbursements', {
   id,
   aprovalStatus,
   additionalInfo
   
 });
 return reimbursement;
}

export const updateGradeOrInfo = async ( id: string, grade: string, additionalInfo: string): Promise<Reimbursement> => {
  const {data: reimbursement} = await trmsClient.put<Reimbursement>('/api/v1/reimbursements/gradeinfo', {
    id,
    grade,
    additionalInfo
    
  });
  return reimbursement;
}

export const updateBenco = async ( id: string, aprovalStatus: string, additionalInfo: string, projectedReimbursement: number): Promise<Reimbursement> => {
  const {data: reimbursement} = await trmsClient.put<Reimbursement>('/api/v1/reimbursements/benco', {
    id,
    aprovalStatus,
    additionalInfo,
    projectedReimbursement
    
  });
  return reimbursement;
}

export const cancelReimbursement = async ( id: string,) => {
   const data =await trmsClient.delete(`/api/v1/reimbursements/${id}`);
   return data;
  };
  
 

