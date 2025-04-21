package web.labs.work.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import web.labs.work.model.Team;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Integer> {
    List<Team> findByProjectId(Long projectId);

    Optional<Team> findByIdAndProjectId(Integer teamId, Long projectId);
}
