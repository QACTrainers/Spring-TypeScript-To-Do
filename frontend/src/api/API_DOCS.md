# Todo App API Documentation

Base URL: `http://localhost:8080/api`

## Todo Endpoints

### Get All Todos
- **URL:** `/todos`
- **Method:** `GET`
- **Response:** Array of Todo objects
```typescript
interface Todo {
    id: number;
    text: string;
    description: string;
    completed: boolean;
    dueDate: string;  // ISO DateTime string
    subtasks: string[];
    categories: Category[];
}
```

### Create Todo
- **URL:** `/todos`
- **Method:** `POST`
- **Body:** Todo object (without id)
- **Response:** Created Todo object

### Update Todo
- **URL:** `/todos/{id}`
- **Method:** `PUT`
- **Body:** Todo object
- **Response:** Updated Todo object

### Delete Todo
- **URL:** `/todos/{id}`
- **Method:** `DELETE`
- **Response:** No content (204)

## Category Management

### Get Todo Categories
- **URL:** `/todos/{todoId}/categories`
- **Method:** `GET`
- **Response:** Array of CategoryDTO objects
```typescript
interface CategoryDTO {
    id: number;
    name: string;
}
```

### Add Category to Todo
- **URL:** `/todos/{todoId}/categories/{categoryId}`
- **Method:** `POST`
- **Response:** OK (200)

### Remove Category from Todo
- **URL:** `/todos/{todoId}/categories/{categoryId}`
- **Method:** `DELETE`
- **Response:** OK (200)

### Get Specific Todo Category
- **URL:** `/todos/{todoId}/categories/{categoryId}`
- **Method:** `GET`
- **Response:** CategoryDTO object

## Error Responses

All endpoints may return the following error responses:

- **404 Not Found:** When requested resource doesn't exist
- **400 Bad Request:** When request body is invalid
- **405 Method Not Allowed:** When using unsupported HTTP method
- **500 Internal Server Error:** For unexpected server errors

## Notes

1. The API supports CORS for `http://localhost:3000` (default React development server)
2. All request/response bodies are in JSON format
3. Dates should be handled in ISO format
4. Categories are managed through a many-to-many relationship with todos
