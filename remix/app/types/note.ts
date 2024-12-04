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
  expand?: {
    files?: FileRecord[];
  };
}

// 文件类型
export interface FileRecord extends BaseRecord {
  file: File;
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
