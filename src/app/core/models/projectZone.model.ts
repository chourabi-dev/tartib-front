import { DeanshipModel } from "./deanship.model";
import { DelegationModel } from "./delegeation.model";
import { DistrictModel } from "./district.model";
import { GovernorateModel } from "./governorate.model";
import { ProjectModel } from "./project.model";

export class ProjectZoneModel {
    id?: number;
    project?: ProjectModel;
    description?: string;
    type?: string;
    national?: boolean;
    district?: DistrictModel;
    governorate?: GovernorateModel;
    delegation?: DelegationModel;
    deanship?: DeanshipModel;
    landDisponibility?: boolean;
    landObservation?: string;
    landRelease?: string;
    projectRelated?: boolean;
    projectCode?: string;
    projectName?: string;
    projectLinkType?: string;
    stakeholderName?: string;
    stakeholderEmail?: string;
    stakeholderRole?: string;
  }
