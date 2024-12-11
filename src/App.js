import Navbar from './header/Navbar';
import './App.css';
import { Router as Router, Route, Routes } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/dashboard/Home';
import Contact from './pages/Contact';
import MarketOverview from './pages/dashboard/MarketOverview';
import Subscription from './pages/subscription/Subscription';
import Wallet from './pages/wallet/Wallet';
import User from './pages/user/User';
import Profile from './pages/profile/Profile';
import Footer from './header/Footer';
// import Subscriptionadminhome from './pages/admin/batch/Subscriptionadminhome';
import SignUp from './pages/user/signup';
// import SignUp from './pages/user/signup';
import Batch from './pages/admin/batch/Batch';
import SubscriptionRC from "./pages/admin/batch/Components/Subscriptions/SubscriptionRC";
import Logs from "./pages/admin/Logs";
import {setAuthToken} from "./pages/user/AuthToken";


function App() {
  
  return (
    <div className="App bg-rose-400	w-full h-screen" >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/markets' element={<MarketOverview />} />
        <Route path='/subscription' element={<Subscription />} />
        {/* <Route path='/Subscriptionadminhome' element={<Subscriptionadminhome />} /> */}
        <Route path="/subscriptions/*" element={<SubscriptionRC/>} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/user' element={<User />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/batch" element={<Batch />} />
          <Route path="/log" element={<Logs />} />

      </Routes>
      <Footer />

    </div>
  );
}

export default App;
