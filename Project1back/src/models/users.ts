export default class User {
  constructor(
 public username: string,
 public password: string,
 public employeeName:string,
 public role: string = 'employee',
 public totalReimbursement: number = 1000,
 public availableReimbursement: number = 1000,
 public pendingReimbursement: number = 0,
 public awardedReimbursement: number = 0,

  ) {}
}

export type Role = 'employee'
| 'directSupervisor'
| 'departmentHead'
| 'benefitsCordnator';
