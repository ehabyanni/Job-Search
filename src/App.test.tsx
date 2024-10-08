import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import App from './App';
import React from 'react';

jest.mock('./pages/Home/Home', () => () => <div>Home Page</div>);
jest.mock('./pages/Search/Search', () => () => <div>Search Page</div>);
jest.mock('./pages/History', () => () => <div>History Page</div>);
jest.mock('./pages/JobDetails/JobDetails', () => () => <div>Job Details Page</div>);
jest.mock('./pages/SkillDetails/SkillDetails', () => () => <div>Skill Details Page</div>);
jest.mock('./pages/NoMatch', () => () => <div>No Match Page</div>);
jest.mock('./components/layout', () => ({ children }: any) => <div>Layout {children}</div>);

describe('App Component', () => {
  test('redirects / to /jobs', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  test('renders Home when navigated to /jobs', () => {
    render(
      <MemoryRouter initialEntries={['/jobs']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  test('renders Search when navigated to /jobs/search', () => {
    render(
      <MemoryRouter initialEntries={['/jobs/search']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Search Page/i)).toBeInTheDocument();
  });

  test('renders JobDetails when navigated to /jobs/:id', () => {
    render(
      <MemoryRouter initialEntries={['/jobs/123']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Job Details Page/i)).toBeInTheDocument();
  });

  test('renders SkillDetails when navigated to /skill/:id', () => {
    render(
      <MemoryRouter initialEntries={['/skill/456']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Skill Details Page/i)).toBeInTheDocument();
  });

  test('renders History when navigated to /history', () => {
    render(
      <MemoryRouter initialEntries={['/history']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/History Page/i)).toBeInTheDocument();
  });

  test('renders NoMatch for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/No Match Page/i)).toBeInTheDocument();
  });

  test('wraps all routes with Layout component', () => {
    render(
      <MemoryRouter initialEntries={['/jobs']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Layout/i)).toBeInTheDocument();
  });
});
