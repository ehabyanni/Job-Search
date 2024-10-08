'use client'

import { Navigate, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import Layout from './components/layout';
import History from './pages/History';
import Home from './pages/Home/Home';
import JobDetails from './pages/JobDetails/JobDetails';
import Search from './pages/Search/Search';
import SkillDetails from './pages/SkillDetails/SkillDetails';
import NoMatch from './pages/NoMatch';

function App() {
  return (
    <Fragment>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" />} />
          <Route path="/jobs" element={<Home />} />
          <Route path="/jobs/search" element={<Search />} />
          <Route path="/history" element={<History />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/skill/:id" element={<SkillDetails />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
