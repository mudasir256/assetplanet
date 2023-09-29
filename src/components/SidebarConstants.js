import dashboard from "../assets/images/sidebar/dashboard.png";
import organizer from "../assets/images/sidebar/organizer.png";
import planner from "../assets/images/sidebar/planner.png";
import protector from "../assets/images/sidebar/protector.png";
import report from "../assets/images/sidebar/report.png";
import clientinfo from "../assets/images/sidebar/clientinfo.png";
import clientinfowhite from "../assets/images/sidebar/clientinfowhite.png";
import dashboardwhite from "../assets/images/sidebar/dashboardwhite.png";
import organizerwhite from "../assets/images/sidebar/organizerwhite.png";
import plannerwhite from "../assets/images/sidebar/plannerwhite.png";
import protectorwhite from "../assets/images/sidebar/protectorwhite.png";
import reportwhite from "../assets/images/sidebar/reportwhite.png";



export const sideItemsClient = [

    {
        href: "/dashboard",
        title: "Dashboard",
        image: dashboard,
        whiteImage: dashboardwhite,
    },
    {
        href: "/client_info",
        title: "Client Information",
        image: clientinfo,
        whiteImage: clientinfowhite,
        subNav: [
            {
                title: "Clients and Plans",
                path: "/clients/plans",
                image: clientinfo,
                cName: "sub-nav",
                whiteImage: clientinfowhite,

            },
            {
                title: "Mobile Sync",
                path: "/dashboard",
                image: clientinfo,
                cName: "sub-nav",
                whiteImage: clientinfowhite,

            },
            {
                title: "Tax and Inflation",
                path: "/tax_inflation",
                image: clientinfo,
                whiteImage: clientinfowhite,

            },
            {
                title: "Rates of Return",
                path: "/rates_of_return",
                image: clientinfo,
                whiteImage: clientinfowhite,

            },
            {
                title: "Client Contacts",
                path: "/client_contacts",
                image: clientinfo,
                whiteImage: clientinfowhite,

            },
            {
                title: "Custom Components",
                path: "/custom_components",
                image: clientinfo,
                whiteImage: clientinfowhite,

            },
        ],
    },
    {
        href: "/organizer",
        title: "Orgainzer",
        image: organizer,
        whiteImage: organizerwhite,

        subNav: [

            {
                title: "Assets",
                path: "/assets",
                image: organizer,
                cName: "sub-nav",
                whiteImage: organizerwhite,

            },
            {
                title: "Liabilities and Credit",
                path: "/liabilities_credit",
                image: organizer,
                whiteImage: organizerwhite,

            },
            {
                title: "Insurance Products",
                path: "/insurance",
                image: organizer,
                cName: "sub-nav",
                whiteImage: organizerwhite,

            },
            {
                title: "Income",
                path: "/income",
                image: organizer,
                whiteImage: organizerwhite,

            },
            {
                title: "Assistance",
                path: "/assistance/create",
                image: organizer,
                cName: "sub-nav",
                whiteImage: organizerwhite,

            },
            {
                title: "Budget",
                path: "/budget",
                image: organizer,
                whiteImage: organizerwhite,

            },
        ],
    },
    {
        href: "/planner",
        title: "Planner",
        image: planner,
        whiteImage: plannerwhite,
        subNav: [

            {
                title: "Debt Payoff",
                path: "/debt/create",
                image: planner,
                cName: "sub-nav",
                whiteImage: plannerwhite,

            },
            {
                title: "Social Security",
                path: "/social/",
                image: planner,
                whiteImage: plannerwhite,

            },
            {
                title: "Goals",
                path: "/goals",
                image: planner,
                cName: "sub-nav",
                whiteImage: plannerwhite,

            },

        ],

    },
    {
        href: "/protector",
        title: "Protector",
        image: protector,
        whiteImage: protectorwhite,

        subNav: [
            {
                title: "Disability",
                path: "/disability",
                image: protector,
                whiteImage: protectorwhite,
                cName: "sub-nav",
            },
            {
                title: "Divorce",
                path: "/divorce",
                image: protector,
                whiteImage: protectorwhite,
                cName: "sub-nav",
            },
            {
                title: "Death",
                path: "/death/create",
                whiteImage: protectorwhite,
                image: protector,
            },
            {
                title: "Disaster",
                path: "/disaster",
                whiteImage: protectorwhite,
                image: protector,
            },
        ],
    },
    {
        href: "/schedules",
        title: "Reports & Schedule",
        image: report,
        whiteImage: reportwhite,

    }
];
