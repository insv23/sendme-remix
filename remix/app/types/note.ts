// 基础类型
interface BaseRecord {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
}

// 笔记类型
export interface Note extends BaseRecord {
  text: string;
  created_by: string[];
  files?: FileRecord[];
}

// 文件类型
export interface FileRecord extends BaseRecord {
  name: string;
  url: string;
  note?: string[];
  created_by: string[];
}

export interface PocketBaseFileRecord extends BaseRecord {
  file: string; // 虽然在 pb 中是 file 字段，但是 PocketBase 会返回文件的名称（字符串），而不是完整的 File 对象。
  note?: string[];
  created_by: string[];
}

// 列表响应类型
export interface ListResponse<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

// 具体的响应类型别名
export type NotesResponse = ListResponse<Note>;
export type FilesResponse = ListResponse<FileRecord>;
