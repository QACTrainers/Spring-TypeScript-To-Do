export interface Category {
    id: number;
    name: string;
}

export interface Todo {
    id: number;
    text: string;
    description: string;
    completed: boolean;
    dueDate: string | null;  // ISO DateTime string
    createdAt: string;  // ISO DateTime string
    subtasks: string[];
    categories: Category[];
}

export interface CreateTodoRequest {
    text: string;
    description?: string;
    dueDate?: string;
    subtasks?: string[];
    categories?: number[];  // category IDs
}
