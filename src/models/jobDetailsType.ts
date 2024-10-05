export type jobDetailsType = {
    id: string;
    type: string;
    attributes: {
        title: string;
    };
    relationships: {
        skills: {
            id: string;
            title: string;
            desc: string;
            type: string;
            importance: number;
            level: number;
        };
    };
}