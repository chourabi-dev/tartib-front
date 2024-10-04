import { StrategyModel } from "./strategy.model";

export class StrategyAxisModel {
  id?: number;
  strategy?: StrategyModel;
  name?: string;
  code?: string;
  description?: string;
  active?: boolean;
}
