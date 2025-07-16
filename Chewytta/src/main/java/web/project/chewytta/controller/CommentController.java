package web.project.chewytta.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.project.chewytta.model.Comment;
import web.project.chewytta.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@Tag(name = "评论管理", description = "查看、添加、删除评论")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 获取某个盲盒下的所有评论
    @GetMapping("/box/{boxId}")
    @Operation(summary = "获取某个盲盒的评论列表")
    public ResponseEntity<List<Comment>> getCommentsByBoxId(@PathVariable Long boxId) {
        return ResponseEntity.ok(commentService.getCommentsByBoxId(boxId));
    }

    // 新增评论（需要登录）
    @PostMapping
    @Operation(summary = "新增评论")
    public ResponseEntity<Integer> createComment(@RequestBody Comment comment) {
        int result = commentService.addComment(comment);
        return ResponseEntity.ok(result);
    }

    // 删除评论（仅限本人或管理员）
    @DeleteMapping("/{id}")
    @Operation(summary = "删除评论")
    public ResponseEntity<Integer> deleteComment(@PathVariable Long id) {
        return ResponseEntity.ok(commentService.removeComment(id));
    }
}
