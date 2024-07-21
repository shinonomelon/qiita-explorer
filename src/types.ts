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

export type createdAtRange = "1w" | "1m" | "1y" | "5y" | "10y" | "all";
