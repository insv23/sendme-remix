migrate(
  (db) => {
    const dao = new Dao(db);

    const adminEmail = $os.getenv("ADMIN_EMAIL") || "admin@example.com";
    const adminPassword =
      $os.getenv("ADMIN_PASSWORD") || "your-secure-password123";

    const admin = new Admin();
    admin.email = adminEmail;
    admin.setPassword(adminPassword);

    try {
      console.log("🤴 初始管理员创建 ");
      return dao.saveAdmin(admin);
    } catch (err) {
      console.error("Failed to create admin:", err);
      throw err;
    }
  },
  (db) => {
    const dao = new Dao(db);
    try {
      const admin = dao.findAdminByEmail($os.getenv("ADMIN_EMAIL"));
      if (admin) {
        dao.deleteAdmin(admin);
        console.log("Admin account has been rolled back and deleted");
      }
    } catch (err) {
      console.error("Failed to delete admin:", err);
      throw err;
    }
  }
);
