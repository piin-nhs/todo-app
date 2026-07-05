package iuh.fit.backend.service;

import iuh.fit.backend.entity.Todo;
import iuh.fit.backend.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoServiceImpl(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Todo> getAllTodos(String keyword, Boolean completed) {
        if (keyword != null && !keyword.trim().isEmpty() && completed != null) {
            return todoRepository.findByTitleContainingIgnoreCaseAndCompleted(keyword.trim(), completed);
        } else if (keyword != null && !keyword.trim().isEmpty()) {
            return todoRepository.findByTitleContainingIgnoreCase(keyword.trim());
        } else if (completed != null) {
            return todoRepository.findByCompleted(completed);
        }
        return todoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    @Override
    @Transactional
    public Todo createTodo(Todo todo) {
        // Đảm bảo các thuộc tính mặc định
        if (todo.getCompleted() == null) {
            todo.setCompleted(false);
        }
        return todoRepository.save(todo);
    }

    @Override
    @Transactional
    public Todo updateTodo(Long id, Todo todoDetails) {
        Todo todo = getTodoById(id);
        todo.setTitle(todoDetails.getTitle());
        todo.setDescription(todoDetails.getDescription());
        if (todoDetails.getCompleted() != null) {
            todo.setCompleted(todoDetails.getCompleted());
        }
        return todoRepository.save(todo);
    }

    @Override
    @Transactional
    public Todo updateTodoStatus(Long id, Boolean completed) {
        Todo todo = getTodoById(id);
        todo.setCompleted(completed);
        return todoRepository.save(todo);
    }

    @Override
    @Transactional
    public void deleteTodo(Long id) {
        Todo todo = getTodoById(id);
        todoRepository.delete(todo);
    }
}
