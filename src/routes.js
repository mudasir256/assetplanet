import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import ROLES from "constants/roles";

import NoPermission from "pages/account/NoPermission";
import { isUserAuthenticated, getLoggedInUser } from "./helpers/authUtils";
import AssistanceReceived from "./pages/modules/assistance/assistance_in/AssistanceReceived";
import AssistanceReceivedNew from "./pages/modules/assistance/assistance_in/AssistanceReceivedNew";
import AssistanceReceivedView from "./pages/modules/assistance/assistance_in/AssistanceReceivedView";
import AssistanceOut from "./pages/modules/assistance/assistance_out/AssistanceOut";
import AssistanceOutNew from "./pages/modules/assistance/assistance_out/AssistanceOutNew";
import AssistanceOutView from "./pages/modules/assistance/assistance_out/AssistanceOutView";
import Modules from "./pages/modules/Modules";
import Assistance from "./pages/modules/assistance/Assistance";
import AssistanceNew from "./pages/modules/assistance/AssistanceNew";
import AssistanceList from "./pages/modules/assistance/AssistanceList";
import AssistanceCreate from "./pages/modules/assistance/AssistanceCreate";
import Budget from "./pages/modules/budget/Budget";
import BudgetAccountAdd from "./pages/modules/budget/BudgetAccountAdd";
import BudgetAccountList from "./pages/modules/budget/BudgetAccountList";
import BudgetCreate from "./pages/modules/budget/BudgetCreate";

import DebtCreate from "./pages/planner/debt/operations/DebtCreate";
import SocialSecurityCreate from "./pages/planner/social_security/SocialSecurityCreate";
import SocialSecurityDashboard from "./pages/planner/social_security/SocialSecurityDashboard";

import TestForm from "./pages/TestForm";
import ClientsPlans from "./pages/client_info/clients_plans/ClientsPlans";
import MyInformation from "./pages/client_info/clients_plans/MyInformation";
import EditInformation from "./pages/client_info/clients_plans/EditInformation";
import ComparePlans from "./pages/client_info/clients_plans/ComparePlans"; //new
import ClientDetail from "./pages/client_info/clients_plans/ClientDetail"; //new
import ClientEditDetail from "./pages/client_info/clients_plans/ClientEditDetail"; //new
import ClientNew from "./pages/client_info/clients_plans/ClientNew";
import ClientPlanNew from "./pages/client_info/clients_plans/ClientPlanNew";
import ClientInfo from "./pages/client_info/ClientInfo";
import TaxInflation from "./pages/client_info/tax_inflation/TaxInflation";
import TaxInflationNew from "./pages/client_info/tax_inflation/TaxInflationNew";
// import ClientContacts from './pages/client_info/client_contacts/ClientContacts';
import ClientContactNew from "./pages/client_info/client_contacts/ClientContactNew";
import ClientContactView from "./pages/client_info/client_contacts/ClientContactView";
import Reports from "./pages/reports";
import ReportAsset from "./pages/reports/ReportAsset";
import AddAsset from "./pages/reports/AddAsset";
import ReturnRates from "./pages/client_info/return_rates/ReturnRates";
import ReturnRatesNew from "./pages/client_info/return_rates/ReturnRatesNew";
import Assets from "./pages/modules/assets/Assets";
import AssetAllocation from "./pages/modules/assests_new/assetAllocation";
import LiabilitiesCredit from "./pages/modules/liabilities_credit/LiabilitiesCredit";
import LiabilityCreditNew from "./pages/modules/liabilities_credit/LiabilityCreditNew";
import LiabilityCreditView from "./pages/modules/liabilities_credit/LiabilityCreditView";
import SocialSecurityModule from "./pages/modules/social_security/SocialSecurityModule";
import SocialSecurityNew from "./pages/modules/social_security/SocialSecurityNew";
import Income from "./pages/modules/income/Income";
import IncomeNew from "./pages/modules/income/IncomeNew";
import IncomeView from "./pages/modules/income/IncomeView";
import Insurance from "./pages/modules/insurance/Insurance";
import InsuranceNew from "./pages/modules/insurance/InsuranceNew";
import InsuranceView from "./pages/modules/insurance/InsuranceView";
import InsuranceAllocation from "./pages/modules/insurance/subforms/insuranceAllocation";
import InsuranceSubForm from "./pages/modules/insurance/subforms/insuranceSubForm";
// Reports
import AllInsuranceProducts from "./pages/reports/AllInsuranceProducts";
import PrefessionalTeam from "./pages/reports/PrefessionalTeam";
import SocialSecurity from "./pages/reports/SocialSecurity";
import GeneralInformation from "./pages/reports/GeneralInformation";
import IncomeReport from "./pages/reports/IncomeReport";
import GoalsReport from "./pages/reports/GoalsReport";
import InsuranceReport from "./pages/reports/InsuranceReport";
import LiabilitiesCreditReport from "./pages/reports/LiabilitiesCreditReport";
import LiquidityReport from "./pages/reports/LiquidityReport";
import MonthlySavings from "./pages/reports/MonthlySavings";
import StartingBusinessReport from "./pages/reports/StartingBusinessReport";
import AssetsItemReport from "./pages/reports/AllItemsReport/Assets";
import IncomeAndTaxes from "./pages/reports/AllItemsReport/IncomeAndTaxes";
import InsurancePayout from "./pages/reports/AllItemsReport/InsurancePayout";
import BudgetAndGoals from "./pages/reports/AllItemsReport/BudgetAndGoals";
import Liabilities from "./pages/reports/AllItemsReport/Liabilities";
import BudgetReport from "./pages/reports/BudgetReport";
import BudgetDetailed from "./pages/reports/BudgetDetailed";
import NetWorthReport from "./pages/reports/NetWorthReport";
import Charts from "./pages/charts";
import AssetsNew from "./pages/modules/assets/AssetsNew";
import AssetsView from "./pages/modules/assets/AssetsView";
import Schedules from "./pages/schedules/Schedules";
import AssetDistribution from "./pages/schedules/AssetDistribution";
import AssetDistributionRMD from "./pages/schedules/AssetDistributionRMD";
import AmortizationReport from "./pages/schedules/AmortizationReport";
import AmortizationSchedule from "./pages/schedules/AmortizationSchedule";
import DebtPayoffAmount from "./pages/schedules/DebtPayoffAmount";
import PayoffDebtFreeDate from "./pages/schedules/PayoffDebtFreeDate";
import PortfolioPerformance from "./pages/schedules/PortfolioPerformance";

//goals
import Goals from "./pages/goals/Goals";
import GoalsNew from "./pages/goals/GoalsNew";
import GoalsList from "./pages/goals/GoalsList";

