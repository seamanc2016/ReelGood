import './App.css';
import { AuthContextProvider } from './Context/authContext';
import MyNavbar from './components/navbar/Navbar'
import MyFooter from './components/footer/Footer'
import { AuthContext } from './Context/authContext'

function App() {
  return (
    <div className="page-container"> {/* This div holds a class towards the div's for containter of the app itself within the css. */}
      <div className="content-wrap"> {/* This div holds a class towards the div's for page content when routed, formated within the css. */}
        <AuthContextProvider> {/*Creates Scope so that child components can use Auth and setAuth */}
          <MyNavbar />
        </AuthContextProvider>
      </div>
      <MyFooter /> {/* This component loads the footer. */}
    </div>
  );
}

export default App;
