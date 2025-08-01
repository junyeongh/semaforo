import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TimerContextProvider } from "./context/TimerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TimerContextProvider>
      <App />
    </TimerContextProvider>
  </StrictMode>,
);
