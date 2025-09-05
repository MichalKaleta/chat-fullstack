import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundry/ErrorBoundry.jsx";
import "./index.css";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function logErrorToService(error: Error, info: string) {
  // Use your preferred error logging service
  console.error("Caught an error:", error, info);
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary onError={logErrorToService}>
        <App />
      </ErrorBoundary>
      {/*  <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
