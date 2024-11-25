migrate(
  (db) => {
    const dao = new Dao(db);

    // 创建用户
    const users = [
      {
        id: "user_xiaoming",
        username: "xiaoming",
        email: "xiaoming@example.com",
        emailVisibility: true,
        password:
          "$2a$12$wQD.2yqNVCvIxvXqWBZOyebqpa.GzN11gqnLKj/h2FnDgqvA5Yqmi", // "password123"
        passwordConfirm:
          "$2a$12$wQD.2yqNVCvIxvXqWBZOyebqpa.GzN11gqnLKj/h2FnDgqvA5Yqmi",
        verified: true,
        tokenKey: "xiaoming_" + new Date().getTime(),
      },
      {
        id: "user_alex",
        username: "alex",
        email: "alex@example.com",
        emailVisibility: true,
        password:
          "$2a$12$wQD.2yqNVCvIxvXqWBZOyebqpa.GzN11gqnLKj/h2FnDgqvA5Yqmi", // "password123"
        passwordConfirm:
          "$2a$12$wQD.2yqNVCvIxvXqWBZOyebqpa.GzN11gqnLKj/h2FnDgqvA5Yqmi",
        verified: true,
        tokenKey: "alex_" + new Date().getTime(),
      },
    ];

    users.forEach((user) => {
      dao.saveRecord(new Record(dao.findCollectionByNameOrId("users"), user));
    });

    // 创建笔记
    const notes = [
      {
        text: "这是小明的第一条笔记",
        user: "user_xiaoming",
      },
      {
        text: "This is Alex's first note",
        user: "user_alex",
      },
    ];

    notes.forEach((note) => {
      dao.saveRecord(new Record(dao.findCollectionByNameOrId("notes"), note));
    });

    console.log("🌱 测试数据已添加");
  },
  (db) => {
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
