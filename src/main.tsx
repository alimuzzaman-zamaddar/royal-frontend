import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import store from "./redux/store";
import { AuthProvider } from "./Provider/AuthProvider";
import router from "./router/router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: "#4A0E4E",
              color: "#FFFAF0",
              border: "1px solid rgba(255, 215, 0, 0.35)",
              fontFamily: "'Lora', serif",
              boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
            },
            success: {
              iconTheme: {
                primary: "#FFD700",
                secondary: "#080500",
              },
            },
            error: {
              iconTheme: {
                primary: "#E0115F",
                secondary: "#FFFAF0",
              },
            },
          }}
        />
      </AuthProvider>
    </Provider>
  </StrictMode>
);