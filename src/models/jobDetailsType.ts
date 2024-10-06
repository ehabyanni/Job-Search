export type jobDetailsType = {
    id: string;
    type: string;
    attributes: {
        title: string;
    };
    relationships: {
        skills: { id: string }[];
    };
}