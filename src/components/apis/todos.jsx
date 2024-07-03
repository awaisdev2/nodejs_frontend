import axios from 'axios';

export const getAllTodos = async () => {
    const response = await axios.get('http://localhost:7000/todos');
    return response.data || [];
}

export const createTodo = async (title, description) => {
    const response = await axios.post('http://localhost:7000/todos', { title, description });
    return response.data;
}

export const deleteTodo = async (id) => {
    const response = await axios.delete(`http://localhost:7000/todos/${id}`);
    return response.data;
}

export const updateTodo = async (id, title, description) => {
    const response = await axios.put(`http://localhost:7000/todos/${id}`, { title, description });
    return response.data;
}