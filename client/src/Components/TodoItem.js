import React from 'react';

const TodoItem = props =>{
    return (
        // <li>{props.todo.name}</li>
        <li className="list-group-item list-group-item-action">
                <input onChange={() => props.toggleTodo(props.todo.name)} type="checkbox" aria-label="Checkbox for following text input"/>
                <span className="ml-2">{props.todo.name}</span>
        </li>
    )
}

export default TodoItem;