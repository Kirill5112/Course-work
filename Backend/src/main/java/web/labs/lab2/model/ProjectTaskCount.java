package web.labs.lab2.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ProjectTaskCount {
    private final Long projectId;
    private final Long count;
}
