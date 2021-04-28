import { AuthProvider } from "./contexts/AuthContext";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import "./assets/App.css";
import ControlledBoard from "./DragComponent";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={ControlledBoard} />
          <Container className="login-container">
            <div className="inner-container">
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </div>
          </Container>
        </Switch>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
