import React from "react";
import mainPicture from '../../../Assets/mainPicture.webp';
import './homepage.css';







const HomePage: React.FC<unknown> = (props)=> {






return(
  <>
<div className='container'>
              <img src={ mainPicture }  className="img-fluid" alt='somthing' />
            </div>
<div className='container'>
<table className="table table-striped">
  <thead>
    <tr>
     
      <th scope="col">Event Type</th>
      <th scope="col">Reimbursement Cost Percentage</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      
      <td>University Course</td>
      <td>80 Percent</td>
      
    </tr>
    <tr>
     
      <td>Seminars</td>
      <td>60 Percent</td>
      
    </tr>
    <tr>
      
      <td>Certification Preparation Course</td>
      <td>75 Percent</td>
      
    </tr>
    <tr>
      
      <td>Certification</td>
      <td>100 Percent</td>
      
    </tr>
    <tr>
      
      <td>Technical Training</td>
      <td>90 Percent</td>
      
    </tr>
    <tr>
      
      <td>Other</td>
      <td>30 Percent</td>
      
    </tr>
  </tbody>
</table>
</div>
</>
)


}

export default HomePage;