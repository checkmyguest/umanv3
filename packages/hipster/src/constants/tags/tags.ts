export interface ITagOptions {
  tag_id: number;
  name: string;
  active: number;
  checked: boolean;
}

export interface ITagsEvent {
  tag_id: number;
  name: string;
  reservation_id: number;
}
