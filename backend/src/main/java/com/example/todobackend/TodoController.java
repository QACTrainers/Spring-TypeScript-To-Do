package com.example.todobackend;

import com.example.todobackend.dto.CategoryDTO;
import com.example.todobackend.error.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Todo createTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        if (!todoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Todo not found with id: " + id);
        }
        todo.setId(id);
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        if (!todoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/categories", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping(value = "/categories", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @PutMapping(value = "/categories/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Category updateCategory(@PathVariable Long id, @RequestBody Category category) {
        category.setId(id);
        return categoryRepository.save(category);
    }

    @PostMapping("/{todoId}/categories/{categoryId}")
    public ResponseEntity<?> addCategoryToTodo(@PathVariable Long todoId, @PathVariable Long categoryId) {
        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + todoId));
        Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        
        todo.addCategory(category);
        todoRepository.save(todo);
        
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{todoId}/categories/{categoryId}")
    public ResponseEntity<?> removeCategoryFromTodo(@PathVariable Long todoId, @PathVariable Long categoryId) {
        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + todoId));
        Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        
        todo.removeCategory(category);
        todoRepository.save(todo);
        
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/{todoId}/categories/{categoryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CategoryDTO getTodoCategoryById(@PathVariable Long todoId, @PathVariable Long categoryId) {
        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + todoId));
        
        Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        
        if (!todo.getCategories().contains(category)) {
            throw new ResourceNotFoundException("Category with id: " + categoryId + " is not associated with todo id: " + todoId);
        }
        
        return new CategoryDTO(category.getId(), category.getName());
    }

    @GetMapping(value = "/{todoId}/categories", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CategoryDTO> getTodoCategories(@PathVariable Long todoId) {
        Todo todo = todoRepository.findById(todoId)
            .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + todoId));
        return todo.getCategories().stream()
            .map(category -> new CategoryDTO(category.getId(), category.getName()))
            .collect(Collectors.toList());
    }
}