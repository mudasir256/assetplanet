import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import ImageIcon from "assets/images/asset.png";
import AssetPlanet from "assets/images/asset-planet-logo.jpg";

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  QL_LIABILITIES_CREDIT_ADD,
  QL_LIABILITIES_CREDIT_UPDATE,
  QL_LIABILITIES_CREDIT_GET,
} from "../../../constants/queries";

import { FormPagePose } from "../../../components/Animations";
import LiabilityCreditTypeSubForm from "./subforms/LiabilityCreditTypeSubForm";
import MainSubForm from "./subforms/MainSubForm";
import CreditCardInformationSubForm from "./subforms/CreditCardInformationSubForm";
import LoanInformationSubForm from "./subforms/LoanInformationSubForm";
import HelocInformationSubForm from "./subforms/HelocInformationSubForm";
import LoanPaybackSubForm from "./subforms/LoanPaybackSubForm";
import AdjustableLoanDetailsSubForm from "./subforms/AdjustableLoanDetailsSubForm";
import QuestionAdditionalPaymentSubForm from "./subforms/QuestionAdditionalPaymentSubForm";
import AdditionalPaymentInformationSubForm from "./subforms/AdditionalPaymentInformationSubForm";
import EndSubForm from "./subforms/EndSubForm";

import { float2Currency } from "helpers/Utils";
import FirstStep from "./subforms/FirstStep";
import First from "./subforms/First";
import SecondForm from "./subforms/SecondForm";
import ThirdForm from "./subforms/ThirdForm";

var fnMutationLiabilitiesCreditAdd = null;
var dataMutationLiabilitiesCreditAdd = null;

var fnMutationLiabilitiesCreditUpdate = null;
var dataMutationLiabilitiesCreditUpdate = null;
let prevPos = 0;

function HiddenHook() {
  [
    fnMutationLiabilitiesCreditAdd,
    { dataMutationLiabilitiesCreditAdd },
  ] = useMutation(QL_LIABILITIES_CREDIT_ADD);
  [
    fnMutationLiabilitiesCreditUpdate,
    { dataMutationLiabilitiesCreditUpdate },
  ] = useMutation(QL_LIABILITIES_CREDIT_UPDATE);

  return <React.Fragment></React.Fragment>;
}

