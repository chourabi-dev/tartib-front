import { DistrictModel } from "./district.model";

export class GovernorateModel {
    id?: number;
    name?: string;
    code?: string;
    description?: string;
    active?: boolean;
    district?: DistrictModel;
}
