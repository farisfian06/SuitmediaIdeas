export type Image = {
  id: number;
  mime: string;
  file_name: string;
  url: string;
};

export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  createdAt: string;
  small_image?: Image[];
  medium_image?: Image[];
};

export type Links = {
  url: string;
  label: string;
  active: boolean;
};
