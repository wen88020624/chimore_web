# 奇模工程有限公司 - 前端

奇模工程有限公司官方網站，使用 Next.js App Router 建置。

## 技術棧

- [Next.js 15](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ant Design 5](https://ant.design/)

## 開發

```bash
npm install
cp .env.example .env.local
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 查看網站。

### 案例實績資料來源

在 `.env.local` 設定：

| 變數 | 說明 |
|------|------|
| `NEXT_PUBLIC_API_BASE_URL` | 後端位址，例如 `http://localhost:3000` |
| `NEXT_PUBLIC_USE_PROJECT_MOCK` | `true` = localStorage；`false` = 後端 API |

未設定 `NEXT_PUBLIC_USE_PROJECT_MOCK` 時：有 API 位址則接 API，否則使用 localStorage。

後端需先啟動並執行 `npm run db:seed` 匯入初始案例資料。

## 建置

```bash
npm run build
npm start
```

## 頁面結構

| 路徑 | 說明 |
|------|------|
| `/` | 首頁 |
| `/intro` | 公司簡介 |
| `/service` | 服務項目 |
| `/projects` | 案例實績 |
