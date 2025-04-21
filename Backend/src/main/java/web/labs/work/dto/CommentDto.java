package web.labs.work.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto{
        Long id;
        Long taskId;
        String content;
        Timestamp created;
        Timestamp updated;
}
