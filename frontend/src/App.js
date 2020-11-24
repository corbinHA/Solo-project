import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { ModalProvider }  from "./context/Modal"
import TransactionForm from './components/TransactionForm'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <>
            <Switch>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
            </Switch>
            <TransactionForm />
          </>
        )}
      </ModalProvider>
    </>
  );
}

export default App;