function initialFormData(data) {
  let formData = [];

  if (data.hasOwnProperty("liabilitiesAndCredit")) {
    formData.push({
      id: "LiabilityCreditTypeSubForm",
      data: LiabilityCreditTypeSubForm.FnCreateFormData({
        value: data["liabilitiesAndCredit"]["liabilityType"],
      }),
      visible: true,
      stepId: "StepLiabilityCreditTypeSubForm",
    });

    formData.push({
      id: "MainSubForm",
      data: MainSubForm.FnCreateFormData({
        liabilityType: data["liabilitiesAndCredit"]["liabilityType"],
        name: data["liabilitiesAndCredit"]["nameOfLiability"],
        owner: data["liabilitiesAndCredit"]["owner"],
      }),
      visible: true,
      stepId: "StepMainSubForm",
    });

    formData.push({
      id: "LoanInformationSubForm",
      data: LoanInformationSubForm.FnCreateFormData({
        initialAmount: data["liabilitiesAndCredit"]["initialLoanAmount"],
        maturityDate: data["liabilitiesAndCredit"]["maturityDate"],
        startDate: data["liabilitiesAndCredit"]["startDate"],
        interestRate: data["liabilitiesAndCredit"]["interestRate"],
        monthlyPayment: data["liabilitiesAndCredit"]["monthlyPayment"],
        accountDigits: data["liabilitiesAndCredit"]["last4DigitsOfAccount"],
        financialName:
          data["liabilitiesAndCredit"]["nameOfFinancialInstitution"],
        loanLength: data["liabilitiesAndCredit"]["lengthOfLoan"],
        associatedAsset: data["liabilitiesAndCredit"]["associatedAsset"],
      }),
      visible: true,
      stepId: "StepAdditionalInformation",
    });

    formData.push({
      id: "CreditCardInformationSubForm",
      data: CreditCardInformationSubForm.FnCreateFormData({
        creditLimit:
          data["liabilitiesAndCredit"]["additionalCreditCardInformation"][
          "creditLimit"
          ],
        // totalCredit: data['liabilitiesAndCredit']['additionalCreditCardInformation']['totalCreditAvailable'],
        creditBalance:
          data["liabilitiesAndCredit"]["additionalCreditCardInformation"][
          "creditBalance"
          ],
        monthlyPayment:
          data["liabilitiesAndCredit"]["additionalCreditCardInformation"][
          "monthlyPayment"
          ],
        interestRate:
          data["liabilitiesAndCredit"]["additionalCreditCardInformation"][
          "interestRate"
          ],
        phoneNumber:
          data["liabilitiesAndCredit"]["additionalCreditCardInformation"][
          "phoneNumberOfIssuer"
          ],
        annualFee:
          data["liabilitiesAndCredit"]["additionalCreditCardInformation"][
          "annualFee"
          ],
        pointBalance:
          data["liabilitiesAndCredit"]["additionalCreditCardInformation"][
          "pointBalance"
          ],
        // creditRewards: data['liabilitiesAndCredit']['additionalCreditCardInformation']['creditCardRewardsProgram'],
        creditNotes:
          data["liabilitiesAndCredit"]["additionalCreditCardInformation"][
          "additionalNotesAboutCreditCard"
          ],
        expiration:
          data["liabilitiesAndCredit"]["additionalCreditCardInformation"][
          "pointExpiration"
          ],
      }),
      visible: true,
      stepId: "StepAdditionalInformation",
    });

    formData.push({
      id: "HelocInformationSubForm",
      data: HelocInformationSubForm.FnCreateFormData({
        creditLimit: "",
        totalCreditAvailable: "",
        creditBalance: "",
        interestRate: "",
        monthlyPayment: "",
        drawPeriodEndDate: "",
        drawPeriodStartDate: "",
        startDateRepayment: "",
        endDateRepayment: "",
      }),
      visible: true,
      stepId: "StepAdditionalInformation",
    });

    formData.push({
      id: "LoanPaybackSubForm",
      data: LoanPaybackSubForm.FnCreateFormData({
        loanPaybackType: data["liabilitiesAndCredit"]["loanPaybackType"],
        loanType: data["liabilitiesAndCredit"]["typeOfLoan"],
      }),
      visible: true,
      stepId: "StepLoan",
    });

    formData.push({
      id: "AdjustableLoanDetailsSubForm",
      data: AdjustableLoanDetailsSubForm.FnCreateFormData(
        data["liabilitiesAndCredit"]["adjustableLoanDetails"]
      ),
      visible: true,
      stepId: "StepLoanAdjust",
    });

    formData.push({
      id: "QuestionAdditionalPaymentSubForm",
      data: QuestionAdditionalPaymentSubForm.FnCreateFormData({
        value: "",
      }),
      visible: false,
      stepId: "StepPayments",
    });

    formData.push({
      id: "AdditionalPaymentInformationSubForm",
      data: AdditionalPaymentInformationSubForm.FnCreateFormData(
        data["liabilitiesAndCredit"]["additionalPrincipals"]
      ),
      visible: true,
      stepId: "StepPayments",
    });
  } else {
    formData.push({
      id: "LiabilityCreditTypeSubForm",
      data: LiabilityCreditTypeSubForm.FnCreateFormData({
        value: "",
      }),
      visible: true,
      stepId: "StepLiabilityCreditTypeSubForm",
    });

    formData.push({
      id: "MainSubForm",
      data: MainSubForm.FnCreateFormData({
        liabilityType: "",
        name: "",
        owner: "",
      }),
      visible: true,
      stepId: "StepMainSubForm",
    });

    formData.push({
      id: "LoanInformationSubForm",
      data: LoanInformationSubForm.FnCreateFormData({
        initialAmount: "",
        maturityDate: "",
        startDate: "",
        interestRate: "",
        monthlyPayment: "",
        accountDigits: "",
        financialName: "",
        loanLength: "",
        associatedAsset: "",
      }),
      visible: true,
      stepId: "StepAdditionalInformation",
    });

    formData.push({
      id: "CreditCardInformationSubForm",
      data: CreditCardInformationSubForm.FnCreateFormData({
        creditLimit: "",
        // totalCredit: data['liabilitiesAndCredit']['additionalCreditCardInformation']['totalCreditAvailable'],
        creditBalance: "",
        monthlyPayment: "",
        interestRate: "",
        phoneNumber: "",
        annualFee: "",
        pointBalance: "",
        // creditRewards: data['liabilitiesAndCredit']['additionalCreditCardInformation']['creditCardRewardsProgram'],
        creditNotes: "",
        expiration: "",
      }),
      visible: true,
      stepId: "StepAdditionalInformation",
    });

    formData.push({
      id: "HelocInformationSubForm",
      data: HelocInformationSubForm.FnCreateFormData({
        creditLimit: "",
        totalCreditAvailable: "",
        creditBalance: "",
        interestRate: "",
        monthlyPayment: "",
        drawPeriodEndDate: "",
        drawPeriodStartDate: "",
        startDateRepayment: "",
        endDateRepayment: "",
      }),
      visible: true,
      stepId: "StepAdditionalInformation",
    });

    formData.push({
      id: "LoanPaybackSubForm",
      data: LoanPaybackSubForm.FnCreateFormData({
        loanPaybackType: "",
        loanType: "",
      }),
      visible: true,
      stepId: "StepLoan",
    });

    formData.push({
      id: "AdjustableLoanDetailsSubForm",
      data: AdjustableLoanDetailsSubForm.FnCreateFormData([]),
      visible: true,
      stepId: "StepLoanAdjust",
    });

    formData.push({
      id: "QuestionAdditionalPaymentSubForm",
      data: QuestionAdditionalPaymentSubForm.FnCreateFormData({
        value: "",
      }),
      visible: false,
      stepId: "StepPayments",
    });

    formData.push({
      id: "AdditionalPaymentInformationSubForm",
      data: AdditionalPaymentInformationSubForm.FnCreateFormData([]),
      visible: true,
      stepId: "StepPayments",
    });
  }

  return formData;
}

