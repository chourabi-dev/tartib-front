import { CategoryModel } from "./category.model";
import { ProjectModel } from "./project.model";

export class ProjectRiskModel {
    id?: number; // Assuming ID is a string inherited from AbstractBaseEntity
    project?: ProjectModel; // Assuming project ID is a string
    category?: CategoryModel; // Assuming category ID is a string
    name?: string;
    description?: string;
    probability?: string;
    impact?: string;
    gravity?: string;
    mitigation?: string;
    comments?: string;
  }
