import airplane from "../assets/images/latest/airplane.png";
import boat from "../assets/images/latest/boat.png";
import member from "../assets/images/latest/member.png";
import house from "../assets/images/latest/house.png";
import motorcycle from "../assets/images/latest/motorcycle.png";
import car from "../assets/images/latest/car.png";
import Start_Business from "../assets/images/latest/Start-Business.png";
import collectibles_art from "../assets/images/latest/collectibles_art.png";
import livestock from "../assets/images/latest/livestock.png";
import Vacation_Home from "../assets/images/latest/Vacation-Home.png";


import corp_bonds from "../assets/images/latest/corp_bonds.png";
import cd from "../assets/images/latest/cd.png";
import etf from "../assets/images/latest/etf.png";
import private_placement from "../assets/images/latest/private_placement.png";
import stock2 from "../assets/images/latest/stock2.png";
import Trust from "../assets/images/latest/Trust.png";
import Stock from "../assets/images/latest/Stock.png";

import people from "../assets/images/latest/people.png";
import Tution from "../assets/images/latest/Tution.png";
import law from "../assets/images/latest/law.png";
import Income_Tax2 from "../assets/images/latest/Income-Tax2.png";
import Creditcard from "../assets/images/latest/Creditcard.png";

//Report Images
import form from "../assets/images/form.png";
import people_suits from "../assets/images/people_suits.png";
import insurance from "../assets/images/insurance.png";
import networth from "../assets/images/networth.png";
import Savings from "../assets/images/latest/Savings.png";
import reports from "../assets/images/reports.png";
import form3 from "../assets/images/form3.png";
import form2 from "../assets/images/form2.png";
import form4 from "../assets/images/form4.png";
import Distributions from "../assets/images/Distributions.png";
import goal from "../assets/images/goal.png";
import creditcard from "../assets/images/creditcard.png";
import dollar from "../assets/images/dollar.png";
import networth3 from "../assets/images/networth3.png";
import performance from "../assets/images/performance.png";
import social_security from "../assets/images/social_security.png";
import start_business from "../assets/images/start_business.png";
import stock from "../assets/images/stock.png";
import Debt from "../assets/images/latest/Debt.png";
import inherited_ira from "../assets/images/inherited_ira.png";
import bitcoin from "../assets/images/bitcoin.png";
import precious_metals from "../assets/images/precious_metals.png";

export const LIABILITY_CREDIT_TYPES = [
  "Credit - HELOC",
  "Credit Card - Business",
  "Credit Card - Personal",
  "Other Payments",
  "Auto",
  "Business",
  "Margin",
  "Personal",
  "Real Estate",
  "Settlement",
  "Student",
];

export const CREDIT_TYPES = [
  "Credit Card - Personal",
  "Credit Card - Business",
  "Credit - HELOC",
];

export const CREDIT_TYPES_IMAGES = [Creditcard, Creditcard, house];

export const LIABILITY_TYPES = [
  "Auto",
  "Business",
  "Margin",
  "Personal",
  "Real Estate",
  "Settlement",
  "Student",
  "Other Payments",
];

export const LIABILITY_TYPES_IMAGES = [
  car,
  Start_Business,
  stock2,
  people,
  house,
  law,
  Tution,
  Income_Tax2,
];

export const REPORTS_SCHEDULES_GROUPS = {
  REPORTS: "REPORTS_GROUP",
  SCHEDULES: "SCHEDULES_GROUP",
};

