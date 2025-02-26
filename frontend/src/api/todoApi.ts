import { Todo, CreateTodoRequest, Category } from '../types/todo';

const API_BASE_URL = 'http://localhost:8088/api';

export const todoApi = {
    // Todo endpoints
    getAllTodos: async (): Promise<Todo[]> => {
        const response = await fetch(`${API_BASE_URL}/todos`);
        if (!response.ok) throw new Error('Failed to fetch todos');
        return response.json();
    },

    createTodo: async (todo: CreateTodoRequest): Promise<Todo> => {
        const response = await fetch(`${API_BASE_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (!response.ok) throw new Error('Failed to create todo');
        return response.json();
    },

    updateTodo: async (id: number, todo: Partial<Todo>): Promise<Todo> => {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (!response.ok) throw new Error('Failed to update todo');
        return response.json();
    },

    deleteTodo: async (id: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete todo');
    },

    // Category endpoints
    getTodoCategories: async (todoId: number): Promise<Category[]> => {
        const response = await fetch(`${API_BASE_URL}/todos/${todoId}/categories`);
        if (!response.ok) throw new Error('Failed to fetch todo categories');
        return response.json();
    },

    addCategoryToTodo: async (todoId: number, categoryId: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/todos/${todoId}/categories/${categoryId}`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to add category to todo');
    },

    removeCategoryFromTodo: async (todoId: number, categoryId: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/todos/${todoId}/categories/${categoryId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to remove category from todo');
    },
};
