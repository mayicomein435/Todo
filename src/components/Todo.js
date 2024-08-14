import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Card, Dropdown, DropdownButton } from 'react-bootstrap';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    const addTodo = (values, { resetForm }) => {
        setTodos([...todos, { ...values, id: Date.now(), status: 'not completed' }]);
        resetForm();
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const updateTodo = (id, updatedValues) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, ...updatedValues } : todo)));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.status === 'completed';
        if (filter === 'not completed') return todo.status === 'not completed';
        return true;
    });

    return (
        <div className="container mt-5">
            <h2>My todo</h2>
            <Formik
                initialValues={{ taskName: '', description: '', status: 'not completed' }}
                onSubmit={addTodo}
            >
                <Form className="mb-3">
                    <Field name="taskName" placeholder="Todo Name" className="form-control" />
                    <Field name="description" placeholder="Todo Description" className="form-control" />
                    <Button type="submit" variant="success">Add Todo</Button>
                </Form>
            </Formik>

            <div className="status-filter">
                <span>Status Filter :</span>
                <DropdownButton
                    id="dropdown-basic-button"
                    title={filter === 'all' ? 'All' : filter === 'completed' ? 'Completed' : 'Not Completed'}
                    onSelect={(e) => setFilter(e)}
                >
                    <Dropdown.Item eventKey="all">All  </Dropdown.Item>
                    <Dropdown.Item eventKey="completed">Completed  </Dropdown.Item>
                    <Dropdown.Item eventKey="not completed">Not Completed</Dropdown.Item>
                </DropdownButton>
            </div>

            <h3 className="mt-5">My Todos</h3>
            <div className="mt-4 d-flex flex-wrap justify-content-center">
                {filteredTodos.map(todo => (
                    <Card key={todo.id} className="m-3" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Name: {todo.taskName}</Card.Title>
                            <Card.Text>Description: {todo.description}</Card.Text>
                            <Card.Text>Status: 
                                <Dropdown onSelect={(status) => updateTodo(todo.id, { status })}>
                                    <Dropdown.Toggle variant={todo.status === 'completed' ? 'success' : 'warning'}>
                                        {todo.status}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
                                        <Dropdown.Item eventKey="not completed">Not Completed</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Text>
                            <div>
                                <Button variant="primary" onClick={() => updateTodo(todo.id, todo)}>Edit</Button>
                                <Button variant="danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Todo;