function LoadDBDataHook(props) {
  if (props.dbID != null && props.dbID != "") {
    const { data, loading, error } = useQuery(QL_LIABILITIES_CREDIT_GET, {
      variables: { id: props.dbID },
    });
    if (data) {
      console.log("call..", data);
      props.cbLoadDBData(initialFormData(data));
    }
  }

  return <React.Fragment></React.Fragment>;
}

class LiabilityCreditNew extends Component {
  constructor(props) {
    super(props);

    let dbID = null;
    let dbLoaded = true;

    const { liabilitiesCreditID } = this.props.match.params;

    if (liabilitiesCreditID) {
      dbID = liabilitiesCreditID;
      dbLoaded = false;
    }

    let formData = initialFormData({});

    this.state = {
      dataID: dbID,
      curSubFormID: "LiabilityCreditTypeSubForm",
      curSubForm: LiabilityCreditTypeSubForm,
      formVisible: false,
      subFormData: {},
      formData: formData,
      isRightSideOpen: true,
      stepsAttribute: [],
      formSteps: [
        {
          id: "StepLiabilityCreditTypeSubForm",
          icon: "icon_ex.png",
          title: "Liability or Credit",
         
        },
        {
          id: "StepMainSubForm",
          icon: "icon_ex.png",
          title: "Name and Owner",
          component: First,
        },
        {
          id: "StepAdditionalInformation",
          icon: "icon_ex.png",
          title: "Additional Information",
          component: SecondForm,
        },
        {
          id: "StepLoan",
          icon: "icon_ex.png",
          title: "Loan",
          component: ThirdForm,
        },
        {
          id: "StepLoanAdjust",
          icon: "icon_ex.png",
          title: "Adjustable Loan",
        },
        {
          id: "StepPayments",
          icon: "icon_ex.png",
          title: "Payments",
        },
      ],
      dbLoaded: dbLoaded,
      dbID: dbID,
      formStep2FormMap: {
        // "stepid": ['form id', 'formid', 'formid']
        StepLiabilityCreditTypeSubForm: ["LiabilityCreditTypeSubForm"],
        StepMainSubForm: ["MainSubForm"],
        StepAdditionalInformation: [
          "LoanInformationSubForm",
          "CreditCardInformationSubForm",
          "HelocInformationSubForm",
        ],
        StepLoan: ["LoanPaybackSubForm", "AdjustableLoanDetailsSubForm"],
        StepLoanAdjust: ["AdjustableLoanDetailsSubForm"],
        StepPayments: [
          "QuestionAdditionalPaymentSubForm",
          "AdditionalPaymentInformationSubForm",
        ],
      },
      isEndForm: false,
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

    console.log()
    // this.goSubForm('CreditCardInformationSubForm');
  }

  getSubFormField(formID, fieldID) {
    let formData = this.state.formData;
    console.log("getsubformformData", formData, fieldID)
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
    console.log("fieldID", fieldID, formID)
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
      case "LiabilityCreditTypeSubForm":
        varQL = {
          liabilitiesAndCredit: {
            liabilityType: this.getSubFormFieldValue(
              subFormID,
              "liabilityCreditType"
            ),
          },
        };
        break;
      case "MainSubForm":
        varQL = {
          liabilitiesAndCredit: {
            nameOfLiability: this.getSubFormFieldValue(subFormID, "name"),
            owner: this.getSubFormFieldValue(subFormID, "owner"),
          },
        };
        break;
      case "LoanInformationSubForm":
        varQL = {
          liabilitiesAndCredit: {
            initialLoanAmount: parseInt(
              this.getSubFormFieldValue(subFormID, "initialAmount")
            ),
            maturityDate: this.getSubFormFieldValue(subFormID, "maturityDate"),
            startDate: this.getSubFormFieldValue(subFormID, "startDate"),
            interestRate: parseInt(
              this.getSubFormFieldValue(subFormID, "interestRate")
            ),
            monthlyPayment: parseInt(
              this.getSubFormFieldValue(subFormID, "monthlyPayment")
            ),
            last4DigitsOfAccount: this.getSubFormFieldValue(
              subFormID,
              "accountDigits"
            ),
            nameOfFinancialInstitution: this.getSubFormFieldValue(
              subFormID,
              "financialName"
            ),
            associatedAsset: this.getSubFormFieldValue(
              subFormID,
              "associatedAsset"
            ),
          },
        };
        break;
      case "CreditCardInformationSubForm":
        varQL = {
          additionalCreditCardInformation: {
            creditLimit: parseFloat(
              this.getSubFormFieldValue(subFormID, "creditLimit")
            ),
            creditBalance: parseFloat(
              this.getSubFormFieldValue(subFormID, "creditBalance")
            ),
            // "monthlyPayment": parseFloat(this.getSubFormFieldValue(subFormID, 'monthlyPayment')),
            // 'apr'
            phoneNumberOfIssuer: this.getSubFormFieldValue(
              subFormID,
              "phoneNumber"
            ),
            annualFee: parseInt(
              this.getSubFormFieldValue(subFormID, "annualFee")
            ),
            pointBalance: this.getSubFormFieldValue(subFormID, "pointBalance"),
            additionalNotesAboutCreditCard: this.getSubFormFieldValue(
              subFormID,
              "creditNotes"
            ),
            pointExpiration: this.getSubFormFieldValue(subFormID, "expiration"),
          },
        };
        break;
      case "LoanPaybackSubForm":
        varQL = {
          liabilitiesAndCredit: {
            loanPaybackType: this.getSubFormFieldValue(
              subFormID,
              "loanPaybackType"
            ),
            typeOfLoan: this.getSubFormFieldValue(subFormID, "loanType"),
          },
        };
        break;
      case "AdjustableLoanDetailsSubForm":
        varQL = {
          adjustableLoanDetails: subFormData,
        };
        break;
      case "QuestionAdditionalPaymentSubForm":
        break;
      case "AdditionalPaymentInformationSubForm":
        varQL = {
          additionalPrincipals: subFormData,
        };
        break;
    }

    return varQL;
  }

