import { PndModel } from "./pnd.model";
import { PndAxisModel } from "./pndAxis.model";
import { ProjectModel } from "./project.model";
import { StrategyModel } from "./strategy.model";
import { StrategyAxisModel } from "./strategyAxis.model";

export class ProjectStrategyModel {
    id?: number;
    project?: ProjectModel;
    strategy?: StrategyModel;
    strategyAxis?: StrategyAxisModel;
    pnd?: PndModel;
    pndAxis?: PndAxisModel;
    shemaName?: string;
    shemaProject?: string;
    blueprintName?: string;
    blueprintProject?: string;
    pndProject?: string;
    objective?: string;
    result?: string;
    components?: string;
    document?: string;
    realisationStart?: Date;
    realisationEnd?: Date;
    operationStart?: Date;
    workplan?: string;
  }
