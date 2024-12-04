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
          name: "created_by",
          type: "relation",
          required: true,
          options: {
            maxSelect: 1,
            collectionId: "_pb_users_auth_",
            cascadeDelete: true,
          },
        },
      ],
      listRule: '@request.auth.id != "" && created_by ~ @request.auth.id',
      viewRule: '@request.auth.id != "" && created_by ~ @request.auth.id',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != "" && created_by ~ @request.auth.id',
      deleteRule: '@request.auth.id != "" && created_by ~ @request.auth.id',
    });

    const files = new Collection({
      id: "files",
      name: "files",
      type: "base",
      schema: [
        {
          name: "file",
          type: "file",
          required: true,
          options: {
            maxSelect: 1,
            maxSize: 1024 * 1024 * 500, //  单个文件最大 500 MB
          },
        },
        {
          name: "note",
          type: "relation",
          required: false, // 允许先上传文件,后关联笔记
          options: {
            maxSelect: 1,
            collectionId: "notes",
            cascadeDelete: true, // 删除 note 时自动删除关联 file
          },
        },
        {
          name: "created_by",
          type: "relation",
          required: true,
          options: {
            maxSelect: 1,
            collectionId: "_pb_users_auth_",
            cascadeDelete: true,
          },
        },
      ],
      listRule: '@request.auth.id != "" && created_by ~ @request.auth.id',
      viewRule: '@request.auth.id != "" && created_by ~ @request.auth.id',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != "" && created_by ~ @request.auth.id',
      deleteRule: '@request.auth.id != "" && created_by ~ @request.auth.id',
    });

    console.log("🐥 files 创建");
    dao.saveCollection(files);

    console.log("🐥 notes 创建");
    return dao.saveCollection(notes);
  },
  (db) => {
    const dao = new Dao(db);

    const notesCollection = dao.findCollectionByNameOrId("notes");
    if (notesCollection) {
      dao.deleteCollection("notes");
      console.log("🐥 notes collection 已删除");
    }

    const filesCollection = dao.findCollectionByNameOrId("files");
    if (filesCollection) {
      dao.deleteCollection("files");
      console.log("🐥 files collection 已删除");
    }
  }
);
