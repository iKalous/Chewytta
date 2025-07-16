package web.project.chewytta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import web.project.chewytta.dto.RegisterRequest;
import web.project.chewytta.mapper.UserMapper;
import web.project.chewytta.model.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // 根据ID查询用户
    public User getUserById(Long id) {
        return userMapper.selectById(id);
    }

    // 根据用户名查询用户
    public User getUserByUsername(String username) {
        return userMapper.selectByUsername(username);
    }

    // 查询所有用户
    public List<User> getAllUsers() {
        return userMapper.selectAll();
    }

    // 用户注册
    public int registerUser(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("两次输入的密码不一致");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setNickname(request.getUsername()); // 默认昵称是用户名
        user.setAvatar(null);
        user.setBalance(BigDecimal.ZERO);
        user.setRole("user");
        user.setCreatedAt(LocalDateTime.now());

        return userMapper.insert(user);
    }



    // 用户登录验证
    public User login(String account, String password) {
        // 从数据库中根据 account 获取用户
        User user = userMapper.loginByAccount(account);
        if (user == null) {
            throw new IllegalArgumentException("账号不存在");
        }

        // 使用 PasswordEncoder 验证明文密码与加密后的密码是否匹配
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("密码错误");
        }

        // 特殊处理 root 用户
        if ("root".equals(user.getUsername()) && !account.equals(user.getUsername())) {
            throw new IllegalArgumentException("root 用户只能通过用户名登录");
        }

        return user;
    }



    // 更新用户信息
    public int updateUser(User user) {
        return userMapper.update(user);
    }

    // 删除用户
    public int deleteUserById(Long id) {
        return userMapper.deleteById(id);
    }

    // 修改密码
    public int changePassword(Long id, String oldPassword, String newPassword) {
        User user = userMapper.selectById(id);
        if (user == null || !passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("旧密码错误");
        }
        return userMapper.updatePassword(id, passwordEncoder.encode(newPassword));
    }


    // 修改昵称
    public int changeNickname(Long id, String nickname) {
        return userMapper.updateNickname(id, nickname);
    }

    // 示例：模拟头像上传到某个路径
    public String updateAvatar(Long id, MultipartFile file) {
        // 实际应使用文件存储服务如 OSS / MinIO / 本地存储等
        String url = "https://example.com/avatars/" + id + ".jpg";
        // TODO: 实际保存文件逻辑
        userMapper.updateAvatar(id, url);
        return url;
    }


    // web/project/chewytta/service/UserService.java

    // 添加充值方法
    public int rechargeBalance(Long userId, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("充值金额必须大于0");
        }

        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new IllegalArgumentException("用户不存在");
        }

        BigDecimal newBalance = user.getBalance().add(amount);
        return userMapper.updateBalance(userId, newBalance);
    }


    /**
     * 扣除用户余额
     *
     * @param userId 用户ID
     * @param amount 需要扣除的金额
     * @return 扣除后的余额
     */
    @Transactional(rollbackFor = Exception.class)
    public BigDecimal deductBalance(Long userId, BigDecimal amount) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("扣除金额必须大于0");
        }

        User user = userMapper.selectById(userId);
        if (user == null) {
            throw new IllegalArgumentException("用户不存在");
        }

        if (user.getBalance().compareTo(amount) < 0) {
            throw new IllegalArgumentException("余额不足");
        }

        BigDecimal newBalance = user.getBalance().subtract(amount);
        userMapper.updateBalance(userId, newBalance);

        return newBalance;
    }


}
