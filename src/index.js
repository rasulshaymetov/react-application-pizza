import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import "./scss/index.scss";

import {store} from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
    {
        path: "*",
        exact: true,
        element:<App />

    }
])
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
