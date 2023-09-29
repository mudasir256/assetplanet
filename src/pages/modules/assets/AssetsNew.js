import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon, Alert } from "antd";
import ImageIcon from "assets/images/asset.png";
import AssetPlanet from "assets/images/asset-planet-logo.jpg";
import { MODULE_API } from "../../../apis";

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  QL_ASSETS_ADD,
  QL_ASSETS_UPDATE,
  QL_ASSETS_GET,
} from "../../../constants/queries";
import { float2Currency } from "helpers/Utils";

import { FormPagePose } from "../../../components/Animations";

import SellingAssetCostsSubForm from "./subforms/SellingAssetCostsSubForm";
import CollectiblesSubForm from "./subforms/CollectiblesSubForm";
import VCSubForm from "./subforms/VCSubForm";
import StockSubForm from "./subforms/StockSubForm";
import UserPortfolioSubForm from "./subforms/UserPortfolioSubForm";
import ContributionSubForm from "./subforms/ContributionSubForm";
import AssetInformationSubForm from "./subforms/AssetInformationSubForm";
import QuestionRMDAdditionalSubForm from "./subforms/QuestionRMDAdditionalSubForm";
import QuestionShowFieldsAirplane from "./subforms/QuestionShowFieldsAirplane";
import QuestionContributionDistributionSubForm from "./subforms/QuestionContributionDistributionSubForm";
import AssetAllocationSubForm from "./subforms/AssetAllocationSubForm";
import AssetPerformanceSubForm from "./subforms/AssetPerformanceSubForm";
import LiveStockSubForm from "./subforms/LiveStockSubForm";
import PrimaryResidenceSubForm from "./subforms/PrimaryResidenceSubForm";
import TaxLiquiditySubForm from "./subforms/TaxLiquiditySubForm";
import CommittmentSubForm from "./subforms/CommittmentSubForm";
import PropertySubForm from "./subforms/PropertySubForm";
import InvestmentPropertySubForm from "./subforms/InvestmentPropertySubForm";
import InvestmentPropertyExpensesSubForm from "./subforms/InvestmentPropertyExpensesSubForm";
import InheritedIRASubForm from "./subforms/InheritedIRASubForm";
import EndSubForm from "./subforms/EndSubForm";

var fnMutationAssetsAdd = null;
var dataMutationAssetsAdd = null;

var fnMutationAssetsUpdate = null;
var dataMutationAssetsUpdate = null;
let prevPos = 0;

function HiddenHook() {
  [fnMutationAssetsAdd, { dataMutationAssetsAdd }] = useMutation(QL_ASSETS_ADD);
  [fnMutationAssetsUpdate, { dataMutationAssetsUpdate }] = useMutation(
    QL_ASSETS_UPDATE
  );

  return <React.Fragment></React.Fragment>;
}

