import React, { ChangeEvent, Dispatch,  FormEvent,  SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Reimbursement from '../../models/reimbursements';
import { cancelReimbursement, updateBenco, updateGradeOrInfo, updateReimbursement } from '../../remote/trms-backend/trms.api';
import { selectUser, UserState } from '../../slices/user.slice';



type Props ={
claims: Reimbursement[],
setSelected: Dispatch<SetStateAction<string | undefined>>;

}


const ReimbursementFetch : React.FC<Props> = ({claims, setSelected}) => {
    const history = useHistory();
    const [grade, setGrade] = useState<string>('');
    const [aprovalStatus, setAprovalStatus] = useState<string>('');
    const [id, setID] = useState<string>('');
    const [projectedReimbursement, setProjectedReimbursement] = useState<number>(0);
    const [additionalInfo, setAdditionalInfo] = useState<string>('');

    const handleProjectedReimbursementChange = (e: ChangeEvent<HTMLInputElement>) => {
      setProjectedReimbursement(e.target.valueAsNumber);
    };

    const handleidChange = (e: ChangeEvent<HTMLInputElement> ) => {
        setID(e.target.value);
        
      };

      const handleAdditionalInfoChange = (e: ChangeEvent<HTMLInputElement> ) => {
        setAdditionalInfo(e.target.value);
        
      };

    const user = useAppSelector<UserState>(selectUser);

    const handleGradeChange = (e: ChangeEvent<HTMLInputElement> ) => {
        setGrade(e.target.value);
      };

      const handleAprovalStatusChange = (e: ChangeEvent<HTMLSelectElement> ) => {
        setAprovalStatus(e.target.value);
      };

    const handleFormSubmit1 = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        await updateReimbursement( id, aprovalStatus, additionalInfo);
        history.push('/');
      }


      const handleFormSubmit2 = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
         await updateGradeOrInfo(id, grade, additionalInfo);
         history.push('/');
      }

      const handleFormSubmit3 = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
         await cancelReimbursement(id);
         history.push('/');
      }
      const handleFormSubmit4 = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
         await updateBenco(id, aprovalStatus, additionalInfo, projectedReimbursement);
         history.push('/');
      }
      


    return(
        <div>
 
 <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Claim ID</th>
      <th scope="col">Employee Name</th>
      <th scope="col">Approval Status</th>
      <th scope="col">Additional Info</th>
      <th scope="col">Submission Date</th>
      <th scope="col">Event Type</th>
      <th scope="col">Event Location</th>
      <th scope="col">Event Description</th>
      <th scope="col">Event Date</th>
      <th scope="col">Event Cost</th>
      <th scope="col">Grade Format</th>
      <th scope="col">Work Related Justification</th>
      <th scope="col">Work Time Missed</th>
      <th scope="col">Projected Reimbursement</th>
      <th scope="col">Grade</th>
      <th scope="col">EventStatus</th>
    </tr>
  </thead>
  <tbody>
        
        {claims.map(element => (
        <tr id={element.id} key={element.id}  onClick={(event) => setSelected(event.currentTarget.id)}>
         <td> {`${element.id} `}</td>
         <td> {`${element.employeeName} `}</td>
         <td>{`${element.aprovalStatus} `}</td>
         <td> {`${element.additionalInfo} `}</td>
         <td> {`${element.submissionDate} `}</td>
         <td> {`${element.eventType} `}</td>
         <td>{`${element.eventLocation} `} </td>
         <td> {`${element.eventDescription} `} </td>
         <td> {`${element.eventDate} `}</td>
         <td> {`${element.eventCost} `}</td>
         <td>{`${element.gradeFormat} `} </td>
         <td> {`${element.workRelatedJustification} `} </td>
         <td> {`${element.workTimeMissed} `} </td>
         <td> {`${element.projectedReimbursement}`}</td>
         <td> {`${element.grade}`}</td>
         <td> {`${element.eventStatus}`}</td>
         </tr>
        ))}
         </tbody>
        </table>  

        {(() => {
        if (!user) {
          return (
            <div>

            </div>
          )
        } else if (user.role !=="employee" && user.role !== "Benefits Coordinator") {
          return (
            <div>
                <span>
                <form onSubmit={handleFormSubmit1}>
                <div className="mb-3">
          <label htmlFor="idInput" className="form-label">Confirm Claim ID</label>
          <input type="text" className="form-control" id="idInput" 
          onChange={handleidChange}/>
        </div>  
                <div className="mb-3">
          <label htmlFor="eventTypeInput" className="form-label">Aproval Status</label>
          <select id="eventType" onChange={handleAprovalStatusChange}>
                                     <option value="Other"></option>
                                    <option value="Pending direct supervisor">Pending direct supervisor</option>
                                    <option value="Pending department head">Pending department head</option>
                                    <option value="Pending benefits coordinator">Pending benefits coordinator</option>
                                    <option value="Pending Grade submission">Pending grade submission</option>
                                    <option value="Pending grade aproval">Pending grade aproval</option>
                                    <option value="Pending additional information">Pending additional information</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Denied">Denied</option>
                                </select>
        </div>
        {aprovalStatus === "Pending additional information" ? <div className="mb-3">
          <label htmlFor="additionalInfoInput" className="form-label">Additional Info</label>
          <input type="text" className="form-control" id="additionalInfoInput" 
          onChange={handleAdditionalInfoChange}/>
        </div>  : <div></div>}
                        <input type="submit" className="btn btn-primary" value='Submit' />
                </form>
                </span>
                
            </div>
          )
        } else if(user.role ==="employee" ) {
          return (
            <div>
                <span>
                <form onSubmit={handleFormSubmit2}>
                <div className="mb-3">
          <label htmlFor="idInput" className="form-label">Confirm Claim ID</label>
          <input type="text" className="form-control" id="idInput" 
          onChange={handleidChange}/>
        </div>  

                <div className="mb-3">
          <label htmlFor="gradeInput" className="form-label">Grade</label>
          <input type="text" className="form-control" id="gradeInput" 
          onChange={handleGradeChange}/>
        </div>  
        <div className="mb-3">
          <label htmlFor="additionalInfoInput" className="form-label">Additional Info</label>
          <input type="text" className="form-control" id="additionalInfoInput" 
          onChange={handleAdditionalInfoChange}/>
        </div> 
         <input type="submit" className="btn btn-primary" value='Submit' />
                </form>
                </span>
               
                <span>
                <form onSubmit={handleFormSubmit3}>
                <div className="mb-3">
          <label htmlFor="idInput" className="form-label">Confirm Claim ID</label>
          <input type="text" className="form-control" id="idInput" 
          onChange={handleidChange}/>
        </div>  

                <input type="submit" className="btn btn-danger"  value='Cancel Claim' />
                </form>
                </span>
            </div>
          )
        }else{
          return(
            <div>
            <span>
            <form onSubmit={handleFormSubmit4}>
            <div className="mb-3">
      <label htmlFor="idInput" className="form-label">Confirm Claim ID</label>
      <input type="text" className="form-control" id="idInput" 
      onChange={handleidChange}/>
    </div> 

            <div className="mb-3">
      <label htmlFor="aprovalStatusInput" className="form-label">Aproval Status</label>
      <select id="eventType" onChange={handleAprovalStatusChange}>
                                 <option value="Other"></option>
                                <option value="Pending direct supervisor">Pending direct supervisor</option>
                                <option value="Pending department head">Pending department head</option>
                                <option value="Pending benefits coordinator">Pending benefits coordinator</option>
                                <option value="Pending Grade submission">Pending grade submission</option>
                                <option value="Pending grade aproval">Pending grade aproval</option>
                                <option value="Pending additional information">Pending additional information</option>
                                <option value="Approved">Approved</option>
                                <option value="Denied">Denied</option>
                            </select>
    </div>
    {aprovalStatus === "Pending additional information" ? <div className="mb-3">
          <label htmlFor="additionalInfoInput" className="form-label">Additional Info</label>
          <input type="text" className="form-control" id="additionalInfoInput" 
          onChange={handleAdditionalInfoChange}/>
        </div>  : <div></div>}
        <div className="mb-3">
          <label htmlFor="alterReimbursementInput" className="form-label">Alter Reimbursement Amount</label>
          <input type="number" className="form-control" id="alterReimbursementInput" 
          onChange={handleProjectedReimbursementChange}/>
        </div>
                <input type="submit" className="btn btn-primary" value='Submit'/>
            </form>
            </span>
            
        </div>
          )
        }
      })()}

    </div> 
     )
}

export default ReimbursementFetch;