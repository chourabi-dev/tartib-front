import { CurrencyModel } from "./currency.model";
import { EconomicNatureModel } from "./economicNature.model";
import { FundingSourceModel } from "./fundingSource.model";
import { FundingSourceTypeModel } from "./fundingSourceType.model";
import { ProjectModel } from "./project.model";

export class ProjectPlanModel {
    id?: number; // Assuming ID is a string inherited from AbstractBaseEntity
    project?: ProjectModel; // Assuming project ID is a string
    amount?: number;
    economicNature?: EconomicNatureModel; // Assuming economic nature ID is a string
    currency?: CurrencyModel; // Assuming currency ID is a string
    exchangeRate?: number;
    itemTitle?: string;
    itemLocalCost?: number;
    itemEquivalentCost?: number;
    fundingSource?: FundingSourceModel; // Assuming funding source ID is a string
    fundingSourceType?: FundingSourceTypeModel; // Assuming funding source type ID is a string
    fundingCurrency?: CurrencyModel; // Assuming funding currency ID is a string
    fundingAmount?: number;
    fundingLocalAmount?: number;
    fundingEquivalentAmount?: number;
    fundingStart?: Date;
    fundingEnd?: Date;
    fundingAgreement?: string;
    effectiveDate?: Date;
    sendingDate?: Date;
    approvalDate?: Date;
    arpDate?: Date;
    ratificationDate?: Date;
    plenaryDate?: Date;
    ortNumber?: string;
    ortDate?: Date;
  }
