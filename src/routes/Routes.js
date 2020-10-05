import React, {useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {auth as authRoutes, dashboard as dashboardRoutes, intro as introRoutes} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import IntroLayout from "../layouts/Main";
import AuthLayout from "../layouts/Auth";
import Page404 from "../pages/auth/Page404";

const childRoutes = (Layout, routes) =>
    routes.map(({children, path, component: Component}, index) =>
        children ? (
            // Route item with children
            children.map(({path, component: Component}, index) => (
                <Route
                    key={index}
                    path={path}
                    exact
                    render={props => (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    )}
                />
            ))
        ) : (
            // Route item without children
            <Route
                key={index}
                path={path}
                exact
                render={props => (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )}
            />
        )
    );


const Routes = () => {
    return (
        <Router>
            <Switch>
                {childRoutes(DashboardLayout, dashboardRoutes)}
                {childRoutes(IntroLayout, introRoutes)}
                {childRoutes(AuthLayout, authRoutes)}
                <Route
                    render={() => (
                        <AuthLayout>
                            <Page404/>
                        </AuthLayout>
                    )}
                />
            </Switch>
        </Router>
    );
}

export default Routes;
