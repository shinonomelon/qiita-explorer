import { QiitaItem } from "./types";

export const items: QiitaItem[] = [
  {
    id: "1",
    title: "axiosの基本的な使い方",
    url: "https://example.com/1",
    created_at: "2022-07-13T10:00:00+09:00",
    likes_count: 100,
    tags: [{ name: "JavaScript" }, { name: "React" }],
    user: { id: "user1", profile_image_url: "" },
  },
  {
    id: "2",
    title:
      "【Git】ブランチの命名規則を調べてたらIssueドリブン開発という存在を知った",
    url: "https://example.com/2",
    created_at: "2022-07-14T10:00:00+09:00",
    likes_count: 200,
    tags: [{ name: "JavaScript" }, { name: "AWS" }],
    user: { id: "user2", profile_image_url: "" },
  },
  {
    id: "3",
    title: "Qiita API v2を使ってみる【JavaScript】",
    url: "https://example.com/3",
    created_at: "2022-07-15T10:00:00+09:00",
    likes_count: 300,
    tags: [{ name: "React" }, { name: "tag3" }],
    user: { id: "user3", profile_image_url: "" },
  },
];
