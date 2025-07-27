import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordTest {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // 验证现有的哈希密码是否对应 "123456"
        String hashedPassword = "$2a$10$N.zKISeHaQdH8E5.S5GQV.8dMPkFVHDKHZYO7wB3nYVSSZZqVLtGm";
        String plainPassword = "123456";

        boolean matches = encoder.matches(plainPassword, hashedPassword);
        System.out.println("密码验证结果: " + matches);

        // 如果不匹配，生成新的哈希
        if (!matches) {
            String newHash = encoder.encode("123456");
            System.out.println("新的123456密码哈希: " + newHash);
        }
    }
}
