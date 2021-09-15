import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import { ListContext } from '../ContextProvider';

const EditTodoScreen = () => {
    const { list } = useContext(ListContext);
    const { title } = useParams<{ title: string }>();
    const item = list.find(
        (l: { title: string; isCompleted: boolean }) => l.title === title
    );

    return <Editor name="TODOの編集" item={item} />;
};

export default EditTodoScreen;
