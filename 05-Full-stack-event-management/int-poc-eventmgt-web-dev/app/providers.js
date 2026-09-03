"use client";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "@/store";
import { SidebarProvider } from "@/context/SidebarContext";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <SidebarProvider>
        {children}
        <ToastContainer
          position="bottom-left"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </SidebarProvider>
    </Provider>
  );
}
