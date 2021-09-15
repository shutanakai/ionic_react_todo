import React from 'react';
import TodoList from '../components/TodoList';

const TodoListScreen = () => {
    return <TodoList completedFlag={false} name="現在のTODO" />;
};

export default TodoListScreen;
