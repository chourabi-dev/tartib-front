import { ProjectModel } from "./project.model";
import { ProjectPlanModel } from "./projectPlan.model";

export class ComponentModel {
    id?: number;
    project?: ProjectModel;
    projectPlan?: ProjectPlanModel;
    subComponent?: boolean;
    component?: ComponentModel;
    name?: string;
    description?: string;
    code?: string;
}
