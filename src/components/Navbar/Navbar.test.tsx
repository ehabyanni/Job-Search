import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  it('renders the JobsNow title', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/JobsNow/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders all the navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/Home/i);
    const searchLink = screen.getByText(/Search/i);
    const historyLink = screen.getByText(/History/i);

    expect(homeLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    expect(historyLink).toBeInTheDocument();
  });
});
