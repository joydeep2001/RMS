import Login from "./components/Login";
import Signup2 from "./components/Signup2";
import ForgetPass from "./components/ForgetPass";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import About from "./components/About"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup2} />
          <Route path="/forget" component={ForgetPass} />     
        </Switch>
      </Router>
    </>
  );
}

export default App;
