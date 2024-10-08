import React from "react";
import { useNavigate } from "react-router-dom";
import { SkillDetailsType } from "../../models/skillDetailsType";
import SkillCard from "./SkillCard";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";


jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}))


describe('SkillCard Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        mockNavigate.mockReset();  // Ensure that the mock is reset before each test
    });

    const mockSkill: SkillDetailsType = {
        id: "5",
        type: "skill",
        attributes: {
            name: "React",
            type: "Knowledge",
            importance: 3,
            level: 3
        },
        relationships: {
            jobs: [{ id: "1" }, { id: "2" }, { id: "3" }],
            skills: [{ id: "11" }, { id: "22" }, { id: "33" }]
        }
    };

    it('render skill details correctly and navigate to skill page', async () => {
        render(<SkillCard skill={mockSkill} />);

        const skillName = screen.getByTestId('name');

        expect(skillName).toHaveTextContent('React');
        expect(screen.getByTestId('type')).toHaveTextContent('Knowledge');
        expect(screen.getByTestId('importance')).toHaveTextContent('3');
        expect(screen.getByTestId('level')).toHaveTextContent('3');

        fireEvent.click(skillName);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledTimes(1);  // Check that it's called once
            expect(mockNavigate).toHaveBeenCalledWith('/skill/5');
        });

    });
})