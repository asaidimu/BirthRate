import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";
import { AuthGuard } from "../components/AuthGuard";
import AdminFrame from "../components/AdminFrame";

const routes: Array<RouteDefinition> = [
    {
        path: "/",
        component: lazy(() => import("../page/Splash")),
    },
    {
        path: "/signin",
        component: lazy(() => import("../page/Login")),
    },
    {
        path: "/signup",
        component: lazy(() => import("../page/Signup")),
    },
    {
        path: "/admin/sales",
        component: () => {
            const Sales = lazy(() => import("../page/Sales"));
            return (
                <AdminFrame>
                    <AuthGuard role="admin" />
                    <Sales />
                </AdminFrame>
            );
        },
    },
    {
        path: "/admin/products",
        component: () => {
            const Inventory = lazy(() => import("../page/Products"));
            return (
                <AdminFrame>
                    <AuthGuard role="admin" />
                    <Inventory />
                </AdminFrame>
            );
        },
    },
    {
        path: "/admin/inventory",
        component: () => {
            const Inventory = lazy(() => import("../page/Inventory"));
            return (
                <AdminFrame>
                    <AuthGuard role="admin" />
                    <Inventory />
                </AdminFrame>
            );
        },
    },
    {
        path: "/admin/dashboard",
        component: () => {
            const Dashboard = lazy(() => import("../page/Dashboard"));
            return (
                <AdminFrame>
                    <AuthGuard role="admin" />
                    <Dashboard />
                </AdminFrame>
            );
        },
    },
    {
        path: "/user/dashboard",
        component: () => {
            const TellerView = lazy(() => import("../page/TellerView"));
            return (
                <>
                    <AuthGuard role="user" />
                    <TellerView />
                </>
            );
        },
    },
    {
        path: "/404",
        component: lazy(() => import("../page/404")),
    },
    {
        path: "/500",
        component: lazy(() => import("../page/500")),
    },
    {
        path: "*",
        component: lazy(() => import("../page/404")),
    },
];

export default routes;
