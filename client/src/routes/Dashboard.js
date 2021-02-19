import React, { Component } from 'react'

import NavBar from '../components/UI/NavBar/NavBar'
import InputTodo from '../components/TodoComponent/InputTodo/InputTodo'
import ListTodos from '../components/TodoComponent/ListTodos/ListTodos'

export default function Dashboard() {
    return (
        <div>
              <NavBar />
                <InputTodo />
                <ListTodos />
        </div>
    )
}
