import { ProjectPlanModel } from "./projectPlan.model";

export class FundingTrancheModel {
    id?: number; // Assuming ID is a string inherited from AbstractBaseEntity
    projectPlan?: ProjectPlanModel;
    title?: string;
    description?: string;
    amount?: number;
    disbursement?: number;
    year?: Date;
  }
