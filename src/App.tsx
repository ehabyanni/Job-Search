'use client'
import './App.scss';

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import Navbar from './components/Navbar/Navbar';
import History from './pages/History';
import Home from './pages/Home/Home';
import SearchInput from './components/SearchInput/SearchInput';
import JobDetails from './pages/JobDetails';
import Search from './pages/Search/Search';

function App() {
  return (
    <Fragment>
      <Navbar />
      <SearchInput />
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" />} />
        <Route path="/jobs" element={<Home />} />
        <Route path="/jobs/search" element={<Search />} />
        <Route path="/history" element={<History />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </Fragment>
  );
}

export default App;
