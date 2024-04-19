import { Route, RouteDefinition, Router, Routes } from "@solidjs/router";
import { For } from "solid-js";
import { ApplicationContextProvider } from "./context";
import createLocalStorage from "./services/storage/LocalStorageHelper";
import createSessionStorage from "./services/storage/SessionStorageHelper";
import createOrdersService from "./services/order";
import { Suspense } from "solid-js";
import Loader from "../components/Loader";
import networkRequest from "./lib/api";
import createUserService from "./services/user";
import createInventoryService from "./services/inventory";
import { NotificationContextProvider } from "../components/Notification/Context";
import createCartService from "./services/cart";
import { setDocumentTheme } from "./lib/ThemeUtils";

function createApplicationContext() {
  const baseUrl = "http://192.168.100.148:5000/api";
  const api = networkRequest({ baseUrl });
  const session = createSessionStorage({});
  const storage = createLocalStorage({});
  const app = {
    title: "Genesis Cyber Cafe & Print Shop",
  };
  const theme = storage.getTheme();
  if(theme) {
    setDocumentTheme({ theme });
  }
  document.title = app.title;
  return {
    app,
    session,
    storage,
    user: createUserService({
      api,
    }),
    orders: createOrdersService({
      api,
    }),
    inventory: createInventoryService({
      api,
    }),
    cart: createCartService({
      api,
    }),
  };
}

declare global {
  type ApplicationContext = ReturnType<typeof createApplicationContext>;
}

const RecursiveRoute = (props: { route: RouteDefinition }) => {
  const children: Array<RouteDefinition> = Array.isArray(props.route.children)
    ? props.route.children
    : ([] as any);

  if (children.length > 0) {
    return (
      <Route path={props.route.path}>
        <For each={children}>{(route) => <RecursiveRoute route={route} />}</For>
      </Route>
    );
  }
  return <Route path={props.route.path} component={props.route.component} />;
};
const AppView = ({ routes }: { routes: Array<RouteDefinition> }) => {
  const context = createApplicationContext();
  return (
    <ApplicationContextProvider context={context}>
      <NotificationContextProvider>
        <Routes>
          <For each={routes}>
            {(route) => {
              return (
                <Suspense fallback={() => <Loader />}>
                  <RecursiveRoute route={route} />
                </Suspense>
              );
            }}
          </For>
        </Routes>
      </NotificationContextProvider>
    </ApplicationContextProvider>
  );
};

export default ({ routes }: { routes: Array<RouteDefinition> }) => {
  return (
    <Router>
      <AppView routes={routes} />
    </Router>
  );
};
