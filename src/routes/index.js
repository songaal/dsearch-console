import React from "react"
import async from "../components/Async"
import * as Icon from "@material-ui/icons";
import BackupIcon from '@material-ui/icons/Backup';
// eslint-disable-next-line no-restricted-globals
const clusterContext = location.pathname.substring(0, location.pathname.indexOf("/", 1))

// CLuster
const Cluster = async(() => import("../pages/cluster"));
const User = async(() => import("../pages/userManagement"));
const Role = async(() => import("../pages/role"));

// Dashboard components
const Dashboard = async(() => import("../pages/dashboard"), { time: 500 });

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
// const SignUp = async(() => import("../pages/auth/SignUp"));
// const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
// const Page404 = async(() => import("../pages/auth/Page404"));
// const Page500 = async(() => import("../pages/auth/Page500"));
const EditUser = async(() => import("../pages/userManagement/EditUser"));

// Analysis components
const Dictionary = async(() => import("../pages/analysis/dictionary"), { time: 0 });
const Tools = async(() => import("../pages/analysis/tools"), { time: 0 });
const RankingTuning = async(() => import("../pages/analysis/rankingTuning"), { time: 0 });

// Indices components
const Templates = async(() => import("../pages/indices/indexTemplates"));
const TemplateNew = async(() => import("../pages/indices/indexTemplates/new"));
const TemplateEdit = async(() => import("../pages/indices/indexTemplates/edit"));
const TemplateView = async(() => import("../pages/indices/indexTemplates/view"));

const ClusterData = async(() => import("../pages/indices/cluster"));
const Index = async(() => import("../pages/indices/index"));
const IndexDetail = async(() => import("../pages/indices/index/Detail"), { time: 0 });
const Collection = async(() => import("../pages/indices/collection"), { time: 2000 });
const CollectionDetail = async(() => import("../pages/indices/collection/Detail"), { time: 0 });
const Jdbc = async(() => import("../pages/indices/jdbc"), { time: 500 });
const Pipeline = async(() => import("../pages/indices/pipeline"), { time: 0 });

// Search components
const QueryTest = async(() => import("../pages/search/queryTest"), { time: 0 });
const ReferenceUI = async(() => import("../pages/search/referenceUI"));
const ReferenceUIResult = async(() => import("../pages/search/referenceUI/result"));

// Management components
const ServerManagement = async(() => import("../pages/management/serverManagement"), { time: 0 });
const ApiManagement = async(() => import("../pages/management/apiManagement"), { time: 500 });
const ClusterSettings = async(() => import("../pages/management/clusterSettings"), { time: 0 });
const Migration = async(() => import("../pages/management/migration"), { time: 0 });

// 인트로 라우트

const homeRoutes = { id: "auth", path: "/", component: SignIn }

const clusterRoutes = { id: "클러스터", path: "/cluster", icon: <Icon.GroupWork/>, containsHome: true, component: Cluster, children: null };

const userRoutes = {id: "사용자", path: "/user", icon: <Icon.AccountBox/>, component: User, children: null};

const roleRoutes = {id: "역할", path: "/role", icon: <Icon.LockOpen/>, component: Role, children: null};

const editUserRoutes = {id: "정보수정", path: "/my", component: EditUser, hidden: true};

// 관리도구 라우트
const dashboardRoutes = {id: "대시보드", path: `${clusterContext}/dashboard`, icon: <Icon.Dashboard/>, component: Dashboard, children: null};

const analysisRoutes = [
    {header: "분석", id: "사전", path: `${clusterContext}/analysis/dictionary`, icon: <Icon.ImportContacts/>, component: Dictionary, children: null},
    {id: "분석도구", path: `${clusterContext}/analysis/tools`, icon: <Icon.Poll/>, component: Tools, children: null},
    {id: "랭킹튜닝", path: `${clusterContext}/analysis/ranking-tuning`, icon: <Icon.Build/>, component: RankingTuning, children: null}
];

const indicesRoutes = [

    {header: "인덱스", id: "클러스터", path: `${clusterContext}/indices-cluster`, icon: <Icon.GroupWork/>, component: ClusterData, children: null},
    {id: "컬렉션", path: `${clusterContext}/indices-collections`, icon: <Icon.CollectionsBookmark/>, component: Collection, children: null},
    {id: "컬렉션상세", path: `${clusterContext}/indices-collections/*`, component: CollectionDetail, children: null, hidden: true},

    {id: "템플릿", path: `${clusterContext}/indices-templates`, icon: <Icon.FileCopy/>, component: Templates, children: null},
    {id: "템플릿생성", path: `${clusterContext}/indices-templates/new`, component: TemplateNew, hidden: true},
    {id: "템플릿수정", path: `${clusterContext}/indices-templates/*/edit`, component: TemplateEdit, hidden: true},
    {id: "템플릿조회", path: `${clusterContext}/indices-templates/*`, component: TemplateView, hidden: true},

    {id: "인덱스", path: `${clusterContext}/indices`, icon: <Icon.List/>, component: Index, children: null},
    {id: "인덱스상세", path: `${clusterContext}/indices/*`, component: IndexDetail, children: null, hidden: true},

    {id: "JDBC", path: `${clusterContext}/indices-jdbc`, icon: <Icon.Storage/>, component: Jdbc, children: null},
    {id: "파이프라인", path: `${clusterContext}/indices-pipeline`, icon: <Icon.FilterList/>, component: Pipeline, children: null},
];

const searchRoutes = [
    {header: "검색", id: "쿼리테스트", path: `${clusterContext}/search/query-test`, icon: <Icon.Search/>, component: QueryTest, children: null},
    {id: "레퍼런스UI", path: `${clusterContext}/search/reference-ui`, icon: <Icon.AspectRatio/>, icon2: <Icon.Launch />, component: ReferenceUI, children: null},
    {id: "검색결과", path: `${clusterContext}/search`, component: ReferenceUIResult, children: null, hidden: true},
];

const managementRoutes = [
    {header: "관리", id: "서버", path: `${clusterContext}/management/server`, icon: <Icon.Memory/>, component: ServerManagement, children: null},
    {id: "API", path: `${clusterContext}/management/api`, icon: <Icon.CallSplit/>, component: ApiManagement, children: null},
    {id: "클러스터설정", path: `${clusterContext}/management/settings`, icon: <Icon.Settings/>, component: ClusterSettings, children: null},
    {id: "마이그레이션", path: `${clusterContext}/management/migration`, icon: <Icon.Backup/>, component: Migration, children: null},
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
    clusterRoutes,
    roleRoutes,
    userRoutes,
    editUserRoutes,
];


// auth layout routing
export const auth = [
    homeRoutes,
];
