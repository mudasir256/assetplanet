import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Collapse, Timeline, Layout, Steps } from 'antd';
import ImageIcon from '../../assets/images/asset.png';
import AssetPlanet from '../../assets/images/asset-planet-logo.jpg';
import { useMutation } from '@apollo/react-hooks';
import { QL_GOAL_ADD, QL_GOAL_UPDATE } from '../../constants/queries';
import { withRouter } from 'react-router-dom';
import { FormPagePose } from '../../components/Animations';
import GoalInformationSubForm from './subforms/GoalInformationSubForm';
import GoalFinancingInformationSubForm from './subforms/GoalFinancingInformationSubForm';
import QuestionFinancialAssitanceSubForm from './subforms/QuestionFinancialAssitanceSubForm';
import AssistanceReceivedSubForm from './subforms/AssistanceReceivedSubForm';
import QuestionAssignAssetSubForm from './subforms/QuestionAssignAssetSubForm';
import AssetsToGoalSubForm from './subforms/AssetsToGoalSubForm';
import QuestionApplySavingSubForm from './subforms/QuestionApplySavingSubForm';
import AssignSavingsToGoalSubForm from './subforms/AssignSavingsToGoalSubForm';
import QuestionLoanSubForm from './subforms/QuestionLoanSubForm';
import MovingStateSubForm from './subforms/MovingStateSubForm';
import MovingCountrySubForm from './subforms/MovingCountrySubForm';
import RetirementSubForm from './subforms/RetirementSubForm';
import LoanSubForm from './subforms/LoanSubform';
import FinancialAssistanceSubForm from './subforms/FinancialAssistanceSubForm';
import EndSubForm from './subforms/EndSubForm';
import RentalPropertySubForm from './subforms/RentalPropertySubForm';
import QuestionAddChildSubForm from './subforms/QuestionAddChildSubForm';
import AdoptionSubForm from './subforms/AdoptionSubForm';
import BirthDetailSubForm from './subforms/BirthDetailSubForm';
import BreastFeedingFormulaSubForm from './subforms/BreastFeedingFormulaSubForm';
import GroomingSubForm from './subforms/GroomingSubForm';
import TransportationSubForm from './subforms/TransportationSubForm';
import ChildcareSubForm from './subforms/ChildcareSubForm';
import ClothingDiaperSubForm from './subforms/ClothingDiaperSubForm';
import HealthEntertainmentSubForm from './subforms/HealthEntertainmentSubForm';
import CollegeSubForm from './subforms/CollegeSubForm';
import TuitionPaymentSubForm from './subforms/TuitionPaymentSubForm';
import RoomBoardMiscSubForm from './subforms/RoomBoardMiscSubForm';
import PrivateEducationSubForm from './subforms/PrivateEducationSubForm';
import AssistanceReceivedEducationSubForm from './subforms/AssistanceReceivedEducationSubform';
import StudentLoanSubForm from './subforms/StudentLoanSubForm';
import LoanGoalForm from './subforms/LoanGoalForm';
import GoalsSideBar from './subforms/GoalsSideBar';
import PrivateEducationDetails from './subforms/PrivateEducationDetails';
import QuestionRoomBoardMisc from './subforms/QuestionRoomBoardMisc';
import ScholarshopAndGrantForm from './subforms/ScholarshipAndGrantForm';
import WorkStudyForm from './subforms/WorkStudyForm';
import StudentLoanForm from './subforms/StudentLoanForm';
import ContributionSavingForm from './subforms/ContributionSavingForm';
import FundingSourcesForm from './subforms/FundingSourcesForm';
import CheckListPrivateEducation from './subforms/ChecklistPrivateEducation';
import PersonalLoanHelocForm from './subforms/PersonalLoanHelocForm';
import FriendsandFamilyForm from './subforms/FriendsandFamilyForm';
import SummaryPagePrivateEducation from './subforms/SummaryPagePrivateEducation';
import AssigningAssetForm from './subforms/AssigningAssetForm';
import ProfitandLossForm from './StartBusiness/ProfitandLossForm';
import RevenueForm from './StartBusiness/RevenueForm';
import MarketingProfessionalandMiscForm from './StartBusiness/MarketingProfessionalandMiscForm';
import StartupExpenseForm from './StartBusiness/StartupExpenseForm';
import ValuationForm from './StartBusiness/ValuationForm';
import FeesTaxandMonthlyForm from './StartBusiness/FeesTaxandMonthlyForm';
import OperatingExpenseForm from './StartBusiness/OperatingExpenseForm';
import GoalDetailFormChild from './AddChild/GoalDetailsForm';
import BirthForm from './AddChild/BirthForm';
import NewArrivalForm from './AddChild/NewArrivalForm';
import FeedingForm from './AddChild/FeedingForm';
import BathHealthForm from './AddChild/BathHealthForm';
import TravelTransportationForm from './AddChild/TravelTrasportationForm';
import CostThroughoutYearForm from './AddChild/CostThroughoutYearForm';
import AddlCostThroughoutYearForm from './AddChild/AddlCostThroughoutYearForm';
import BookToysForm from './AddChild/BookToysForm';
import FriendsAndFamilyFormBusiness from './StartBusiness/FriendsAndFamilyForm';
import EstimatedProfitOrLossForm from './StartBusiness/EstimatedProfitOrLossForm';
import LoanQuestionForm from './StartBusiness/LoanQuestionForm';