  updateSubForm(subFormID, subFormData, visible = true, bEnd = false) {
    console.log("updateSubForm:", subFormID, subFormData, visible, bEnd);
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

    var instance = this;
    varQL = null;
    if (varQL != null) {
      if (this.state.dataID == null) {
        fnMutationLiabilitiesCreditAdd({ variables: { data: varQL } }).then(
          (response) => {
            instance.setState({
              dataID: response["data"]["createLiabilitiesAndCredit"]["id"],
            });
          }
        );
      } else {
        fnMutationLiabilitiesCreditUpdate({
          variables: { id: this.state.dataID, data: varQL },
        }).then((response) => {
          if (bEnd) {
            alert("Updated Successfully");
            instance.props.history.push("/liabilities_credit");
          }
        });
      }
    }

    this.setState({
      formData: formData,
    });

    console.log("formData:", formData);
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
    // if(!this.state.dbLoaded){
    //     return;
    // }
    console.log("subFormID", subFormID)
    if (subFormID === 'StepLiabilityCreditTypeSubForm') {
      let fd = initialFormData({});
      this.setState({ formData: fd, isEndForm: false })
    }

    let nextSubForm = LiabilityCreditTypeSubForm;

    this.setState({
      formVisible: false,
    });
    let liabilityCreditType = this.getSubFormFieldValue(
      "LiabilityCreditTypeSubForm",
      "liabilityCreditType"
    );

    switch (subFormID) {
      case "LiabilityCreditTypeSubForm":
        nextSubForm = LiabilityCreditTypeSubForm;
        break;
      case "MainSubForm":
        nextSubForm = First;
        break;
      case "LoanInformationSubForm":
        nextSubForm = SecondForm;
        break;
      case "HelocInformationSubForm":
        nextSubForm = HelocInformationSubForm;
        break;
      case "CreditCardInformationSubForm":
        nextSubForm = CreditCardInformationSubForm;
        break;
      case "LoanPaybackSubForm":
        nextSubForm = ThirdForm;
        break;
      case "AdjustableLoanDetailsSubForm":
        nextSubForm = AdjustableLoanDetailsSubForm;
        break;
      case "QuestionAdditionalPaymentSubForm":
        nextSubForm = QuestionAdditionalPaymentSubForm;
        break;
      case "AdditionalPaymentInformationSubForm":
        nextSubForm = AdditionalPaymentInformationSubForm;
        break;
      case "EndSubForm":
        nextSubForm = EndSubForm;
        this.setState({ isEndForm: true })
        break;
      case "StepLiabilityCreditTypeSubForm":
        this.setState({ isEndForm: false })
        nextSubForm = LiabilityCreditTypeSubForm;
        subFormID = "LiabilityCreditTypeSubForm";
        break;
      case "StepMainSubForm":
        nextSubForm = First;
        subFormID = "MainSubForm";
        break;
      case "StepAdditionalInformation":
        switch (liabilityCreditType) {
          case "Credit - HELOC":
            nextSubForm = HelocInformationSubForm;
            subFormID = "HelocInformationSubForm";
            break;
          case "Credit Card - Business":
          case "Credit Card - Personal":
            nextSubForm = CreditCardInformationSubForm;
            subFormID = "CreditCardInformationSubForm";
            break;
          default:
            nextSubForm = SecondForm;
            subFormID = "LoanInformationSubForm";
        }
        break;
      case "StepLoan":
        switch (liabilityCreditType) {
          case "Credit - HELOC":
            nextSubForm = QuestionAdditionalPaymentSubForm;
            subFormID = "QuestionAdditionalPaymentSubForm";
            break;
          case "Credit Card - Business":
          case "Credit Card - Personal":
            nextSubForm = EndSubForm;
            subFormID = "EndSubForm";
            break;
          default:
            nextSubForm = ThirdForm;
            subFormID = "LoanPaybackSubForm";
        }
        break;
      case "StepLoanAdjust":
        switch (liabilityCreditType) {
          case "Credit - HELOC":
            nextSubForm = QuestionAdditionalPaymentSubForm;
            subFormID = "QuestionAdditionalPaymentSubForm";
            break;
          case "Credit Card - Business":
          case "Credit Card - Personal":
            nextSubForm = EndSubForm;
            subFormID = "EndSubForm";
            break;
          default:
            nextSubForm = AdjustableLoanDetailsSubForm;
            subFormID = "AdjustableLoanDetailsSubForm";
        }
        break;
      case "StepPayments":
        switch (liabilityCreditType) {
          case "Credit - HELOC":
            nextSubForm = QuestionAdditionalPaymentSubForm;
            subFormID = "QuestionAdditionalPaymentSubForm";
            break;
          case "Credit Card - Business":
          case "Credit Card - Personal":
            nextSubForm = EndSubForm;
            subFormID = "EndSubForm";
            break;
          default:
            nextSubForm = QuestionAdditionalPaymentSubForm;
            subFormID = "QuestionAdditionalPaymentSubForm";
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

    let liabilityCreditType = this.getSubFormFieldValue(
      "LiabilityCreditTypeSubForm",
      "liabilityCreditType"
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


    if (this.state.isEndForm && formStep.id !== 'StepLiabilityCreditTypeSubForm') {
      return {
        disabled: true,
        active: false,
      };
    }

    if (liabilityCreditType != null && liabilityCreditType != "") {
      switch (formStep.id) {
        case "StepLiabilityCreditTypeSubForm":
          if (curSubFormStepIndex === 0) {
            if (this.state.isEndForm) {
              disabled = false;
              active = true;
            } else {
              disabled = true;
              active = false;
              liabilityCreditType = '';
            }
          }
          if (curSubFormStepIndex >= 0) {
            active = true;
          }
          break;
        case "StepMainSubForm":
          if (curSubFormStepIndex >= 1) {
            active = true;
          }
          break;
        case "StepAdditionalInformation":
          if (curSubFormStepIndex >= 2) {
            active = true;
          }
          break;
        case "StepLoan":
          if (curSubFormStepIndex >= 3) {
            active = true;
          }
          switch (liabilityCreditType) {
            case "Credit - HELOC":
            case "Credit Card - Business":
            case "Credit Card - Personal":
              disabled = true;
          }
          break;
        case "StepLoanAdjust":
          if (curSubFormStepIndex >= 4) {
            active = true;
          }
          switch (liabilityCreditType) {
            case "Credit - HELOC":
            case "Credit Card - Business":
            case "Credit Card - Personal":
              disabled = true;
          }
          break;
        case "StepPayments":
          if (curSubFormStepIndex >= 5) {
            active = true;
          }
          switch (liabilityCreditType) {
            case "Credit Card - Business":
            case "Credit Card - Personal":
              disabled = true;
          }
          break;
      }
    } else {
      if (formStep.id != "StepLiabilityCreditTypeSubForm") {
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
    let liabilityCreditType = this.getSubFormFieldValue(
      "LiabilityCreditTypeSubForm",
      "liabilityCreditType"
    );

    if (liabilityCreditType == null || liabilityCreditType == "") {
      return formData;
    }

    for (var index = 0; index < this.state.formData.length; index++) {
      if (formStep.id == this.state.formData[index]["stepId"]) {
        switch (formStep.id) {
          case "StepLiabilityCreditTypeSubForm":
            formData.push(this.state.formData[index]);
            break;
          case "StepMainSubForm":
            formData.push(this.state.formData[index]);
            break;
          case "StepAdditionalInformation":
            if (this.state.formData[index]["id"] == "LoanInformationSubForm") {
              if (
                liabilityCreditType != "Credit - HELOC" &&
                liabilityCreditType != "Credit Card - Business" &&
                liabilityCreditType != "Credit Card - Personal"
              ) {
                formData.push(this.state.formData[index]);
              }
            }
            if (
              liabilityCreditType == "Credit - HELOC" &&
              this.state.formData[index]["id"] == "HelocInformationSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              liabilityCreditType == "Credit Card - Business" &&
              this.state.formData[index]["id"] == "CreditCardInformationSubForm"
            ) {
              formData.push(this.state.formData[index]);
            } else if (
              liabilityCreditType == "Credit Card - Personal" &&
              this.state.formData[index]["id"] == "CreditCardInformationSubForm"
            ) {
              formData.push(this.state.formData[index]);
            }
            break;
          case "StepLoan":
            switch (liabilityCreditType) {
              case "Credit - HELOC":
              case "Credit Card - Business":
              case "Credit Card - Personal":
                break;
              default:
                formData.push(this.state.formData[index]);
                break;
            }
            break;
          case "StepLoanAdjust":
            switch (liabilityCreditType) {
              case "Credit - HELOC":
              case "Credit Card - Business":
              case "Credit Card - Personal":
                break;
              default:
                formData.push(this.state.formData[index]);
                break;
            }
            break;
          case "StepPayments":
            switch (liabilityCreditType) {
              case "Credit Card - Business":
              case "Credit Card - Personal":
                break;
              default:
                formData.push(this.state.formData[index]);
                break;
            }
            break;
        }
      }
    }

    console.log(
      "getRightSideFormData",
      formStep.id,
      liabilityCreditType,
      formData
    );

    return formData;
  }

  goNext(fromSubFormID) {
    let nextSubFormID = "";

    let liabilityCreditType = this.getSubFormFieldValue(
      "LiabilityCreditTypeSubForm",
      "liabilityCreditType"
    );
    let loanType = this.getSubFormFieldValue("LoanPaybackSubForm", "loanType");
    console.log("fromSubFormID", fromSubFormID)
    switch (fromSubFormID) {
      // StepLiabilityCreditTypeSubForm
      case "LiabilityCreditTypeSubForm":
        nextSubFormID = "MainSubForm";
        break;

      // StepMainSubForm
      case "MainSubForm":
        switch (liabilityCreditType) {
          case "Credit - HELOC":
            nextSubFormID = "HelocInformationSubForm";
            break;
          case "Credit Card - Business":
          case "Credit Card - Personal":
            nextSubFormID = "CreditCardInformationSubForm";
            break;
          default:
            nextSubFormID = "LoanInformationSubForm";
        }
        break;

      // StepAdditionalInformation
      case "LoanInformationSubForm":
        nextSubFormID = "LoanPaybackSubForm";
        break;
      case "CreditCardInformationSubForm":
        nextSubFormID = "EndSubForm";
        break;
      case "HelocInformationSubForm":
        nextSubFormID = "StepPayments";
        break;

      // StepLoan
      case "LoanPaybackSubForm":
        switch (loanType) {
          case "Fixed":
            nextSubFormID = "QuestionAdditionalPaymentSubForm";
            break;
          case "Adjustable":
            nextSubFormID = "AdjustableLoanDetailsSubForm";
        }

        switch (liabilityCreditType) {
          case "Credit - HELOC":
            nextSubFormID = "StepPayments";
            break;
          case "Credit Card - Business":
          case "Credit Card - Personal":
            nextSubFormID = "EndSubForm";
            break;
        }
        break;
      case "AdjustableLoanDetailsSubForm":
        nextSubFormID = "QuestionAdditionalPaymentSubForm";
        break;

      // StepPayments
      case "QuestionAdditionalPaymentSubForm":
        let isAdditionalPayment = this.getSubFormFieldValue(
          "QuestionAdditionalPaymentSubForm",
          "isAdditionalPayment"
        );
        if (isAdditionalPayment == "Yes") {
          nextSubFormID = "AdditionalPaymentInformationSubForm";
        } else {
          nextSubFormID = "EndSubForm";
        }
        break;
      case "AdditionalPaymentInformationSubForm":
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
      // StepLiabilityCreditTypeSubForm
      case "LiabilityCreditTypeSubForm":
        break;

      // StepMainSubForm
      case "MainSubForm":
        prevSubFormID = "LiabilityCreditTypeSubForm";
        break;

      // StepAdditionalInformation
      case "LoanInformationSubForm":
        prevSubFormID = "MainSubForm";
        break;
      case "CreditCardInformationSubForm":
        prevSubFormID = "MainSubForm";
        break;
      case "HelocInformationSubForm":
        prevSubFormID = "MainSubForm";
        break;

      // StepLoan
      case "LoanPaybackSubForm":
        prevSubFormID = "LoanInformationSubForm";
        break;
      case "AdjustableLoanDetailsSubForm":
        prevSubFormID = "LoanPaybackSubForm";
        break;

      // StepPayments
      case "QuestionAdditionalPaymentSubForm":
        break;
      case "AdditionalPaymentInformationSubForm":
        prevSubFormID = "QuestionAdditionalPaymentSubForm";
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
        href: "/liabilities_credit",
        title: "Liabilities and Credit",
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
                      dataID={this.state.dataID}
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

export default connect()(LiabilityCreditNew);
