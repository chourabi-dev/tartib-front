import { ProjectModel } from "./project.model";

export class ProjectValidationModel {
    id?: number; // Assuming ID is a string inherited from AbstractBaseEntity
    project?: ProjectModel;
    additionalInformation?: string;
    documentName?: string;
    author?: string;
    submissionDate?: Date;
  }
