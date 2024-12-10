import Navbar from './header/Navbar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/dashboard/Home';
import Contact from './pages/Contact';
import MarketOverview from './pages/dashboard/MarketOverview';
import Subscription from './pages/subscription/Subscription';
import Wallet from './pages/wallet/Wallet';
import User from './pages/user/User';
import UserRolePage from './pages/user/UserRolePage';
import AdminDashboard from './pages/role-dashboards/AdminDashboard'; // Import Admin Dashboard
import EditorDashboard from './pages/role-dashboards/EditorDashboard'; // Import Editor Dashboard
import ViewerDashboard from './pages/role-dashboards/ViewerDashboard'; // Import Viewer Dashboard
import Profile from './pages/profile/Profile';
import Footer from './header/Footer';
import Subscriptionadminhome from './pages/admin/batch/Subscriptionadminhome';
import SignUp from './pages/user/signup';
import Batch from './pages/admin/batch/Batch';
import Logs from './pages/admin/Logs';
import { setAuthToken } from './pages/user/AuthToken';
import GiftCards from '../src/wallet/giftcardlist';


function App() {
    // Check JWT token and set it globally for axios
    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }

    return (
        <div className="App bg-rose-400 w-full h-screen">
            <Navbar />
            <Routes>
                {/* General Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/markets" element={<MarketOverview />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/Subscriptionadminhome" element={<Subscriptionadminhome />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/batch" element={<Batch />} />
                <Route path="/log" element={<Logs />} />
                <Route path="/giftcardlist" element={<GiftCards />} />

                {/* Role-Based Pages */}
                <Route path="/user" element={<UserRolePage />} />
                <Route path='/user2' element={<User />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* New Admin Route */}
                <Route path="/editor-dashboard" element={<EditorDashboard />} />
                <Route path="/viewer-dashboard" element={<ViewerDashboard />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
