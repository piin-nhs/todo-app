package iuh.fit.backend.repository;

import iuh.fit.backend.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    // Tìm kiếm todo theo từ khóa trong tiêu đề (không phân biệt hoa thường)
    List<Todo> findByTitleContainingIgnoreCase(String keyword);
    
    // Lọc các todo theo trạng thái hoàn thành (true / false)
    List<Todo> findByCompleted(Boolean completed);
    
    // Tìm kiếm và lọc đồng thời
    List<Todo> findByTitleContainingIgnoreCaseAndCompleted(String keyword, Boolean completed);
}