export const REPORTS_SCHEDULES_TYPES = [
  {
    name: "All Items Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },
  {
    name: "Professional Team Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },

  {
    name: "All Insurance Products",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },
  {
    name: "Report Asset",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },

  {
    name: "Budget Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },
  {
    name: "Budget Detailed",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },

  {
    name: "Report - General Information",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },
  {
    name: "Income Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },
  {
    name: "Goals Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },
  {
    name: "Insurance Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },

  {
    name: "Liabilities and Credit Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },
  {
    name: "Liquidity Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },

  {
    name: "Net Worth Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },
  {
    name: "Report Monthly Savings",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },

  {
    name: "Social Security Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },
  {
    name: "Starting a Business Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
  },

  {
    name: "Assets Distribution",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
  },
  {
    name: "Assets Distribution with RMD",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
  },

  {
    name: "Amortization Report - Summary",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
  },
  {
    name: "Amortization Schedule - Month",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
  },

  {
    name: "Debt Payoff - $ Amount",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
  },
  {
    name: "Debt Payoff - Debt Free Date",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
  },
  {
    name: "Portfolio Performance of 30 years",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
  },
];

export const REPORTS_LIST = [
  {
    name: "All Items Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/asset_item_report",
    img: form,
  },
  {
    name: "Professional Team Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/report_prefessional_team",
    img: people_suits,
  },

  {
    name: "All Insurance Products",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/report_all_insurance_products",
    img: insurance,
  },
  {
    name: "Report Asset",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/report_asset",
    img: networth,
  },

  {
    name: "Budget Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/budget_report",
    img: Savings,
  },
  {
    name: "Budget Detailed",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/budget_detailed",
    img: reports,
  },

  {
    name: "Report - General Information",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/report_general_information",
    img: form3,
  },
  {
    name: "Income Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/income_report",
    img: Distributions,
  },
  {
    name: "Goals Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/goals_report",
    img: goal,
  },
  {
    name: "Insurance Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/insurance_report",
    img: insurance,
  },

  {
    name: "Liabilities and Credit Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/liabilities_credit_report",
    img: creditcard,
  },
  {
    name: "Liquidity Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/liquidity_report",
    img: dollar,
  },

  {
    name: "Net Worth Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/net_worth_report",
    img: networth3,
  },
  {
    name: "Report Monthly Savings",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/report_monthly_savings",
    img: performance,
  },

  {
    name: "Social Security Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/social_security_report",
    img: social_security,
  },
  {
    name: "Starting a Business Report",
    type: REPORTS_SCHEDULES_GROUPS.REPORTS,
    url: "/starting_a_business_report",
    img: start_business,
  },
];

export const SCHEDULES_LIST = [
  {
    name: "Assets Distribution",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
    url: "/asset_distribution",
    img: Distributions,
  },
  {
    name: "Assets Distribution with RMD",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
    url: "/asset_distribution_rmd",
    img: inherited_ira,
  },

  {
    name: "Amortization Report - Summary",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
    url: "/amortization_report",
    img: form2,
  },
  {
    name: "Amortization Schedule - Month",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
    url: "/amortization_schedule",
    img: form4,
  },

  {
    name: "Debt Payoff - $ Amount",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
    url: "/debt_payoff_amount",
    img: Debt,
  },
  {
    name: "Debt Payoff - Debt Free Date",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
    url: "/payoff_debt_free_date",
    img: Debt,
  },
  {
    name: "Portfolio Performance of 30 years",
    type: REPORTS_SCHEDULES_GROUPS.SCHEDULES,
    url: "/portfolio_performance_of_30_years",
    img: stock,
  },
];

export const INSURANCE_TYPES_GROUP = {
  ANNUITY: "INSURANCE_TYPES_GROUP_ANNUITY",
  LIFE_HEALTH: "INSURANCE_TYPES_GROUP_LIFE_HEALTH",
  PROPERTY_CASUALTY: "INSURANCE_TYPES_GROUP_PROPERTY_CASUALTY",
  LONG_TERM_CARE: "INSURANCE_TYPES_GROUP_LONG_TERM_CARE",
};

export const INSURANCE_TYPES = [
  {
    name: "Annuity - Fixed",
    type: INSURANCE_TYPES_GROUP.ANNUITY,
  },
  {
    name: "Annuity - Variable",
    type: INSURANCE_TYPES_GROUP.ANNUITY,
  },
  {
    name: "Annuity - Fixed Indexed",
    type: INSURANCE_TYPES_GROUP.ANNUITY,
  },
  {
    name: "Annuity - Deferred",
    type: INSURANCE_TYPES_GROUP.ANNUITY,
  },
  {
    name: "Annuity - Immediate",
    type: INSURANCE_TYPES_GROUP.ANNUITY,
  },
  {
    name: "Final Expense",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Guaranteed Issue",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Other",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term - 5 Year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "No Medical Exam",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Speciality and Misc",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term - 10 Year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term -  30 Year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Variable Life",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Variable Survivorship",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Whole Life",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term - 20 year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Universal Life",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Variable Universal Life",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term - 25 Year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term - 15 Year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Dental",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Renters",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Flood",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Automobile",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Fire",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Earthquake",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Umbrella",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Homeowners",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Long Term Care",
    type: INSURANCE_TYPES_GROUP.LONG_TERM_CARE,
  },
  {
    name: "Long Term Disability",
    type: INSURANCE_TYPES_GROUP.LONG_TERM_CARE,
  },
  {
    name: "Long Term Care - Hybrid",
    type: INSURANCE_TYPES_GROUP.LONG_TERM_CARE,
  },
];

export const INSURANCE_TYPES_ANNUITY = [
  {
    name: "Annuity - Fixed",
    type: INSURANCE_TYPES_GROUP.ANNUITY,
  },
  {
    name: "Annuity - Fixed Indexed",
    type: INSURANCE_TYPES_GROUP.ANNUITY,
  },
  {
    name: "Annuity - Deferred",
    type: INSURANCE_TYPES_GROUP.ANNUITY,
  },
  {
    name: "Annuity - Immediate",
    type: INSURANCE_TYPES_GROUP.ANNUITY,
  },
  {
    name: "Annuity - Variable",
    type: INSURANCE_TYPES_GROUP.ANNUITY,
  },
];

export const INSURANCE_TYPES_LIFE_HEALTH = [
  {
    name: "Dental",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term - 5 Year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Final Expense",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term - 10 Year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Guaranteed Issue",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term - 15 Year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Variable Survivorship",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term - 20 year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Universal Life",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term - 25 Year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Variable Life",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Term -  30 Year",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Variable Universal Life",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "Whole Life",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
  {
    name: "No Medical Exam",
    type: INSURANCE_TYPES_GROUP.LIFE_HEALTH,
  },
];

export const INSURANCE_TYPES_PROPERTY_CASUALTY = [
  {
    name: "Automobile",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Fire",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Earthquake",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Umbrella",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Renters",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Homeowners",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Flood",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
  {
    name: "Speciality and Misc",
    type: INSURANCE_TYPES_GROUP.PROPERTY_CASUALTY,
  },
];

export const INSURANCE_TYPES_LONG_TERM_CARE = [
  {
    name: "Long Term Care",
    type: INSURANCE_TYPES_GROUP.LONG_TERM_CARE,
  },
  {
    name: "Long Term Disability",
    type: INSURANCE_TYPES_GROUP.LONG_TERM_CARE,
  },
  {
    name: "Long Term Care - Hybrid",
    type: INSURANCE_TYPES_GROUP.LONG_TERM_CARE,
  },
  {
    name: "Other",
    type: INSURANCE_TYPES_GROUP.LONG_TERM_CARE,
  },
];
export const INCOME_TYPES_GROUP = {
  TYPICAL: "INCOME_TYPES_GROUP_TYPICAL",
  OTHER: "INCOME_TYPES_GROUP_OTHER",
};
export const INCOME_TYPES = [
  {
    name: "Alimony",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Real Estate Rental",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Dividends - Ordinary",
    type: INCOME_TYPES_GROUP.OTHER,
  },
  {
    name: "IRA / Retirement Distributions",
    type: INCOME_TYPES_GROUP.OTHER,
  },
  {
    name: "Dividends - Qualified",
    type: INCOME_TYPES_GROUP.OTHER,
  },
  {
    name: "Muni Bonds - In State",
    type: INCOME_TYPES_GROUP.OTHER,
  },
  {
    name: "Government Agency Bond",
    type: INCOME_TYPES_GROUP.OTHER,
  },
  {
    name: "Muni Bonds - Out of State",
    type: INCOME_TYPES_GROUP.OTHER,
  },
  {
    name: "Government Agency Bond - State Tax Free",
    type: INCOME_TYPES_GROUP.OTHER,
  },
  {
    name: "Portfolio Income",
    type: INCOME_TYPES_GROUP.OTHER,
  },
  {
    name: "Interest Income - Ordinary",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "RMD Distributions",
    type: INCOME_TYPES_GROUP.OTHER,
  },
  {
    name: "Investment Sale Proceeds - LT Gains",
    type: INCOME_TYPES_GROUP.OTHER,
  },
  {
    name: "Other",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
];
export const INCOME_TYPES_NON = [
  {
    name: "Alimony",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Pension",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Annuity",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Personal Loans",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Bonus from Work",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Real Estate Rental",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Business Proceeds - Ordinary",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Reverse Motgage",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Disability Income Payments",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Royalties",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },

  {
    name: "Distribution from Asset",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },

  {
    name: "Sales Commision from Work",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Earned Income From Work",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Settlement (Structured or Lump)",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Insurance Payout",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Military Benefits",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
  {
    name: "Social Security",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },

  {
    name: "Unemployment",
    type: INCOME_TYPES_GROUP.TYPICAL,
  },
];

export const CORPORATE_TYPES = [
  "LLP",
  "LP",
  "LLC",
  "C Corp",
  "S Corp",
  "B Corp",
  "Sole Proprietorship",
  "Nonprofit",
  "Cooperative",
];

export const STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const RELATIONSHIPS = ["Family", "Friend", "Professional"];

export const ASSETS = [
  "Home Asset",
  "Brokerage Out",
  "Test Contribution",
  `Bill's IRA`,
];

export const HELD_WHERES = [
  "---",
  "AEGON/Transamerica",
  "AIG",
  "Allianz Life",
  "Ameriprise Financial",
  "AXA Advisors",
  "AXA Equitable",
  "Bank of America Corp",
  "Bank of New York Mellon Corp",
  "BB&T Corp",
  "Brighthouse Financial",
  "Cambridge Investment Research",
  "Capital One Financial Corp",
  "Cetera Advisor Networks",
  "Charles Schwab",
  "Citigroup Inc",
  "Commonwealth Equity",
  "Commonwealth Financial Network Edward Jones",
  "Fidelity Investments Life",
  "Fidelity First Allied Securities",
  "Goldman Sachs Group Inc",
  "Hartford",
  "HSBC USA Inc",
  "Jackson National",
  "JPMorgan Chase & Co",
  "Kestra Investment Services",
  "Lincoln Financial Group",
  "Lincoln Investment",
  "LPL Financial MML Investor Services",
  "Morgan Stanley",
  "Mutual of America",
  "National Planning Corporation Nationwide",
  "New York Life",
  "NFP Advisor Services",
  "Northwest Mutual Investment Services",
  "Northwestern Mutual",
  "Ohio National",
  "Pacific Life",
  "PNC Financial Services Group Inc",
  "Prudential Financial",
  "Raymond James Financial",
  "Securities America",
  "Securities Service Network",
  "State Street Corp",
  "SunTrust Banks Inc",
  "TD Ameritrade",
  "TD Group US Holdings LLC",
  "Thrivent Financial",
  "TIAA-CREF",
  "Transamerica Financial",
  "U.S. Bancorp",
  "Voya Financial",
  "VoyaWaddell & Reed",
  "Wells Fargo & Co",
  "Wells Fargo Advisors ",
  "Franklin Templeton",
];

export const ACCOUNT_TYPES = [
  "401K",
  "401K Individual",
  "401K Roth",
  "403B",
  "457",
  "529",
  "Coverdell Education",
  "Custodial",
  "Defined Benefit",
  "Defined Contribution",
  "ESOP",
  "Health Savings Account",
  "Individual",
  "IRA Contributory",
  "IRA Inherited",
  "IRA Rollover",
  "Joint",
  "Joint - Tenants In Common",
  "Moneye Purchase",
  "Pension",
  "Profit Sharing Plan",
  "Roth",
  "SARSEP",
  "SEP IRA",
  "SIMPLE IRA",
  "Trust",
  "ITA Inherited",
  "Money Purchase",
];
export const CLIENT_TYPE = ["Client 1", "Client 2", "Client 3"];
export const OWNERS = [
  "Bill Client",
  "Peggy Client",
  "Joint",
  "Mark Client",
  "Katie Client",
];

export const ASSET_STATUSES = ["Owned", "Pending Sale", "Sold", "Not Owned"];

export const FREQUNCIES = [
  "Annually",
  "Bi-Monthly",
  "Bi-Weekly",
  "Monthly",
  "One-Time",
  "Quarterly",
  "Semi-Annually",
  "Weekly",
];

export const SCHOOL_LEVEL = ["K-12", "UnderGrad", "Graduate", "Doctoral"];

export const RETURN_RATES = ["Static", "User Defined", "Monte Carlo"];

export const ORDER_DISTRIBUTES = ["FIFO", "LIFO", "Combination 50/50"];

export const ALLOCATIONS_Physical = [
  "Airplane",
  "Auto - non-collectible",
  "Boat",
  "Collectibles",
  "General Household",
  "Livestock",
  "Motorcycles",
  "Real Estate",
  "Precious Metals",
  "Inventory"
];

export const ALLOCATIONS_Physical_Images = [
  airplane,
  car,
  boat,
  collectibles_art,
  house,
  livestock,
  motorcycle,
  Vacation_Home,
  precious_metals,
  form
];

export const ALLOCATIONS_Images = [
  corp_bonds,
  cd,
  etf,
  private_placement,
  stock2,
  Trust,
  Stock,
  Start_Business,
  member,
  bitcoin
];

export const ALLOCATIONS = [
  "Bonds - Int  Long Term",
  "Cash/CD's T-Bills",
  "Indexes, ETF's and Mutual Funds",
  "Private Placement & VC",
  "Stocks - Individual",
  "Trust Deeds",
  "User Defined Portfolio Allocation",
  "Business Interest",
  "Club Membership",
  "Cryptocurrency"
];
export const COLLECTIBLE_TYPES = [
  "Art",
  "Classic Car",
  "Clothing",
  "Guns",
  "Knives",
  "Swords",
  "Armor",
  "Memorabilia",
  "Metals and Jewelry",
];

export const COLLECTIBLE_SUB_TYPES = {
  Art: ["Sculpture", "Painting", "Rug", "Animation", "Other"],
  Clothing: ["Shoes", "Fur", "Purses", "Other"],
  Memorabilia: ["Sports Cards", "Toys", "Music", "Movies", "Other"],
  "Metals and Jewelry": ["Gold", "Silver", "Rare Coins", "Jewelry", "Other"],
};

export const ANIMALS = [
  "Birds",
  "Buffalo",
  "Cats",
  "Cattle",
  "Chicken",
  "Dogs",
  "Fish",
  "Goats",
  "Horses",
  "Insects",
  "Invertebrates",
  "Minks",
  "Mules",
  "Other Poultry",
  "Pigs",
  "Rabbits",
  "Rats",
  "Sheep",
  "Steers/Bulls",
  "Turkey",
];

export const RENTAL_EXPENSES = [
  "Accounting/Bookeeping Fees",
  "Advertising/Marketing",
  "Broker Fees",
  "Budget for Future Vacancies",
  "Closing Costs",
  "Gardening",
  "Homeowner Association Fees",
  "Homeowner Insurance",
  "Pest Control",
  "Property Management Fees",
  "Property Taxes",
  "Tenant Screening",
];

export const FAMILY_RELATIONSHIPS = [
  "Aunt",
  "Charity",
  "Cousin",
  "Friend",
  "Grandchild",
  "Grandparent",
  "In-Law",
  "Nephew",
  "Niece",
  "Other",
  "Parent",
  "Sibling",
  "Step-Grandparent",
  "Step-Sibling",
  "Uncle",
];
