package web.labs.work.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.labs.work.model.ProjectTaskCount;
import web.labs.work.model.Project;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT p FROM Project p WHERE " +
           "p.name ILIKE CONCAT('%', :search, '%') OR " +
           "p.description ILIKE CONCAT('%', :search, '%')")
    List<Project> searchProjects(@Param("search") String search);

    @Query("SELECT new web.labs.work.model.ProjectTaskCount(p.id, COUNT(t)) " +
           "FROM Project p LEFT JOIN p.tasks t " +
           "WHERE t.completed = false OR t IS NULL " +
           "GROUP BY p.id")
    List<ProjectTaskCount> countIncompleteTasks();
}