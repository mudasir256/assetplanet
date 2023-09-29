import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import ImageIcon from "assets/images/asset.png";
import AssetPlanet from "assets/images/asset-planet-logo.jpg";

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  QL_INSURANCE_PRODUCT_ADD,
  QL_INSURANCE_PRODUCT_UPDATE,
  QL_INSURANCE_PRODUCT_GET,
} from "../../../constants/queries";

import { FormPagePose } from "../../../components/Animations";
import InsuranceTypeSubForm from "./subforms/InsuranceTypeSubForm";
import ProductInformationSubForm from "./subforms/ProductInformationSubForm";
import LongTermInformationSubForm from "./subforms/LongTermInformationSubForm";
import AutoInsuranceInformationSubForm from "./subforms/AutoInsuranceInformationSubForm";
import FinancialInformationSubForm from "./subforms/FinancialInformationSubForm";
import IncomeInformationSubForm from "./subforms/IncomeInformationSubForm";
import EndSubForm from "./subforms/EndSubForm";
import { float2Currency } from "helpers/Utils";

var fnMutationInsuranceProductAdd = null;
var dataMutationInsuranceProductAdd = null;

var fnMutationInsuranceProductUpdate = null;
var dataMutationInsuranceProductUpdate = null;
let prevPos = 0;

function HiddenHook() {
  [
    fnMutationInsuranceProductAdd,
    { dataMutationInsuranceProductAdd },
  ] = useMutation(QL_INSURANCE_PRODUCT_ADD);
  [
    fnMutationInsuranceProductUpdate,
    { dataMutationInsuranceProductUpdate },
  ] = useMutation(QL_INSURANCE_PRODUCT_UPDATE);

  return <React.Fragment></React.Fragment>;
}

