import React, { ChangeEvent, FormEvent, useState, } from 'react';
import { useHistory } from 'react-router-dom';
import { sendReimbursement } from '../../../remote/trms-backend/trms.api';
import './reimbursementSubmission-page.css'
const ReimbursementSubmissionPage: React.FC<unknown> = (props)=> {
  const history = useHistory();
  const [employeeName, setEmployeeName] = useState<string>('');
  const [eventLocation, setEventLocation] = useState<string>('');
  const [submissionDate, setSubmissionDate] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [gradeFormat, setGradeFormat] = useState<string>('');
  const [eventCost, setEventCost] = useState<number>(0);
  const [workRelatedJustification, setWorkRelatedJustification] = useState<string>('');
  const [workTimeMissed, setWorkTimeMissed] = useState<string>('');
  const [projectedReimbursement, setProjectedReimbursement] = useState<number>(0);
  

  function calcDays(submissionDate: string, eventDate: string){
  let date1 = new Date(submissionDate);
  let date2 = new Date(eventDate);
  let timedifference = date2.getTime() - date1.getTime();
  let daysdifference  = timedifference / (1000 * 60 * 60 * 24);
  return daysdifference;
  }
  

  const handleEmployeeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmployeeName(e.target.value);
  };

  const handleEventLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventLocation(e.target.value);
  };

  const handleSubmissionDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmissionDate(e.target.value);
  };

  const handleEventDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventDescription(e.target.value);
  };
  const handleEventTypeChange = (e: ChangeEvent<HTMLSelectElement> ) => {
    setEventType(e.target.value);
  };

  const handleEventDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventDate(e.target.value);
  };

  const handleWorkRelatedJustificationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkRelatedJustification(e.target.value);
  };

  const handleGradeFormatChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGradeFormat(e.target.value);
  };

  const handleEventCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventCost(e.target.valueAsNumber);
  };

  const handleWorkTimeMissedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkTimeMissed(e.target.value);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     await sendReimbursement(employeeName, submissionDate, eventDate, eventLocation, eventDescription,
       eventCost, gradeFormat, eventType, workRelatedJustification, workTimeMissed);

       history.push('/');
     }

     function calculateReimbursement(eventCost: number, eventType: string){

  
      let projected;

      switch (eventType) {
        case 'Other':          
          projected = eventCost * .30;
          break;
        case "University Courses":      
          projected = eventCost * .80;
          break;
        case "Seminars":        
          projected = eventCost * .60;
          break;
        case "Certification Preparation Class":
          projected = eventCost * .75;
          break;
        case "Certification":         
          projected = eventCost * 1;
          break;
        case "Technical Training":          
          projected = eventCost * .90;
          break;
}
return projected;
}


return (
<div className="container"id='reimbursementSubmission'>
<form onSubmit={handleFormSubmit} >
<div className="mb-3">
          <label htmlFor="employeeNameInput" className="form-label">Employee Name</label>
          <input type="text" className="form-control" id="employeeNameInput"
           onChange={handleEmployeeNameChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="submissionDateInput" className="form-label">Submission Date</label>
          <input type="date" className="form-control" id="submissionDateInput" 
          onChange={handleSubmissionDateChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="eventDateInput" className="form-label">Event Date</label>
          <input type="date" className="form-control" id="eventDateInput" 
          onChange={handleEventDateChange}/>
        </div>
        {calcDays(submissionDate, eventDate) <= 7  ? <h3 style={{color: "red"}}>Event day must be more than 7 days in the future</h3>
        :<p></p>}
        {calcDays(submissionDate, eventDate) > 7 && calcDays(submissionDate, eventDate) <= 14 ? <span><h6>Event Status:</h6> <p style={{color: "red"}}>URGENT</p></span>: <p></p> } 
        <div className="mb-3">
          <label htmlFor="eventLocationInput" className="form-label">Event Location</label>
          <input type="text" className="form-control" id="eventLocationInput" 
          onChange={handleEventLocationChange}/>
        </div>
        
        <div className="mb-3">
          <label htmlFor="eventDescriptionInput" className="form-label">Event Description</label>
          <input type="text" className="form-control" id="eventDescriptionInput" 
          onChange={handleEventDescriptionChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="eventCostInput" className="form-label">Event Cost</label>
          <input type="number" className="form-control" id="eventCostInput" 
          onChange={handleEventCostChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="gradeFormatInput" className="form-label">Grade Format</label>
          <select id="eventType" onChange={handleGradeFormatChange}>
                                    <option value="Other"></option>
                                    <option value="presentation">presentation</option>
                                    <option value="Letter">Letter</option>
                                   
                                </select>
        </div>
        <div className="mb-3">
          <label htmlFor="eventTypeInput" className="form-label">Event Type</label>
          <select id="eventType" onChange={handleEventTypeChange}>
                                    <option value="Other"></option>
                                    <option value="Other">Other 30%</option>
                                    <option value="University Courses">University Courses 80%</option>
                                    <option value="Seminars">Seminars 60%</option>
                                    <option value="Certification Preparation Class">Certification Preparation Class 75%</option>
                                    <option value="Certification">Certification 100%</option>
                                    <option value="Technical Training">Technical Training 90%</option>
                                </select>
        </div>
        <div className="mb-3">
          <label htmlFor="workRelatedJustificationInput" className="form-label">Work Related Justification</label>
          <input type="paragraph" className="form-control" id="workRelatedJustificationInput" 
          onChange={handleWorkRelatedJustificationChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="workRelatedJustificationInput" className="form-label">Work Time Missed</label>
          <input type="text" className="form-control" id="workRelatedJustificationInput" 
          onChange={handleWorkTimeMissedChange}/>
        </div>

        <p>Projected Reimbursement: {calculateReimbursement(eventCost, eventType)}</p>
        {calcDays(submissionDate, eventDate) <= 7  ? <p></p>
        :<input type="submit" className="btn btn-primary" value='Submit' /> }
        
</form>
</div>
);

};

export default ReimbursementSubmissionPage;



  function setShow(arg0: boolean) {
    throw new Error('Function not implemented.');
  }

