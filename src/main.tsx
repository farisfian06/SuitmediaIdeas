import { createRoot } from "react-dom/client";
import "./style.css";
import Routes from "./routes/Routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCLient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryCLient}>
    <Routes />
  </QueryClientProvider>
);