function initialFormData(data) {
  let formData = [];

  if (data.hasOwnProperty("insuranceProduct")) {
    formData.push({
      id: "InsuranceTypeSubForm",
      data: InsuranceTypeSubForm.FnCreateFormData({
        value: data["insuranceProduct"]["productInformation"]["insuranceType"],
      }),
      visible: true,
      stepId: "StepInsuranceTypeSubForm",
    });

    formData.push({
      id: "ProductInformationSubForm",
      data: ProductInformationSubForm.FnCreateFormData({
        nickname:
          data["insuranceProduct"]["productInformation"][
            "nicknameOfInsuranceProduct"
          ],
        owner: data["insuranceProduct"]["productInformation"]["owner"],
        policyStartDate:
          data["insuranceProduct"]["productInformation"]["policyStartDate"] ==
          null
            ? ""
            : data["insuranceProduct"]["productInformation"]["policyStartDate"],
        policyEndDate:
          data["insuranceProduct"]["productInformation"]["policyEndDate"] ==
          null
            ? ""
            : data["insuranceProduct"]["productInformation"]["policyEndDate"],
        insure: data["insuranceProduct"]["productInformation"]["insured"],
        addBeneficiaries: data["insuranceProduct"]["productInformation"][
          "addBeneficiaries"
        ]
          ? "Yes"
          : "No",
        beneficiaryName:
          data["insuranceProduct"]["productInformation"]["nameOfBeneficiary"],
        percent: data["insuranceProduct"]["productInformation"]["percent"],
        carrier: data["insuranceProduct"]["productInformation"]["carrier"],
        policy:
          data["insuranceProduct"]["productInformation"][
            "lastFourOfPolicyNumber"
          ],
      }),
      visible: true,
      stepId: "StepProductInformationSubForm",
    });

    formData.push({
      id: "LongTermInformationSubForm",
      data: LongTermInformationSubForm.FnCreateFormData({
        dailyBenefit: data["insuranceProduct"]["longTermCare"]["dailyBenefit"],
        monthlyBenefit:
          data["insuranceProduct"]["longTermCare"]["monthlyBenefit"],
        lifetimeBenefit:
          data["insuranceProduct"]["longTermCare"]["lifetimeBenefit"],
        inflationRider:
          data["insuranceProduct"]["longTermCare"]["inflationRider"],
        eliminationPeriod:
          data["insuranceProduct"]["longTermCare"]["eliminationPeriod"],
      }),
      visible: true,
      stepId: "StepAdditionalInformation",
    });

    formData.push({
      id: "AutoInsuranceInformationSubForm",
      data: AutoInsuranceInformationSubForm.FnCreateFormData({
        bodilyInjuryPerIncident:
          data["insuranceProduct"]["autoInsuranceInformation"][
            "bodilyInjuryPerIncident"
          ],
        bodilyInjuryAggregate:
          data["insuranceProduct"]["autoInsuranceInformation"][
            "bodilyInjuryAggregate"
          ],
        propertyDamagePerIncident:
          data["insuranceProduct"]["autoInsuranceInformation"][
            "propertyDamagePerIncident"
          ],
      }),
      visible: true,
      stepId: "StepAdditionalInformation",
    });

    formData.push({
      id: "FinancialInformationSubForm",
      data: FinancialInformationSubForm.FnCreateFormData({
        annualPremium:
          data["insuranceProduct"]["financialInformation"]["annualPremium"],
        monthlyPremium:
          data["insuranceProduct"]["financialInformation"]["monthlyPremium"],
        deductible:
          data["insuranceProduct"]["financialInformation"]["deductible"],
        cashValue:
          data["insuranceProduct"]["financialInformation"]["cashValue"],
        cashValueDate:
          data["insuranceProduct"]["financialInformation"]["cashValueDate"] ==
          null
            ? ""
            : data["insuranceProduct"]["financialInformation"]["cashValueDate"],
        faceValue:
          data["insuranceProduct"]["financialInformation"]["faceValue"],
      }),
      visible: true,
      stepId: "StepFinancialInformation",
    });

    formData.push({
      id: "IncomeInformationSubForm",
      data: IncomeInformationSubForm.FnCreateFormData({
        frequencyCurrentIncome:
          data["insuranceProduct"]["incomeInformation"][
            "frequencyOfCurrentIncome"
          ],
        currentMonthlyIncome:
          data["insuranceProduct"]["incomeInformation"]["currentMonthlyIncome"],
        currentAnnualIncome:
          data["insuranceProduct"]["incomeInformation"]["currentAnnualIncome"],
        lumpsumPaymentDate:
          data["insuranceProduct"]["incomeInformation"]["lumpSumPaymentDate"] ==
          null
            ? ""
            : data["insuranceProduct"]["incomeInformation"][
                "lumpSumPaymentDate"
              ],
        futureLumpsumPayment:
          data["insuranceProduct"]["incomeInformation"]["futureLumpSumPayment"],
        futureAnnualIncome:
          data["insuranceProduct"]["incomeInformation"]["futureAnnualIncome"],
        dateFutureIncomeEnds:
          data["insuranceProduct"]["incomeInformation"][
            "dateFutureIncomeEnds"
          ] == null
            ? ""
            : data["insuranceProduct"]["incomeInformation"][
                "dateFutureIncomeEnds"
              ],
        futureIncomeDate:
          data["insuranceProduct"]["incomeInformation"]["futureIncomeDate"] ==
          null
            ? ""
            : data["insuranceProduct"]["incomeInformation"]["futureIncomeDate"],
        incomeEndsDeath:
          data["insuranceProduct"]["incomeInformation"]["incomeEndsAtDeath"],
        incomeStartsRetirement:
          data["insuranceProduct"]["incomeInformation"][
            "incomeStartsAtRetirement"
          ],
        taxable: data["insuranceProduct"]["incomeInformation"]["taxable"]
          ? "Yes"
          : "No",
      }),
      visible: true,
      stepId: "StepIncomeInformation",
    });
  } else {
    formData.push({
      id: "InsuranceTypeSubForm",
      data: InsuranceTypeSubForm.FnCreateFormData({
        value: "",
      }),
      visible: true,
      stepId: "StepInsuranceTypeSubForm",
    });

    formData.push({
      id: "ProductInformationSubForm",
      data: ProductInformationSubForm.FnCreateFormData({
        nickname: "",
        owner: "",
        policyStartDate: "",
        policyEndDate: "",
        insure: "",
        addBeneficiaries: "",
        beneficiaryName: "",
        percent: "",
        carrier: "",
        policy: "",
      }),
      visible: true,
      stepId: "StepProductInformationSubForm",
    });

    formData.push({
      id: "LongTermInformationSubForm",
      data: LongTermInformationSubForm.FnCreateFormData({
        dailyBenefit: "",
        monthlyBenefit: "",
        lifetimeBenefit: "",
        inflationRider: "",
        eliminationPeriod: "",
      }),
      visible: true,
      stepId: "StepAdditionalInformation",
    });

    formData.push({
      id: "AutoInsuranceInformationSubForm",
      data: AutoInsuranceInformationSubForm.FnCreateFormData({
        bodilyInjuryPerIncident: "",
        bodilyInjuryAggregate: "",
        propertyDamagePerIncident: "",
      }),
      visible: true,
      stepId: "StepAdditionalInformation",
    });

    formData.push({
      id: "FinancialInformationSubForm",
      data: FinancialInformationSubForm.FnCreateFormData({
        annualPremium: "",
        monthlyPremium: "",
        deductible: "",
        cashValue: "",
        cashValueDate: "",
        faceValue: "",
      }),
      visible: true,
      stepId: "StepFinancialInformation",
    });

    formData.push({
      id: "IncomeInformationSubForm",
      data: IncomeInformationSubForm.FnCreateFormData({
        frequencyCurrentIncome: "",
        currentMonthlyIncome: "",
        currentAnnualIncome: "",
        lumpsumPaymentDate: "",
        futureLumpsumPayment: "",
        futureAnnualIncome: "",
        dateFutureIncomeEnds: "",
        futureIncomeDate: "",
        incomeEndsDeath: "",
        incomeStartsRetirement: "",
        taxable: "",
      }),
      visible: true,
      stepId: "StepIncomeInformation",
    });
  }

  return formData;
}

