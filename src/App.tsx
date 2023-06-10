import React from 'react';
import './styles/app.scss';
import {RouterProvider} from "react-router-dom";
import routes from "./routes";
import {ToastProvider} from "react-toast-notifications";
import {UserProvider} from "./contexts/AppContext";

function App() {
  return (
      <ToastProvider>
          <UserProvider>
              <RouterProvider router={routes} />
          </UserProvider>
      </ToastProvider>
  );
}

export default App;
