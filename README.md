# Qiita Explorer

簡単に Qiita の記事をフィルタリング検索ができるアプリ

公開 URL: https://qiita-explorer.vercel.app/

## 使用技術

- TypeScript
- React
- React Router
- TanStack Query
- Qiita API

## 機能：

- 検索機能：ユーザーが特定のキーワードで Qiita の記事を検索
- フィルタリング機能：投稿期間、タグ、ストック数などの条件で記事をフィルタリング
- クエリ保持機能：React Router を使ってクエリを管理し、フォームの状態を URL のクエリパラメータとして保存することで、ページをリロードしてもフォームの状態が保持
- ページネーション機能：検索結果をページごとに分けて表示