function LoadDBDataHook(props) {
  if (props.dbID != null && props.dbID != "") {
    const { data, loading, error } = useQuery(QL_INSURANCE_PRODUCT_GET, {
      variables: { id: props.dbID },
    });
    if (data) {
      console.log("call..");
      props.cbLoadDBData(initialFormData(data));
    }
  }

  return <React.Fragment></React.Fragment>;
}

class InsuranceNew extends Component {
  constructor(props) {
    super(props);

    let dbID = null;
    let dbLoaded = true;

    const { insuranceID } = this.props.match.params;

    if (insuranceID) {
      dbID = insuranceID;
      dbLoaded = false;
    }

    let formData = initialFormData({});

    this.state = {
      dataID: dbID,
      curSubFormID: "InsuranceTypeSubForm",
      curSubForm: InsuranceTypeSubForm,
      formVisible: false,
      subFormData: {},
      formData: formData,
      isRightSideOpen: true,
      formSteps: [
        {
          id: "StepInsuranceTypeSubForm",
          icon: "icon_ex.png",
          title: "Insurance Type",
        },
        {
          id: "StepProductInformationSubForm",
          icon: "icon_ex.png",
          title: "Product Information",
        },
        {
          id: "StepAdditionalInformation",
          icon: "icon_ex.png",
          title: "Additional Information",
        },
        {
          id: "StepFinancialInformation",
          icon: "icon_ex.png",
          title: "Financial Information",
        },
        {
          id: "StepIncomeInformation",
          icon: "icon_ex.png",
          title: "Income Information",
        },
      ],
      dbLoaded: dbLoaded,
      dbID: dbID,
      formStep2FormMap: {
        StepInsuranceTypeSubForm: ["InsuranceTypeSubForm"],
        StepProductInformationSubForm: ["ProductInformationSubForm"],
        StepAdditionalInformation: [
          "LongTermInformationSubForm",
          "AutoInsuranceInformationSubForm",
        ],
        StepFinancialInformation: ["FinancialInformationSubForm"],
        StepIncomeInformation: ["IncomeInformationSubForm"],
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
    // this.goSubForm("InsuranceTypeSubForm");
    this.goSubForm(this.state.formSteps[0]["id"]);
  }

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
      case "InsuranceTypeSubForm":
        varQL = {
          productInformation: {
            insuranceType: this.getSubFormFieldValue(
              subFormID,
              "insuranceType"
            ),
          },
        };
        break;
      case "ProductInformationSubForm":
        varQL = {
          productInformation: {
            nicknameOfInsuranceProduct: this.getSubFormFieldValue(
              subFormID,
              "nickname"
            ),
            owner: this.getSubFormFieldValue(subFormID, "owner"),
            policyStartDate: this.getSubFormFieldValue(
              subFormID,
              "policyStartDate"
            ),
            policyEndDate: this.getSubFormFieldValue(
              subFormID,
              "policyEndDate"
            ),
            insured: this.getSubFormFieldValue(subFormID, "insure"),
            addBeneficiaries:
              this.getSubFormFieldValue(subFormID, "addBeneficiaries") == "Yes"
                ? true
                : false,
            nameOfBeneficiary: this.getSubFormFieldValue(
              subFormID,
              "beneficiaryName"
            ),
            percent: parseFloat(
              this.getSubFormFieldValue(subFormID, "percent")
            ),
            carrier: this.getSubFormFieldValue(subFormID, "carrier"),
            lastFourOfPolicyNumber: this.getSubFormFieldValue(
              subFormID,
              "policy"
            ),
          },
        };
        break;
      case "LongTermInformationSubForm":
        varQL = {
          longTermCare: {
            dailyBenefit: parseInt(
              this.getSubFormFieldValue(subFormID, "dailyBenefit")
            ),
            monthlyBenefit: parseInt(
              this.getSubFormFieldValue(subFormID, "monthlyBenefit")
            ),
            lifetimeBenefit: parseInt(
              this.getSubFormFieldValue(subFormID, "lifetimeBenefit")
            ),
            inflationRider: parseInt(
              this.getSubFormFieldValue(subFormID, "inflationRider")
            ),
            eliminationPeriod: this.getSubFormFieldValue(
              subFormID,
              "eliminationPeriod"
            ),
          },
        };
        break;
      case "AutoInsuranceInformationSubForm":
        varQL = {
          autoInsuranceInformation: {
            bodilyInjuryPerIncident: parseInt(
              this.getSubFormFieldValue(subFormID, "bodilyInjuryPerIncident")
            ),
            bodilyInjuryAggregate: parseInt(
              this.getSubFormFieldValue(subFormID, "bodilyInjuryAggregate")
            ),
            propertyDamagePerIncident: parseInt(
              this.getSubFormFieldValue(subFormID, "propertyDamagePerIncident")
            ),
          },
        };
        break;
      case "FinancialInformationSubForm":
        varQL = {
          financialInformation: {
            annualPremium: parseInt(
              this.getSubFormFieldValue(subFormID, "annualPremium")
            ),
            monthlyPremium: parseInt(
              this.getSubFormFieldValue(subFormID, "monthlyPremium")
            ),
            deductible: parseInt(
              this.getSubFormFieldValue(subFormID, "deductible")
            ),
            cashValue: parseInt(
              this.getSubFormFieldValue(subFormID, "cashValue")
            ),
            cashValueDate: this.getSubFormFieldValue(
              subFormID,
              "cashValueDate"
            ),
            faceValue: parseInt(
              this.getSubFormFieldValue(subFormID, "faceValue")
            ),
          },
        };
        break;
      case "IncomeInformationSubForm":
        varQL = {
          incomeInformation: {
            frequencyOfCurrentIncome: this.getSubFormFieldValue(
              subFormID,
              "frequencyCurrentIncome"
            ),
            currentMonthlyIncome: parseInt(
              this.getSubFormFieldValue(subFormID, "currentMonthlyIncome")
            ),
            currentAnnualIncome: parseInt(
              this.getSubFormFieldValue(subFormID, "currentAnnualIncome")
            ),
            lumpSumPaymentDate: this.getSubFormFieldValue(
              subFormID,
              "lumpsumPaymentDate"
            ),
            futureLumpSumPayment: parseInt(
              this.getSubFormFieldValue(subFormID, "futureLumpsumPayment")
            ),
            futureAnnualIncome: parseInt(
              this.getSubFormFieldValue(subFormID, "futureAnnualIncome")
            ),
            dateFutureIncomeEnds: this.getSubFormFieldValue(
              subFormID,
              "dateFutureIncomeEnds"
            ),
            futureIncomeDate: this.getSubFormFieldValue(
              subFormID,
              "futureIncomeDate"
            ),
            incomeEndsAtDeath: this.getSubFormFieldValue(
              subFormID,
              "incomeEndsDeath"
            ),
            incomeStartsAtRetirement: this.getSubFormFieldValue(
              subFormID,
              "incomeStartsRetirement"
            ),
            taxable:
              this.getSubFormFieldValue(subFormID, "taxable") == "Yes"
                ? true
                : false,
          },
        };
        break;
      case "EndSubForm":
    }

    return varQL;
  }

