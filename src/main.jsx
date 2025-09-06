import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/UserContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

//Creating the Queryclient instance
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* The query client provider that provides the client for child components. */}
    <QueryClientProvider client={client}>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
