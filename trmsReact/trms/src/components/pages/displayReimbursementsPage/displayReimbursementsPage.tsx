import React, { SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import Reimbursement from '../../../models/reimbursements';
import {  getReimbursements } from '../../../remote/trms-backend/trms.api';
import { selectUser, UserState } from '../../../slices/user.slice';
import ReimbursementFetch from '../../reimbursementFetch/reimbursementFetch';
import './displayReimbursementsPage.css';



const DisplayReimbursementPage: React.FC<unknown>  = (props) => {
   const [selected, setSelected] = useState<string>();
   const [claims, setClaims] = useState<Reimbursement[]>();

  
   
  
      useEffect(() => {
          (async () => { 
            const result = await getReimbursements();
            // add error handling
            setClaims(result); 
          })();
      }, []);


      

return(
   <>
   
      <div className="container"id="displayReimbursementsPage">
      {claims 
          ? <ReimbursementFetch claims={claims} setSelected={setSelected}/> 
          : <h1>No claims On file.</h1>  
          
      }
    
      
</div>


   </> 
)
} 

export default DisplayReimbursementPage;




