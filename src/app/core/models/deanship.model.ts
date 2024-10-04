import { DelegationModel } from "./delegeation.model";
import { DistrictModel } from "./district.model";
import { GovernorateModel } from "./governorate.model";

export class DeanshipModel {
    id?: number;
    name?: string;
    code?: string;
    description?: string;
    active?: boolean;
    district?: DistrictModel;
    governorate?: GovernorateModel;
    delegation?: DelegationModel;
}
