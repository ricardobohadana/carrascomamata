import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import CustomNavbar from "./components/navbar";
import Detailpage from "./pages/detailpage/detailpage";

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/detalhes/:slug" component={Detailpage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
