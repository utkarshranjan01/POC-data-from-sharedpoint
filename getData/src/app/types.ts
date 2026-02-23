export interface Photo {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export interface Items {
  id: number;
  name: string;
  owner: string;
  date: string;
  isFolder: boolean;
  extension: string;
  size: string;
  items?: string;
}

export interface navigator {
  id: number;
  name: string;
  folders: Items[];
  files: Items[];
}
