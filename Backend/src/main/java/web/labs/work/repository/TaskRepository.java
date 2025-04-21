package web.labs.work.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.labs.work.model.Task;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByProjectId(Long projectId);

    Optional<Task> findByIdAndProjectId(Long taskId, Long projectId);

    @Modifying
    @Query("DELETE FROM Task t WHERE t.project.id = :projectId AND t.completed = true")
    void deleteCompletedTasks(@Param("projectId") Long projectId);
}