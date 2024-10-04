import { ProjectModel } from "./project.model";
import { StudyStateModel } from "./studyState.model";

export class ProjectStudyModel {
    id?: number; // Assuming ID is a string inherited from AbstractBaseEntity
    project?: ProjectModel;
    studyState?: StudyStateModel;
    title?: string;
    observation?: string;
    realisationDate?: Date;
    actualisationDate?: Date;
    officeName?: string;
    officeEmail?: string;
    report?: string;
    authorisationTitle?: string;
    authorisationOffice?: string;
    authorisationDocument?: string;
    authorisationObservation?: string;
  }
