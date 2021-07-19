// import React from 'react';

const getTodos = () => {
    return fetch("http://localhost:5000/user/todos")
            .then(res => {
                if (res.status !== 401) {
                    return res.json().then(data => data);
                } else {
                    return {message: {msgBody: "Unauthorized", msgError: true}}
                }
            })
}

const postTodo = (todo) => {
    return fetch("http://localhost:5000/user/todo", {
        method: "post",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json"
        }
    }).then ( res => {
        if (res.status !== 401) {
            return res.json().then(data => data);
        } else {
            return {message: {msgBody: "Unauthorized", msgError: true}}
        }
    })
};

const TodoService = {getTodos, postTodo};


export default TodoService;
