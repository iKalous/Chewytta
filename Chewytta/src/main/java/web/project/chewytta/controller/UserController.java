package web.project.chewytta.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import web.project.chewytta.dto.*;
import web.project.chewytta.model.User;
import web.project.chewytta.service.LogoutService;
import web.project.chewytta.service.UserService;
import web.project.chewytta.utils.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Tag(name = "用户管理", description = "用户注册、登录、信息修改等操作")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

//    @Autowired
//    private LogoutService logoutService;

//    @PostMapping("/logout")
//    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request) {
//        String token = extractJwtFromRequest(request);
//        if (token != null) {
//            long expiration = jwtUtil.getExpiration(token).getTime() - System.currentTimeMillis();
//            logoutService.logout(token, expiration);
//            return ResponseEntity.ok(ApiResponse.success(null));
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("无效的 Token"));
//        }
//    }

//     提取 Token 工具方法
    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @GetMapping("/me")
    @Operation(summary = "获取当前登录用户的信息")
    public ResponseEntity<ApiResponse<User>> getCurrentUserInfo(HttpServletRequest request) {
        String token = extractJwtFromRequest(request);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error("未登录"));
        }

        String username = jwtUtil.extractUsername(token);
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    // 提取 Token 工具方法
    private String extractJwt(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }



    // 用户注册
    @PostMapping("/register")
    @Operation(summary = "用户注册")
    public ResponseEntity<ApiResponse<Integer>> register(@Valid @RequestBody RegisterRequest request) {
        int result = userService.registerUser(request);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    // 用户登录
    @PostMapping("/login")
    @Operation(summary = "用户登录")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        User user = userService.login(request.getUsername(), request.getPassword());
        String token = jwtUtil.generateToken(user.getUsername());

        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setUser(user);

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    // 获取所有用户
    @GetMapping
    @PreAuthorize("hasRole('admin')")
    @Operation(summary = "获取所有用户")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    // 根据ID获取用户
    @GetMapping("/{id}")
    @Operation(summary = "根据ID获取用户")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    // 修改昵称
    @PutMapping("/nickname")
    @Operation(summary = "修改用户昵称")
    public ResponseEntity<ApiResponse<Void>> updateNickname(@Valid @RequestBody UpdateNicknameRequest request) {
        userService.changeNickname(request.getId(), request.getNickname());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // 修改密码
    @PutMapping("/password")
    @Operation(summary = "修改用户密码")
    public ResponseEntity<ApiResponse<Void>> updatePassword(@Valid @RequestBody UpdatePasswordRequest request) {
        userService.changePassword(request.getId(), request.getOldPassword(), request.getNewPassword());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // 上传头像
    @PutMapping("/{id}/avatar")
    @Operation(summary = "上传用户头像")
    public ResponseEntity<ApiResponse<Void>> uploadAvatar(@PathVariable Long id, @RequestParam MultipartFile file) {
        String avatarUrl = userService.updateAvatar(id, file);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // 删除用户
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    @Operation(summary = "删除用户")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // web/project/chewytta/controller/UserController.java

    // 在类顶部添加映射
    @PutMapping("/recharge")
    @PreAuthorize("hasRole('user')")
    @Operation(summary = "用户充值")
    public ResponseEntity<ApiResponse<Void>> rechargeBalance(@Valid @RequestBody RechargeRequest request) {
        userService.rechargeBalance(request.getUserId(), request.getAmount());
        return ResponseEntity.ok(ApiResponse.success(null));
    }

}
