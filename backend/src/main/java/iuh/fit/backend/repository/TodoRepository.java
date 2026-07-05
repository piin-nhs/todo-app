package iuh.fit.backend.repository;

import iuh.fit.backend.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    // Tìm kiếm todo theo từ khóa trong tiêu đề và sắp xếp theo ID giảm dần (mới nhất lên đầu)
    List<Todo> findByTitleContainingIgnoreCaseOrderByIdDesc(String keyword);
    
    // Lọc các todo theo trạng thái hoàn thành và sắp xếp theo ID giảm dần
    List<Todo> findByCompletedOrderByIdDesc(Boolean completed);
    
    // Tìm kiếm, lọc đồng thời và sắp xếp theo ID giảm dần
    List<Todo> findByTitleContainingIgnoreCaseAndCompletedOrderByIdDesc(String keyword, Boolean completed);
}
