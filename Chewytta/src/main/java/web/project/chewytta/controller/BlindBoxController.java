package web.project.chewytta.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import web.project.chewytta.model.BlindBox;
import web.project.chewytta.service.BlindBoxService;

import java.util.List;

@RestController
@RequestMapping("/api/boxes")
@Tag(name = "盲盒管理", description = "获取盲盒列表、详情、增删改查等操作")
@RequiredArgsConstructor
public class BlindBoxController {

    private final BlindBoxService blindBoxService;

    // 获取所有盲盒
    @GetMapping
    @Operation(summary = "获取所有盲盒")
    public List<BlindBox> getAllBoxes() {
        return blindBoxService.getAllBoxes();
    }

    // 获取单个盲盒详情
    @GetMapping("/{id}")
    @Operation(summary = "根据ID获取盲盒详情")
    public BlindBox getBoxById(@PathVariable Long id) {
        return blindBoxService.getBoxById(id);
    }

    // 创建新盲盒（仅管理员）
    @PostMapping
    @PreAuthorize("hasRole('admin')")
    @Operation(summary = "创建新盲盒（需要管理员权限）")
    public ResponseEntity<Integer> createBlindBox(@RequestBody BlindBox blindBox) {
        int result = blindBoxService.addBlindBox(blindBox);
        return ResponseEntity.ok(result);
    }

    // 更新盲盒信息（仅管理员）
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    @Operation(summary = "更新盲盒信息（需要管理员权限）")
    public ResponseEntity<Integer> updateBlindBox(@PathVariable Long id, @RequestBody BlindBox blindBox) {
        blindBox.setId(id);
        int result = blindBoxService.updateBlindBox(blindBox);
        return ResponseEntity.ok(result);
    }

    // 删除盲盒（仅管理员）
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    @Operation(summary = "删除盲盒（需要管理员权限）")
    public ResponseEntity<Integer> deleteBlindBox(@PathVariable Long id) {
        int result = blindBoxService.deleteBlindBox(id);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    @Operation(summary = "根据名称搜索盲盒")
    public ResponseEntity<List<BlindBox>> searchBoxes(@RequestParam String keyword) {
        List<BlindBox> boxes = blindBoxService.searchBoxesByName(keyword);
        return ResponseEntity.ok(boxes);
    }

}
