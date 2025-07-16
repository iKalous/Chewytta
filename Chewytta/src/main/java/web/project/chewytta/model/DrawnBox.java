package web.project.chewytta.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DrawnBox {
    private Long id;
    private Long userId;
    private Long boxId;
    private Long itemId; // 抽中的款式 ID
    private LocalDateTime drawTime;
}
