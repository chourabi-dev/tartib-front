import { ProjectPlanModel } from "./projectPlan.model";

export class FundingExtensionModel {
    id?: number; // Assuming ID is a string inherited from AbstractBaseEntity
    projectPlan?: ProjectPlanModel;
    sequence?: number;
    name?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    actualDate?: Date;
  }
