
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/login-page';
import SignpageI from './pages/sign-up-page-I';
import SignPageII from './pages/sign-up-page-II';
import SignPageIII from './pages/sign-up-page-III';
import ForgetPasswordI from './pages/forget-password-I';
import ForgetPasswordII from './pages/forget-password-II';
import ForgetPasswordIII from './pages/forget-password-III';
import AccountSettings from './pages/account-settings';
import AccountSettingsPI from './pages/account-settings-pi';
import AccoutSettingsSecurity from './pages/account-settings-security';
import AccountSettingsCI from './pages/account-settings-ci';
import CreateDashboard from './pages/create-dashboard';
import Published from './pages/published';
import Drafts from './pages/drafts';
import WorkSpaces from './pages/workspaces';
import WorkspaceDashboard from './pages/workspace-dashboards';
import DatasetView from './pages/dataset-view';
import CreateDashboardModals from './pages/create-dashboard-modals';
import CreateDashboardModalI from './pages/create-dashboard-I';
import CreateDashboardModalII from './pages/create-dashboard-II';
import CreateDashboardModalIII from './pages/create-dashboard-III';
import CreateDashboardModalIV from './pages/create-dashboard-IV';
import CreateDashboardModalV from './pages/create-dashboard-V';
import DatasetI from './pages/create-dataset-I';
import DatasetII from './pages/create-dataset-II';
import DatasetIII from './pages/create-dataset-III';
import DatasetIV from './pages/create-dataset-IV';
import Grids from './pages/grids';
import TemplateI from './pages/template-I';
import TemplateII from './pages/template-II';
import TemplateIII from './pages/template-III';




function App() {
  const [data, setData] = useState();
  return (
    <div id="root" className='App'>
      <Router>
        <Routes>
          {/* Login Page Details */}
        <Route path="/" element={<LoginPage/>} />
        {/* Sign-up-page-details */}
        <Route path="/sign-up-page-I" element={<SignpageI/>} />
        <Route path="/sign-up-page-II" element={<SignPageII/>} />
        <Route path="/sign-up-page-III" element={<SignPageIII/>} />
        {/* Forget-password-Details */}
        <Route path="/forget-password-I" element={<ForgetPasswordI/>}/>
        <Route path="/forget-password-II" element={<ForgetPasswordII/>}/>
        <Route path="/forget-password-III" element={<ForgetPasswordIII/>}/>
        {/* Account Settings */}
        <Route path="/account-settings" element={<AccountSettings/>}/>
        <Route path="/account-settings-pi" element={<AccountSettingsPI/>}/>
        <Route path="/account-settings-security" element={<AccoutSettingsSecurity/>}/>
        <Route path="/account-settings-ci" element={<AccountSettingsCI/>}/>
        {/* Create Dashboard */}
        <Route path="/create-dashboard" element={<CreateDashboard/>}/>
        <Route path="/published" element={<Published/>}/>
        <Route path="/drafts" element={<Drafts/>}/>
        <Route path="/workspaces" element={<WorkSpaces/>}/>
        <Route path="/workspace-dashboard" element={<WorkspaceDashboard/>}/>
        <Route path="/dataset-view" element={<DatasetView/>}/>
        {/* Dashboard Modals */}
        <Route path="/create-dashboard-modals" element={<CreateDashboardModals/>}/>
        <Route path="/create-dashboard-I" element={<CreateDashboardModalI/>}/>
        <Route path="/create-dashboard-II" element={<CreateDashboardModalII/>}/>
        <Route path="/create-dashboard-III" element={<CreateDashboardModalIII/>}/>
        <Route path="/create-dashboard-IV" element={<CreateDashboardModalIV/>}/>
        <Route path="/create-dashboard-V" element={<CreateDashboardModalV/>}/>
        {/* View Templates */}
        <Route path="/template-I" element={<TemplateI/>}/>
        <Route path="/template-II" element={<TemplateII/>}/>
        <Route path="/template-III" element={<TemplateIII/>}/>
        {/* Dataset Modals */}
        <Route path="/create-dataset-I" element={<DatasetI/>}/>
        <Route path="/create-dataset-II" element={<DatasetII setData={setData}/>} />
        <Route path="/create-dataset-III" element={<DatasetIII data={data} setData={setData}/>}/>
        <Route path="/create-dataset-IV" element={<DatasetIV/>}/>
      {/* Grid Wrapper */}
      <Route path="/grids" element={<Grids/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