// Worst Case Scenarios
import WorstCaseScenarios from "./pages/worst_case_scenarios";
import ExecutorTrusteeStart from "./pages/worst_case_scenarios/ExecutorTrusteeStart";
import AudioVideoMessage from "./pages/worst_case_scenarios/AudioVideoMessage";
import AddAudioVideoMessage from "./pages/worst_case_scenarios/AudioVideoMessage/Add";
import CheckList from "./pages/worst_case_scenarios/CheckList";
import AddCheckList from "./pages/worst_case_scenarios/CheckList/Add";
import ContactList from "./pages/worst_case_scenarios/ContactList";
import AddContactList from "./pages/worst_case_scenarios/ContactList/Add";
import ImportantDocuments from "./pages/worst_case_scenarios/ImportantDocuments";
import AddImportantDocuments from "./pages/worst_case_scenarios/ImportantDocuments/Add";
import PersonalInstructions from "./pages/worst_case_scenarios/PersonalInstructions";
import AddPersonalInstructions from "./pages/worst_case_scenarios/PersonalInstructions/Add";
import ListOfLargeBills from "./pages/worst_case_scenarios/ListOfLargeBills";
import AddListOfLargeBill from "./pages/worst_case_scenarios/ListOfLargeBills/Add";
import LitigationLists from "./pages/worst_case_scenarios/LitigationLists";
import AddLitigationList from "./pages/worst_case_scenarios/LitigationLists/Add";
import LocationOfPersonalItems from "./pages/worst_case_scenarios/LocationOfPersonalItems";
import AddLocationOfPersonalItem from "./pages/worst_case_scenarios/LocationOfPersonalItems/Add";
import ListOfPasswords from "./pages/worst_case_scenarios/ListOfPasswords";
import AddListOfPasswords from "./pages/worst_case_scenarios/ListOfPasswords/Add";
import PrepaidBurialExpenses from "./pages/worst_case_scenarios/PrepaidBurialExpenses";
import AddPrepaidBurialExpenses from "./pages/worst_case_scenarios/PrepaidBurialExpenses/Add";
import ProgressStatuses from "./pages/worst_case_scenarios/ProgressStatuses";
import AddProgressStatuses from "./pages/worst_case_scenarios/ProgressStatuses/Add";
import EmailsToSend from "./pages/worst_case_scenarios/EmailsToSend";
import AddEmailsToSend from "./pages/worst_case_scenarios/EmailsToSend/Add";

// Worst Case Scenarios
import WorstCaseScenariosView from "./pages/worst_case_scenarios/view";
import AudioVideoMessageView from "./pages/worst_case_scenarios/view/AudioVideoMessage";
import CheckListView from "./pages/worst_case_scenarios/view/CheckList";
import ContactListView from "./pages/worst_case_scenarios/view/ContactList";
import ImportantDocumentsView from "./pages/worst_case_scenarios/view/ImportantDocuments";
import PersonalInstructionsView from "./pages/worst_case_scenarios/view/PersonalInstructions";
import ListOfLargeBillsView from "./pages/worst_case_scenarios/view/ListOfLargeBills";
import LitigationListsView from "./pages/worst_case_scenarios/view/LitigationLists";
import LocationOfPersonalItemsView from "./pages/worst_case_scenarios/view/LocationOfPersonalItems";
import ListOfPasswordsView from "./pages/worst_case_scenarios/view/ListOfPasswords";
import PrepaidBurialExpensesView from "./pages/worst_case_scenarios/view/PrepaidBurialExpenses";
import ProgressStatusesView from "./pages/worst_case_scenarios/view/ProgressStatuses";
import EmailsToSendView from "./pages/worst_case_scenarios/view/EmailsToSend";
import Summary from "./pages/worst_case_scenarios/view/Summary";
import AssetPlanetMessage from "./pages/worst_case_scenarios/view/AssetPlanetMessage";
import DelegateAccess from "./pages/auth/DelegateAccess";
import OtpValidate from "./pages/auth/OtpValidate";
import TrusteeLogin from "./pages/auth/TrusteeLogin";
import Welcome from "pages/Welcome";

import Planner from "pages/planner/planner";

import Inventory from "./components/form/inventory/inventory";
import Collection from "./components/form/inventory/collection";

//Protector
import Protector from "pages/protector/protector";
import Divorce from "./pages/protector/divorce/Divorce";
import DivorceCreate from "./pages/protector/divorce/operations/DivorceCreate";
import Death from "./pages/protector/death/Death";
import DeathCreate from "./pages/protector/death/operations/DeathCreate";
import Disaster from "./pages/protector/disaster/Disaster";
import DisasterCreate from "./pages/protector/disaster/operations/DisasterCreate";
import Disability from "./pages/protector/disability/Disability";
import DisabilityCreate from "./pages/protector/disability/operations/DisabilityCreate";
import { AcceptInvitation } from "./pages/auth/AcceptInvitation";
////////////////   Building New Goal Modules - will be re-arranged later
import TestMods from "pages/testMods/contributions_savings/friendsFamily";
import OneTimePayments from "pages/testMods/contributions_savings/oneTimePayments";
import MultiplePayments from "pages/testMods/contributions_savings/multiplePayments";
import QuestionAddAnotherSubForm from "pages/testMods/contributions_savings/questionLoopAdd";
import AssignSavingsToGoalSubForm from "pages/testMods/AssignAssets/assignSavingsToGoal";
import QuestionAddAnotherContSavings from "pages/testMods/AssignAssets/questionLoopAdd";
import StudentLoanDetails from "pages/testMods/StudentLoan/studentLoanDetails";
import QuestionAddAnotherStudentLoan from "pages/testMods/StudentLoan/questionLoopAdd";
import ScholarshipsGrantsDetails from "pages/testMods/Scholarships_Grants/schlolarships_grants";
import QuestionAddAnotherScholarshipGrant from "pages/testMods/Scholarships_Grants/questionLoopAdd";
import PersonalLoanHeloc from "pages/testMods/personal_loan_heloc/loan_details";
import QuestionAddAnotherPersonalLoan from "pages/testMods/personal_loan_heloc/questionLoopAdd";
import ParentPLUSLoan from "pages/testMods/personal_loan_heloc/parent_plus_loan";
import PersonalLoanHelocDetails from "pages/testMods/personal_loan_heloc/personal_loan_heloc";
import WorkStudyDetails from "pages/testMods/workStudy/workStudy";
import QuestionAddAnotherWorkStudy from "pages/testMods/workStudy/questionLoopAdd";
import PrivateEducationDetails from "pages/testMods/privateEducationDetails/privateEducationDetails";
import PrivateEducationK12Details from "pages/testMods/privateEducationDetails/privateEducationK12";
import RoomBoardMiscDetails from "pages/testMods/privateEducationDetails/room_board_misc";
import TuitionCosts from "pages/testMods/tuitionCosts/tuitionCosts";
///////////////
import PageNotFound from "./pages/auth/PageNotFound";
import DemoComponent from "./components/demo-component/demo-components";

