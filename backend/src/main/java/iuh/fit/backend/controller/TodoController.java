package iuh.fit.backend.controller;

import iuh.fit.backend.entity.Todo;
import iuh.fit.backend.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    // Lấy tất cả hoặc lọc theo keyword/completed status
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean completed) {
        List<Todo> todos = todoService.getAllTodos(keyword, completed);
        return ResponseEntity.ok(todos);
    }

    // Thêm mới Todo
    @PostMapping
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody Todo todo) {
        Todo createdTodo = todoService.createTodo(todo);
        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    // Sửa thông tin Todo
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody Todo todoDetails) {
        Todo updatedTodo = todoService.updateTodo(id, todoDetails);
        return ResponseEntity.ok(updatedTodo);
    }

    // Cập nhật trạng thái completed
    @PatchMapping("/{id}/status")
    public ResponseEntity<Todo> updateTodoStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> statusBody) {
        Boolean completed = statusBody.get("completed");
        if (completed == null) {
            throw new RuntimeException("Field 'completed' is required in request body");
        }
        Todo updatedTodo = todoService.updateTodoStatus(id, completed);
        return ResponseEntity.ok(updatedTodo);
    }

    // Xóa Todo
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok(Map.of("message", "Todo deleted successfully with id: " + id));
    }
}
