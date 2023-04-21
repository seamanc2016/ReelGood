import './App.css';
import { AuthContextProvider } from './Context/authContext';
import MyNavbar from './components/navbar/Navbar'

import { AuthContext } from './Context/authContext'

function App() {
  return (
    <>
    <AuthContextProvider> {/*Creates Scope so that child components can use Auth and setAuth */}
      <MyNavbar />
    </AuthContextProvider>
    </>
  );
}

export default App;
