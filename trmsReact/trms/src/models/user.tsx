export default interface User {
     username: string,
  password: string,
  employeeName:string,
  role: string,
  totalReimbursement: number,
  availableReimbursement: number,
  pendingReimbursement: number,
  awardedReimbursement: number,
}

export type Role = 'employee'
| 'directSupervisor'
| 'departmentHead'
| 'benefitsCordnator';