///////////// PRIVATE EDUCATION
import PrivateEducationList from "pages/testMods/PrivateEducation.js";
import PrivateEducationDash from "pages/testMods/PrivateEducationDash.js";
import PrivateEducationNew from "pages/testMods/PrivateEducationNew.js";

import ClientContacts from "./components/client-information/client-contacts/client-contacts";
import CustomComponents from "./components/client-information/client-contacts/sub-components/custom-components";
import TaxInflationMain from "./components/client-information/tax-and-inflation/sub-components/tax-inflation-main";
import TaxAndInflation from "./components/client-information/tax-and-inflation/tax-and-inflation";
import RatesOfReturn from "./components/client-information/rates-of-return/rates-of-return";
import RatesOfReturnMain from "./components/client-information/rates-of-return/sub-components/rates-of-return-main";
import NewForm from "./pages/modules/assets/subforms/newForm";
import Collectibles from "./components/organizer/assets/collectibles/collectibles";
import inventory from "./components/organizer/assets/inventory/inventory";
import propertyAdd from "./components/organizer/assets/inventory/property/property-add";
import Items from "./components/organizer/assets/collectibles/items/items";
import Faq from "./components/faq/faq";
import itemAdd from "./components/organizer/assets/inventory/Item/item-add";
import ItemMain from "./components/organizer/assets/inventory/Item/item-main";
import ItemUpdate from "./components/organizer/assets/inventory/Item/item-update";
import Detail from "./components/organizer/assets/inventory/detail";
// new components
import AllocationSubform from "./pages/modules/assests_new/subForms/allocationSubForm";
import Signup from "./pages/auth/Signup";
import AssetListing from "./pages/modules/assests_new/asset-listing/Asset-Listing";

// new stepper for death components
import demoStepper from "./newComponents/demoStepper";


// lazy load all the views
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

// auth
const Login = React.lazy(() => import("./pages/auth/Login"));
const Logout = React.lazy(() => import("./pages/auth/Logout"));
const ForgetPassword = React.lazy(() =>
  import("./pages/account/ForgetPassword")
);
const Register = React.lazy(() => import("./pages/account/Register"));
const ConfirmAccount = React.lazy(() => import("./pages/account/Confirm"));

// handle auth and authorization
// const PrivateRoute = ({ component: Component,disableRoles, ...rest }) =>{
//   const history = useHistory()
//   const token = localStorage.getItem("userLoginToken")
// console.log(history.location.pathname);

//   return (
//   <Route {...rest} render={props => {
//     if (!token) {

//       // not logged in so redirect to login page with the return url
//       return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     }
// if(token && rest.path == '/login'){
//   history.push('./dashboard')
// }
//     // check if route is restricted by role
//     // const loggedInUser = getLoggedInUser();
//     // if (disableRoles && disableRoles.indexOf(loggedInUser.role) != -1) {
//     //   // role not authorised so redirect to home page
//     //   return <Redirect to={{ pathname: '/nopermission' }} />
//     // }
//     // authorised so return component

//     return <Component {...props} />
//   }} />
// )
// }

// const PublicRoute = ({ component: Component, disableRoles, ...rest }) => {
// const history = useHistory
// const token = localStorage.getItem("userLoginToken")

//   return(
//     <Route {...rest} render={props => {
//       if(token && rest.path == '/login'){
//         history.push('./dashboard')
//       }
//       return <Component {...props} />
//     }} />
//   )
// }

