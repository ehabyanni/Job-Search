import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));


describe('Sidebar Component', () => {
    const mockNavigate = jest.fn();

    const mockQueries: string[] = ['Frontend', 'Senior', 'DevOps'];

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        mockNavigate.mockReset();

        // Set up local storage mock
        Storage.prototype.getItem = jest.fn().mockImplementation((key) => {
            if (key === 'previousSearches') {
                return JSON.stringify(mockQueries);
            }
            return null;
        });

        Storage.prototype.setItem = jest.fn();
        Storage.prototype.removeItem = jest.fn();

        render(<Sidebar />);
    });

    it('renders search history correctly', () => {
        mockQueries.forEach(query => {
            expect(screen.getByText(query)).toBeInTheDocument();
        });
    });

    it('navigates to search query on click', async () => {
        const queryToClick = mockQueries[0];
        // console.log(queryToClick);
        
        fireEvent.click(screen.getByText(queryToClick));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith(`/jobs/search?query=${queryToClick}`);
        })
    });

    it('removes a search item when the close icon is clicked', () => {
        const initialLength = mockQueries.length;

        // Click the close icon of the first item
        fireEvent.click(screen.getAllByTestId('clearQuery')[0]);

        // Check localStorage setItem is called
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('previousSearches', JSON.stringify(mockQueries.slice(1)));

        // Verify that the item is no longer in the document
        expect(screen.queryByText(mockQueries[0])).not.toBeInTheDocument();
        expect(screen.getByText(mockQueries[1])).toBeInTheDocument();  // Check that the second item is still there
    });
});
