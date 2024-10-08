import React from 'react';
import { render, screen, fireEvent, waitFor, } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import RelatedJobCard from './RelatedJobCard';
import { jobDetailsType } from '../../models/jobDetailsType';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('RelatedJobCard Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        mockNavigate.mockReset();
    });

    const mockJob: jobDetailsType = {
        id: "9b92abe6-3bf3-4cc6-8744-4de0c8af0630",
        type: "job",
        attributes: {
            title: "Engineering Manager"
        },
        relationships: {
            skills: [
                {
                    id: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed"
                },
                {
                    id: "9f0a0811-4a8e-4c8a-b4ce-adc9267b1cf3"
                },
                {
                    id: "e255b986-fca7-4b1c-ba4e-b16497da4477"
                }
            ]
        }
    };

    it('renders job title correctly and navigate to job details', async () => {
        render(<RelatedJobCard job={mockJob} />);
        expect(screen.getByText(/Engineering Manager/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/Engineering Manager/i));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith(`/jobs/${mockJob.id}`);
        })
    })
});
