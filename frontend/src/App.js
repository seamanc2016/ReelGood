import './App.css';
import { AuthContextProvider } from './Context/authContext';
import MyNavbar from './components/navbar/Navbar'
import MyFooter from './components/footer/Footer'
import { AuthContext } from './Context/authContext'

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <AuthContextProvider> {/*Creates Scope so that child components can use Auth and setAuth */}
          <MyNavbar />
        </AuthContextProvider>
      </div>
      <MyFooter />
    </div>
  );
}

export default App;
