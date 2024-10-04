import { CategoryModel } from "./category.model";
import { MinisterModel } from "./minister.model";
import { OrganisationModel } from "./organisation.model";
import { ProjectModel } from "./project.model";
import { ProjectTypologyModel } from "./projectTypology.model";
import { SectorModel } from "./sector.model";

export class ProjectIdentityModel {
    id?: number;
    // project?: ProjectModel;
    code?: string;
    name?: string;
    description?: string;
    typology?: ProjectTypologyModel;
    category?: CategoryModel;
    sector?: SectorModel;
    minister?: MinisterModel;
    ministerName?: string;
    organisation?: OrganisationModel;
    responsibleName?: string;
    responsibleEmail?: string;
    responsiblePhone?: string;
    managementUnitName?: string;
    projectManagerName?: string;
    projectManagerEmail?: string;
    projectManagerPhone?: string;
    projectOwnerName?: string;
    projectOwnerEmail?: string;
    projectOwnerPhone?: string;
    districts?:any
  }
