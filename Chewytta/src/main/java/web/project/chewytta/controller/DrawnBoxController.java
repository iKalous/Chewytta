package web.project.chewytta.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.project.chewytta.model.BlindBox;
import web.project.chewytta.model.DrawnBox;
import web.project.chewytta.model.Item;
import web.project.chewytta.service.BlindBoxService;
import web.project.chewytta.service.DrawnBoxService;

import java.util.List;

@RestController
@RequestMapping("/api/drawn")
@Tag(name = "抽中记录", description = "用户抽中盲盒内容记录")
@RequiredArgsConstructor
public class DrawnBoxController {

    private final DrawnBoxService drawnBoxService;
    private final BlindBoxService blindBoxService;

    @PostMapping("/boxes/{boxId}/draw")
    @Operation(summary = "抽取指定盲盒的一个款式并扣除余额")
    public ResponseEntity<Item> drawBlindBox(
            @PathVariable Long boxId,
            @RequestParam Long userId) {

        // 获取盲盒价格
        BlindBox box = blindBoxService.getBoxById(boxId);
        if (box == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Item item = drawnBoxService.drawItemFromBoxWithDeduction(userId, boxId, box.getPrice());
            return ResponseEntity.ok(item);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }


    /**
     * 获取用户所有抽中记录
     */
    @GetMapping("/user/{userId}")
    @Operation(summary = "获取用户抽中记录")
    public ResponseEntity<List<DrawnBox>> getDrawnBoxesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(drawnBoxService.getDrawnBoxesByUserId(userId));
    }

    @RestController
    @RequestMapping("/api/orders")
    @Tag(name = "订单管理", description = "用户盲盒订单查看")
    @RequiredArgsConstructor
    public class OrderController {

        private final DrawnBoxService drawnBoxService;

        // 获取用户的所有订单（带盲盒和款式详情）
        @GetMapping("/{userId}")
        @Operation(summary = "获取用户的订单列表")
        public ResponseEntity<List<DrawnBox>> getUserOrders(@PathVariable Long userId) {
            List<DrawnBox> orders = drawnBoxService.getOrdersByUserId(userId);
            return ResponseEntity.ok(orders);
        }
    }



}
