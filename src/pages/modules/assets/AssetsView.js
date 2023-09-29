import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Button, Card, Row, Col, List } from "antd";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { QL_ASSETS_GET } from "../../../constants/queries";

import SellingAssetCostsSubForm from "./subforms/SellingAssetCostsSubForm";
import CollectiblesSubForm from "./subforms/CollectiblesSubForm";
import VCSubForm from "./subforms/VCSubForm";
import StockSubForm from "./subforms/StockSubForm";
import UserPortfolioSubForm from "./subforms/UserPortfolioSubForm";
import ContributionSubForm from "./subforms/ContributionSubForm";
import AssetInformationSubForm from "./subforms/AssetInformationSubForm";
import QuestionRMDAdditionalSubForm from "./subforms/QuestionRMDAdditionalSubForm";
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

function convertDB2FormData(data) {
  let formData = [];
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
    visible: false,
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
  });

  formData.push({
    id: "InheritedIRASubForm",
    data: InheritedIRASubForm.FnCreateFormData({
      birthDate:
        data["asset"]["inheritedInformation"] != null
          ? data["asset"]["inheritedInformation"]["deceasedIraOwnersBirthdate"]
          : "",
      deathDate:
        data["asset"]["inheritedInformation"] != null
          ? data["asset"]["inheritedInformation"]["deceasedIraOwnersDeathDate"]
          : "",
      relationship:
        data["asset"]["inheritedInformation"] != null
          ? data["asset"]["inheritedInformation"][
              "ownersRelationshipToDeceased"
            ]
          : "",
    }),
    visible: true,
  });

  formData.push({
    id: "ContributionSubForm",
    data: {
      title: "Contribution or Distribution",
      data: data["asset"]["contributionOrDistributions"],
    },
    visible: false,
  });

  formData.push({
    id: "AssetAllocationSubForm",
    data: AssetAllocationSubForm.FnCreateFormData({
      value:
        data["asset"]["assetAllocation"] != null
          ? data["asset"]["assetAllocation"]["assetAllocation"]
          : "",
    }),
    visible: true,
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
      monthlyBudget:
        data["asset"]["collectible"] != null
          ? data["asset"]["collectible"]["dollarAppliedToMonthlyBudget"]
          : "",
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
  });

  formData.push({
    id: "LiveStockSubForm",
    data: {
      title: "Additional Principal Payments?",
      data: data["asset"]["livestocks"],
    },
    visible: false,
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
  });

  formData.push({
    id: "CommittmentSubForm",
    data: CommittmentSubForm.FnCreateFormData({
      committmentDate:
        data["asset"]["privatePlacementAndVc"] != null &&
        data["asset"]["privatePlacementAndVc"]["whenFutureCommittmentDate"] !=
          null
          ? data["asset"]["privatePlacementAndVc"]["whenFutureCommittmentDate"]
          : "",
      committmentAmount:
        data["asset"]["privatePlacementAndVc"] != null
          ? data["asset"]["privatePlacementAndVc"][
              "futureCommittmentDollarAmount"
            ]
          : "",
    }),
    visibile: true,
  });

  formData.push({
    id: "PrimaryResidenceSubForm",
    data: PrimaryResidenceSubForm.FnCreateFormData({
      value: "",
    }),
    visibile: true,
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
  });

  formData.push({
    id: "InvestmentPropertyExpensesSubForm",
    data: {
      title: "Investment Property Expenses",
      data:
        data["asset"]["investmentPropertyExpenses"] != null
          ? data["asset"]["investmentPropertyExpenses"]
          : [],
    },
    visible: false,
  });

  formData.push({
    id: "StockSubForm",
    data: {
      title: "Individual Stocks",
      data: data["asset"]["stockIndividualSubforms"],
    },
    visibile: false,
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
          ? data["asset"]["userDefinedPortfolio"]["portfolioPercentageOfBonds"]
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
  });

  return formData;
}

function ViewInformation(props) {
  if (props.dbID != null && props.dbID != "") {
    const { data, loading, error } = useQuery(QL_ASSETS_GET, {
      variables: { id: props.dbID },
    });
    let formData = null;
    if (data) {
      //console.log('data:', data);

      formData = convertDB2FormData(data);
    }

    return (
      <div className="px-4">
        <h4 className="title">Asset View</h4>
        {!data && <p>Loading...</p>}
        {
          <div class="card-columns">
            {data &&
              formData.map((subForm, sindex) => {
                let subFormData = subForm.data;

                if (
                  subFormData.hasOwnProperty("fields") &&
                  subFormData.fields
                ) {
                  var filtered = subFormData.fields.filter(function (el) {
                    return (
                      el.value !== "" &&
                      el.value !== null &&
                      el.value !== undefined
                    );
                  });
                  if (filtered.length) {
                    return (
                      <div class="card">
                        <Card title={subFormData.title} bordered={false}>
                          {filtered.map((field, ffindex) => {
                            return (
                              <div className="info-wrap" key={ffindex}>
                                <div className="info-title text-left">
                                  {field.title}
                                </div>
                                <div className="info-value">
                                  {field.value.toString()}
                                </div>
                              </div>
                            );
                          })}
                        </Card>
                      </div>
                    );
                  }
                }
              })}
          </div>
        }
      </div>
    );
  }

  return (
    <React.Fragment>
      <h4 className="title">Asset View</h4>
    </React.Fragment>
  );
}

class AssetsView extends Component {
  constructor(props) {
    super(props);
    const { assetsID } = this.props.match.params;

    this.state = {
      assetsID: assetsID,
    };
  }

  componentDidMount() {
    // const { assetsID } = this.props.match.params;
    // console.log('assetsID', assetsID);
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

    return (
      <React.Fragment>
        <div className="page-nav-history">
          {/* {navlinks.map((navlink, index) => {
            return (
              <span key={index}>
                <Link key={index} to={navlink.href} className="page-nav-link">
                  {navlink.title}
                </Link>
                {index != navlinks.length - 1 ? "/" : null}
              </span>
            );
          })} */}
        </div>
        <ViewInformation dbID={this.state.assetsID} />
      </React.Fragment>
    );
  }
}

export default connect()(AssetsView);
