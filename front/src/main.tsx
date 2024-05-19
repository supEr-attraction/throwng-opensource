import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import React from "react";
import * as Sentry from "@sentry/react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
const VITE_SENTRY_DNS = import.meta.env.VITE_SENTRY_DNS;

Sentry.init({
  dsn: VITE_SENTRY_DNS,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 0.6,
  tracePropagationTargets: ["localhost", /^https:\/\/www\.sieum\.co\.kr/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const url = window.location.pathname;

if (url !== "/grafana-server") {
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
}