function initialFormData(data) {
  let formData = [];

  console.log("fghjkl", data);

  if (data.hasOwnProperty("asset")) {
    formData.push({
      id: "AssetAllocationSubForm",
      data: AssetAllocationSubForm.FnCreateFormData({
        value:
          data["asset"]["assetAllocation"] != null
            ? data["asset"]["assetAllocation"]["assetAllocation"]
            : "",
      }),
      visible: true,
      stepId: "StepAssetAllocationSubForm",
    });

    formData.push({
      id: "AssetInformationSubForm",
      data: AssetInformationSubForm.FnCreateFormData({
        name: data["asset"]["name"],
        accountType: data["asset"]["accountType"],
        owner: data["asset"]["owner"],
        heldWhere: data["asset"]["heldWhere"],
        accountDigits: data["asset"]["last4DigitsOfAccount"],
        assetStatus: data["asset"]["status"],
      }),
      visible: true,
      stepId: "StepAssetInformationSubForm",
    });

    formData.push({
      id: "QuestionRMDAdditionalSubForm",
      data: QuestionRMDAdditionalSubForm.FnCreateFormData({
        value:
          data["asset"]["additionalQuestion"] != null
            ? data["asset"]["additionalQuestion"]["isSpouseSoleBeneficiary"]
              ? "Yes"
              : "No"
            : "",
      }),
      visible: true,
      stepId: "StepAccountTypeQuestions",
    });

    formData.push({
      id: "QuestionShowFieldsAirplane",
      data: QuestionShowFieldsAirplane.FnCreateFormData({
        value:
          data["asset"]["additionalQuestion"] != null
            ? data["asset"]["additionalQuestion"]["isShowFields"]
              ? "Yes"
              : "No"
            : "",
      }),
      visible: true,
      stepId: "StepSellingAssetCostsInformation",
    });

    formData.push({
      id: "InheritedIRASubForm",
      data: InheritedIRASubForm.FnCreateFormData({
        birthDate:
          data["asset"]["inheritedInformation"] != null
            ? data["asset"]["inheritedInformation"][
            "deceasedIraOwnersBirthdate"
            ]
            : "",
        deathDate:
          data["asset"]["inheritedInformation"] != null
            ? data["asset"]["inheritedInformation"][
            "deceasedIraOwnersDeathDate"
            ]
            : "",
        relationship:
          data["asset"]["inheritedInformation"] != null
            ? data["asset"]["inheritedInformation"][
            "ownersRelationshipToDeceased"
            ]
            : "",
      }),
      visible: true,
      stepId: "StepAccountTypeQuestions",
    });

    formData.push({
      id: "QuestionContributionDistributionSubForm",
      data: QuestionContributionDistributionSubForm.FnCreateFormData({
        value:
          data["asset"]["inheritedInformation"] != null
            ? data["asset"]["inheritedInformation"][
              "regularContributionsOrDistributions"
            ]
              ? "Yes"
              : "No"
            : "",
      }),
      visible: true,
      stepId: "StepQuestionContributionDistributionSubForm",
    });

    formData.push({
      id: "ContributionSubForm",
      data: ContributionSubForm.FnCreateFormData(
        data["asset"]["contributionOrDistributions"]
      ),
      visible: true,
      stepId: "StepQuestionContributionDistributionSubForm",
    });

    formData.push({
      id: "SellingAssetCostsSubForm",
      data: SellingAssetCostsSubForm.FnCreateFormData({
        saleDate:
          data["asset"]["sellingAssetCost"] != null
            ? data["asset"]["sellingAssetCost"]["dateOfSale"]
            : "",
        totalLiabilities:
          data["asset"]["sellingAssetCost"] != null
            ? data["asset"]["sellingAssetCost"]["totalLiabilities"]
            : "",
        totalNetSoldValue:
          data["asset"]["sellingAssetCost"] != null
            ? data["asset"]["sellingAssetCost"]["totalNetSoldValue"]
            : "",
        commissionSale:
          data["asset"]["sellingAssetCost"] != null
            ? data["asset"]["sellingAssetCost"]["commisionOnSale"]
            : "",
        rateReturnValue:
          data["asset"]["sellingAssetCost"] != null
            ? data["asset"]["sellingAssetCost"]["valueBasedOnRateOfReturn"]
            : "",
        otherTransactionCosts:
          data["asset"]["sellingAssetCost"] != null
            ? data["asset"]["sellingAssetCost"]["otherTransactionCosts"]
            : "",
        actualValue:
          data["asset"]["sellingAssetCost"] != null
            ? data["asset"]["sellingAssetCost"]["actualValueAtSaleDate"]
            : "",
        taxes:
          data["asset"]["sellingAssetCost"] != null
            ? data["asset"]["sellingAssetCost"]["taxes"]
            : "",
      }),
      visibile: true,
      stepId: "StepSellingAssetCostsInformation",
    });

    formData.push({
      id: "CollectiblesSubForm",
      data: CollectiblesSubForm.FnCreateFormData({
        year:
          data["asset"]["collectible"] != null
            ? data["asset"]["collectible"]["year"]
            : "",
        description:
          data["asset"]["collectible"] != null
            ? data["asset"]["collectible"]["describeCollectible"]
            : "",
        // monthlyBudget: data['asset']['collectible'] != null ? data['asset']['collectible']['dollarAppliedToMonthlyBudget'] : '',
        collectibleType:
          data["asset"]["collectible"] != null
            ? data["asset"]["collectible"]["typeOfCollectible"]
            : "",
        model:
          data["asset"]["collectible"] != null
            ? data["asset"]["collectible"]["model"]
            : "",
        make:
          data["asset"]["collectible"] != null
            ? data["asset"]["collectible"]["make"]
            : "",
        purchasePrice:
          data["asset"]["collectible"] != null
            ? data["asset"]["collectible"]["purchasePrice"]
            : "",
        appraised:
          data["asset"]["collectible"] != null
            ? data["asset"]["collectible"]["appraised"]
              ? "Yes"
              : "No"
            : "",
        insured:
          data["asset"]["collectible"] != null
            ? data["asset"]["collectible"]["insured"]
              ? "Yes"
              : "No"
            : "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "LiveStockSubForm",
      data: LiveStockSubForm.FnCreateFormData(data["asset"]["livestocks"]),
      visible: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "VCSubForm",
      data: VCSubForm.FnCreateFormData({
        nickname:
          data["asset"]["privatePlacementAndVc"] != null
            ? data["asset"]["privatePlacementAndVc"]["nickname"]
            : "",
        additionalCommittments:
          data["asset"]["privatePlacementAndVc"] != null
            ? data["asset"]["privatePlacementAndVc"][
              "additionalFutureCommittments"
            ]
              ? "Yes"
              : "No"
            : "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "CommittmentSubForm",
      data: CommittmentSubForm.FnCreateFormData({
        committmentDate:
          data["asset"]["privatePlacementAndVc"] != null &&
            data["asset"]["privatePlacementAndVc"]["whenFutureCommittmentDate"] !=
            null
            ? data["asset"]["privatePlacementAndVc"][
            "whenFutureCommittmentDate"
            ]
            : "",
        committmentAmount:
          data["asset"]["privatePlacementAndVc"] != null
            ? data["asset"]["privatePlacementAndVc"][
            "futureCommittmentDollarAmount"
            ]
            : "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "PrimaryResidenceSubForm",
      data: PrimaryResidenceSubForm.FnCreateFormData({
        value: "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "PropertySubForm",
      data: PropertySubForm.FnCreateFormData({
        value:
          data["asset"]["realState"] != null
            ? data["asset"]["realState"]["typeOfProperty"]
            : "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "InvestmentPropertySubForm",
      data: InvestmentPropertySubForm.FnCreateFormData({
        purchasePrice:
          data["asset"]["realState"] != null
            ? data["asset"]["realState"]["purchasePriceOfProperty"]
            : "",
        monthlyRent:
          data["asset"]["realState"] != null
            ? data["asset"]["realState"]["monthlyLease"]
            : "",
        totalMonthlyExpenses:
          data["asset"]["realState"] != null
            ? data["asset"]["realState"]["totalMonthlyExpenses"]
            : "",
        downPayment:
          data["asset"]["realState"] != null
            ? data["asset"]["realState"]["downpayment"]
            : "",
        investmentPropertyAddress:
          data["asset"]["realState"] != null
            ? data["asset"]["realState"]["investmentPropertyAddress"]
            : "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "InvestmentPropertyExpensesSubForm",
      data: InvestmentPropertyExpensesSubForm.FnCreateFormData(
        data["asset"]["investmentPropertyExpenses"] != null
          ? data["asset"]["investmentPropertyExpenses"]
          : []
      ),
      visible: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "StockSubForm",
      data: StockSubForm.FnCreateFormData(
        data["asset"]["stockIndividualSubforms"]
      ),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "UserPortfolioSubForm",
      data: UserPortfolioSubForm.FnCreateFormData({
        spPortfolio:
          data["asset"]["userDefinedPortfolio"] != null
            ? data["asset"]["userDefinedPortfolio"][
            "portfolioPercentageOfSAndP500"
            ]
            : "",
        realEstatePortfolio:
          data["asset"]["userDefinedPortfolio"] != null
            ? data["asset"]["userDefinedPortfolio"][
            "portfolioPercentageOfRealEstate"
            ]
            : "",
        bondsPortfolio:
          data["asset"]["userDefinedPortfolio"] != null
            ? data["asset"]["userDefinedPortfolio"][
            "portfolioPercentageOfBonds"
            ]
            : "",
        cashPortfolio:
          data["asset"]["userDefinedPortfolio"] != null
            ? data["asset"]["userDefinedPortfolio"]["portfolioPercentageOfCash"]
            : "",
        goldPortfolio:
          data["asset"]["userDefinedPortfolio"] != null
            ? data["asset"]["userDefinedPortfolio"]["portfolioPercentageOfGold"]
            : "",
        totalPercentage:
          data["asset"]["userDefinedPortfolio"] != null
            ? data["asset"]["userDefinedPortfolio"]["totalPercentage"]
            : "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "AssetPerformanceSubForm",
      data: AssetPerformanceSubForm.FnCreateFormData({
        monetaryValue:
          data["asset"]["assetPerformance"] != null
            ? data["asset"]["assetPerformance"]["monetaryValue"]
            : "",
        returnRate:
          data["asset"]["assetPerformance"] != null
            ? data["asset"]["assetPerformance"]["rateOfReturn"]
            : "",
        dateValue:
          data["asset"]["assetPerformance"] != null
            ? data["asset"]["assetPerformance"]["valueAsOfDate"]
            : "",
      }),
      visibile: true,
      stepId: "StepAssetPerformanceSubForm",
    });

    formData.push({
      id: "TaxLiquiditySubForm",
      data: TaxLiquiditySubForm.FnCreateFormData({
        basisCost:
          data["asset"]["taxAndLiquidity"] != null
            ? data["asset"]["taxAndLiquidity"]["costBasis"]
            : "",
        costBasisDate:
          data["asset"]["taxAndLiquidity"] != null
            ? data["asset"]["taxAndLiquidity"]["costBasisDate"]
            : "",
        estimatedGains:
          data["asset"]["taxAndLiquidity"] != null
            ? data["asset"]["taxAndLiquidity"]["estimatedUnrealizedGains"]
            : "",
        taxability:
          data["asset"]["taxAndLiquidity"] != null
            ? data["asset"]["taxAndLiquidity"]["taxibility"]
              ? "Taxable"
              : "Tax Deferred"
            : "",
        assetLiquid:
          data["asset"]["taxAndLiquidity"] != null
            ? data["asset"]["taxAndLiquidity"]["thisAssetIsLiquid"]
              ? "Yes"
              : "No"
            : "",
        partialSaleAbility:
          data["asset"]["taxAndLiquidity"] != null
            ? data["asset"]["taxAndLiquidity"]["abilityForPartialSale"]
              ? "Yes"
              : "No"
            : "",
        distributionTaxabilityValue:
          data["asset"]["taxAndLiquidity"] != null
            ? data["asset"]["taxAndLiquidity"]["taxabilityOfDistribution"]
            : "",
        withdrawalPenalty:
          data["asset"]["taxAndLiquidity"] != null
            ? data["asset"]["taxAndLiquidity"]["earlyWithdrawlPenalty"]
            : "",
        distributionTaxability:
          data["asset"]["taxAndLiquidity"] != null
            ? data["asset"]["taxAndLiquidity"]["taxabilityOnDistribution"]
            : "",
        agePenalty:
          data["asset"]["taxAndLiquidity"] != null
            ? data["asset"]["taxAndLiquidity"][
            "penaltyBasedOnAgeInClientsAndPlans"
            ]
            : "",
      }),
      visibile: true,
      stepId: "StepTaxLiquiditySubForm",
    });
  } else {
    formData.push({
      id: "AssetAllocationSubForm",
      data: AssetAllocationSubForm.FnCreateFormData({
        value: "",
      }),
      visible: true,
      stepId: "StepAssetAllocationSubForm",
    });

    formData.push({
      id: "AssetInformationSubForm",
      data: AssetInformationSubForm.FnCreateFormData({
        name: "",
        accountType: "",
        owner: "",
        heldWhere: "",
        accountDigits: "",
        assetStatus: "",
      }),
      visible: true,
      stepId: "StepAssetInformationSubForm",
    });

    formData.push({
      id: "QuestionRMDAdditionalSubForm",
      data: QuestionRMDAdditionalSubForm.FnCreateFormData({
        value: "",
      }),
      visible: true,
      stepId: "StepAccountTypeQuestions",
    });
    formData.push({
      id: "QuestionShowFieldsAirplane",
      data: QuestionShowFieldsAirplane.FnCreateFormData({
        value: "",
      }),
      visible: true,
      stepId: "StepAccountTypeQuestions",
    });

    formData.push({
      id: "InheritedIRASubForm",
      data: InheritedIRASubForm.FnCreateFormData({
        birthDate: "",
        deathDate: "",
        relationship: "",
      }),
      visible: true,
      stepId: "StepAccountTypeQuestions",
    });

    formData.push({
      id: "QuestionContributionDistributionSubForm",
      data: QuestionContributionDistributionSubForm.FnCreateFormData({
        value: "",
      }),
      visible: true,
      stepId: "StepQuestionContributionDistributionSubForm",
    });

    formData.push({
      id: "ContributionSubForm",
      data: ContributionSubForm.FnCreateFormData([]),
      visible: true,
      stepId: "StepQuestionContributionDistributionSubForm",
    });

    formData.push({
      id: "SellingAssetCostsSubForm",
      data: SellingAssetCostsSubForm.FnCreateFormData({
        saleDate: "",
        totalLiabilities: "",
        totalNetSoldValue: "",
        commissionSale: "",
        rateReturnValue: "",
        otherTransactionCosts: "",
        actualValue: "",
        taxes: "",
      }),
      visibile: true,
      stepId: "StepSellingAssetCostsInformation",
    });

    formData.push({
      id: "CollectiblesSubForm",
      data: CollectiblesSubForm.FnCreateFormData({
        year: "",
        description: "",
        // monthlyBudget: '',
        collectibleType: "",
        model: "",
        make: "",
        purchasePrice: "",
        appraised: "",
        insured: "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "LiveStockSubForm",
      data: LiveStockSubForm.FnCreateFormData([]),
      visible: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "VCSubForm",
      data: VCSubForm.FnCreateFormData({
        nickname: "",
        additionalCommittments: "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "CommittmentSubForm",
      data: CommittmentSubForm.FnCreateFormData({
        committmentDate: "",
        committmentAmount: "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "PrimaryResidenceSubForm",
      data: PrimaryResidenceSubForm.FnCreateFormData({
        value: "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "PropertySubForm",
      data: PropertySubForm.FnCreateFormData({
        value: "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "InvestmentPropertySubForm",
      data: InvestmentPropertySubForm.FnCreateFormData({
        purchasePrice: "",
        monthlyRent: "",
        totalMonthlyExpenses: "",
        downPayment: "",
        investmentPropertyAddress: "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "InvestmentPropertyExpensesSubForm",
      data: InvestmentPropertyExpensesSubForm.FnCreateFormData([]),
      visible: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "StockSubForm",
      data: StockSubForm.FnCreateFormData([]),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "UserPortfolioSubForm",
      data: UserPortfolioSubForm.FnCreateFormData({
        spPortfolio: "",
        realEstatePortfolio: "",
        bondsPortfolio: "",
        cashPortfolio: "",
        goldPortfolio: "",
        totalPercentage: "",
      }),
      visibile: true,
      stepId: "StepAdditionalAssetInformation",
    });

    formData.push({
      id: "AssetPerformanceSubForm",
      data: AssetPerformanceSubForm.FnCreateFormData({
        monetaryValue: "",
        returnRate: "",
        dateValue: "",
      }),
      visibile: true,
      stepId: "StepAssetPerformanceSubForm",
    });

    formData.push({
      id: "TaxLiquiditySubForm",
      data: TaxLiquiditySubForm.FnCreateFormData({
        basisCost: "",
        costBasisDate: "",
        estimatedGains: "",
        taxability: "",
        assetLiquid: "",
        partialSaleAbility: "",
        distributionTaxabilityValue: "",
        withdrawalPenalty: "",
        distributionTaxability: "",
        agePenalty: "",
      }),
      visibile: true,
      stepId: "StepTaxLiquiditySubForm",
    });
  }

  return formData;
}

async function LoadDBDataHook(props) {

  console.log("api update in assets", props);
  try {
    if (props.dbID != null && props.dbID != "") {
      let UpdatedData = await MODULE_API.fetchDetails(`${props.dbID}`);
      console.log("UpdatedData", UpdatedData)
      if (UpdatedData && UpdatedData.data) {
        console.log("call..");
        props.cbLoadDBData(initialFormData(UpdatedData.data));
      }
    }
  } catch (e) {
    console.log("e", e);
  }


  // if (props.dbID != null && props.dbID != "") {
  //   const { data, loading, error } = useQuery(QL_ASSETS_GET, {
  //     variables: { id: props.dbID },
  //   });
  //   if (data) {
  //     console.log("call..");
  //     props.cbLoadDBData(initialFormData(data));
  //   }
  // }

  return <React.Fragment></React.Fragment>;
}

class AssetsNew extends Component {
  constructor(props) {
    super(props);

    let dbID = null;
    let dbLoaded = true;

    const { assetsID } = this.props.match.params;

    if (assetsID) {
      dbID = assetsID;
      dbLoaded = false;
    }

    let formData = initialFormData({});

    this.state = {
      dataID: dbID,
      curSubFormID: "AssetAllocationSubForm",
      curSubForm: AssetAllocationSubForm,
      formVisible: false,
      subFormData: {},
      formData1: [
        // {
        //     id: 'assetsInformation',
        //     data: {
        //         title: '',
        //         fields: [
        //             {
        //                 id: '' ,
        //                 title: '',
        //                 value: ''
        //              }
        //         ]
        //     }
        // }
      ],
      formData: formData,
      isRightSideOpen: true,
      formSteps: [
        {
          id: "StepAssetAllocationSubForm",
          icon: "icon_ex.png",
          title: "Asset Allocation",
        },
        {
          id: "StepAssetInformationSubForm",
          icon: "icon_ex.png",
          title: "Asset Information",
        },
        {
          id: "StepAccountTypeQuestions",
          icon: "icon_ex.png",
          title: "Qualified Account Type Questions",
        },
        {
          id: "StepQuestionContributionDistributionSubForm",
          icon: "icon_ex.png",
          title: "Contributions or Distributions",
        },
        {
          id: "StepAdditionalAssetInformation",
          icon: "icon_ex.png",
          title: "Additional Asset Information",
        },
        {
          id: "StepSellingAssetCostsInformation",
          icon: "icon_ex.png",
          title: "Selling Asset Costs",
        },
        {
          id: "StepAssetPerformanceSubForm",
          icon: "icon_ex.png",
          title: "Asset Performance",
        },
        {
          id: "StepTaxLiquiditySubForm",
          icon: "icon_ex.png",
          title: "Tax and Liquidity",
        },
      ],
      dbLoaded: dbLoaded,
      dbID: dbID,
      formStep2FormMap: {
        // "stepid": ['form id', 'formid', 'formid']
        StepAssetAllocationSubForm: ["AssetAllocationSubForm"],
        StepAssetInformationSubForm: ["AssetInformationSubForm"],
        StepAccountTypeQuestions: [
          "QuestionRMDAdditionalSubForm",
          "InheritedIRASubForm",
          "QuestionShowFieldsAirplane",
        ],
        StepQuestionContributionDistributionSubForm: [
          "QuestionContributionDistributionSubForm",
          "ContributionSubForm",
        ],
        StepSellingAssetCostsInformation: [
          "SellingAssetCostsSubForm",
          "QuestionShowFieldsAirplane",
        ],
        StepAdditionalAssetInformation: [
          "CollectiblesSubForm",
          "LiveStockSubForm",
          "VCSubForm",
          "CommittmentSubForm",
          "PrimaryResidenceSubForm",
          "PropertySubForm",
          "InvestmentPropertySubForm",
          "InvestmentPropertyExpensesSubForm",
          "StockSubForm",
          "UserPortfolioSubForm",
        ],
        StepAssetPerformanceSubForm: ["AssetPerformanceSubForm"],
        StepTaxLiquiditySubForm: ["TaxLiquiditySubForm"],
      },
      isEndForm: false
    };

    this.goSubForm = this.goSubForm.bind(this);
    this.updateSubForm = this.updateSubForm.bind(this);
    this.getSubFormData = this.getSubFormData.bind(this);
    this.getSubFormField = this.getSubFormField.bind(this);

    this.createQLVariable = this.createQLVariable.bind(this);
    this.getSubFormFieldValue = this.getSubFormFieldValue.bind(this);

    this.toggleRightSide = this.toggleRightSide.bind(this);

    this.loadDBData = this.loadDBData.bind(this);

    this.getRightSideFormData = this.getRightSideFormData.bind(this);
    this.getTopNav = this.getTopNav.bind(this);

    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }

  componentDidMount() {
    this.goSubForm(this.state.formSteps[0]["id"]);
    this.showAssetsData();
    // this.goSubForm("TaxLiquiditySubForm");
  }

  showAssetsData = async (props) => {
    console.log("api update in assets", this.state.dbID);
    try {
      if (this.state.dbID != null && this.state.dbID != "") {
        let UpdatedData = await MODULE_API.fetchDetails(`${this.state.dbID}`);
        console.log("UpdatedData", UpdatedData)
        if (UpdatedData && UpdatedData.data) {
          console.log("call..", UpdatedData);
          this.loadDBData(initialFormData(UpdatedData.data))
          // props.cbLoadDBData(initialFormData(UpdatedData.data));
        }
      }
    } catch (e) {
      console.log("e", e);
    }

  };

  getSubFormField(formID, fieldID) {
    let formData = this.state.formData;

    for (var index = 0; index < formData.length; index++) {
      if (formData[index]["id"] == formID) {
        let data = formData[index]["data"];
        let fields = data["fields"];
        for (var findex = 0; findex < fields.length; findex++) {
          if (fields[findex]["id"] == fieldID) {
            return fields[findex];
          }
        }
      }
    }

    return null;
  }

  getSubFormFieldValue(formID, fieldID) {
    let field = this.getSubFormField(formID, fieldID);

    if (field == null) {
      return "";
    } else {
      return field.value;
    }
  }

  createQLVariable(subFormID, subFormData) {
    let varQL = null;

    switch (subFormID) {
      case "AssetInformationSubForm":
        varQL = {
          asset: {
            name: this.getSubFormFieldValue(subFormID, "name"),
            accountType: this.getSubFormFieldValue(subFormID, "accountType"),
            owner: this.getSubFormFieldValue(subFormID, "owner"),
            heldWhere: this.getSubFormFieldValue(subFormID, "heldWhere"),
            last4DigitsOfAccount: this.getSubFormFieldValue(
              subFormID,
              "accountDigits"
            ),
            status: this.getSubFormFieldValue(subFormID, "assetStatus"),
          },
        };
        break;
      case "QuestionContributionDistributionSubForm":
        varQL = {
          inheritedInformation: {
            regularContributionsOrDistributions:
              parseInt(
                this.getSubFormFieldValue(subFormID, "regularContribution")
              ) == "Yes"
                ? true
                : false,
          },
        };
        break;
      case "QuestionRMDAdditionalSubForm":
        varQL = {
          additionalQuestion: {
            isSpouseSoleBeneficiary:
              this.getSubFormFieldValue(subFormID, "isSpouseSole") == "Yes"
                ? true
                : false,
          },
        };
        break;
      case "QuestionShowFieldsAirplane":
        varQL = {
          additionalQuestion: {
            isShowFields:
              this.getSubFormFieldValue(subFormID, "isShowfield") == "Yes"
                ? true
                : false,
          },
        };
        break;

      case "InheritedIRASubForm":
        varQL = {
          inheritedInformation: {
            deceasedIraOwnersBirthdate: this.getSubFormFieldValue(
              subFormID,
              "birthDate"
            ),
            deceasedIraOwnersDeathDate: this.getSubFormFieldValue(
              subFormID,
              "deathDate"
            ),
            ownersRelationshipToDeceased: this.getSubFormFieldValue(
              subFormID,
              "relationship"
            ),
          },
        };
        break;
      case "ContributionSubForm":
        varQL = {
          contributionOrDistributions: subFormData["rows"],
        };
        break;
      case "AssetAllocationSubForm":
        varQL = {
          assetAllocation: {
            assetAllocation: this.getSubFormFieldValue(
              subFormID,
              "assetsAllocation"
            ),
          },
        };
        break;
      case "SellingAssetCostsSubForm":
        varQL = {
          sellingAssetCost: {
            dateOfSale: this.getSubFormFieldValue(subFormID, "saleDate"),
            totalLiabilities:
              this.getSubFormFieldValue(subFormID, "totalLiabilities") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "totalLiabilities")
                )
                : 0,
            totalNetSoldValue:
              this.getSubFormFieldValue(subFormID, "totalNetSoldValue") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "totalNetSoldValue")
                )
                : 0,
            commisionOnSale:
              this.getSubFormFieldValue(subFormID, "commissionSale") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "commissionSale")
                )
                : 0,
            valueBasedOnRateOfReturn:
              this.getSubFormFieldValue(subFormID, "rateReturnValue") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "rateReturnValue")
                )
                : 0,
            otherTransactionCosts:
              this.getSubFormFieldValue(subFormID, "otherTransactionCosts") !=
                ""
                ? parseInt(
                  this.getSubFormFieldValue(
                    subFormID,
                    "otherTransactionCosts"
                  )
                )
                : 0,
            actualValueAtSaleDate:
              this.getSubFormFieldValue(subFormID, "actualValue") != ""
                ? parseInt(this.getSubFormFieldValue(subFormID, "actualValue"))
                : 0,
            taxes:
              this.getSubFormFieldValue(subFormID, "taxes") != ""
                ? parseInt(this.getSubFormFieldValue(subFormID, "taxes"))
                : 0,
          },
        };
        break;
      case "AssetPerformanceSubForm":
        varQL = {
          assetPerformance: {
            monetaryValue: parseFloat(
              this.getSubFormFieldValue(subFormID, "monetaryValue")
            ),
            rateOfReturn: this.getSubFormFieldValue(subFormID, "returnRate"),
            valueAsOfDate: this.getSubFormFieldValue(subFormID, "dateValue"),
          },
        };
        break;
      case "CollectiblesSubForm":
        varQL = {
          collectible: {
            year: this.getSubFormFieldValue(subFormID, "year"),
            describeCollectible: this.getSubFormFieldValue(
              subFormID,
              "description"
            ),
            // "dollarAppliedToMonthlyBudget": this.getSubFormFieldValue(subFormID, 'monthlyBudget') != '' ? parseInt(this.getSubFormFieldValue(subFormID, 'monthlyBudget')) : 0,
            typeOfCollectible: this.getSubFormFieldValue(
              subFormID,
              "collectibleType"
            ),
            model: this.getSubFormFieldValue(subFormID, "model"),
            make: this.getSubFormFieldValue(subFormID, "make"),
            purchasePrice:
              this.getSubFormFieldValue(subFormID, "purchasePrice") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "purchasePrice")
                )
                : 0,
            appraised:
              this.getSubFormFieldValue(subFormID, "appraised") == "Yes"
                ? true
                : false,
            insured:
              this.getSubFormFieldValue(subFormID, "insured") == "Yes"
                ? true
                : false,
          },
        };
        break;
      case "LiveStockSubForm":
        varQL = {
          livestocks: subFormData["rows"],
        };
        break;
      case "VCSubForm":
        varQL = {
          privatePlacementAndVc: {
            nickname: this.getSubFormFieldValue(subFormID, "nickname"),
            additionalFutureCommittments:
              this.getSubFormFieldValue(subFormID, "additionalCommittments") ==
                "Yes"
                ? true
                : false,
          },
        };
        break;
      case "CommittmentSubForm":
        varQL = {
          privatePlacementAndVc: {
            whenFutureCommittmentDate: this.getSubFormFieldValue(
              subFormID,
              "committmentDate"
            ),
            futureCommittmentDollarAmount:
              this.getSubFormFieldValue(subFormID, "committmentAmount") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "committmentAmount")
                )
                : 0,
          },
        };
        break;
      case "PrimaryResidenceSubForm":
        break;
      case "PropertySubForm":
        varQL = {
          realState: {
            typeOfProperty: this.getSubFormFieldValue(
              subFormID,
              "propertyType"
            ),
          },
        };
        break;
      case "InvestmentPropertySubForm":
        varQL = {
          realState: {
            purchasePriceOfProperty:
              this.getSubFormFieldValue(subFormID, "purchasePrice") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "purchasePrice")
                )
                : 0,
            monthlyLease:
              this.getSubFormFieldValue(subFormID, "monthlyRent") != ""
                ? parseInt(this.getSubFormFieldValue(subFormID, "monthlyRent"))
                : 0,
            totalMonthlyExpenses:
              this.getSubFormFieldValue(subFormID, "totalMonthlyExpenses") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "totalMonthlyExpenses")
                )
                : 0,
            downpayment:
              this.getSubFormFieldValue(subFormID, "downPayment") != ""
                ? parseInt(this.getSubFormFieldValue(subFormID, "downPayment"))
                : 0,
            investmentPropertyAddress: this.getSubFormFieldValue(
              subFormID,
              "investmentPropertyAddress"
            ),
          },
        };
        break;
      case "InvestmentPropertyExpensesSubForm":
        varQL = {
          investmentPropertyExpenses: subFormData["rows"],
        };
        break;
      case "StockSubForm":
        varQL = {
          stockIndividualSubforms: subFormData["rows"],
        };
        break;
      case "UserPortfolioSubForm":
        varQL = {
          userDefinedPortfolio: {
            portfolioPercentageOfSAndP500:
              this.getSubFormFieldValue(subFormID, "spPortfolio") != ""
                ? parseInt(this.getSubFormFieldValue(subFormID, "spPortfolio"))
                : 0,
            portfolioPercentageOfRealEstate:
              this.getSubFormFieldValue(subFormID, "realEstatePortfolio") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "realEstatePortfolio")
                )
                : 0,
            portfolioPercentageOfBonds:
              this.getSubFormFieldValue(subFormID, "bondsPortfolio") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "bondsPortfolio")
                )
                : 0,
            portfolioPercentageOfCash:
              this.getSubFormFieldValue(subFormID, "cashPortfolio") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "cashPortfolio")
                )
                : 0,
            portfolioPercentageOfGold:
              this.getSubFormFieldValue(subFormID, "goldPortfolio") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "goldPortfolio")
                )
                : 0,
            totalPercentage:
              this.getSubFormFieldValue(subFormID, "totalPercentage") != ""
                ? parseInt(
                  this.getSubFormFieldValue(subFormID, "totalPercentage")
                )
                : 0,
          },
        };
        break;
      case "TaxLiquiditySubForm":
        varQL = {
          taxAndLiquidity: {
            costBasis:
              this.getSubFormFieldValue(subFormID, "basisCost") != ""
                ? parseInt(this.getSubFormFieldValue(subFormID, "basisCost"))
                : 0,
            costBasisDate: this.getSubFormFieldValue(
              subFormID,
              "costBasisDate"
            ),
            taxibility:
              this.getSubFormFieldValue(subFormID, "taxability") == "Taxable"
                ? true
                : false,
            // "rmdEligible":
            thisAssetIsLiquid:
              this.getSubFormFieldValue(subFormID, "assetLiquid") == "Yes"
                ? true
                : false,
            abilityForPartialSale:
              this.getSubFormFieldValue(subFormID, "partialSaleAbility") ==
                "Yes"
                ? true
                : false,
            taxabilityOnDistribution: this.getSubFormFieldValue(
              subFormID,
              "distributionTaxability"
            ),
          },
        };
        break;
      case "EndSubForm":
    }

    return varQL;
  }

  updateSubForm(subFormID, subFormData, visible = true, bEnd = false) {
    console.log("subFormID", subFormID);
    let formData = this.state.formData;
    var bFound = false;
    for (var findex = 0; findex < formData.length; findex++) {
      if (formData[findex]["id"] == subFormID) {
        formData[findex]["data"] = subFormData;
        bFound = true;
      }
    }

    if (!bFound) {
      formData.push({
        id: subFormID,
        data: subFormData,
        visible: visible,
      });
    }

    console.log("updateSubForm>>>", formData);

    let varQL = this.createQLVariable(subFormID, subFormData);

    console.log("varQL:", varQL, ", dataID:", this.state.dataID);
    // varQL = null;
    var instance = this;
    if (varQL != null) {
      if (this.state.dataID == null) {
        fnMutationAssetsAdd({ variables: { data: varQL } }).then((response) => {
          instance.setState({
            dataID: response["data"]["createAsset"]["id"],
          });
        });
      } else {
        fnMutationAssetsUpdate({
          variables: { id: this.state.dataID, data: varQL },
        }).then((response) => {
          if (bEnd) {
            alert("Updated Successfully");
            instance.props.history.push("/assets");
          }
        });
      }
    }

    this.setState({
      formData: formData,
    });
  }

  getSubFormData(subFormID, fromState = true, pformData) {
    let formData;
    if (fromState) {
      formData = this.state.formData;
    } else {
      formData = pformData;
    }

    for (var findex = 0; findex < formData.length; findex++) {
      if (formData[findex]["id"] == subFormID) {
        return formData[findex]["data"];
      }
    }

    return {};
  }

  goSubForm(subFormID) {
    this.setState({
      formVisible: false,
    });

    if (subFormID === 'StepAssetAllocationSubForm') {
      let fd = initialFormData({});
      this.setState({ formData: fd, isEndForm: false })
    }

    let nextSubForm = AssetInformationSubForm;

    switch (subFormID) {
      case "AssetInformationSubForm":
        nextSubForm = AssetInformationSubForm;
        this.setState({ isEndForm: false })
        break;
      case "StepAssetInformationSubForm":
        nextSubForm = AssetInformationSubForm;
        subFormID = "AssetInformationSubForm";
        break;
      case "QuestionContributionDistributionSubForm":
        nextSubForm = QuestionContributionDistributionSubForm;
        break;
      case "StepQuestionContributionDistributionSubForm":
        nextSubForm = QuestionContributionDistributionSubForm;
        subFormID = "QuestionContributionDistributionSubForm";
        break;
      case "QuestionRMDAdditionalSubForm":
        nextSubForm = QuestionRMDAdditionalSubForm;
        break;
      case "QuestionShowFieldsAirplane":
        nextSubForm = QuestionShowFieldsAirplane;
        break;
      case "InheritedIRASubForm":
        nextSubForm = InheritedIRASubForm;
        break;
      case "ContributionSubForm":
        nextSubForm = ContributionSubForm;
        break;
      case "AssetAllocationSubForm":
        nextSubForm = AssetAllocationSubForm;
        break;
      case "StepAssetAllocationSubForm":
        nextSubForm = AssetAllocationSubForm;
        subFormID = "AssetAllocationSubForm";
        break;
      case "SellingAssetCostsSubForm":
        nextSubForm = SellingAssetCostsSubForm;
        break;
      case "AssetPerformanceSubForm":
        nextSubForm = AssetPerformanceSubForm;
        break;
      case "StepAssetPerformanceSubForm":
        nextSubForm = AssetPerformanceSubForm;
        subFormID = "AssetPerformanceSubForm";
        break;
      case "CollectiblesSubForm":
        nextSubForm = CollectiblesSubForm;
        break;
      case "LiveStockSubForm":
        nextSubForm = LiveStockSubForm;
        break;
      case "VCSubForm":
        nextSubForm = VCSubForm;
        break;
      case "CommittmentSubForm":
        nextSubForm = CommittmentSubForm;
        break;
      case "PrimaryResidenceSubForm":
        nextSubForm = PrimaryResidenceSubForm;
        break;
      case "PropertySubForm":
        nextSubForm = PropertySubForm;
        break;
      case "InvestmentPropertySubForm":
        nextSubForm = InvestmentPropertySubForm;
        break;
      case "InvestmentPropertyExpensesSubForm":
        nextSubForm = InvestmentPropertyExpensesSubForm;
        break;
      case "StockSubForm":
        nextSubForm = StockSubForm;
        break;
      case "UserPortfolioSubForm":
        nextSubForm = UserPortfolioSubForm;
        break;
      case "TaxLiquiditySubForm":
        nextSubForm = TaxLiquiditySubForm;
        break;
      case "StepTaxLiquiditySubForm":
        nextSubForm = TaxLiquiditySubForm;
        subFormID = "TaxLiquiditySubForm";
        break;
      case "EndSubForm":
        nextSubForm = EndSubForm;
        this.setState({ isEndForm: true })
        break;
      case "StepAccountTypeQuestions":
        switch (
        this.getSubFormFieldValue("AssetInformationSubForm", "accountType")
        ) {
          case "529":
          case "Custodial":
          case "Coverdell Education":
          case "Individual":
          case "Health Savings Account":
          case "Joint - Tenants In Common":
          case "Joint":
          case "Roth":
          case "Trust":
            nextSubForm = QuestionContributionDistributionSubForm;
            subFormID = "QuestionContributionDistributionSubForm";
            break;
          default:
            nextSubForm = QuestionRMDAdditionalSubForm;
            subFormID = "QuestionRMDAdditionalSubForm";
        }
        break;

      case "StepAdditionalAssetInformation":
        switch (
        this.getSubFormFieldValue(
          "AssetAllocationSubForm",
          "assetsAllocation"
        )
        ) {
          case "Airplane":
          case "Auto - non-collectible":
          case "Boat":
          case "General Household":
          case "Motorcycles":
            nextSubForm = QuestionShowFieldsAirplane;
            subFormID = "QuestionShowFieldsAirplane";
            break;
          case "Indexes, ETF's and Mutual Funds":
          case "Bonds - Int  Long Term":
          case "Business Interest":
          case "Cash/CD's T-Bills":
          case "Club Membership":
            nextSubForm = SellingAssetCostsSubForm;
            subFormID = "SellingAssetCostsSubForm";
            break;
          case "Collectibles":
            nextSubForm = CollectiblesSubForm;
            subFormID = "CollectiblesSubForm";
            break;
          case "Livestock":
            nextSubForm = LiveStockSubForm;
            subFormID = "LiveStockSubForm";
            break;
          case "Private Placement & VC":
            nextSubForm = VCSubForm;
            subFormID = "VCSubForm";
            break;
          case "Real Estate":
            nextSubForm = PrimaryResidenceSubForm;
            subFormID = "PrimaryResidenceSubForm";
            break;
          case "Stocks - Individual":
            nextSubForm = StockSubForm;
            subFormID = "StockSubForm";
            break;
          case "User Defined Portfolio Allocation":
            nextSubForm = UserPortfolioSubForm;
            subFormID = "UserPortfolioSubForm";
            break;
          default:
            nextSubForm = AssetAllocationSubForm;
            subFormID = "AssetAllocationSubForm";
        }
        break;

      case "StepSellingAssetCostsInformation":
        switch (
        this.getSubFormFieldValue(
          "AssetAllocationSubForm",
          "assetsAllocation"
        )
        ) {
          case "Airplane":
          case "Auto - non-collectible":
          case "Boat":
          case "Motorcycles":
            nextSubForm = QuestionShowFieldsAirplane;
            subFormID = "QuestionShowFieldsAirplane";
            break;
          // case "Indexes, ETF's and Mutual Funds":
          // case "Bonds - Int \ Long Term":
          // case "Business Interest":
          // case "Cash/CD's T-Bills":
          // case "Club Membership":
          //     nextSubForm = SellingAssetCostsSubForm;
          //     subFormID = "SellingAssetCostsSubForm";
          //     break;
          // case "Collectibles":
          //     nextSubForm = CollectiblesSubForm;
          //     subFormID = "CollectiblesSubForm";
          //     break;
          // case "Livestock":
          //     nextSubForm = LiveStockSubForm;
          //     subFormID = "LiveStockSubForm";
          //     break;
          // case "Private Placement & VC":
          //     nextSubForm = VCSubForm;
          //     subFormID = "VCSubForm";
          //     break;
          // case "Real Estate":
          //     nextSubForm = PrimaryResidenceSubForm;
          //     subFormID = "PrimaryResidenceSubForm";
          //     break;
          // case "Stocks - Individual":
          //     nextSubForm = StockSubForm;
          //     subFormID = "StockSubForm";
          //     break;
          // case "User Defined Portfolio Allocation":
          //     nextSubForm = UserPortfolioSubForm;
          //     subFormID = "UserPortfolioSubForm";
          //     break;
          default:
            nextSubForm = AssetAllocationSubForm;
            subFormID = "AssetAllocationSubForm";
        }
        break;
    }

    let subFormData = this.getSubFormData(subFormID);

    setTimeout(() => {
      this.setState({
        formVisible: true,
        curSubFormID: subFormID,
        curSubForm: nextSubForm,
        subFormData: subFormData,
      });
    }, 100);
  }

  toggleRightSide = (e) => {
    e.preventDefault();
    this.setState({ isRightSideOpen: !this.state.isRightSideOpen });
  };

  loadDBData(formData) {
    console.log("loadDBData formData:", formData);

    var instance = this;
    setTimeout(function () {
      instance.setState({
        formVisible: true,
        dbLoaded: true,
        formData: formData,
        subFormData: instance.getSubFormData(
          instance.state.curSubFormID,
          false,
          formData
        ),
      });
    }, 100);
  }

  getTopNav(formStep) {
    let disabled = false;
    let active = false;

    let assetsAllocation = this.getSubFormFieldValue(
      "AssetAllocationSubForm",
      "assetsAllocation"
    );
    let isSpouseSole = this.getSubFormFieldValue(
      "QuestionRMDAdditionalSubForm",
      "isSpouseSole"
    );
    let accountType = this.getSubFormFieldValue(
      "AssetInformationSubForm",
      "accountType"
    );
    let regularContribution = this.getSubFormFieldValue(
      "QuestionContributionDistributionSubForm",
      "regularContribution"
    );
    let isPrimaryResidence = this.getSubFormFieldValue(
      "PrimaryResidenceSubForm",
      "isPrimaryResidence"
    );
    // formStep2FormMap
    // this.state.curSubFormID
    //getting stepid from subform
    let curSubFormStepIndex = -1;
    for (var sindex = 0; sindex < this.state.formSteps.length; sindex++) {
      if (this.state.curSubFormID == "EndSubForm") {
        if (this.state.formSteps[sindex].id == formStep.id) {
          curSubFormStepIndex = sindex;
          break;
        }
      }
      for (
        var findex = 0;
        findex <
        this.state.formStep2FormMap[this.state.formSteps[sindex].id].length;
        findex++
      ) {
        if (
          this.state.formStep2FormMap[this.state.formSteps[sindex].id][
          findex
          ] == this.state.curSubFormID
        ) {
          curSubFormStepIndex = sindex;
          break;
        }
      }
    }

    if (this.state.isEndForm && formStep.id !== 'StepAssetAllocationSubForm') {
      return {
        disabled: true,
        active: false,
      };
    }

    if (assetsAllocation != null && assetsAllocation != "") {
      switch (formStep.id) {
        case "StepAssetAllocationSubForm":
          if (curSubFormStepIndex === 0) {
            if (this.state.isEndForm) {
              disabled = false;
              active = true;
            } else {
              disabled = true;
              active = false;
              assetsAllocation = '';
            }
          }
          if (curSubFormStepIndex >= 0) {
            active = true;
          }
          break;

        case "StepAssetInformationSubForm":
          if (curSubFormStepIndex >= 1) {
            active = true;
          }
          break;
        case "StepSellingAssetCostsInformation":
          if (curSubFormStepIndex >= 5) {
            active = true;
          }
          switch (assetsAllocation) {
            // case "General Household":
            case "Club Membership":
            case "Real Estate":
            case "Business Interest":
            case "Livestock":
            case "Collectibles":
            case "Private Placement & VC":
            // case "Cash/CD's T-Bills":
            // case "Bonds - Int  Long Term":
            // case "Indexes, ETF's and Mutual Funds":
            case "Stocks - Individual":
            // case "Trust Deeds":
            case "User Defined Portfolio Allocation":
              disabled = true;
          }

          break;

        case "StepAdditionalAssetInformation":
          if (curSubFormStepIndex >= 4) {
            active = true;
          }
          switch (assetsAllocation) {
            case "Airplane":
            case "Boat":
            case "Motorcycles":
            case "Auto - non-collectible":
            case "Bonds - Int  Long Term":
            case "Indexes, ETF's and Mutual Funds":
            case "General Household":
            case "Cash/CD's T-Bills":
            case "Trust Deeds":
              disabled = true;
          }
          break;

        case "StepAccountTypeQuestions":
          if (curSubFormStepIndex >= 2) {
            active = true;
          }
          switch (assetsAllocation) {
            case "Airplane":
            case "Boat":
            case "Motorcycles":
            case "General Household":
            case "Club Membership":
            case "Real Estate":
            case "Auto - non-collectible":
            case "Business Interest":
            case "Livestock":
            case "Collectibles":
            case "Private Placement & VC":
            case "Cash/CD's T-Bills":
              disabled = true;
          }
          break;
        case "StepQuestionContributionDistributionSubForm":
          if (curSubFormStepIndex >= 3) {
            active = true;
          }
          switch (assetsAllocation) {
            case "Airplane":
            case "Boat":
            case "Motorcycles":
            case "General Household":
            case "Club Membership":
            case "Real Estate":
            case "Auto - non-collectible":
            case "Business Interest":
            case "Livestock":
            case "Collectibles":
            case "Private Placement & VC":
              disabled = true;
          }
          break;
        case "StepAdditionalAssetInformation":
          if (curSubFormStepIndex >= 4) {
            active = true;
          }
          switch (assetsAllocation) {
            case "Indexes, ETF's and Mutual Funds":
            case "Bonds - Int  Long Term":
            // case "Club Membership":
            case "Business Interest":
            case "Cash/CD's T-Bills":
              disabled = true;
          }
          break;
        case "StepAssetPerformanceSubForm":
          if (curSubFormStepIndex >= 6) {
            active = true;
          }
          break;
        case "StepTaxLiquiditySubForm":
          if (curSubFormStepIndex >= 7) {
            active = true;
          }
          break;
      }
    } else {
      if (formStep.id != "StepAssetAllocationSubForm") {
        disabled = true;
      }
    }

    return {
      disabled: disabled,
      active: active,
    };
  }
  getRightSideFormData(formStep) {
    let formData = [];
    let assetsAllocation = this.getSubFormFieldValue(
      "AssetAllocationSubForm",
      "assetsAllocation"
    );
    let isSpouseSole = this.getSubFormFieldValue(
      "QuestionRMDAdditionalSubForm",
      "isSpouseSole"
    );
    let accountType = this.getSubFormFieldValue(
      "AssetInformationSubForm",
      "accountType"
    );
    let regularContribution = this.getSubFormFieldValue(
      "QuestionContributionDistributionSubForm",
      "regularContribution"
    );
    let isPrimaryResidence = this.getSubFormFieldValue(
      "PrimaryResidenceSubForm",
      "isPrimaryResidence"
    );

    if (assetsAllocation == null || assetsAllocation == "") {
      return formData;
    }

    for (var index = 0; index < this.state.formData.length; index++) {
      if (formStep.id == this.state.formData[index]["stepId"]) {
        switch (formStep.id) {
          case "StepAssetAllocationSubForm":
            formData.push(this.state.formData[index]);
            break;
          case "StepAssetInformationSubForm":
            formData.push(this.state.formData[index]);
            break;
          case "StepAccountTypeQuestions":
            switch (assetsAllocation) {
              case "Airplane":
              case "Boat":
              case "Motorcycles":
              case "General Household":
              case "Club Membership":
              case "Real Estate":
              case "Auto - non-collectible":
              case "Business Interest":
              case "Livestock":
              case "Collectibles":
              case "Private Placement & VC":
              case "Cash/CD's T-Bills":
                break;
              default:
                if (this.state.formData[index]["id"] == "InheritedIRASubForm") {
                  if (accountType == "IRA Inherited") {
                    formData.push(this.state.formData[index]);
                  }
                } else {
                  formData.push(this.state.formData[index]);
                }

                break;
            }
            break;
          case "StepQuestionContributionDistributionSubForm":
            switch (assetsAllocation) {
              case "Airplane":
              case "Boat":
              case "Motorcycles":
              case "General Household":
              case "Club Membership":
              case "Real Estate":
              case "Auto - non-collectible":
              case "Business Interest":
              case "Livestock":
              case "Collectibles":
              case "Private Placement & VC":
                break;
              default:
                if (this.state.formData[index]["id"] == "ContributionSubForm") {
                  if (regularContribution == "Yes") {
                    formData.push(this.state.formData[index]);
                  }
                } else {
                  formData.push(this.state.formData[index]);
                }
                break;
            }
            break;
          case "StepAdditionalAssetInformation":
            if (
              assetsAllocation == "Stocks - Individual" &&
              this.state.formData[index]["id"] == "StockSubForm"
            ) {
              console.log(this.state.formData[index]["data"]["rows"]);
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "User Defined Portfolio Allocation" &&
              this.state.formData[index]["id"] == "UserPortfolioSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "Airplane" &&
              this.state.formData[index]["id"] == "SellingAssetCostsSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "Boat" &&
              this.state.formData[index]["id"] == "SellingAssetCostsSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "Motorcycles" &&
              this.state.formData[index]["id"] == "SellingAssetCostsSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "General Household" &&
              this.state.formData[index]["id"] == "SellingAssetCostsSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "Club Membership" &&
              this.state.formData[index]["id"] == "SellingAssetCostsSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "Real Estate" &&
              isPrimaryResidence == "No" &&
              (this.state.formData[index]["id"] == "PropertySubForm" ||
                this.state.formData[index]["id"] ==
                "InvestmentPropertySubForm" ||
                this.state.formData[index]["id"] ==
                "InvestmentPropertyExpensesSubForm")
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "Auto - non-collectible" &&
              this.state.formData[index]["id"] == "SellingAssetCostsSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "Livestock" &&
              this.state.formData[index]["id"] == "LiveStockSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "Collectibles" &&
              this.state.formData[index]["id"] == "CollectiblesSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              assetsAllocation == "Private Placement & VC" &&
              (this.state.formData[index]["id"] == "VCSubForm" ||
                this.state.formData[index]["id"] == "CommittmentSubForm")
            ) {
              formData.push(this.state.formData[index]);
            }
            break;
          case "StepAssetPerformanceSubForm":
            formData.push(this.state.formData[index]);
            break;
          case "StepTaxLiquiditySubForm":
            formData.push(this.state.formData[index]);
            break;
          default:
            formData.push(this.state.formData[index]);
            break;
        }
      }
    }

    return formData;
  }

  goNext(fromSubFormID) {
    let nextSubFormID = "";

    let assetsAllocation = this.getSubFormFieldValue(
      "AssetAllocationSubForm",
      "assetsAllocation"
    );
    let isSpouseSole = this.getSubFormFieldValue(
      "QuestionRMDAdditionalSubForm",
      "isSpouseSole"
    );
    let accountType = this.getSubFormFieldValue(
      "AssetInformationSubForm",
      "accountType"
    );
    let isShowfield = this.getSubFormFieldValue(
      "QuestionShowFieldsAirplane",
      "isShowfield"
    );
    let regularContribution = this.getSubFormFieldValue(
      "QuestionContributionDistributionSubForm",
      "regularContribution"
    );
    let isPrimaryResidence = this.getSubFormFieldValue(
      "PrimaryResidenceSubForm",
      "isPrimaryResidence"
    );

    switch (fromSubFormID) {
      // StepAssetAllocationSubForm
      case "AssetAllocationSubForm":
        nextSubFormID = "AssetInformationSubForm";
        break;

      // StepAssetInformationSubForm
      case "AssetInformationSubForm":
        switch (accountType) {
          case "529":
          case "Custodial":
          case "Coverdell Education":
          case "Individual":
          case "Health Savings Account":
          case "Joint":
          case "Roth":
          case "Trust":
            nextSubFormID = "QuestionContributionDistributionSubForm";
          default:
            nextSubFormID = "QuestionRMDAdditionalSubForm";
        }

        switch (assetsAllocation) {
          case "Airplane":
          case "Boat":
          case "Motorcycles":
          case "General Household":
            nextSubFormID = "StepAdditionalAssetInformation";
            break;
          case "Club Membership":
            nextSubFormID = "StepAssetPerformanceSubForm";
            break;
          case "Real Estate":
          case "Auto - non-collectible":
            nextSubFormID = "StepAdditionalAssetInformation";
            break;
          case "Business Interest":
            nextSubFormID = "StepAssetPerformanceSubForm";
            break;
          case "Livestock":
          case "Collectibles":
          case "Private Placement & VC":
            nextSubFormID = "StepAdditionalAssetInformation";
            break;
          case "Cash/CD's T-Bills":
            nextSubFormID = "StepAdditionalAssetInformation";
        }
        break;
      // StepAccountTypeQuestions
      case "QuestionRMDAdditionalSubForm":
        if (accountType == "IRA Inherited") {
          nextSubFormID = "InheritedIRASubForm";
        } else {
          nextSubFormID = "QuestionContributionDistributionSubForm";
        }
        switch (assetsAllocation) {
          case "Airplane":
          case "Boat":
          case "Motorcycles":
          case "General Household":
          case "Club Membership":
          case "Real Estate":
          case "Auto - non-collectible":
          case "Business Interest":
          case "Livestock":
          case "Collectibles":
          case "Private Placement & VC":
            nextSubFormID = "StepAdditionalAssetInformation";
        }
        break;
      //juniiii
      case "QuestionShowFieldsAirplane":
        if (isShowfield == "Yes") {
          nextSubFormID = "SellingAssetCostsSubForm";
        } else {
          nextSubFormID = "AssetPerformanceSubForm";
        }
        break;
      case "InheritedIRASubForm":
        nextSubFormID = "QuestionContributionDistributionSubForm";
        switch (assetsAllocation) {
          case "Airplane":
          case "Boat":
          case "Motorcycles":
          case "General Household":
          case "Club Membership":
          case "Real Estate":
          case "Auto - non-collectible":
          case "Business Interest":
          case "Livestock":
          case "Collectibles":
          case "Private Placement & VC":
            nextSubFormID = "StepAdditionalAssetInformation";
        }
        break;
      // StepQuestionContributionDistributionSubForm
      case "QuestionContributionDistributionSubForm":
        let regularContribution = this.getSubFormFieldValue(
          "QuestionContributionDistributionSubForm",
          "regularContribution"
        );

        if (regularContribution == "Yes") {
          nextSubFormID = "ContributionSubForm";
        } else {
          nextSubFormID = "StepAdditionalAssetInformation";
        }
        break;

      case "ContributionSubForm":
        nextSubFormID = "StepAdditionalAssetInformation";
        switch (assetsAllocation) {
          case "Indexes, ETF's and Mutual Funds":
          case "Bonds - Int  Long Term":
          case "Cash/CD's T-Bills":
            nextSubFormID = "StepAssetPerformanceSubForm";
            break;
        }
        break;

      // StepAdditionalAssetInformation
      case "SellingAssetCostsSubForm":
        nextSubFormID = "AssetPerformanceSubForm";
        break;
      case "CollectiblesSubForm":
        nextSubFormID = "AssetPerformanceSubForm";
        break;
      case "LiveStockSubForm":
        nextSubFormID = "AssetPerformanceSubForm";
        break;
      case "VCSubForm":
        let additionalCommittments = this.getSubFormFieldValue(
          "VCSubForm",
          "additionalCommittments"
        );
        if (additionalCommittments == "Yes") {
          nextSubFormID = "CommittmentSubForm";
        } else {
          nextSubFormID = "AssetPerformanceSubForm";
        }
        break;
      case "CommittmentSubForm":
        nextSubFormID = "AssetPerformanceSubForm";
        break;
      case "PrimaryResidenceSubForm":
        let isPrimaryResidence = this.getSubFormFieldValue(
          "PrimaryResidenceSubForm",
          "isPrimaryResidence"
        );
        if (isPrimaryResidence == "Yes") {
          nextSubFormID = "AssetPerformanceSubForm";
        } else {
          nextSubFormID = "PropertySubForm";
        }
        break;
      case "PropertySubForm":
        nextSubFormID = "InvestmentPropertySubForm";
        break;
      case "InvestmentPropertySubForm":
        nextSubFormID = "InvestmentPropertyExpensesSubForm";
        break;
      case "InvestmentPropertyExpensesSubForm":
        nextSubFormID = "AssetPerformanceSubForm";
        break;
      case "StockSubForm":
        nextSubFormID = "AssetPerformanceSubForm";
        break;
      case "UserPortfolioSubForm":
        nextSubFormID = "AssetPerformanceSubForm";
        break;
      // StepAssetPerformanceSubForm
      case "AssetPerformanceSubForm":
        nextSubFormID = "TaxLiquiditySubForm";
        break;

      // StepTaxLiquiditySubForm
      case "TaxLiquiditySubForm":
        nextSubFormID = "EndSubForm";
        break;
    }

    this.goSubForm(nextSubFormID);
  }

  goPrev(fromSubFormID) {
    let prevSubFormID = "";
    let assetsAllocation = this.getSubFormFieldValue(
      "AssetAllocationSubForm",
      "assetsAllocation"
    );

    switch (fromSubFormID) {
      // StepAssetAllocationSubForm
      case "AssetAllocationSubForm":
        prevSubFormID = "";
        break;

      // StepAssetInformationSubForm
      case "AssetInformationSubForm":
        prevSubFormID = "AssetAllocationSubForm";
        break;

      // StepAccountTypeQuestions
      case "QuestionRMDAdditionalSubForm":
        prevSubFormID = "";
        break;
      case "InheritedIRASubForm":
        prevSubFormID = "QuestionRMDAdditionalSubForm";
        break;

      // StepQuestionContributionDistributionSubForm
      case "QuestionContributionDistributionSubForm":
        prevSubFormID = "";
        break;

      case "ContributionSubForm":
        prevSubFormID = "QuestionContributionDistributionSubForm";
        break;

      // StepAdditionalAssetInformation
      case "SellingAssetCostsSubForm":
        prevSubFormID = "StepQuestionContributionDistributionSubForm";
        switch (assetsAllocation) {
          case "Airplane":
          case "Boat":
          case "Motorcycles":
          case "General Household":
          case "Club Membership":
          case "Real Estate":
          case "Auto - non-collectible":
          case "Business Interest":
          case "Livestock":
          case "Collectibles":
          case "Private Placement & VC":
            prevSubFormID = "StepAssetInformationSubForm";
        }
        break;
      case "CollectiblesSubForm":
        prevSubFormID = "StepQuestionContributionDistributionSubForm";
        switch (assetsAllocation) {
          case "Airplane":
          case "Boat":
          case "Motorcycles":
          case "General Household":
          case "Club Membership":
          case "Real Estate":
          case "Auto - non-collectible":
          case "Business Interest":
          case "Livestock":
          case "Collectibles":
          case "Private Placement & VC":
            prevSubFormID = "StepAssetInformationSubForm";
        }
        break;
      case "LiveStockSubForm":
        prevSubFormID = "StepQuestionContributionDistributionSubForm";
        switch (assetsAllocation) {
          case "Airplane":
          case "Boat":
          case "Motorcycles":
          case "General Household":
          case "Club Membership":
          case "Real Estate":
          case "Auto - non-collectible":
          case "Business Interest":
          case "Livestock":
          case "Collectibles":
          case "Private Placement & VC":
            prevSubFormID = "StepAssetInformationSubForm";
        }
        break;
      case "VCSubForm":
        prevSubFormID = "StepQuestionContributionDistributionSubForm";
        switch (assetsAllocation) {
          case "Airplane":
          case "Boat":
          case "Motorcycles":
          case "General Household":
          case "Club Membership":
          case "Real Estate":
          case "Auto - non-collectible":
          case "Business Interest":
          case "Livestock":
          case "Collectibles":
          case "Private Placement & VC":
            prevSubFormID = "StepAssetInformationSubForm";
        }
        break;
      case "CommittmentSubForm":
        prevSubFormID = "VCSubForm";
        break;
      case "PrimaryResidenceSubForm":
        prevSubFormID = "";
        break;
      case "PropertySubForm":
        prevSubFormID = "";
        break;
      case "InvestmentPropertySubForm":
        prevSubFormID = "PropertySubForm";
        break;
      case "InvestmentPropertyExpensesSubForm":
        prevSubFormID = "InvestmentPropertySubForm";
        break;
      case "StockSubForm":
        prevSubFormID = "StepQuestionContributionDistributionSubForm";
        switch (assetsAllocation) {
          case "Airplane":
          case "Boat":
          case "Motorcycles":
          case "General Household":
          case "Club Membership":
          case "Real Estate":
          case "Auto - non-collectible":
          case "Business Interest":
          case "Livestock":
          case "Collectibles":
          case "Private Placement & VC":
            prevSubFormID = "StepAssetInformationSubForm";
        }
        break;
      case "UserPortfolioSubForm":
        prevSubFormID = "StepQuestionContributionDistributionSubForm";
        switch (assetsAllocation) {
          case "Airplane":
          case "Boat":
          case "Motorcycles":
          case "General Household":
          case "Club Membership":
          case "Real Estate":
          case "Auto - non-collectible":
          case "Business Interest":
          case "Livestock":
          case "Collectibles":
          case "Private Placement & VC":
            prevSubFormID = "StepAssetInformationSubForm";
        }
        break;

      // StepAssetPerformanceSubForm
      case "AssetPerformanceSubForm":
        prevSubFormID = "StepAdditionalAssetInformation";
        switch (assetsAllocation) {
          case "Indexes, ETF's and Mutual Funds":
          case "Bonds - Int  Long Term":
            prevSubFormID = "StepQuestionContributionDistributionSubForm";
            break;
          case "Club Membership":
          case "Business Interest":
            prevSubFormID = "StepAssetInformationSubForm";
            break;
          case "Cash/CD's T-Bills":
            prevSubFormID = "StepQuestionContributionDistributionSubForm";
        }
        break;

      // StepTaxLiquiditySubForm
      case "TaxLiquiditySubForm":
        prevSubFormID = "AssetPerformanceSubForm";
        break;
    }

    this.goSubForm(prevSubFormID);
  }

  getBeneficiaryAssignmentData(subFormData, subForm) {
    return (
      <React.Fragment>
        <div className="form-brief-top">
          <h4 className="form-brief-title">
            {subFormData["BeneficiaryAssignment"].tittle}
          </h4>
          <span
            className="form-brief-edit-btn"
            onClick={() => this.goSubForm(subForm.id)}
          >
            <Icon type="edit"></Icon>
          </span>

          {subFormData["BeneficiaryAssignment"].rows &&
            subFormData["BeneficiaryAssignment"].rows.map((data) => {
              return (
                <div className="form-brief-item">
                  <p className="form-brief-item-title">
                    {data.beneficiariesName != ""
                      ? data.beneficiariesName + ":"
                      : null}{" "}
                  </p>
                  <p className="form-brief-item-value">{data.percent}</p>
                </div>
              );
            })}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const navlinks = [
      {
        href: "/",
        title: "Home",
      },
      {
        href: "/modules",
        title: "Modules",
      },
      {
        href: "/assets",
        title: "Assets",
      },
    ];
    console.log("this.state.curSubForm", this.state.curSubForm)

    let SubForm = this.state.curSubForm;

    let formpageClassName = "form-page-container-wrap";
    if (this.state.isRightSideOpen) {
      formpageClassName = "form-page-container-wrap right-side--opend";
    } else {
      formpageClassName = "form-page-container-wrap right-side--collapsed";
    }

    return (
      <div className={formpageClassName}>
        <div className="form-page--main-side">
          <div className="steps">
            <div className="logo-container align-items-top justify-content-center">
              <img className="img-asset" src={AssetPlanet} />
            </div>
            <div className="process">
              <div className="process-row">
                {this.state.formSteps.map((formStep, index) => {
                  const { disabled, active } = this.getTopNav(formStep);

                  let className = "btn nav-items btn-circle";
                  if (disabled) {
                    className = "btn nav-items btn-circle disabled";
                  } else if (active) {
                    className = "btn nav-items btn-circle active";
                  }
                  return (
                    <div className="process-step" key={index}>
                      <button
                        type="button"
                        className={className}
                        data-toggle="tab"
                        onClick={() =>
                          !disabled ? this.goSubForm(formStep.id) : null
                        }
                      >
                        {/* <img className="img-icon" src={ImageIcon} /> */}
                        <div style={{ fontSize: 30, color: '#006400' }}>
                          {index + 1}
                        </div>
                      </button>
                      <p className="step-title">{formStep.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <HiddenHook />
          {/*!this.state.dbLoaded && (
            <LoadDBDataHook
              dbLoaded={this.state.dbLoaded}
              dbID={this.state.dbID}
              cbLoadDBData={this.loadDBData}
            />
          )*/}
          <div className="container">
            <div className="page-nav-history">
              {/* {navlinks.map((navlink, index) => {
                return (
                  <span key={index}>
                    <Link
                      key={index}
                      to={navlink.href}
                      className="page-nav-link text-uppercase"
                    >
                      {navlink.title}
                    </Link>
                    {index != navlinks.length - 1 ? "/" : null}
                  </span>
                );
              })} */}
            </div>
            {!this.state.dbLoaded && <div>Loading...</div>}
            {this.state.dbLoaded && (
              <div className="form-page-container">
                <div className="form-page--left-side">
                  {/* <FormPagePose */}
                  <div
                    className="info-form-block"
                    pose={this.state.formVisible ? "visible" : "hidden"}
                  >
                    <SubForm
                      subFormData={this.state.subFormData}
                      cbGoSubForm={this.goSubForm}
                      cbUpdateSubForm={this.updateSubForm}
                      formData={this.state.formData}
                      cbGetSubFormField={this.getSubFormField}
                      cbGoNext={this.goNext}
                      cbGoPrev={this.goPrev}
                      selectedTitle={this.getSubFormFieldValue(
                        "AssetAllocationSubForm",
                        "assetsAllocation"
                      )}
                    />
                  </div>
                  {/* </FormPagePose> */}

                </div>
              </div>
            )}
          </div>
        </div>
        <div className="form-page--right-side">
          <span
            className="right-side-collapse-icon"
            onClick={this.toggleRightSide}
          >
            <i className="fe-menu"></i>
          </span>
          <div className="form-page--right-side-wrap">
            {this.state.formSteps.map((formStep, index) => {
              let formData = this.getRightSideFormData(formStep);
              return formData.map((subForm, sindex) => {
                if (subForm.visible == false) {
                  return <React.Fragment key={sindex}></React.Fragment>;
                }
                let count = 0;
                let go = false;
                let fieldss = null;
                let subFormData = subForm.data;

                if (subFormData["rows"]) {
                  fieldss = subFormData["rows"];
                } else if (subFormData["fields"]) {
                  fieldss = subFormData["fields"];
                }
                count = fieldss.length;

                for (let i = 0; i < parseInt(count); i++) {
                  if (fieldss[i]["value"] != "") {
                    go = true;
                  }
                }

                return (
                  <div className="form-brief-block" key={sindex}>
                    <div className="form-brief-top">
                      {go ? (
                        <h4 className="form-brief-title">
                          {subFormData.title}
                        </h4>
                      ) : null}
                      {/* <h4 className="form-brief-title">{subFormData.title}</h4> */}
                      <span
                        className="form-brief-edit-btn"
                        onClick={() => this.goSubForm(subForm.stepId)}
                      >
                        <Icon type="edit"></Icon>
                      </span>
                    </div>
                    <div className="form-brief-content">
                      {subFormData.fields &&
                        subFormData.fields.map((field, ffindex) => {
                          if (field.value == "" || field.value == null) {
                            return (
                              <React.Fragment key={ffindex}></React.Fragment>
                            );
                          }
                          return (
                            <div className="form-brief-item" key={ffindex}>
                              <p className="form-brief-item-title">
                                {field.title != "" ? field.title + ":" : null}{" "}
                              </p>
                              <p className="form-brief-item-value">
                                {field.hasOwnProperty("type") &&
                                  field["type"] == "currency" &&
                                  float2Currency(field.value)}
                                {field.hasOwnProperty("type") &&
                                  field["type"] == "percent" &&
                                  field.value + " %"}
                                {!field.hasOwnProperty("type") && field.value}
                              </p>
                            </div>
                          );
                        })}
                      {subFormData.rows && subFormData.rows.length > 0 && (
                        <React.Fragment>
                          {subForm.id == "ContributionSubForm" && (
                            <React.Fragment>
                              <div className="form-brief-row">
                                <div className="form-brief-col--33">Cont. Or Dist.</div>
                                <div className="form-brief-col--33">Amount</div>
                                <div className="form-brief-col--33">
                                  Start Date
                                </div>
                                <div className="form-brief-col--33">
                                  End Date
                                </div>
                              </div>
                              {subFormData.rows.map((contribute, cindex) => {
                                return (
                                  <div className="form-brief-row" key={cindex}>
                                    <div className="form-brief-col--33">
                                      {contribute["contributionOrDistribution"]}
                                    </div>
                                    <div className="form-brief-col--33">
                                      {float2Currency(contribute["amount"])}
                                    </div>
                                    <div className="form-brief-col--33">
                                      {contribute["startDate"]}
                                    </div>
                                    <div className="form-brief-col--33">
                                      {contribute["endDate"]}
                                    </div>
                                  </div>
                                );
                              })}
                            </React.Fragment>
                          )}
                          {subForm.id == "LiveStockSubForm" && (
                            <React.Fragment>
                              <div className="form-brief-row">
                                <div className="form-brief-col--50">
                                  Animal Type
                                </div>
                                <div className="form-brief-col--50">Count</div>
                              </div>
                              {subFormData.rows.map((livestock, cindex) => {
                                return (
                                  <div className="form-brief-row" key={cindex}>
                                    <div className="form-brief-col--50">
                                      {livestock["animalType"]}
                                    </div>
                                    <div className="form-brief-col--50">
                                      {livestock["count"]}
                                    </div>
                                  </div>
                                );
                              })}
                            </React.Fragment>
                          )}
                          {subForm.id == "StockSubForm" && (
                            <React.Fragment>
                              <div className="form-brief-row">
                                <div className="form-brief-col--33">
                                  Stock Symbol
                                </div>
                                <div className="form-brief-col--33">
                                  Quantity
                                </div>
                                <div className="form-brief-col--33">
                                  Today's Value
                                </div>
                                <div className="form-brief-col--33">Date</div>
                              </div>
                              {subFormData.rows.map((stock, cindex) => {
                                return (
                                  <div className="form-brief-row" key={cindex}>
                                    <div className="form-brief-col--33">
                                      {stock["stockSymbol"]}
                                    </div>
                                    <div className="form-brief-col--33">
                                      {stock["quantity"]}
                                    </div>
                                    <div className="form-brief-col--33">
                                      {float2Currency(stock["todayValue"])}
                                    </div>
                                    <div className="form-brief-col--33">
                                      {stock["dateOfIndividual"]}
                                    </div>
                                  </div>
                                );
                              })}
                            </React.Fragment>
                          )}
                          {subForm.id ==
                            "InvestmentPropertyExpensesSubForm" && (
                              <React.Fragment>
                                <div className="form-brief-row">
                                  <div className="form-brief-col--33">Amount</div>
                                  <div className="form-brief-col--33">
                                    Start Date
                                  </div>
                                  <div className="form-brief-col--33">
                                    End Date
                                  </div>
                                </div>
                                {subFormData.rows.map(
                                  (propertyExpense, cindex) => {
                                    return (
                                      <div
                                        className="form-brief-row"
                                        key={cindex}
                                      >
                                        <div className="form-brief-col--33">
                                          {float2Currency(
                                            propertyExpense["amount"]
                                          )}
                                        </div>
                                        <div className="form-brief-col--33">
                                          {propertyExpense["startDate"]}
                                        </div>
                                        <div className="form-brief-col--33">
                                          {propertyExpense["endDate"]}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </React.Fragment>
                            )}
                        </React.Fragment>
                      )}
                    </div>
                    {subFormData["BeneficiaryAssignment"]
                      ? this.getBeneficiaryAssignmentData(subFormData, subForm)
                      : null}
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AssetsNew);
