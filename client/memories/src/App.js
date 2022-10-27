import "./App.css";
import { Container } from "@material-ui/core";
import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Auth from "./component/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="968435344615-jjv87ualb5rbj04g9s100l2bihb0c4c0.apps.googleusercontent.com">

    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </Router>
    </GoogleOAuthProvider>

  );
}

export default App;
