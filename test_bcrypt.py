import bcrypt

print("=== Root 用户密码初始化方案对比 ===")

# 方案1：SQL 中硬编码固定哈希值
print("\n🔸 方案1：SQL 硬编码哈希 (旧方案)")
fixed_hash = '$2a$10$FVhZxsxJRPeb3c.IHGMrpOHZJnkQ5DdYFTpDoo/Cc3gLrRFfqd5lu'
test_password = '123456'
if bcrypt.checkpw(test_password.encode('utf-8'), fixed_hash.encode('utf-8')):
    print("✅ 固定哈希验证成功")
else:
    print("❌ 固定哈希验证失败")

print("优点：部署简单，SQL 直接执行")
print("缺点：跨平台兼容性问题，哈希值可能失效")

# 方案2：Java 服务动态生成哈希值
print("\n🔸 方案2：Java 服务动态初始化 (新方案)")
dynamic_hash1 = bcrypt.hashpw(test_password.encode('utf-8'), bcrypt.gensalt(rounds=10))
dynamic_hash2 = bcrypt.hashpw(test_password.encode('utf-8'), bcrypt.gensalt(rounds=10))

print(f"动态哈希1: {dynamic_hash1.decode('utf-8')}")
print(f"动态哈希2: {dynamic_hash2.decode('utf-8')}")

# 验证两个不同的哈希都能验证同一密码
is_valid1 = bcrypt.checkpw(test_password.encode('utf-8'), dynamic_hash1)
is_valid2 = bcrypt.checkpw(test_password.encode('utf-8'), dynamic_hash2)

print(f"验证结果1: {'✅' if is_valid1 else '❌'}")
print(f"验证结果2: {'✅' if is_valid2 else '❌'}")

print("\n🎯 新方案优势：")
print("✅ 跨平台兼容：在任何环境下都能正确生成哈希")
print("✅ 自动检测：启动时检查用户是否存在")
print("✅ 密码一致：始终确保密码是 '123456'")
print("✅ 安全性好：每次部署生成不同哈希但功能一致")
print("✅ 日志清晰：启动时显示初始化状态")

print("\n📋 部署保证：")
print("🔐 用户名：root")  
print("🔐 密码：123456")
print("🔐 角色：admin")
print("🔐 适用：任何环境、任何电脑")