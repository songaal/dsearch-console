import React from "react"
import async from "../components/Async"
import {
  Users
} from "react-feather"
import * as Icon from "@material-ui/icons";


// Home components
const Home = async(() => import("../pages/home"))

// Dashboard components
const Dashboard = async(() => import("../pages/dashboard"))

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"))
const SignUp = async(() => import("../pages/auth/SignUp"))
const ResetPassword = async(() => import("../pages/auth/ResetPassword"))
const Page404 = async(() => import("../pages/auth/Page404"))
const Page500 = async(() => import("../pages/auth/Page500"))

// Analysis components
const Dictionary = async(() => import("../pages/analysis/dictionary"))
const Tools = async(() => import("../pages/analysis/tools"))
const RankingTuning = async(() => import("../pages/analysis/ranking-tuning"))

// Indices components
const Mapping = async(() => import("../pages/indices/mapping"))
const IndexData = async(() => import("../pages/indices/index-data"))
const DataSource = async(() => import("../pages/indices/data-source"))
const Index = async(() => import("../pages/indices/index"))
const Configuration = async(() => import("../pages/indices/configuration"))

// Search components
const QueryTest = async(() => import("../pages/search/query-test"))
const ReferenceUi = async(() => import("../pages/search/reference-ui"))

// Management components
const ServerManagement = async(() => import("../pages/management/server-management"))
const UserManagement = async(() => import("../pages/management/user-management"))
const ApiManagement = async(() => import("../pages/management/api-management"))
const KibanaManagement = async(() => import("../pages/management/kibana-management"))
const ConfigurationManagement = async(() => import("../pages/management/configuration-management"))


// Routes Configuration
const homeRoutes = {
  id: "Home",
  path: "/",
  icon: <Icon.Home />,
  containsHome: true,
  component: Home,
  children: null
}

const dashboardRoutes = {
  id: "대시보드",
  path: "/dashboard",
  icon: <Icon.Dashboard />,
  component: Dashboard,
  children: null
}

const authRoutes = {
  id: "로그인사용예정",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
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

const analysisRoutes = {
  id: "분석",
  path: "analysis",
  icon: <Icon.Visibility />,
  children: [
    {
      path: "/analysis/dictionary",
      name: "사전",
      component: Dictionary
    },
    {
      path: "/analysis/tools",
      name: "분석도구",
      component: Tools
    },
    {
      path: "/analysis/ranking-tuning",
      name: "랭킹튜닝",
      component: RankingTuning
    }
  ]
}

const indicesRoutes = {
  id: "인덱스",
  path: "/indices",
  icon: <Icon.Subject />,
  children: [
    {
      path: "/indices/mapping",
      name: "맵핑",
      component: Mapping
    },
    {
      path: "/indices/data",
      name: "데이터",
      component: IndexData
    },
    {
      path: "/indices/source",
      name: "소스",
      component: DataSource
    },
    {
      path: "/indices/index",
      name: "색인",
      component: Index
    },
    {
      path: "/indices/configuration",
      name: "설정",
      component: Configuration
    },
  ]
}

const searchRoutes = {
  id: "검색",
  path: "/search",
  icon: <Icon.Search />,
  children: [
    {
      path: "/search/query-test",
      name: "쿼리테스트",
      component: QueryTest
    },
    {
      path: "/search/reference-ui",
      name: "레퍼런스UI",
      component: ReferenceUi
    }
  ]
}

const managementRoutes = {
  id: "관리",
  path: "/management",
  icon: <Icon.Memory />,
  children: [
    {
      path: "/management/server",
      name: "서버",
      component: ServerManagement
    },
    {
      path: "/management/user",
      name: "사용자",
      component: UserManagement
    },
    {
      path: "/management/api",
      name: "API",
      component: ApiManagement
    },
    {
      path: "/management/kibana",
      name: "Kibana",
      component: KibanaManagement
    },
    {
      path: "/management/Configuration",
      name: "설정",
      component: ConfigurationManagement
    },
  ]
}

// dashboard layout routing
export const dashboard = [
  homeRoutes,
  dashboardRoutes,
  analysisRoutes,
  indicesRoutes,
  searchRoutes,
  managementRoutes
]

// auth layout routing
export const auth = [authRoutes]

// 메뉴 노출
export default dashboard