const PrivateRoute = ({ component: Component, disableRoles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // const isAuthTokenValid = isUserAuthenticated();
      const token = localStorage.getItem("userLoginToken");
      if (!token) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // check if route is restricted by role
      const loggedInUser = getLoggedInUser();
      // if (disableRoles && disableRoles.indexOf(loggedInUser.role) != -1) {
      //   // role not authorised so redirect to home page
      //   return <Redirect to={{ pathname: '/nopermission' }} />
      // }
      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

const PublicRoute = ({ component: Component, disableRoles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return <Component {...props} />;
    }}
  />
);

const routes = [
  // auth and account
  { path: "/login", name: "Login", component: Login, route: PublicRoute },
  // { path: "/sign-up", name: "SignUp", component: Signup, route: PublicRoute },
  // //sign up
  {
    path: "/sign-up",
    name: "Signup",
    component: Signup,
    route: PublicRoute
  },
  {
    path: "/acceptInvitation",
    name: "AcceptInvitation",
    component: AcceptInvitation,
    route: PublicRoute
  },
  { path: "/logout", name: "Logout", component: Logout, route: Route },
  {
    path: "/forget-password",
    name: "Forget Password",
    component: ForgetPassword,
    route: Route,
  },
  {
    path: "/otpvalidation",
    name: "Otp",
    component: OtpValidate,
    route: PublicRoute,
    // disableRoles: [],
    // title: "Otp",
  },
  {
    path: "/trusteeLogin",
    name: "TrusteeLogin",
    component: TrusteeLogin,
    route: PublicRoute,
    // disableRoles: [],
    // title: "Otp",
  },
  { path: "/register", name: "Register", component: Register, route: Route },
  {
    path: "/confirm",
    name: "Confirm",
    component: ConfirmAccount,
    route: Route,
  },
  {
    path: "/nopermission",
    name: "No Permission",
    component: NoPermission,
    route: Route,
  },

  {
    path: "/test",
    name: "TestForm",
    component: TestForm,
    route: PrivateRoute,
    disableRoles: [],
    title: "Test Form",
  },
  {
    path: "/protector/death",
    name: "DemoDeath",
    component: demoStepper,
    route: PrivateRoute,
    disableRoles: [],
    title: "DemoDeath",
  },

  // other pages
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    route: PrivateRoute,
    disableRoles: [],
    title: "Dashboard",
  },
  {
    path: "/delgateAccess",
    name: "DelgateAccess",
    component: DelegateAccess,
    route: PrivateRoute,
    disableRoles: [],
    title: "Delgate",
  },

  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
    route: PrivateRoute,
    disableRoles: [],
    title: "Welcome",
  },

  //modules
  {
    path: "/organizer",
    name: "Modules",
    component: Modules,
    route: PrivateRoute,
    disableRoles: [],
    title: "Modules",
  },

  {
    path: "/assistance",
    name: "Modules",
    component: AssistanceList,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Assistance",
  },
  //assistance
  // { path: '/assistance_in', name: 'AssistanceReceived', component: AssistanceReceived, route: PrivateRoute, disableRoles: [], title: 'Assistance Received'},
  {
    path: "/assistance_in_new",
    name: "AssistanceReceived New",
    component: AssistanceReceivedNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assistance Received New",
  },
  {
    path: "/assistance_in_edit/:assistanceInID",
    name: "AssistanceReceived Edit",
    component: AssistanceReceivedNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assistance Received New",
  },
  {
    path: "/assistance_in_view/:assistanceInID",
    name: "AssistanceReceived View",
    component: AssistanceReceivedView,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Assistance Received View",
  },
  // { path: '/assistance_out', name: 'Assistance Out', component: AssistanceOut, route: PrivateRoute, disableRoles: [], title: 'Assistance Out' },
  {
    path: "/assistance_out_new",
    name: "Assistance Out New",
    component: AssistanceOutNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assistance Out New",
  },
  {
    path: "/assistance_out_edit/:assistanceOutID",
    name: "Assistance Out Edit",
    component: AssistanceOutNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assistance Out Edit",
  },
  {
    path: "/assistance_out_view/:assistanceOutID",
    name: "Assistance Out View",
    component: AssistanceOutView,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Assistance Out View",
  },
  {
    path: "/assistance_new",
    name: "Assistance New",
    component: Assistance,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assistance New",
  },
  {
    path: "/assistance/create",
    name: "Assistance Create",
    component: AssistanceCreate,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assistance Create",
  },

  {
    path: "/assets",
    name: "Asset",
    component: Assets,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Assets",
  },
  {
    path: "/collectibles_new",
    name: "Collectibles New",
    component: Collectibles,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assets New",
  },
  {
    path: "/items/:name",
    name: "Items",
    component: Items,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Items",
  },
  {
    path: "/inventory_new",
    name: "Inventory New",
    component: inventory,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assets New",
  },
  {
    path: "/add_item",
    name: "Add Item",
    component: ItemMain,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assets New",
  },
  {
    path: "/update_item",
    name: "UpdateItem",
    component: ItemUpdate,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assets New",
  },

  {
    path: "/items",
    name: "Items New",
    component: Items,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assets New",
  },
  // {
  //   path: "/assets_new/:module",
  //   name: "Asset New",
  //   // component: AssetsNew,
  //   component: AllocationSubform,
  //   route: PrivateRoute,
  //   disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
  //   title: "Assets New",
  // },
  {
    path: "/assets_new/attributes/:module",
    name: "List",
    component: AllocationSubform,
    route: PrivateRoute,
    title: "List"
  },
  {
    path: "/assets_new/attributes/:module/:id",
    name: "List",
    component: AllocationSubform,
    route: PrivateRoute,
    title: "List"
  },
  //airplane properties
  {
    path: "/assets_new/:module",
    name: "Airplane Listing",
    component: AssetListing,
    route: PrivateRoute,
    title: "Airplane Listing",
  },

  {
    path: "/old/assets_new",
    name: "Asset New",
    component: AssetsNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assets New",
  },
  {
    path: "/asset_allocation",
    name: "Asset New",
    component: AssetAllocation,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Asset Allocation",
  },
  {
    path: "/assets_edit/:assetsID",
    name: "Asset Edit",
    component: AssetsNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Assets Edit",
  },
  {
    path: "/assets_view/:assetsID",
    name: "Asset View",
    component: AssetsView,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Assets View",
  },

  {
    path: "/liabilities_credit",
    name: "Liabilities and Credit",
    component: LiabilitiesCredit,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Liabilities And Credit",
  },
  {
    path: "/liabilities_credit_new",
    name: "Liabilities and Credit New",
    component: LiabilityCreditNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Liabilities And Credit New",
  },
  {
    path: "/liabilities_credit_edit/:liabilitiesCreditID",
    name: "Liabilities and Credit Edit",
    component: LiabilityCreditNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITofE, ROLES.VIEW_ONLY],
    title: "Liabilities And Credit Edit",
  },
  {
    path: "/liabilities_credit_view/:liabilitiesCreditID",
    name: "Liabilities and Credit View",
    component: LiabilityCreditView,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Liabilities And Credit View",
  },
  {
    path: "/social_security",
    name: "Social Security",
    component: SocialSecurityModule,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Social Security",
  },
  {
    path: "/social_security_new",
    name: "Social Security New",
    component: SocialSecurityNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Social Security New",
  },
  {
    path: "/social_security_edit",
    name: "Social Security Edit",
    component: SocialSecurityNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Social Security Edit",
  },
  {
    path: "/income",
    name: "Income",
    component: Income,
    route: PrivateRoute,
    disableRoles: [],
    title: "Income",
  },
  {
    path: "/income_new",
    name: "Income New",
    component: IncomeNew,
    route: PrivateRoute,
    disableRoles: [ROLES.VIEW_ONLY],
    title: "Income New",
  },
  {
    path: "/income_edit/:incomeID",
    name: "Income Edit",
    component: IncomeNew,
    route: PrivateRoute,
    disableRoles: [ROLES.VIEW_ONLY],
    title: "Income Edit",
  },
  {
    path: "/income_view/:incomeID",
    name: "Income Edit",
    component: IncomeView,
    route: PrivateRoute,
    disableRoles: [ROLES.VIEW_ONLY],
    title: "Income View",
  },
  {
    path: "/insurance",
    name: "Insurance",
    component: Insurance,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Insurance",
  },
  {
    path: "/insurance_new",
    name: "Insurance New",
    component: InsuranceAllocation,
    // component: InsuranceNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Insurance New",
  },
  {
    path: "/insurance_new/attributes/:module",
    name: "List",
    component: InsuranceSubForm,
    route: PrivateRoute,
    title: "List"
  },
  {
    path: "/insurance_new/attributes/:module/:id",
    name: "List",
    component: InsuranceSubForm,
    route: PrivateRoute,
    title: "List"
  },

  {
    path: "/insurance_edit/:insuranceID",
    name: "Insurance Edit",
    component: InsuranceNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Insurance Edit",
  },
  {
    path: "/insurance_view/:insuranceID",
    name: "Insurance View",
    component: InsuranceView,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Insurance View",
  },

  {
    path: "/budget",
    name: "Budget",
    component: Budget,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Budget",
  },
  {
    path: "/budget_account_add",
    name: "Budget Account Add",
    component: BudgetAccountAdd,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Budget Account Add",
  },
  {
    path: "/budget_account_list",
    name: "Budget Accounts Page",
    component: BudgetAccountList,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Budget Accounts Page",
  },
  {
    path: "/budget/create",
    name: "Budget",
    component: BudgetCreate,
    route: PublicRoute,
    disableRoles: [],
    title: "Budget Create",
  },

  {
    path: "/debt/create",
    name: "Debt",
    component: DebtCreate,
    route: PublicRoute,
    disableRoles: [],
    title: "Debt Create",
  },

  {
    path: "/social/create",
    name: "Social",
    component: SocialSecurityCreate,
    route: PublicRoute,
    disableRoles: [],
    title: "Social Create",
  },
  {
    path: "/social/",
    name: "Social",
    component: SocialSecurityDashboard,
    route: PublicRoute,
    disableRoles: [],
    title: "Social Dashboard",
  },
  //goals
  // { path: '/goals', name: 'Goals', component: Goals, route: PrivateRoute, disableRoles: [ROLES.FREE_APP_SUITE], title: 'Goals'},
  {
    path: "/goals",
    name: "Goals",
    component: GoalsList,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Goals List",
  },
  {
    path: "/goals_add",
    name: "Goals New",
    component: Goals,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Goals",
    exact: true,
  },
  {
    path: "/goals_new/:id",
    name: "Goals New",
    component: GoalsNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "GoalsNew",
  },

  //schedules
  {
    path: "/schedules",
    name: "Schedules",
    component: Schedules,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Schedules",
  },
  {
    path: "/asset_distribution",
    name: "Asset Distribution",
    component: AssetDistribution,
    route: PrivateRoute,
    disableRoles: [],
    title: "Asset Distribution",
  },
  {
    path: "/asset_distribution_rmd",
    name: "Asset Distribution RMD",
    component: AssetDistributionRMD,
    route: PrivateRoute,
    disableRoles: [],
    title: "Asset Distribution RMD",
  },
  {
    path: "/amortization_report",
    name: "Amortization Report",
    component: AmortizationReport,
    route: PrivateRoute,
    disableRoles: [],
    title: "Amortization Report",
  },
  {
    path: "/amortization_schedule",
    name: "Amortization Schedule",
    component: AmortizationSchedule,
    route: PrivateRoute,
    disableRoles: [],
    title: "Amortization Schedule",
  },
  {
    path: "/debt_payoff_amount",
    name: "Debt Pay off Amount",
    component: DebtPayoffAmount,
    route: PrivateRoute,
    disableRoles: [],
    title: "Debt Pay off Amount",
  },
  {
    path: "/payoff_debt_free_date",
    name: "Payoff Debt Free Date",
    component: PayoffDebtFreeDate,
    route: PrivateRoute,
    disableRoles: [],
    title: "Payoff Debt Free Date",
  },
  {
    path: "/portfolio_performance_of_30_years",
    name: "Portfolio Performance",
    component: PortfolioPerformance,
    route: PrivateRoute,
    disableRoles: [],
    title: "Portfolio Performance",
  },

  //client info
  {
    path: "/client_info",
    name: "Client Info",
    component: ClientInfo,
    route: PrivateRoute,
    disableRoles: [],
    title: "Client Info",
  },
  {
    path: "/clients/plans", //new='/clients/plans' old='/clients_plans'
    name: "Clients and Plans",
    component: ClientsPlans,
    route: PrivateRoute,
    disableRoles: [ROLES.CONSUMER, ROLES.FREE_APP_SUITE],
    title: "Clients and Plans",
  },
  {
    path: "/my_information",
    name: "My Information",
    component: MyInformation,
    route: PrivateRoute,
    disableRoles: [
      ROLES.SUPER_ADMIN,
      ROLES.COR_SUPER_ADMIN,
      ROLES.SUPERVISOR_ADMIN,
      ROLES.PROFESSIONAL,
      ROLES.FREE_APP_SUITE,
      ROLES.VIEW_ONLY,
    ],
    title: "My Information",
  },
  {
    path: "/edit_information",
    name: "Edit Information",
    component: EditInformation,
    route: PrivateRoute,
    disableRoles: [
      ROLES.SUPER_ADMIN,
      ROLES.COR_SUPER_ADMIN,
      ROLES.SUPERVISOR_ADMIN,
      ROLES.PROFESSIONAL,
      ROLES.FREE_APP_SUITE,
      ROLES.VIEW_ONLY,
    ],
    title: "Edit Information",
  },
  { //new
    path: "/clients/plans/compare",
    name: "Compare Plans",
    component: ComparePlans,
    route: PrivateRoute,
    disableRoles: [ROLES.CONSUMER, ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Compare Plans",
  },
  { //new
    path: "/clients/:id/plans",
    name: "Client Detail",
    component: ClientDetail,
    route: PrivateRoute,
    disableRoles: [ROLES.CONSUMER, ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Client Information",
  },
  { //new
    path: "/clients/:id/edit/plans",
    name: "Client Edit Detail",
    component: ClientEditDetail,
    route: PrivateRoute,
    disableRoles: [ROLES.CONSUMER, ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Client Edit Detail",
  },
  {
    path: "/client_new",
    name: "Client New",
    component: ClientNew,
    route: PrivateRoute,
    disableRoles: [ROLES.CONSUMER, ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Client New",
  },
  {
    path: "/clients/plans/create",
    name: "Client Plan New",
    component: ClientPlanNew,
    route: PrivateRoute,
    disableRoles: [ROLES.CONSUMER, ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Client Plan New",
  },
  {
    path: "/client_plan_edit/:planID",
    name: "Client Plan Edit",
    component: ClientPlanNew,
    route: PrivateRoute,
    disableRoles: [ROLES.CONSUMER, ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Client Plan Edit",
  },
  {
    path: "/tax_inflation",
    name: "Tax and Inflation",
    component: TaxAndInflation,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Tax and Inflation",
  },
  {
    path: "/tax_inflation_new",
    name: "Tax and Inflation New",
    component: TaxInflationNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Tax and Inflation New",
  },
  {
    path: "/tax_inflation_edit/:taxInflationID",
    name: "Tax and Inflation Edit",
    component: TaxInflationMain,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Tax and Inflation Edit",
  },
  {
    path: "/client_contacts",
    name: "Client Contacts",
    component: ClientContacts,
    route: PrivateRoute,
    disableRoles: [],
    title: "Client Contacts",
  },
  {
    path: "/client_contact_new",
    name: "Client Contact New",
    component: ClientContactNew,
    route: PrivateRoute,
    disableRoles: [ROLES.VIEW_ONLY],
    title: "Client Contact New",
  },
  {
    path: "/client_contact_edit/:clientContactID",
    name: "Client Contact Edit",
    component: ClientContactNew,
    route: PrivateRoute,
    disableRoles: [ROLES.VIEW_ONLY],
    title: "Client Contact Edit",
  },
  {
    path: "/client_contact_view/:clientContactID",
    name: "Client Contact View",
    component: ClientContactView,
    route: PrivateRoute,
    disableRoles: [ROLES.VIEW_ONLY],
    title: "Client Contact View",
  },
  {
    path: "/custom_components",
    name: "Custom Components",
    component: CustomComponents,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Custom Components",
  },

  {
    path: "/rates_of_return",
    name: "Rates of Return",
    component: RatesOfReturn,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Rates of Return",
  },
  {
    path: "/rates_of_return_new",
    name: "Rates of Return New",
    component: ReturnRatesNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Rates of Return New",
  },
  {
    path: "/rates_of_return_edit/:ratesOfReturnID",
    name: "Rates of Return Edit",
    component: RatesOfReturnMain,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Rates of Return Edit",
  },

  // Reports
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Reports",
  },
  {
    path: "/report_asset",
    name: "Reports Asset",
    component: ReportAsset,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Report Asset",
  },
  {
    path: "/add_asset",
    name: "Asset Add",
    component: AddAsset,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Add Asset",
  },
  {
    path: "/report_all_insurance_products",
    name: "Report - All Insurance Products",
    component: AllInsuranceProducts,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Report All Insurance Products",
  },
  {
    path: "/report_prefessional_team",
    name: "Report - Prefessional Team",
    component: PrefessionalTeam,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Report Prefessional Team",
  },
  {
    path: "/report_general_information",
    name: "General Information Report",
    component: GeneralInformation,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "General Information Report",
  },
  {
    path: "/income_report",
    name: "Income Report",
    component: IncomeReport,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Income Report",
  },
  {
    path: "/goals_report",
    name: "Goals Report",
    component: GoalsReport,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Goals Report",
  },
  {
    path: "/insurance_report",
    name: "Goals Report",
    component: InsuranceReport,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Insurance Report",
  },
  {
    path: "/liabilities_credit_report",
    name: "Goals Report",
    component: LiabilitiesCreditReport,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Liabilities and Credit Report",
  },
  {
    path: "/liquidity_report",
    name: "Liquidity Report",
    component: LiquidityReport,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Liquidity Report",
  },
  {
    path: "/report_monthly_savings",
    name: "Report Monthly Savings",
    component: MonthlySavings,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Report Monthly Savings",
  },
  {
    path: "/social_security_report",
    name: "Social Security Report",
    component: SocialSecurity,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Social Security Report",
  },
  {
    path: "/starting_a_business_report",
    name: "Starting a Business Report",
    component: StartingBusinessReport,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "Starting a Business Report",
  },
  {
    path: "/asset_item_report",
    name: "Asset Items Report",
    component: AssetsItemReport,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "All Items Report",
  },
  {
    path: "/income_and_taxes",
    name: "Income and Taxes",
    component: IncomeAndTaxes,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE],
    title: "All Items Report",
  },
  {
    path: "/insurance_payout",
    name: "Insurance Payout",
    component: InsurancePayout,
    route: PrivateRoute,
    disableRoles: [],
    title: "All Items Report",
  },
  {
    path: "/budget_and_goals",
    name: "Budget and Goals",
    component: BudgetAndGoals,
    route: PrivateRoute,
    disableRoles: [],
    title: "All Items Report",
  },
  {
    path: "/liabilities_items_report",
    name: "Liabilities",
    component: Liabilities,
    route: PrivateRoute,
    disableRoles: [],
    title: "All Items Report",
  },
  {
    path: "/budget_report",
    name: "Budget Report",
    component: BudgetReport,
    route: PrivateRoute,
    disableRoles: [],
    title: "Budget Report",
  },
  {
    path: "/budget_detailed",
    name: "Budget Detailed",
    component: BudgetDetailed,
    route: PrivateRoute,
    disableRoles: [],
    title: "Budget Detailed",
  },
  {
    path: "/net_worth_report",
    name: "Net Worth Report",
    component: NetWorthReport,
    route: PrivateRoute,
    disableRoles: [],
    title: "Net Worth Report",
  },

  // Worst Case Scenarios
  {
    path: "/executor_trustee_start",
    name: "Executor/Trustee Start Here",
    component: ExecutorTrusteeStart,
    route: PrivateRoute,
    disableRoles: [],
    title: "Executor/Trustee Start Here",
  },
  {
    path: "/worst_case_scenarios",
    name: "Worst Case Scenarios",
    component: WorstCaseScenarios,
    route: PrivateRoute,
    disableRoles: [],
    title: "Worst Case Scenarios",
  },
  {
    path: "/check_list",
    name: "Check List Report",
    component: CheckList,
    route: PrivateRoute,
    disableRoles: [],
    title: "Check List Report",
  },
  {
    path: "/add_check_list",
    name: "Add Check List",
    component: AddCheckList,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Check List",
  },
  {
    path: "/contact_list",
    name: "Contact List",
    component: ContactList,
    route: PrivateRoute,
    disableRoles: [],
    title: "Contact List Report",
  },
  {
    path: "/add_contact_list",
    name: "Add Contact List",
    component: AddContactList,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Contact List",
  },
  {
    path: "/important_documents",
    name: "All Important Documents",
    component: ImportantDocuments,
    route: PrivateRoute,
    disableRoles: [],
    title: "All Important Documents",
  },
  {
    path: "/add_important_documents",
    name: "Add Important Document",
    component: AddImportantDocuments,
    route: PrivateRoute,
    disableRoles: [],
    title: "All Important Documents",
  },
  {
    path: "/personal_instructions",
    name: "All Personal Instructions",
    component: PersonalInstructions,
    route: PrivateRoute,
    disableRoles: [],
    title: "All Personal Instructions",
  },
  {
    path: "/add_personal_instructions",
    name: "Add Personal Instruction",
    component: AddPersonalInstructions,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Personal Instruction",
  },
  {
    path: "/list_of_large_bills",
    name: "List of Large Bills",
    component: ListOfLargeBills,
    route: PrivateRoute,
    disableRoles: [],
    title: "List of Large Bills",
  },
  {
    path: "/add_list_of_large_bills",
    name: "Add List of Large Bill",
    component: AddListOfLargeBill,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add List of Large Bill",
  },
  {
    path: "/litigation_lists",
    name: "Litigation Lists",
    component: LitigationLists,
    route: PrivateRoute,
    disableRoles: [],
    title: "Litigation Lists",
  },
  {
    path: "/add_litigation_lists",
    name: "Add Litigation List",
    component: AddLitigationList,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Litigation List",
  },
  {
    path: "/location_of_personal_items",
    name: "Location of personal items",
    component: LocationOfPersonalItems,
    route: PrivateRoute,
    disableRoles: [],
    title: "Location of personal items",
  },
  {
    path: "/add_location_of_personal_item",
    name: "Add Litigation List",
    component: AddLocationOfPersonalItem,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Litigation List",
  },
  {
    path: "/list_of_passwords",
    name: "List of passwords Report",
    component: ListOfPasswords,
    route: PrivateRoute,
    disableRoles: [],
    title: "List of passwords Report",
  },
  {
    path: "/add_list_of_passwords",
    name: "Add List of passwords",
    component: AddListOfPasswords,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add List of passwords",
  },
  {
    path: "/prepaid_burial_expenses",
    name: "Prepaid Burial Expenses Report",
    component: PrepaidBurialExpenses,
    route: PrivateRoute,
    disableRoles: [],
    title: "Prepaid Burial Expenses Report",
  },
  {
    path: "/add_prepaid_burial_expenses",
    name: "Add Prepaid Burial Expenses",
    component: AddPrepaidBurialExpenses,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Prepaid Burial Expenses",
  },
  {
    path: "/progress_statuses",
    name: "All Progress Statuses",
    component: ProgressStatuses,
    route: PrivateRoute,
    disableRoles: [],
    title: "All Progress Statuses",
  },
  {
    path: "/add_progress_statuses",
    name: "Progress Statuses",
    component: AddProgressStatuses,
    route: PrivateRoute,
    disableRoles: [],
    title: "Progress Statuses",
  },
  {
    path: "/audio_video_message",
    name: "Audio/Video Message",
    component: AudioVideoMessage,
    route: PrivateRoute,
    disableRoles: [],
    title: "Audio/Video Message",
  },
  {
    path: "/add_audio_video_message",
    name: "Add Audio/Video Message",
    component: AddAudioVideoMessage,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Audio/Video Message",
  },
  {
    path: "/emails_to_send",
    name: "Emails to Send",
    component: EmailsToSend,
    route: PrivateRoute,
    disableRoles: [],
    title: "Emails to Send",
  },
  {
    path: "/add_emails_to_send",
    name: "Add Emails to Send",
    component: AddEmailsToSend,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Emails to Send",
  },

  // View Worst Case Scenarios
  {
    path: "/worst_case_scenarios_view",
    name: "View Worst Case Scenarios",
    component: WorstCaseScenariosView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "View Worst Case Scenarios",
  },
  {
    path: "/check_list_view",
    name: "View Check List Report",
    component: CheckListView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "Check List Report",
  },
  {
    path: "/contact_list_view",
    name: "View Contact List",
    component: ContactListView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "Contact List Report",
  },
  {
    path: "/important_documents_view",
    name: "View All Important Documents",
    component: ImportantDocumentsView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "All Important Documents",
  },
  {
    path: "/personal_instructions_view",
    name: "View All Personal Instructions",
    component: PersonalInstructionsView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "All Personal Instructions",
  },
  {
    path: "/list_of_large_bills_view",
    name: "View List of Large Bills",
    component: ListOfLargeBillsView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "List of Large Bills",
  },
  {
    path: "/litigation_lists_view",
    name: "View Litigation Lists",
    component: LitigationListsView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "Litigation Lists",
  },
  {
    path: "/location_of_personal_items_view",
    name: "View Location of personal items",
    component: LocationOfPersonalItemsView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "Location of personal items",
  },
  {
    path: "/list_of_passwords_view",
    name: "View List of passwords Report",
    component: ListOfPasswordsView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "List of passwords Report",
  },
  {
    path: "/prepaid_burial_expenses_view",
    name: "View Prepaid Burial Expenses Report",
    component: PrepaidBurialExpensesView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "Prepaid Burial Expenses Report",
  },
  {
    path: "/progress_statuses_view",
    name: "View All Progress Statuses",
    component: ProgressStatusesView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "All Progress Statuses",
  },
  {
    path: "/audio_video_message_view",
    name: "View Audio/Video Message",
    component: AudioVideoMessageView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "Audio/Video Message",
  },
  {
    path: "/emails_to_send_view",
    name: "View Emails to Send",
    component: EmailsToSendView,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "Emails to Send",
  },
  {
    path: "/summary",
    name: "Summary",
    component: Summary,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "Summary",
  },
  {
    path: "/asset_planet_message",
    name: "AssetPlanetMessage",
    component: AssetPlanetMessage,
    route: PrivateRoute,
    roles: ["Admin"],
    title: "AssetPlanetMessage",
  },

  //Planner
  {
    path: "/planner",
    name: "Planner",
    component: Planner,
    route: PrivateRoute,
    disableRoles: [],
    title: "Planner",
  },

  //FAQ's Route
  {
    path: "/faq",
    name: "Faq",
    component: Faq,
    route: PublicRoute,
    disableRoles: [],
    title: "Faq",
  },

  // Inventory and Collection Routes
  {
    path: "/inventory",
    name: "Inventory",
    component: Inventory,
    route: PrivateRoute,
    disableRoles: [],
    title: "Inventory",
  },
  {
    path: "/collection/:id",
    name: "Collection",
    component: Collection,
    route: PrivateRoute,
    disableRoles: [],
    title: "Collection",
  },

  //Property Detail
  {
    path: "/property-detail/:id",
    name: "Property Detail",
    component: Detail,
    route: PrivateRoute,
    disableRoles: [],
    title: "Property Detail",
  },

  //Room Detail
  {
    path: "/room-detail/:id",
    name: "Room Detail",
    component: Detail,
    route: PrivateRoute,
    disableRoles: [],
    title: "Room Detail",
  },

  //Item Detail
  {
    path: "/item-detail/:id",
    name: "Item Detail",
    component: Detail,
    route: PrivateRoute,
    disableRoles: [],
    title: "Item Detail",
  },
  //Protector
  {
    path: "/protector",
    name: "Protector",
    component: Protector,
    route: PrivateRoute,
    disableRoles: [],
    title: "Protector",
  },
  {
    path: "/divorce",
    name: "Divorce",
    component: Divorce,
    route: PrivateRoute,
    disableRoles: [],
    title: "Divorce",
  },
  {
    path: "/divorce/create",
    name: "DivorceCreate",
    component: DivorceCreate,
    route: PrivateRoute,
    disableRoles: [],
    title: "Divorce Create",
  },
  {
    path: "/death",
    name: "Death",
    component: Death,
    route: PrivateRoute,
    disableRoles: [],
    title: "Death",
  },
  {
    path: "/death/create",
    name: "DivorceCreate",
    component: DeathCreate,
    route: PrivateRoute,
    disableRoles: [],
    title: "Death Create",
  },
  {
    path: "/disaster",
    name: "Disaster",
    component: Disaster,
    route: PublicRoute,
    disableRoles: [],
    title: "Disaster",
  },
  {
    path: "/disaster/create",
    name: "Disaster",
    component: DisasterCreate,
    route: PublicRoute,
    disableRoles: [],
    title: "Disaster Create",
  },
  {
    path: "/disability",
    name: "Disability",
    component: Disability,
    route: PublicRoute,
    disableRoles: [],
    title: "Disability",
  },
  {
    path: "/disability/create",
    name: "Disability",
    component: DisabilityCreate,
    route: PublicRoute,
    disableRoles: [],
    title: "Disability Create",
  },

  //TEST MODS
  {
    path: "/friends-family",
    name: "Test Mods",
    component: TestMods,
    route: PrivateRoute,
    disableRoles: [],
    title: "Test Mods",
  },
  {
    path: "/friends-family-one-time",
    name: "Friends and Family One Time Payment",
    component: OneTimePayments,
    route: PrivateRoute,
    disableRoles: [],
    title: "Friends and Family One Time Payment",
  },
  {
    path: "/friends-family-multiple",
    name: "Friends and Family Multiple Payments",
    component: MultiplePayments,
    route: PrivateRoute,
    disableRoles: [],
    title: "Friends and Family Multiple Payments",
  },
  {
    path: "/question-add-another",
    name: "Friends and Family Multiple Payments",
    component: QuestionAddAnotherSubForm,
    route: PrivateRoute,
    disableRoles: [],
    title: "Friends and Family Multiple Payments",
  },
  {
    path: "/assign-savings-to-goal",
    name: "Assign Savings To Goal",
    component: AssignSavingsToGoalSubForm,
    route: PrivateRoute,
    disableRoles: [],
    title: "Assign Savings To Goal",
  },

  {
    path: "/question-add-another-cont-save",
    name: "Add Another Contribution or Savings?",
    component: QuestionAddAnotherContSavings,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Another Contribution or Savings?",
  },

  {
    path: "/student-loan-details",
    name: "Student Loan Details",
    component: StudentLoanDetails,
    route: PrivateRoute,
    disableRoles: [],
    title: "Student Loan Details",
  },
  {
    path: "/question-add-another-student-loan",
    name: "Add Another Student Loan?",
    component: QuestionAddAnotherStudentLoan,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Another Student Loan?",
  },

  {
    path: "/scholorships_grants",
    name: "Scholarships and Grants",
    component: ScholarshipsGrantsDetails,
    route: PrivateRoute,
    disableRoles: [],
    title: "Scholarships and Grants",
  },

  {
    path: "/question-add-another-scholarship-grant",
    name: "Add Another Scholarship  Grant?",
    component: QuestionAddAnotherScholarshipGrant,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add AnotherScholarships  Grant?",
  },

  {
    path: "/question-add-another-personal-loan",
    name: "Add Another Personal Loan?",
    component: QuestionAddAnotherPersonalLoan,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Another Personal Loan?",
  },
  {
    path: "/personal_loan",
    name: "Loan Details",
    component: PersonalLoanHeloc,
    route: PrivateRoute,
    disableRoles: [],
    title: "Loan Details",
  },

  {
    path: "/parent_plus_loan",
    name: "Parent Plus Loan",
    component: ParentPLUSLoan,
    route: PrivateRoute,
    disableRoles: [],
    title: "Parent Plus Loan",
  },

  {
    path: "/personal_loan_heloc",
    name: "Personal Loan  HELOC",
    component: PersonalLoanHelocDetails,
    route: PrivateRoute,
    disableRoles: [],
    title: "Personal Loan  HELOC",
  },

  {
    path: "/work-study",
    name: "Work Study",
    component: WorkStudyDetails,
    route: PrivateRoute,
    disableRoles: [],
    title: "Work Study",
  },
  {
    path: "/question-add-another-work-study",
    name: "Add Another Work Study?",
    component: QuestionAddAnotherWorkStudy,
    route: PrivateRoute,
    disableRoles: [],
    title: "Add Another Work Study?",
  },
  {
    path: "/private-education-details",
    name: "Private Education Details",
    component: PrivateEducationDetails,
    route: PrivateRoute,
    disableRoles: [],
    title: "Private Education Details",
  },
  {
    path: "/private-education-k12-details",
    name: "Private Education K12 Details",
    component: PrivateEducationK12Details,
    route: PrivateRoute,
    disableRoles: [],
    title: "Private Education K12 Details",
  },

  {
    path: "/room-board-misc",
    name: "Room, Board, Misc",
    component: RoomBoardMiscDetails,
    route: PrivateRoute,
    disableRoles: [],
    title: "Room, Board, Misc",
  },

  {
    path: "/tuition-costs",
    name: "Tuition Costs",
    component: TuitionCosts,
    route: PrivateRoute,
    disableRoles: [],
    title: "Tuition Costs",
  },

  ////// PRIVATE EDUCATION
  {
    path: "/private-education",
    name: "Private Education List",
    component: PrivateEducationList,
    route: PrivateRoute,
    disableRoles: [],
    title: "Private Education List",
  },
  {
    path: "/private-education-dash",
    name: "Private Education Dashboard",
    component: PrivateEducationDash,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "Private Education Dashboard",
    exact: true,
  },

  {
    path: "/private-education-new/:id",
    name: "Private Education New",
    component: PrivateEducationNew,
    route: PrivateRoute,
    disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY],
    title: "PrivateEducationNew",
  },

  ////////  { path: '/goals_new/:id', name: 'Goals New', component: GoalsNew, route: PrivateRoute, disableRoles: [ROLES.FREE_APP_SUITE, ROLES.VIEW_ONLY], title: 'GoalsNew'},

  // Charts
  {
    path: "/charts",
    name: "Charts",
    component: Charts,
    route: PrivateRoute,
    disableRoles: [],
    title: "Charts",
  },

  {
    path: "/",
    exact: true,
    // component: () => <Redirect to="/dashboard" />,
    component: () => <Redirect to="/login" />,
    route: PrivateRoute,
  },
  {
    path: "/*",
    name: "Page Not Found",
    component: PageNotFound,
    route: PublicRoute
  },


];

export { routes, PrivateRoute };
