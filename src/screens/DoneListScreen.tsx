import React from 'react';
import TodoList from '../components/TodoList';

const DoneListScreen = () => {
    return <TodoList completedFlag={true} name="完了済みのTODO" />;
};

export default DoneListScreen;
