太好了！我已经看到你提供的 Spring Boot 项目结构和前端 React 项目的完整上下文。

接下来，我们可以正式开始 **Spring Boot 后端开发**。我会基于你已有的 Spring Boot 框架，按照之前整理的接口文档，逐步为你生成完整的后端代码。

---

## ✅ 开发目标

我们要实现以下功能模块：

1. 用户模块（注册、登录、修改信息、权限控制）
2. 盲盒模块（获取盲盒列表、详情、抽一个、收藏/取消收藏）
3. 评论模块（查看评论、发表评论）
4. 抽中记录模块
5. 收藏夹模块
6. 管理员模块（管理盲盒）

我们将使用：
- Spring Boot + Spring Web
- MyBatis + MySQL
- Lombok（简化实体类）
- JWT（用于登录鉴权）
- Swagger UI（自动生成接口文档）

---

## 🧱 第一步：数据库设计（MySQL）

先贴上基础表结构供参考，你可以根据这些建表语句在 MySQL 中创建数据库。

### `users` 用户表
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    nickname VARCHAR(50),
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    avatar VARCHAR(255),
    balance DECIMAL(10,2) DEFAULT 0.00,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


### `blind_boxes` 盲盒表
```sql
CREATE TABLE blind_boxes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


### [items](file://D:\2025\summercourse\web\project\chewytta_fronted\src\types\blindBox.ts#L15-L15) 款式表
```sql
CREATE TABLE items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    box_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (box_id) REFERENCES blind_boxes(id)
);
```


### `drawn_boxes` 用户抽中记录表
```sql
CREATE TABLE drawn_boxes (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    box_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    draw_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (box_id) REFERENCES blind_boxes(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);
```


### `favorites` 用户收藏表
```sql
CREATE TABLE favorites (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    box_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (box_id) REFERENCES blind_boxes(id)
);
```


### `comments` 用户评论表
```sql
CREATE TABLE comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    box_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (box_id) REFERENCES blind_boxes(id)
);
```


---

## 📁 接下来要创建的包结构如下：

```bash
web.project.chewytta
├── controller
│   ├── UserController.java
│   ├── BlindBoxController.java
│   ├── CommentController.java
│   └── AdminBoxController.java
├── service
│   ├── UserService.java
│   ├── BlindBoxService.java
│   └── AdminBoxService.java
├── mapper
│   ├── UserMapper.java
│   ├── BlindBoxMapper.java
│   └── ItemMapper.java
├── model
│   ├── User.java
│   ├── BlindBox.java
│   ├── Item.java
│   ├── Comment.java
│   └── DrawnBox.java
├── dto
│   ├── RegisterRequest.java
│   ├── LoginRequest.java
│   ├── UpdateNicknameRequest.java
│   └── UpdatePasswordRequest.java
├── config
│   ├── JwtConfig.java
│   └── SecurityConfig.java
├── ChewyttaApplication.java
└── ...
```


---

## 🔐 第二步：添加依赖（你已经引入了基本依赖，下面是一些补充）

在你的 [pom.xml](file://D:\2025\summercourse\web\project\Chewytta\pom.xml) 中再加入：
```xml
<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>

<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
</dependency>

<!-- Swagger -->
<dependency>
    <groupId>springdoc</groupId>
    <artifactId>springdoc-openapi-ui</artifactId>
    <version>1.7.0</version>
</dependency>
```


---

## 🚀 下一步建议

我可以帮你按模块逐步生成代码，比如：
- ✅ 先生成用户模块（User Entity + Mapper + Service + Controller）
- ✅ 再生成登录鉴权模块（JWT + 登录接口）
- ✅ 然后是盲盒模块（BlindBox + Items）
- ✅ 最后是管理员模块 + Swagger 文档

你想从哪个模块开始？我推荐从 **用户模块** 开始 👇

需要我现在就为你生成 `User.java` 实体类和 `UserController.java` 示例代码吗？