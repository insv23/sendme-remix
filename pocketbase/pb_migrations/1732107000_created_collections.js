migrate(
  (db) => {
    const dao = new Dao(db);

    // 创建 notes collection
    const notes = new Collection({
      id: "notes",
      name: "notes",
      type: "base",
      schema: [
        {
          name: "text",
          type: "editor",
          required: false,
        },
        {
          name: "files",
          type: "file",
          required: false,
          options: {
            maxSelect: 10, // 允许最多上传10个文件(如果不指定就是最多允许0个)
            maxSize: 5242880000, // 每个文件最大5000MB
          },
        },
        {
          name: "user",
          type: "relation",
          required: true,
          options: {
            collectionId: "_pb_users_auth_",
            cascadeDelete: true,
          },
        },
      ],
      listRule: "",
      viewRule: "",
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
      //   listRule: "@request.auth.id != '' && account = @request.auth.id",
      //   viewRule: "@request.auth.id != '' && account = @request.auth.id",
      //   createRule: "@request.auth.id != ''",
      //   updateRule: "@request.auth.id != '' && account = @request.auth.id",
      //   deleteRule: "@request.auth.id != '' && account = @request.auth.id",
    });

    console.log("🐥 notes 创建");
    return dao.saveCollection(notes);
  },
  (db) => {
    const dao = new Dao(db);

    // 检查并删除 notes collection
    const notesCollection = dao.findCollectionByNameOrId("notes");
    if (notesCollection) {
      dao.deleteCollection("notes");
      console.log("🐥 notes collection 已删除");
    }
  }
);
