package com.example.todobackend;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "BOOLEAN")
    private boolean completed;
    
    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @ElementCollection
    @OrderColumn(name = "subtask_order")
    @CollectionTable(name = "todo_subtasks", joinColumns = @JoinColumn(name = "todo_id"))
    @Column(name = "subtask")
    private List<String> subtasks = new ArrayList<>();

    @ManyToMany
    @JoinTable(
        name = "todo_categories",
        joinColumns = @JoinColumn(name = "todo_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    @JsonIgnoreProperties("todos")
    private Set<Category> categories = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public List<String> getSubtasks() {
        return subtasks;
    }

    public void setSubtasks(List<String> subtasks) {
        this.subtasks = subtasks;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public void addCategory(Category category) {
        this.categories.add(category);
        category.getTodos().add(this);
    }

    public void removeCategory(Category category) {
        this.categories.remove(category);
        category.getTodos().remove(this);
    }
}
