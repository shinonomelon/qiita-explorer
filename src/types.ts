export type QiitaTag = {
  name: string;
};

export type QiitaUser = {
  id: string;
  profile_image_url: string;
};

export type QiitaItem = {
  id: string;
  title: string;
  url: string;
  created_at: string;
  likes_count: number;
  tags: QiitaTag[];
  user: QiitaUser;
};

export type CreatedAtRange = "7d" | "1M" | "1y" | "5y" | "10y" | "all";
