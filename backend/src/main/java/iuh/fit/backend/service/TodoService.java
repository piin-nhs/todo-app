package iuh.fit.backend.service;

import iuh.fit.backend.entity.Todo;

import java.util.List;

public interface TodoService {
    List<Todo> getAllTodos(String keyword, Boolean completed);
    Todo getTodoById(Long id);
    Todo createTodo(Todo todo);
    Todo updateTodo(Long id, Todo todoDetails);
    Todo updateTodoStatus(Long id, Boolean completed);
    void deleteTodo(Long id);
}
