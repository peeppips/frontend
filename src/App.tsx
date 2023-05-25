
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import './App.css';
import HostBotScreen from './screens/HosBotScreen';
import NewProjectScreen from './screens/NewProjectScreen';

function App() {
  return (
    <>
      <Router>
        <Header />
        <main className='py-3'>
         
            <Routes>
              <Route path='/' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/host-bots' element={<HostBotScreen/>} />
              <Route path='/my-project/new' element={<NewProjectScreen/>} />

            </Routes>
        
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
