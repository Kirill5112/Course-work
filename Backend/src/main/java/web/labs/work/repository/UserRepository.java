package web.labs.work.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import web.labs.work.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String username);

    @Query("SELECT u FROM User u WHERE " +
           "u.userName ILIKE CONCAT('%', :search, '%')")
    List<User> searchUsers(@Param("search") String search);

    @Query("SELECT DISTINCT u FROM User u JOIN u.teams t WHERE t.project.id = :projectId")
    List<User> findUsersByProjectId(@Param("projectId") Long projectId);
}