  updateSubForm(subFormID, subFormData, visible = true) {
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

    let varQL = this.createQLVariable(subFormID, subFormData);

    console.log("varQL:", varQL, ", dataID:", this.state.dataID);
    varQL = null;
    var instance = this;
    if (varQL != null) {
      if (this.state.dataID == null) {
        fnMutationInsuranceProductAdd({ variables: { data: varQL } }).then(
          (response) => {
            instance.setState({
              dataID: response["data"]["createInsuranceProduct"]["id"],
            });
          }
        );
      } else {
        fnMutationInsuranceProductUpdate({
          variables: { id: this.state.dataID, data: varQL },
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

    if(subFormID === 'InsuranceTypeSubForm')  {
      let fd = initialFormData({});
      this.setState({formData: fd, isEndForm: false})
    }

    let nextSubForm = InsuranceTypeSubForm;

    let insuranceType = this.getSubFormFieldValue(
      "InsuranceTypeSubForm",
      "insuranceType"
    );

    switch (subFormID) {
      case "InsuranceTypeSubForm":
        nextSubForm = InsuranceTypeSubForm;
        this.setState({isEndForm: false})
        break;
      case "ProductInformationSubForm":
        nextSubForm = ProductInformationSubForm;
        break;
      case "LongTermInformationSubForm":
        nextSubForm = LongTermInformationSubForm;
        break;
      case "AutoInsuranceInformationSubForm":
        nextSubForm = AutoInsuranceInformationSubForm;
        break;
      case "FinancialInformationSubForm":
        nextSubForm = FinancialInformationSubForm;
        break;
      case "IncomeInformationSubForm":
        nextSubForm = IncomeInformationSubForm;
        break;
      case "EndSubForm":
        nextSubForm = EndSubForm;
        this.setState({isEndForm: true})
        break;
      case "StepProductInformationSubForm":
        nextSubForm = ProductInformationSubForm;
       
        break;
      case "StepAdditionalInformation":
        switch (insuranceType) {
          case "Long Term Disability":
          case "Long Term Care":
          case "Long Term Care - Hybrid":
          case "Other":
            nextSubForm = LongTermInformationSubForm;
            break;
          case "Automobile":
            nextSubForm = AutoInsuranceInformationSubForm;
            break;
          default:
            nextSubForm = FinancialInformationSubForm;
        }
        break;
      case "StepFinancialInformation":
        nextSubForm = FinancialInformationSubForm;
        break;
      case "StepIncomeInformation":
        switch (insuranceType) {
          case "Automobile":
          case "Fire":
          case "Earthquake":
          case "Umbrella":
          case "Homeowners":
          case "Flood":
            nextSubForm = EndSubForm;
            break;
          default:
            nextSubForm = IncomeInformationSubForm;
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
    console.log("formData:", formData);

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

    let InsuranceType = this.getSubFormFieldValue(
      "InsuranceTypeSubForm",
      "insuranceType"
    );
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

    if(this.state.isEndForm && formStep.id !== 'StepInsuranceTypeSubForm'){
      return {
        disabled: true,
        active: false,
      };
    }

    if (InsuranceType != null && InsuranceType != "") {
      switch (formStep.id) {
        case "StepInsuranceTypeSubForm":
          if(curSubFormStepIndex === 0) {
            if(this.state.isEndForm) {
              disabled = false;
              active = true;
            } else {
              disabled = true;
              active = false;
              InsuranceType = '';
            }
          }
          if (curSubFormStepIndex >= 0) {
            active = true;
          }
          break;
        case "StepProductInformationSubForm":
          if (curSubFormStepIndex >= 1) {
            active = true;
          }
          break;
        case "StepAdditionalInformation":
          if (curSubFormStepIndex >= 2) {
            active = true;
          }
          switch (InsuranceType) {
            case "Fire":
            case "Earthquake":
            case "Umbrella":
            case "Homeowners":
            case "Speciality and Misc":
            case "Dental":
            case "Renters":
            case "Property and Casualty":
            case "Term - 15 Year":
            case "Term - 25 Year":
            case "Variable Universal Life":
            case "Universal Life":
            case "Term - 20 year":
            case "Whole Life":
            case "Variable Survivorship":
            case "Variable Life":
            case "Term - 30 Year":
            case "Term - 10 Year":
            case "No Medical Exam":
            case "Term - 5 Year":
            case "Guaranteed Issue":
            case "Final Expense":
            case "Life and Health":
            case "Annuity - Immediate":
            case "Annuity - Deferred":
            case "Annuity - Fixed Indexed":
            case "Annuity - Variable":
            case "Annuity - Fixed":
              disabled = true;
          }
          break;
        case "StepFinancialInformation":
          if (curSubFormStepIndex >= 3) {
            active = true;
          }
          switch (InsuranceType) {
            case "Credit - HELOC":
            case "Credit Card - Business":
            case "Credit Card - Personal":
              disabled = true;
          }

          break;
        case "StepIncomeInformation":
          if (curSubFormStepIndex >= 4) {
            active = true;
          }
          switch (InsuranceType) {
            case "Fire":
            case "Earthquake":
            case "Umbrella":
            case "Homeowners":
            case "Speciality and Misc":
              disabled = true;
          }
          break;
      }
    } else {
      if (formStep.id != "StepInsuranceTypeSubForm") {
        disabled = true;
      }
    }

    return {
      disabled: disabled,
      active: active,
    };
  }

  getRightSideFormData(formStep) {
    /*juni code */
    let formData = [];
    let insuranceType = this.getSubFormFieldValue(
      "InsuranceTypeSubForm",
      "insuranceType"
    );

    if (insuranceType == null || insuranceType == "") {
      return formData;
    }

    for (var index = 0; index < this.state.formData.length; index++) {
      if (formStep.id == this.state.formData[index]["stepId"]) {
        switch (formStep.id) {
          case "StepInsuranceTypeSubForm":
            formData.push(this.state.formData[index]);
            break;
          case "StepProductInformationSubForm":
            formData.push(this.state.formData[index]);
            break;
          case "StepAdditionalInformation":
            if (
              insuranceType == "Long Term Care" &&
              this.state.formData[index]["id"] == "LongTermInformationSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              insuranceType == "Long Term Disability" &&
              this.state.formData[index]["id"] == "LongTermInformationSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              insuranceType == "Long Term Care - Hybrid" &&
              this.state.formData[index]["id"] == "LongTermInformationSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              insuranceType == "Other" &&
              this.state.formData[index]["id"] == "LongTermInformationSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              insuranceType == "Automobile" &&
              this.state.formData[index]["id"] ==
                "AutoInsuranceInformationSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              insuranceType == "Flood" &&
              this.state.formData[index]["id"] ==
                "AutoInsuranceInformationSubForm"
            ) {
              formData.push(this.state.formData[index]);
            }
            break;
          case "StepFinancialInformation":
            // switch (insuranceType) {
            //   case "Credit - HELOC":
            //   case "Credit Card - Business":
            //   case "Credit Card - Personal":
            //     break;
            //   default:
            formData.push(this.state.formData[index]);
            break;
          // }
          // break;
          case "StepIncomeInformation":
            // switch (insuranceType) {
            //   case "Credit Card - Business":
            //   case "Credit Card - Personal":
            //     break;
            //   default:
            formData.push(this.state.formData[index]);
            break;
          // }
          // break;
        }
      }
    }

    console.log("getRightSideFormData", formStep.id, insuranceType, formData);

    return formData;
  }

  goNext(fromSubFormID) {
    let nextSubFormID = "";

    let insuranceType = this.getSubFormFieldValue(
      "InsuranceTypeSubForm",
      "insuranceType"
    );
    switch (fromSubFormID) {
      // StepInsuranceTypeSubForm
      case "InsuranceTypeSubForm":
        nextSubFormID = "ProductInformationSubForm";
        break;

      // StepProductInformationSubForm
      case "ProductInformationSubForm":
        switch (insuranceType) {
          case "Long Term Disability":
          case "Long Term Care":
          case "Long Term Care - Hybrid":
          case "Other":
            nextSubFormID = "LongTermInformationSubForm";
            break;
          case "Automobile":
          case "Flood":
            nextSubFormID = "AutoInsuranceInformationSubForm";
            break;
          /*juni code */
          default:
            nextSubFormID = "FinancialInformationSubForm";
            break;
        }

        break;

      // StepAdditionalInformation
      case "LongTermInformationSubForm":
        nextSubFormID = "FinancialInformationSubForm";
        break;
      case "AutoInsuranceInformationSubForm":
        nextSubFormID = "FinancialInformationSubForm";
        break;

      // StepFinancialInformation
      case "FinancialInformationSubForm":
        switch (insuranceType) {
          // case "Fire":
          // case "Earthquake":
          // case "Umbrella":
          // case "Homeowners":
          // case "Speciality and Misc":
          case "Fire":
          case "Earthquake":
          case "Umbrella":
          case "Homeowners":
          case "Speciality and Misc":
            nextSubFormID = "EndSubForm";
            break;
          default:
            nextSubFormID = "IncomeInformationSubForm";
            break;
        }
        break;

      // StepIncomeInformation
      case "IncomeInformationSubForm":
        nextSubFormID = "EndSubForm";
        break;
    }

    this.goSubForm(nextSubFormID);
  }

  goPrev(fromSubFormID) {
    let prevSubFormID = "";
    let insuranceType = this.getSubFormFieldValue(
      "InsuranceTypeSubForm",
      "insuranceType"
    );
    switch (fromSubFormID) {
      // StepInsuranceTypeSubForm
      case "InsuranceTypeSubForm":
        break;

      // StepProductInformationSubForm
      case "ProductInformationSubForm":
        prevSubFormID = "InsuranceTypeSubForm";
        break;

      // StepAdditionalInformation
      case "LongTermInformationSubForm":
        prevSubFormID = "ProductInformationSubForm";
        break;
      case "AutoInsuranceInformationSubForm":
        prevSubFormID = "ProductInformationSubForm";
        break;

      // StepFinancialInformation
      case "FinancialInformationSubForm":
        switch (insuranceType) {
          case "Long Term Disability":
          case "Long Term Care":
          case "Long Term Care - Hybrid":
          case "Other":
            prevSubFormID = "LongTermInformationSubForm";
            break;

          case "Automobile":
          case "Flood":
            prevSubFormID = "AutoInsuranceInformationSubForm";
            break;

          default:
            prevSubFormID = "ProductInformationSubForm";
            break;
        }
        break;

      // StepIncomeInformation
      case "IncomeInformationSubForm":
        prevSubFormID = "FinancialInformationSubForm";
        break;
    }

    this.goSubForm(prevSubFormID);
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
        href: "/insurance",
        title: "Insurance Products",
      },
    ];

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
                          !disabled
                            ? this.goSubForm(
                                this.state.formStep2FormMap[formStep.id][0]
                              )
                            : null
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
          {!this.state.dbLoaded && (
            <LoadDBDataHook
              dbLoaded={this.state.dbLoaded}
              dbID={this.state.dbID}
              cbLoadDBData={this.loadDBData}
            />
          )}
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
                  <FormPagePose
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
                    />
                  </FormPagePose>
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
              console.log(formData);
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

                // let subFormData = subForm.data;
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
                          {subForm.id ==
                            "AdditionalPaymentInformationSubForm" && (
                            <React.Fragment>
                              <div className="form-brief-row">
                                <div className="form-brief-col--33">
                                  Extra Principal Payment Description
                                </div>
                                <div className="form-brief-col--33">
                                  How Much
                                </div>
                                <div className="form-brief-col--33">
                                  How Often
                                </div>
                              </div>
                              {subFormData.rows.map(
                                (additionalPayment, cindex) => {
                                  return (
                                    <div
                                      className="form-brief-row"
                                      key={cindex}
                                    >
                                      <div className="form-brief-col--33">
                                        {
                                          additionalPayment[
                                            "extra_payment_description"
                                          ]
                                        }
                                      </div>
                                      <div className="form-brief-col--33">
                                        {float2Currency(
                                          additionalPayment["howMuch"]
                                        )}
                                      </div>
                                      <div className="form-brief-col--33">
                                        {additionalPayment["howOften"]}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </React.Fragment>
                          )}
                          {subForm.id == "AdjustableLoanDetailsSubForm" && (
                            <React.Fragment>
                              <div className="form-brief-row">
                                <div className="form-brief-col--50">
                                  Date of Rate Change
                                </div>
                                <div className="form-brief-col--50">
                                  newPercent
                                </div>
                              </div>
                              {subFormData.rows.map(
                                (adjustableLoan, cindex) => {
                                  return (
                                    <div
                                      className="form-brief-row"
                                      key={cindex}
                                    >
                                      <div className="form-brief-col--50">
                                        {adjustableLoan["dateRateChange"]}
                                      </div>
                                      <div className="form-brief-col--50">
                                        {adjustableLoan["newPercent"] + " %"}
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

export default connect()(InsuranceNew);
