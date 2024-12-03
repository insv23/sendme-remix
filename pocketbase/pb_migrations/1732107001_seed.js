migrate(
  (db) => {
    // 检查是否为生产环境
    if (process.env.NODE_ENV === "production") {
      console.log("⏭️ 生产环境跳过测试数据添加");
      return;
    }

    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("users");

    // 创建用户
    const users = [
      {
        id: "user_xiaoming",
        username: "xiaoming",
        email: "xiaoming@example.com",
        emailVisibility: true,
        verified: true,
        tokenKey: "xiaoming_" + new Date().getTime(),
      },
      {
        id: "user_alex",
        username: "alex",
        email: "alex@example.com",
        emailVisibility: true,
        verified: true,
        tokenKey: "alex_" + new Date().getTime(),
      },
    ];

    users.forEach((userData) => {
      const record = new Record(collection, userData);
      record.setPassword("password123");
      dao.saveRecord(record);
    });

    // 创建笔记
    const notes = [
      {
        text: "这是小明的第一条笔记",
        created_by: "user_xiaoming",
      },
      {
        text: "This is Alex's first note",
        created_by: "user_alex",
      },
    ];

    notes.forEach((note) => {
      dao.saveRecord(new Record(dao.findCollectionByNameOrId("notes"), note));
    });

    console.log("🌱 测试数据已添加");
  },
  (db) => {
    // 检查是否为生产环境
    if (process.env.NODE_ENV === "production") {
      console.log("⏭️ 生产环境跳过测试数据清除");
      return;
    }

    const dao = new Dao(db);

    // 删除笔记
    const notes = dao.findCollectionByNameOrId("notes").findRecordsByFilter("");
    notes.forEach((note) => dao.deleteRecord("notes", note.id));

    // 删除用户
    ["user_xiaoming", "user_alex"].forEach((userId) => {
      dao.deleteRecord("users", userId);
    });

    console.log("🧹 测试数据已清除");
  }
);
