'use client';
import { useLocation } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import SearchInput from './SearchInput/SearchInput';

const Layout = ({ children }: { children: React.ReactNode }) => {

    const location = useLocation();
    const showSearchBar = location.pathname === '/jobs' || location.pathname === '/jobs/search';


    return (
        <>
            <Navbar />
            {showSearchBar && <SearchInput />}
            <main>{children}</main>
        </>
    );
};

export default Layout;
