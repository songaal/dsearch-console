import React from "react"
import async from "../components/Async"
import {Users} from "react-feather"
import * as Icon from "@material-ui/icons";

// CLuster
const Cluster = async(() => import("../pages/cluster"));
const User = async(() => import("../pages/user"));
const Role = async(() => import("../pages/role"));

// Dashboard components
const Dashboard = async(() => import("../pages/dashboard"));

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Analysis components
const Dictionary = async(() => import("../pages/analysis/dictionary"));
const Tools = async(() => import("../pages/analysis/tools"));
const RankingTuning = async(() => import("../pages/analysis/rankingTuning"));

// Indices components
const Templates = async(() => import("../pages/indices/templates"));
const TemplateEdit = async(() => import("../pages/indices/templates/edit"));
const TemplateView = async(() => import("../pages/indices/templates/view"));

const IndexData = async(() => import("../pages/indices/indexData"));
const Search = async(() => import("../pages/indices/search"));
const DataSource = async(() => import("../pages/indices/dataSource"));
const Index = async(() => import("../pages/indices/index"));
const Configuration = async(() => import("../pages/indices/configuration"));

// Search components
const QueryTest = async(() => import("../pages/search/queryTest"));
const ReferenceUi = async(() => import("../pages/search/referenceUI"));

// Management components
const ServerManagement = async(() => import("../pages/management/serverManagement"));
const ApiManagement = async(() => import("../pages/management/apiManagement"));
const KibanaManagement = async(() => import("../pages/management/kibanaManagement"));
const ConfigurationManagement = async(() => import("../pages/management/configurationManagement"));


// Routes Configuration

const homeRoutes = {
    id: "클러스터",
    path: "/",
    icon: <Icon.Home/>,
    containsHome: true,
    component: Cluster,
    children: null,
};

const userRoutes = {
    id: "사용자",
    path: "/user",
    icon: <Icon.Home/>,
    component: User,
    children: null,
};

const roleRoutes = {
    id: "역할",
    path: "/role",
    icon: <Icon.Home/>,
    component: Role,
    children: null,
};

const dashboardRoutes = {
    id: "대시보드",
    path: "/dashboard",
    icon: <Icon.Dashboard/>,
    component: Dashboard,
    children: null,
};

const authRoutes = {
    id: "auth",
    path: "/auth",
    icon: <Users/>,
    children: [
        {
            path: "/auth/sign-in",
            name: "Sign In",
            component: SignIn
        },
        {
            path: "/auth/reset-password",
            name: "Reset Password",
            component: ResetPassword
        },
        {
            path: "/auth/404",
            name: "404 Page",
            component: Page404
        },
        {
            path: "/auth/500",
            name: "500 Page",
            component: Page500
        }
    ]
};

const analysisRoutes = [
    {
        id: "사전",
        path: "/analysis/dictionary",
        header: "분석",
        icon: <Icon.Visibility/>,
        component: Dictionary,
        children: null
    },
    {
        id: "분석도구",
        path: "/analysis/tools",
        icon: <Icon.Visibility/>,
        component: Tools,
        children: null
    },
    {
        id: "랭킹튜닝",
        path: "/analysis/ranking-tuning",
        icon: <Icon.Visibility/>,
        component: RankingTuning,
        children: null
    }
];


const indicesRoutes = [
    {
        header: "인덱스",
        id: "설정",
        path: "/indices/configuration",
        icon: <Icon.Subject/>,
        component: Configuration,
        children: null
    },
    {
        id: "템플릿",
        path: "/indices/templates",
        icon: <Icon.Subject/>,
        component: Templates,
        children: null
    },
    {
        path: "/indices/template/edit",
        component: TemplateEdit,
        hidden: true
    },
    {
        path: "/indices/template/view",
        component: TemplateView,
        hidden: true
    },
    {
        id: "검색",
        path: "/indices/search",
        icon: <Icon.Subject/>,
        component: Search,
        children: null
    },
    {
        id: "데이터",
        path: "/indices/data",
        icon: <Icon.Subject/>,
        component: IndexData,
        children: null
    },
    {
        id: "소스",
        path: "/indices/source",
        icon: <Icon.Subject/>,
        component: DataSource,
        children: null
    },
    {
        id: "색인",
        path: "/indices/index",
        icon: <Icon.Subject/>,
        component: Index,
        children: null
    }
];

const searchRoutes = [
    {
        header: "검색",
        id: "쿼리테스트",
        path: "/search/query-test",
        icon: <Icon.Search/>,
        component: QueryTest,
        children: null
    },
    {
        id: "레퍼런스UI",
        path: "/search/reference-ui",
        icon: <Icon.Search/>,
        component: ReferenceUi,
        children: null
    },
];

const managementRoutes = [
    {
        header: "관리",
        id: "서버",
        path: "/management/server",
        icon: <Icon.Memory/>,
        component: ServerManagement,
        children: null
    },
    {
        id: "API",
        path: "/management/api",
        icon: <Icon.Memory/>,
        component: ApiManagement,
        children: null
    },
    {
        id: "Kibana",
        path: "/management/kibana",
        icon: <Icon.Memory/>,
        component: KibanaManagement,
        children: null
    },
    {
        id: "설정",
        path: "/management/configuration",
        icon: <Icon.Memory/>,
        component: ConfigurationManagement,
        children: null
    },
];

// dashboard layout routing
export const dashboard = [
    dashboardRoutes,
    ...analysisRoutes,
    ...indicesRoutes,
    ...searchRoutes,
    ...managementRoutes
];

export const intro = [
    homeRoutes,
    roleRoutes,
    userRoutes,
];


// auth layout routing
export const auth = [authRoutes];

// 메뉴 노출
// export default dashboard.filter(o => o !== homeRoutes)