var fnMutationRatesReturnAdd = null;
var dataMutationRatesReturnAdd = null;

var fnMutationRatesReturnUpdate = null;
var dataMutationRatesReturnUpdate = null;
let prevPos = 0;

const { Panel } = Collapse;

const goals = [
  {
    id: 'GoalInformationSubForm',
    icon: 'icon_ex.png',
    title: 'Goal Information',
  },
  {
    id: 'GoalFinancingInformationSubForm',
    icon: 'icon_ex.png',
    title: 'Goal Details',
  },
  {
    id: 'QuestionFinancialAssitanceSubForm',
    icon: 'icon_ex.png',
    title: 'Goal Financing',
  },
  {
    id: 'QuestionAssignAssetSubForm',
    icon: 'icon_ex.png',
    title: 'Assign Asset',
  },
  {
    id: 'QuestionApplySavingSubForm',
    icon: 'icon_ex.png',
    title: 'Savings',
  },
  {
    id: 'QuestionLoanSubForm',
    icon: 'icon_ex.png',
    title: 'Loan',
  },
  {
    id: 'MovingCountrySubForm',
    icon: 'icon_ex.png',
    title: 'Moving Country Information',
  },
  {
    id: 'MovingStateSubForm',
    icon: 'icon_ex.png',
    title: 'Moving State Information',
  },
  {
    id: 'RetirementSubForm',
    icon: 'icon_ex.png',
    title: 'Retirement',
  },
  {
    id: 'RentalPropertySubForm',
    icon: 'icon_ex.png',
    title: 'Rental / Investment Property',
  },
  {
    id: 'QuestionAddChildSubForm',
    icon: 'icon_ex.png',
    title: 'Adoption',
  },
  {
    id: 'BreastFeedingFormulaSubForm',
    icon: 'icon_ex.png',
    title: 'Breast Feeding  Formula',
  },
  {
    id: 'GroomingSubForm',
    icon: 'icon_ex.png',
    title: 'Toiletries  Grooming',
  },
  {
    id: 'TransportationSubForm',
    icon: 'icon_ex.png',
    title: 'Transportation',
  },
  {
    id: 'ChildcareSubForm',
    icon: 'icon_ex.png',
    title: 'Childcare',
  },
  {
    id: 'ClothingDiaperSubForm',
    icon: 'icon_ex.png',
    title: 'Clothing and Diapers',
  },
  {
    id: 'HealthEntertainmentSubForm',
    icon: 'icon_ex.png',
    title: 'Health and Entertainment',
  },
  {
    id: 'CollegeSubForm',
    icon: 'icon_ex.png',
    title: 'College',
  },
  {
    id: 'TuitionPaymentSubForm',
    icon: 'icon_ex.png',
    title: 'Financing',
  },
  {
    id: 'PrivateEducationSubForm',
    icon: 'icon_ex.png',
    title: 'Goal Details',
  },
  {
    id: 'PrivateEducationDetails',
    icon: 'icon_ex.png',
    title: 'Private Education Details',
  },
  {
    id: 'RoomBoardMiscSubForm',
    icon: 'icon_ex.png',
    title: 'Room Board and Misc. Financing',
  },
  {
    id: 'QuestionRoomBoardMisc',
    icon: 'icon_ex.png',
    title: 'Room Board and Misc. Financing',
  },
  {
    id: 'ScholarshopAndGrantForm',
    icon: 'icon_ex.png',
    title: 'Scholarship and Grant',
  },
  {
    id: 'WorkStudyForm',
    icon: 'icon_ex.png',
    title: 'Work Study',
  },
  {
    id: 'StudentLoanForm',
    icon: 'icon_ex.png',
    title: 'Student Loan',
  },
  {
    id: 'ContributionSavingForm',
    icon: 'icon_ex.png',
    title: 'Contribution / Saving',
  },
  {
    id: 'FundingSourcesForm',
    icon: 'icon_ex.png',
    title: 'Funding Sources',
  },
  {
    id: 'CheckListPrivateEducation',
    icon: 'icon_ex.png',
    title: 'Funding Checklist',
  },
  {
    id: 'PersonalLoanHelocForm',
    icon: 'icon_ex.png',
    title: 'Personal Loan / HELOC',
  },
  {
    //30
    id: 'FriendsandFamilyForm',
    icon: 'icon_ex.png',
    title: 'Friends and Family',
  },
  {
    //31
    id: 'SummaryPagePrivateEducation',
    icon: 'icon_ex.png',
    title: 'Summary Page',
  },
  {
    //32
    id: 'AssigningAssetForm',
    icon: 'icon_ex.png',
    title: 'Assign an Asset',
  },
  {
    //33
    id: 'ProfitandLossForm',
    icon: 'icon_ex.png',
    title: 'Profit/Loss First 10 Years',
  },
  {
    //34
    id: 'RevenueForm',
    icon: 'icon_ex.png',
    title: 'Revenue',
  },
  {
    //35
    id: 'MarketingProfessionalandMiscForm',
    icon: 'icon_ex.png',
    title: 'Marketing, Pro and Misc',
  },
  {
    //36
    id: 'StartupExpenseForm',
    icon: 'icon_ex.png',
    title: 'Startup Expense - Physical',
  },
  {
    //37
    id: 'ValuationForm',
    icon: 'icon_ex.png',
    title: 'Valuation',
  },
  {
    //38
    id: 'AssignSavingsToGoalSubForm',
    icon: 'icon_ex.png',
    title: 'Add Savings',
  },
  {
    //39
    id: 'AssetsToGoalSubForm',
    icon: 'icon_ex.png',
    title: 'Assign Asset',
  },
  {
    //40
    id: 'FeesTaxandMonthlyForm',
    icon: 'icon_ex.png',
    title: 'Fees Tax and Monthly',
  },
  {
    //41
    id: 'OperatingExpenseForm',
    icon: 'icon_ex.png',
    title: 'Operating Expense',
  },
  {
    //42
    id: 'GoalDetailFormChild',
    icon: 'icon_ex.png',
    title: 'Goal Details',
  },
  {
    //43
    id: 'BirthForm',
    icon: 'icon_ex.png',
    title: 'Birth',
  },
  {
    //44
    id: 'NewArrivalForm',
    icon: 'icon_ex.png',
    title: 'Preparing for the New Arrival',
  },
  {
    //45
    id: 'FeedingForm',
    icon: 'icon_ex.png',
    title: 'Feeding',
  },
  {
    //46
    id: 'BathHealthForm',
    icon: 'icon_ex.png',
    title: 'Bath and Health',
  },
  {
    //47
    id: 'TravelTransportationForm',
    icon: 'icon_ex.png',
    title: 'Travel and Transportation',
  },
  {
    //48
    id: 'CostThroughoutYearForm',
    icon: 'icon_ex.png',
    title: 'Cost Throughout Year',
  },
  {
    //49
    id: 'AddlCostThroughoutYearForm',
    icon: 'icon_ex.png',
    title: 'Additional Cost Throughout Year',
  },
  {
    //50
    id: 'BookToysForm',
    icon: 'icon_ex.png',
    title: 'Books and Toys',
  },
  {
    //51
    id: 'FriendsAndFamilyFormBusiness',
    icon: 'icon_ex.png',
    title: 'Assistance from Friends and Family',
  },
  {
    //52
    id: 'EstimatedProfitOrLossForm',
    icon: 'icon_ex.png',
    title: 'Est. Profit/Loss Years 2 - 10',
  },
  {
    //53
    id: 'LoanQuestionForm',
    icon: 'icon_ex.png',
    title: 'Add Loan',
  },
];

