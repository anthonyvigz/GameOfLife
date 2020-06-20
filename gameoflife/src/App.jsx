import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Enter from "./components/Enter";
import GameScreen from "./components/GameScreen";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route exact path="/" component={Enter} />
          <Route exact path="/dashboard" component={GameScreen} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}
export default App;
