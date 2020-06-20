import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Enter from "./components/Enter";
import GameScreen from "./components/GameScreen";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Enter} />
        <Route exact path="/dashboard" component={GameScreen} />
      </Switch>
    </div>
  );
}
export default App;
