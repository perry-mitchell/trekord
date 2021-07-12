import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { ErrorPage } from "./page/ErrorPage";
// import { useAppError } from "../hooks/embed";

export function App() {
    // const appError = useAppError();
    // if (appError) {
    //     return <ErrorPage />;
    // }
    return (
        <Router>
            <Switch>
                {/* <Route path="/test">
                    <Test />
                </Route> */}
                <Route path="*">
                    <h2>Not found</h2>
                </Route>
            </Switch>
        </Router>
    );
}