function HiddenHook() {
  [fnMutationRatesReturnAdd, { dataMutationRatesReturnAdd }] = useMutation(
    QL_GOAL_ADD
  );
  [
    fnMutationRatesReturnUpdate,
    { dataMutationRatesReturnUpdate },
  ] = useMutation(QL_GOAL_UPDATE);

  return <React.Fragment></React.Fragment>;
}

class GoalsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalsObject: {
        GoalInformationSubForm: {},
        GoalFinancingInformationSubForm: {},
        AssistanceReceivedSubForm: {},
        AssetsToGoalSubForm: {},
        AssignSavingsToGoalSubForm: {},
        LoanGoalForm: {},
        PrivateEducationDetails: {},
        RoomBoardMiscSubForm: {},
        ScholarshopAndGrantForm: {},
        WorkStudyForm: {},
        StudentLoanForm: {},
        ContributionSavingForm: {},
        FundingSourcesForm: {},
        PersonalLoanHelocForm: {},
        FriendsandFamilyForm: {},
        ProfitandLossForm: {},
        RevenueForm: {},
        MarketingProfessionalandMiscForm: {},
        StartupExpenseForm: {},
        ValuationForm: {},
        FeesTaxandMonthlyForm: {},
        OperatingExpenseForm: {},
        GoalDetailFormChild: {},
        BirthForm: {},
        NewArrivalForm: {},
        FeedingForm: {},
        BathHealthForm: {},
        TravelTransportationForm: {},
        CostThroughoutYearForm: {},
        AddlCostThroughoutYearForm: {},
        BookToysForm: {},
        FriendsAndFamilyFormBusiness: {},
        LoanQuestionForm: {},
        EstimatedProfitOrLossForm: {},
      },
      dataID: '1',
      curSubFormID: 'GoalInformationSubForm',
      curSubForm: GoalInformationSubForm,
      formVisible: false,
      subFormData: {},
      isRightSideOpen: true,
      formData: [],
      formSteps: [],
      currentFormTitle: '',
      customSidebar: false,
      isFormEnd: false
    };

    this.goSubForm = this.goSubForm.bind(this);
    this.updateSubForm = this.updateSubForm.bind(this);
    this.getSubFormData = this.getSubFormData.bind(this);
    this.getSubFormField = this.getSubFormField.bind(this);

    this.createQLVariable = this.createQLVariable.bind(this);
    this.getSubFormFieldValue = this.getSubFormFieldValue.bind(this);

    this.toggleRightSide = this.toggleRightSide.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state.title === 'Moving State') {
      this.setState({
        formSteps: [
          goals[0],
          // goals[7],
          goals[1],
          goals[2],
          goals[3],
          goals[4],
          goals[5],
        ],
        currentFormTitle: this.props.location.state.title,
        customSidebar: true,
      });
      this.goSubForm('GoalInformationSubForm');
    } else if (this.props.location.state.title === 'Moving Country') {
      this.setState({
        formSteps: [
          goals[0],
          // goals[6],
          goals[1],
          goals[2],
          goals[3],
          goals[4],
          goals[5],
        ],
        currentFormTitle: this.props.location.state.title,
        customSidebar: true,
      });
      this.goSubForm('GoalInformationSubForm');
    } else if (this.props.location.state.title === 'Retirement') {
      this.setState({
        formSteps: [goals[0], goals[8], goals[2], goals[3], goals[4], goals[5]],
      });
      this.goSubForm('GoalInformationSubForm');
    } else if (
      this.props.location.state.title === 'Rental / Investment Property'
    ) {
      this.setState({
        formSteps: [
          goals[0],
          goals[9],
          goals[1],
          goals[2],
          goals[3],
          goals[4],
          goals[5],
        ],
      });
      this.goSubForm('GoalInformationSubForm');
    } else if (this.props.location.state.title === 'Add Child to Family') {
      this.setState({
        formSteps: [
          goals[0],
          // goals[10],
          // goals[11],
          // goals[12],
          // goals[13],
          // goals[14],
          // goals[15],
          // goals[16],
          // goals[17],
          goals[42],
          goals[43],
          goals[44],
          goals[45],
          goals[46],
          goals[47],
          goals[48],
          goals[49],
          goals[50],
          goals[51],
          goals[39],
          goals[38],
          goals[53],
        ],
        currentFormTitle: this.props.location.state.title,
        customSidebar: true,
      });
      this.goSubForm('GoalInformationSubForm');
    } else if (this.props.location.state.title === 'Private Education') {
      this.setState({
        formSteps: [
          goals[0],
          goals[20],
          goals[21],
          goals[27],
          // goals[30],
          // goals[26],
          // goals[25],
          // goals[23],
          // goals[29],
          // goals[24],
          // goals[32],
          goals[28],
          goals[31],
        ],
        currentFormTitle: this.props.location.state.title,
        customSidebar: true,
      });
      this.goSubForm('GoalInformationSubForm');
    } else if (this.props.location.state.title === 'Start a Business') {
      this.setState({
        formSteps: [
          goals[0],
          goals[1],
          goals[36],
          goals[35],
          goals[40],
          goals[41],
          goals[37],
          goals[34],
          goals[52],
          goals[33],
          goals[51],
          goals[39],
          goals[38],
          goals[53],
          //Child
          // goals[42],
          // goals[43],
          // goals[44],
          // goals[45],
          // goals[46],
          // goals[47],
          // goals[48],
          // goals[49],
          // goals[50],
        ],
        currentFormTitle: this.props.location.state.title,
        customSidebar: true,
      });
      this.goSubForm('GoalInformationSubForm');
    } else {
      this.setState({
        formSteps: [goals[0], goals[1], goals[2], goals[3], goals[4], goals[5]],
        currentFormTitle: this.props.location.state.title,
        customSidebar: true,
      });
      this.goSubForm('GoalInformationSubForm');
    }
  }

  getSubFormField(formID, fieldID) {
    let formData = this.state.formData;

    for (var index = 0; index < formData.length; index++) {
      if (formData[index]['id'] == formID) {
        let data = formData[index]['data'];
        let fields = data['fields'];
        for (var findex = 0; findex < fields.length; findex++) {
          if (fields[findex]['id'] == fieldID) {
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
      return '';
    } else {
      return field.value;
    }
  }

  createQLVariable(subFormID, subFormData) {
    let varQL = null;

    switch (subFormID) {
      case 'GoalInformationSubForm':
        varQL = {
          goal: {
            description: this.getSubFormFieldValue(
              subFormID,
              'goal_description'
            ),
            date: this.getSubFormFieldValue(subFormID, 'goal_date'),
            assignedTo: this.getSubFormFieldValue(
              subFormID,
              'goal_assigned_to'
            ),
          },
        };
        break;
      case 'MovingStateSubForm':
        // varQL = {
        //     "goal": {
        //         "": this.getSubFormFieldValue(subFormID, 'state'),
        //         "": this.getSubFormFieldValue(subFormID, 'moving_costs')
        //     }
        // };
        // no fields
        break;
      case 'MovingCountrySubForm':
        // varQL = {
        //     "goal": {
        //         "": this.getSubFormFieldValue(subFormID, 'country'),
        //         "": this.getSubFormFieldValue(subFormID, 'moving_costs')
        //     }
        // };
        // no fields
        break;
      case 'GoalFinancingInformationSubForm':
        varQL = {
          goalFinancingInformation: {
            dollarAmountNeeded:
              this.getSubFormFieldValue(subFormID, 'dollar_amount_needed') != ''
                ? parseInt(
                    this.getSubFormFieldValue(subFormID, 'dollar_amount_needed')
                  )
                : 0,
            inflationRateForThisGoal: this.getSubFormFieldValue(
              subFormID,
              'inflation_rate'
            ),
          },
        };
        break;
      case 'QuestionFinancialAssitanceSubForm':
        break;
      case 'AssistanceReceivedSubForm':
        varQL = {
          assistanceReceivedDetail: {
            recipientFirstName: this.getSubFormFieldValue(
              subFormID,
              'recipient_first_name'
            ),
            recipientLastName: this.getSubFormFieldValue(
              subFormID,
              'recipient_last_name'
            ),
            personProvidingAssistanceFirstName: this.getSubFormFieldValue(
              subFormID,
              'person_first_name'
            ),
            personProvidingAssistanceLastName: this.getSubFormFieldValue(
              subFormID,
              'person_last_name'
            ),
            relationship: this.getSubFormFieldValue(subFormID, 'relationship'),
            totalAmountOfGiftReceived:
              this.getSubFormFieldValue(
                subFormID,
                'total_amount_gift_received'
              ) != ''
                ? parseInt(
                    this.getSubFormFieldValue(
                      subFormID,
                      'total_amount_gift_received'
                    )
                  )
                : 0,
          },
        };
        break;
      case 'AssetsToGoalSubForm':
        varQL = {
          assetsToAssignToGoal: {
            assetsToAssignToGoal: this.getSubFormFieldValue(
              subFormID,
              'assets_goal'
            ),
            valueOfAssetAtGoalDate:
              this.getSubFormFieldValue(subFormID, 'value_goal_date') != ''
                ? parseInt(
                    this.getSubFormFieldValue(subFormID, 'value_goal_date')
                  )
                : 0,
            loanValueAtGoalDate:
              this.getSubFormFieldValue(subFormID, 'loan_goal_date') != ''
                ? parseInt(
                    this.getSubFormFieldValue(subFormID, 'loan_goal_date')
                  )
                : 0,
            amountToUseForThisGoal:
              this.getSubFormFieldValue(subFormID, 'amount_goal') != ''
                ? parseInt(this.getSubFormFieldValue(subFormID, 'amount_goal'))
                : 0,
            amountUsedInOtherGoal:
              this.getSubFormFieldValue(subFormID, 'amount_other_goal') != ''
                ? parseInt(
                    this.getSubFormFieldValue(subFormID, 'amount_other_goal')
                  )
                : 0,
            taxes:
              this.getSubFormFieldValue(subFormID, 'taxes') != ''
                ? parseInt(this.getSubFormFieldValue(subFormID, 'taxes'))
                : 0,
          },
        };
        break;
      case 'RetirementSubForm':
        // varQL = {
        //     "assetsToAssignToGoal": {
        //         "assetsToAssignToGoal": this.getSubFormFieldValue(subFormID, 'assets_goal'),
        //     }
        // };
        // no fields
        break;
      case 'QuestionAssignAssetSubForm':
        varQL = {
          assignSavingsToGoal: {
            applySavingsToGoal:
              this.getSubFormFieldValue(subFormID, 'isAssignAsset') == 'Yes'
                ? true
                : false,
          },
        };
        break;
      case 'AssignSavingsToGoalSubForm':
        varQL = {
          assignSavingsToGoal: {
            assetsToAssignToGoal: this.getSubFormFieldValue(
              subFormID,
              'asset_goal'
            ),
            monthlySavingsToAssign:
              this.getSubFormFieldValue(
                subFormID,
                'monthly_saving_to_assign'
              ) != ''
                ? parseInt(
                    this.getSubFormFieldValue(
                      subFormID,
                      'monthly_saving_to_assign'
                    )
                  )
                : 0,
            dateToStartContribution: this.getSubFormFieldValue(
              subFormID,
              'start_contribution_date'
            ),
            dateToEndContribution: this.getSubFormFieldValue(
              subFormID,
              'end_contribution_date'
            ),
          },
        };
        break;
      case 'QuestionApplySavingSubForm':
        break;
      case 'QuestionLoanSubForm':
        break;
      case 'LoanSubForm':
        varQL = {
          loan: {
            totalLoanAssignedToGoal:
              this.getSubFormFieldValue(subFormID, 'total_loan') != ''
                ? parseInt(this.getSubFormFieldValue(subFormID, 'total_loan'))
                : 0,
          },
        };
        break;
      case 'RentalPropertySubForm':
        // no fields
        break;
      case 'QuestionAddChildSubForm':
        break;
      case 'AdoptionSubForm':
        // no fields
        break;
      case 'BirthDetailSubForm':
        // no fields
        break;
      case 'BreastFeedingFormulaSubForm':
        // no fields
        break;
      case 'GroomingSubForm':
        // no fields
        break;
      case 'TransportationSubForm':
        // no fields
        break;
      case 'ChildcareSubForm':
        // no fields
        break;
      case 'ClothingDiaperSubForm':
        // no fields
        break;
      case 'HealthEntertainmentSubForm':
        // no fields
        break;
      case 'CollegeSubForm':
        // no fields
        break;
      case 'TuitionPaymentSubForm':
        // no fields
        break;
      case 'PrivateEducationSubForm':
        // no fields
        break;
      case 'RoomBoardMiscSubForm':
        // no fields
        break;
    }

    return varQL;
  }
  updateSubForm(subFormID, subFormData, visible = true) {
    let formData = this.state.formData;

    var bFound = false;
    for (var findex = 0; findex < formData.length; findex++) {
      if (formData[findex]['id'] == subFormID) {
        formData[findex]['data'] = subFormData;
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

    console.log('varQL:', varQL, ', dataID:', this.state.dataID);

    var instance = this;
    if (varQL != null) {
      if (this.state.dataID == null) {
        fnMutationRatesReturnAdd({ variables: { data: varQL } }).then(
          (response) => {
            instance.setState({
              dataID: response['data']['createGoal']['id'],
            });
          }
        );
      } else {
        fnMutationRatesReturnUpdate({
          variables: { id: this.state.dataID, data: varQL },
        });
      }
    }

    this.setState({
      formData: formData,
    });
  }

  getSubFormData(subFormID) {
    let formData = this.state.formData;

    for (var findex = 0; findex < formData.length; findex++) {
      if (formData[findex]['id'] == subFormID) {
        return formData[findex]['data'];
      }
    }

    return {};
  }

  genExtra = (id) => (
    <Icon type='form' onClick={() => this.goSubForm(id)}></Icon>
  );

  goSubForm(subFormID) {
    this.setState({
      formVisible: false,
    });

    let nextSubForm = GoalInformationSubForm;
    let subFormData = this.getSubFormData(subFormID);

    switch (subFormID) {
      case 'GoalInformationSubForm':
        nextSubForm = GoalInformationSubForm;
        break;
      case 'MovingStateSubForm':
        nextSubForm = MovingStateSubForm;
        break;
      case 'MovingCountrySubForm':
        nextSubForm = MovingCountrySubForm;
        break;
      case 'RetirementSubForm':
        nextSubForm = RetirementSubForm;
        break;
      case 'GoalFinancingInformationSubForm':
        nextSubForm = GoalFinancingInformationSubForm;
        break;
      case 'QuestionFinancialAssitanceSubForm':
        nextSubForm = QuestionFinancialAssitanceSubForm;
        break;
      case 'AssistanceReceivedSubForm':
        nextSubForm = AssistanceReceivedSubForm;
        break;
      case 'QuestionAssignAssetSubForm':
        nextSubForm = QuestionAssignAssetSubForm;
        break;
      case 'AssetsToGoalSubForm':
        nextSubForm = AssetsToGoalSubForm;
        break;
      case 'LoanGoalForm':
        nextSubForm = LoanGoalForm;
        break;
      case 'LoanSubForm':
        nextSubForm = LoanSubForm;
        break;
      case 'RentalPropertySubForm':
        nextSubForm = RentalPropertySubForm;
        break;
      case 'AssignSavingsToGoalSubForm':
        nextSubForm = AssignSavingsToGoalSubForm;
        break;
      case 'QuestionApplySavingSubForm':
        nextSubForm = QuestionApplySavingSubForm;
        break;
      case 'QuestionLoanSubForm':
        nextSubForm = QuestionLoanSubForm;
        break;
      case 'QuestionAddChildSubForm':
        nextSubForm = QuestionAddChildSubForm;
        break;
      case 'AdoptionSubForm':
        nextSubForm = AdoptionSubForm;
        break;
      case 'BirthDetailSubForm':
        nextSubForm = BirthDetailSubForm;
        break;
      case 'BreastFeedingFormulaSubForm':
        nextSubForm = BreastFeedingFormulaSubForm;
        break;
      case 'GroomingSubForm':
        nextSubForm = GroomingSubForm;
        break;
      case 'TransportationSubForm':
        nextSubForm = TransportationSubForm;
        break;
      case 'ChildcareSubForm':
        nextSubForm = ChildcareSubForm;
        break;
      case 'ClothingDiaperSubForm':
        nextSubForm = ClothingDiaperSubForm;
        break;
      case 'HealthEntertainmentSubForm':
        nextSubForm = HealthEntertainmentSubForm;
        break;
      case 'CollegeSubForm':
        nextSubForm = CollegeSubForm;
        break;
      case 'TuitionPaymentSubForm':
        nextSubForm = TuitionPaymentSubForm;
        break;
      case 'PrivateEducationSubForm':
        nextSubForm = PrivateEducationSubForm;
        break;
      case 'RoomBoardMiscSubForm':
        nextSubForm = RoomBoardMiscSubForm;
        break;
      case 'AssistanceReceivedEducationSubForm':
        nextSubForm = AssistanceReceivedEducationSubForm;
        break;
      case 'StudentLoanSubForm':
        nextSubForm = StudentLoanSubForm;
        break;
      case 'FinancialAssistanceSubForm':
        nextSubForm = FinancialAssistanceSubForm;
        break;
      case 'EndSubForm':
        nextSubForm = EndSubForm;
        this.setState({isFormEnd: true})
        break;
      case 'PrivateEducationDetails':
        nextSubForm = PrivateEducationDetails;
        break;
      case 'QuestionRoomBoardMisc':
        nextSubForm = QuestionRoomBoardMisc;
        break;
      case 'ScholarshopAndGrantForm':
        nextSubForm = ScholarshopAndGrantForm;
        break;
      case 'WorkStudyForm':
        nextSubForm = WorkStudyForm;
        break;
      case 'StudentLoanForm':
        nextSubForm = StudentLoanForm;
        break;
      case 'ContributionSavingForm':
        nextSubForm = ContributionSavingForm;
        break;
      case 'FundingSourcesForm':
        nextSubForm = FundingSourcesForm;
        break;
      case 'CheckListPrivateEducation':
        nextSubForm = CheckListPrivateEducation;
        break;
      case 'PersonalLoanHelocForm':
        nextSubForm = PersonalLoanHelocForm;
        break;
      case 'FriendsandFamilyForm':
        nextSubForm = FriendsandFamilyForm;
        break;
      case 'SummaryPagePrivateEducation':
        nextSubForm = SummaryPagePrivateEducation;
        break;
      case 'AssigningAssetForm':
        nextSubForm = AssigningAssetForm;
        break;
      case 'ProfitandLossForm':
        nextSubForm = ProfitandLossForm;
        break;
      case 'RevenueForm':
        nextSubForm = RevenueForm;
        break;
      case 'MarketingProfessionalandMiscForm':
        nextSubForm = MarketingProfessionalandMiscForm;
        break;
      case 'StartupExpenseForm':
        nextSubForm = StartupExpenseForm;
        break;
      case 'ValuationForm':
        nextSubForm = ValuationForm;
        break;
      case 'FeesTaxandMonthlyForm':
        nextSubForm = FeesTaxandMonthlyForm;
        break;
      case 'OperatingExpenseForm':
        nextSubForm = OperatingExpenseForm;
        break;
      case 'GoalDetailFormChild':
        nextSubForm = GoalDetailFormChild;
        break;
      case 'BirthForm':
        nextSubForm = BirthForm;
        break;
      case 'NewArrivalForm':
        nextSubForm = NewArrivalForm;
        break;
      case 'FeedingForm':
        nextSubForm = FeedingForm;
        break;
      case 'BathHealthForm':
        nextSubForm = BathHealthForm;
        break;
      case 'TravelTransportationForm':
        nextSubForm = TravelTransportationForm;
        break;
      case 'CostThroughoutYearForm':
        nextSubForm = CostThroughoutYearForm;
        break;
      case 'AddlCostThroughoutYearForm':
        nextSubForm = AddlCostThroughoutYearForm;
        break;
      case 'BookToysForm':
        nextSubForm = BookToysForm;
        break;
      case 'FriendsAndFamilyFormBusiness':
        nextSubForm = FriendsAndFamilyFormBusiness;
        break;
      case 'EstimatedProfitOrLossForm':
        nextSubForm = EstimatedProfitOrLossForm;
        break;
      case 'LoanQuestionForm':
        nextSubForm = LoanQuestionForm;
        break;
    }

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

  goToSelectionPage = () => {
    this.props.history.push('/goals_add');
  };

  // Input Handler Start

  handleFormInputChange = (formName, name, value) => {
    let formData = this.state.goalsObject;
    formData[formName][name] = value;
    this.setState({ goalsObject: formData });
  };

  handleInputChange = (event, formName) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.handleFormInputChange(formName, name, value);
  };

  handleDatePickerChange = (name, date, dateString, formName) => {
    this.handleFormInputChange(formName, name, dateString);
  };

  handleSelectChange = (name, value, formName) => {
    this.handleFormInputChange(formName, name, value);
  };

  insertFormDynamically = (index, newItem) => {
    const editData = (arr, index, newItem) => [
      ...arr.slice(0, this.state.formSteps.length - 2),
      goals[newItem],
      ...arr.slice(this.state.formSteps.length - 2),
    ];

    const updatedArr = editData(this.state.formSteps, index, newItem);
    this.setState({
      formSteps: updatedArr,
    });
  };

  removeFormDynamically = (id) => {
    const updatedArr = this.state.formSteps.filter((item) => item.id !== id);
    this.setState({
      formSteps: updatedArr,
    });
  };

  dynamicFormsMoveNext = (form) => {
    let i = 0;
    this.state.formSteps.map((item, index) => {
      if (item.id === form) {
        i = index + 1;
      }
    });
    this.goSubForm(this.state.formSteps[i].id);
  };

  dynamicFormsMovePrevious = (form) => {
    let i = 0;
    this.state.formSteps.map((item, index) => {
      if (item.id === form) {
        i = index - 1;
      }
    });
    this.goSubForm(this.state.formSteps[i].id);
  };

  render() {
    const navlinks = [
      {
        href: '/',
        title: 'Home',
      },
      {
        href: '/goals',
        title: 'Goals',
      },
    ];

    let SubForm = this.state.curSubForm;

    let formpageClassName = 'form-page-container-wrap';
    if (this.state.isRightSideOpen) {
      formpageClassName = 'form-page-container-wrap right-side--opend';
    } else {
      formpageClassName = 'form-page-container-wrap right-side--collapsed';
    }
    return (
      <div className={formpageClassName}>
        <div className='form-page--main-side'>
          <div className='steps'>
            <div className='logo-container align-items-top justify-content-center'>
              <img className='img-asset' src={AssetPlanet} />
            </div>
            <div className='process'>
              <div className='process-row'>
                <div className='process-step'>
                  <button
                    type='button'
                    className={'btn nav-items btn-circle active'}
                    data-toggle='tab'
                    onClick={() => this.goToSelectionPage()}
                  >
                    <img className='img-icon' src={ImageIcon} />
                  </button>
                  <p className='step-title'>Select a Goal</p>
                </div>

                {this.state.formSteps.map((formStep, index) => {
                  let elementPos = this.state.formSteps
                    .map(function (x) {
                      return x.id;
                    })
                    .indexOf(this.state.curSubFormID);

                  let classBtn = 'btn nav-items btn-circle'

                  if (elementPos === -1) {
                    // elementPos = prevPos+1;
                    elementPos = prevPos;
                  } else {
                    prevPos = elementPos;
                  }

                  classBtn =  elementPos >= index
                  ? 'btn nav-items btn-circle active'
                  : 'btn nav-items btn-circle'

                  if(this.state.isFormEnd)
                    classBtn = 'btn nav-items btn-circle disabled'

                  return (
                    <div className='process-step' key={index}>
                      <button
                        type='button'
                        className={
                          classBtn
                        }
                        data-toggle='tab'
                        onClick={() => {
                          if(classBtn !== 'btn nav-items btn-circle disabled')
                            this.goSubForm(formStep.id)}}
                      >
                        {/* <img className='img-icon' src={ImageIcon} /> */}
                        <div style={{ fontSize: 30, color: '#006400' }}>
                          {index + 1}
                        </div>
                      </button>
                      <p className='step-title'>{formStep.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <HiddenHook />
          <div className='container'>
            <div className='page-nav-history'>
              {/* {navlinks.map((navlink, index) => {
                return (
                  <span key={index}>
                    <Link
                      key={index}
                      to={navlink.href}
                      className='page-nav-link text-uppercase'
                    >
                      {navlink.title}
                    </Link>
                    {index != navlinks.length - 1 ? '/' : null}
                  </span>
                );
              })} */}
            </div>
            <div className='form-page-container'>
              <div className='form-page--left-side'>
                <FormPagePose
                  className='info-form-block'
                  pose={this.state.formVisible ? 'visible' : 'hidden'}
                >
                  <SubForm
                    subFormData={this.state.subFormData}
                    cbGoSubForm={this.goSubForm}
                    cbUpdateSubForm={this.updateSubForm}
                    formData={this.state.formData}
                    cbGetSubFormField={this.getSubFormField}
                    selectedGoal={this.props.location.state.title}
                    goToSelectionPage={this.goToSelectionPage}
                    handleInputChange={this.handleInputChange}
                    goalsObject={this.state.goalsObject}
                    handleDatePickerChange={this.handleDatePickerChange}
                    handleSelectChange={this.handleSelectChange}
                    handleFormInputChange={this.handleFormInputChange}
                    currentFormTitle={this.state.currentFormTitle}
                    insertFormDynamically={this.insertFormDynamically}
                    removeFormDynamically={this.removeFormDynamically}
                    formLength={this.state.formSteps.length}
                    dynamicFormsMoveNext={this.dynamicFormsMoveNext}
                    dynamicFormsMovePrevious={this.dynamicFormsMovePrevious}
                  />
                </FormPagePose>
              </div>
            </div>
          </div>
        </div>
        <div className='form-page--right-side custom'>
          <span
            className='right-side-collapse-icon'
            onClick={this.toggleRightSide}
          >
            <i className='fe-menu'></i>
          </span>

          {this.state.isRightSideOpen && this.state.customSidebar ? (
            <GoalsSideBar
              goalsObject={this.state.goalsObject}
              currentFormTitle={this.state.currentFormTitle}
              genExtra={this.genExtra}
            ></GoalsSideBar>
          ) : (
            ''
          )}

          {!this.state.customSidebar ? (
            <Collapse expandIconPosition='right'>
              {this.state.formData.map((subForm, sindex) => {
                if (subForm.visible == false) {
                  return <div key={sindex}></div>;
                }

                let subFormData = subForm.data;
                return (
                  <Panel
                    header={subFormData.title}
                    key={sindex}
                    // extra={this.genExtra(subForm.id)}
                  >
                    <Timeline>
                      {subFormData.fields.map((field, ffindex) => {
                        return (
                          <Timeline.Item key={{ ffindex }}>
                            {field.title != '' ? field.title + ':' : null}{' '}
                            {field.value}
                          </Timeline.Item>
                        );
                      })}
                    </Timeline>
                  </Panel>
                );
              })}
            </Collapse>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(GoalsNew));
