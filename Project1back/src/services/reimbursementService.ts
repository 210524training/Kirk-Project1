/* eslint-disable max-len */
import Reimbursement from '../models/reimbursment';
import reimbursementRepo from '../repositories/reimbursementRepo';

export class ReimbursementService {
    private repo = reimbursementRepo

    constructor() {
      this.repo = reimbursementRepo;
    }

    getAll(): Promise<Reimbursement[]> {
      return this.repo.getAllReimbursements();
    }

    getById(id: string): Promise<Reimbursement | null> {
      console.log(id);
      return this.repo.getById(id);
    }

    add(reimbursement: Reimbursement): Promise<boolean> {
      return this.repo.addReimbursement(new Reimbursement(
        reimbursement.employeeName,
        reimbursement.submissionDate,
        reimbursement.eventDate,
        reimbursement.eventLocation,
        reimbursement.eventDescription,
        reimbursement.eventCost,
        reimbursement.gradeFormat,
        reimbursement.eventType,
        reimbursement.workRelatedJustification,
        reimbursement.workTimeMissed,
        reimbursement.projectedReimbursement,
        reimbursement.eventStatus,
        reimbursement.aprovalStatus,
        reimbursement.additionalInfo,

      ));
    }

    updateStatusInfo(id: string, aprovalStatus: string, additionalInfo: string): Promise<void> {
      console.log(id);
      console.log(aprovalStatus);
      console.log('***********');
      if(additionalInfo !== '') {
        this.repo.updateAdditionalInfo(id, additionalInfo);
      }
      return this.repo.updateStatus(id, aprovalStatus);
    }

    updateGradeOrInfo(id: string, grade: string, additionalInfo: string): Promise<void> {
      console.log(id);
      console.log(grade);
      console.log('***********');

      if(additionalInfo !== '') {
        this.repo.updateAdditionalInfo(id, additionalInfo);
      }

      return this.repo.updateGrade(id, grade);
    }

    updateBenco(id: string, aprovalStatus: string, additionalInfo: string, projectedReimbursement: number): Promise<void> {
      console.log(id);

      console.log('***********');
      if(projectedReimbursement !== 0) {
        this.repo.updateProjectedReimbursement(id, projectedReimbursement);
      }

      if(additionalInfo !== '') {
        this.repo.updateAdditionalInfo(id, additionalInfo);
      }

      return this.repo.updateStatus(id, aprovalStatus);
    }

    delete(id: string): Promise<boolean> {
      return this.repo.delete(id);
    }
}
const reimbursementService = new ReimbursementService();

export default reimbursementService;
