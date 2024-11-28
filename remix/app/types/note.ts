export interface Note {
  id: string;
  text: string;
  created: string;
  updated: string;
  user: string[];
  files: any[];
  collectionId: string;
  collectionName: string;
}

export interface NotesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Note[];
}
