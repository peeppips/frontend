
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import './App.css';

import ResellingEstimateForm from './screens/HosBotScreen1';
import PlatformQuestionForm from './screens/HosBotScreen2';
import BrokerQuestionForm from './screens/HosBotScreen3';
import UploadBotForm from './screens/HosBotScreen4';
import DeployBotForm from './screens/HosBotScreen5';
import ProjectScreen from './screens/DashboardScreens/ProjectScreen';
import BrokersScreen from './screens/DashboardScreens/BrokersScreen';
import ProfileScreen from './screens/DashboardScreens/ProfileScreen';
import AccountsScreen from './screens/DashboardScreens/AccountsScreen';
import MyClientComponent1 from './screens/DashboardScreens/BusinessScreen';
import MyClientComponent2 from './screens/DashboardScreens/ResearchScreen';
import CustomerScreen from './screens/DashboardScreens/CustomersScreen';
import HomeScreen from './screens/HomeScreen';
import CreditsScreen from './screens/DashboardScreens/CreditsScreen';
import UserAccountScreen from './screens/DashboardScreens/UserAccountScreen';


function App() {
  return (
    <>
      <Router>
        <Header />
        <main >
         
            <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/host-bots/1' element={<ResellingEstimateForm/>} />
              <Route path='/host-bot/2' element={<PlatformQuestionForm/>} />
              <Route path='/host-bot/3' element={<BrokerQuestionForm/>} />
              <Route path='/host-bot/4' element={<UploadBotForm/>} />
              <Route path='/host-bot/5' element={<DeployBotForm/>} />
              <Route path='/projects' element={<ProjectScreen/>} />''
              <Route path='/brokers' element={<BrokersScreen/>} />''
              <Route path='/profile' element={<ProfileScreen/>} />''
              <Route path='/accounts' element={<AccountsScreen/>} />''
              <Route path='/bussiness' element={<MyClientComponent1/>} />''
              <Route path='/research' element={<MyClientComponent2/>} />''
              <Route path='/customers' element={<CustomerScreen/>} />''
              <Route path='/credits' element={<CreditsScreen/>} />''
              <Route path='/user_accounts' element={<UserAccountScreen/>} />''
              
              
              
              {/* <Route path='/my-project/new' element={<NewProjectScreen/>} /> */}
              {/* <Route path='/dashboard' element={<DashboardIndex/>} /> */}
              
              
             

            </Routes>
        
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
