import React, { createContext, useState } from 'react';

interface ListContextProps {
    title: string;
    isCompleted: boolean;
}

interface StatusContextProps {
    state: boolean;
    statement: string;
}

export const ListContext = createContext(
    {} as {
        list: ListContextProps[];
        setList: React.Dispatch<React.SetStateAction<ListContextProps[]>>;
    }
);
export const StatusContext = createContext(
    {} as {
        status: StatusContextProps;
        setStatus: React.Dispatch<React.SetStateAction<StatusContextProps>>;
    }
);

const ContextProvider = ({ children }: any) => {
    const initialList = [
        { title: '勉強', isCompleted: true },
        { title: '昼寝', isCompleted: false },
        { title: '洗濯', isCompleted: false },
    ];

    const initialStatus = {
        state: false,
        statement: '',
    };

    const [list, setList] = useState<ListContextProps[]>(initialList);
    const [status, setStatus] = useState<StatusContextProps>(initialStatus);

    return (
        <ListContext.Provider value={{ list, setList }}>
            <StatusContext.Provider value={{ status, setStatus }}>
                {children}
            </StatusContext.Provider>
        </ListContext.Provider>
    );
};

export default ContextProvider;
