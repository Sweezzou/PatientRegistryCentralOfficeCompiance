import { ProfileProvider } from "./context/ProfileContext";
import { useContext } from "react";
import { AuthContext } from "./context";
import { ToastContainer } from 'react-toastify';
import { AllRoutes } from "./routes/AllRoutes";
import { Header } from "./components/Header";
import { Sidenav } from "./components/Sidenav";
import { Footer } from "./components/Footer";

function App() {

  const isAuthenticated = useContext(AuthContext)

  return (
    <ProfileProvider>
      <div className="App">
        {isAuthenticated && <Header />}
        {isAuthenticated && <Sidenav />}
        <div className="content">
          <AllRoutes />
        </div>
        {isAuthenticated && <Footer />}
        <ToastContainer />
      </div>
    </ProfileProvider>

  );
}

export default App;
