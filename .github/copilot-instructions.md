# Frontend 專案 Copilot 指導文件

## 1) 技術堆疊與工具

- 新增程式碼以 React 19 與 Next 15 為基礎。
- 套件管理工具使用 pnpm。
- 程式碼品質工具以 Biome 為準（非 ESLint/Prettier 流程）。
- UI 元件優先使用 Joy UI。
- 樣式優先使用 SCSS。

參考錨點：
- package.json
- biome.json

## 2) 路由與頁面檔案契約

- 新功能頁面建立在 src/app 底下，以根路徑架構為主。
- 新頁面資料夾固定使用三檔：page.jsx、content.jsx、page.module.scss。
- page.jsx 只負責路由入口與頁面框架，不放複雜商業邏輯。
- content.jsx 負責 client 端邏輯、hooks、dispatch、組件組裝。
- 新頁面樣式一律使用 page.module.scss。
- 舊檔案可能仍有 page.scss，視為 legacy 參考，不作為新開發規範。

## 3) 資料流契約（Redux + Saga）

- Component/Page 層只 dispatch action，不直接呼叫 axios。
- API 流程固定為：Component dispatch -> saga -> fetchApi -> reducer。
- 優先沿用既有 API 常數與 saga 模式。
- loading、token 注入、API error handling 必須留在 Redux/Saga 機制內。

參考錨點：
- src/redux/saga/index.jsx
- src/redux/api/API.jsx
- src/redux/api/apiService.jsx

## 4) 表單契約

- 表單使用 react-hook-form。
- Joy UI 輸入元件使用 Controller 整合。
- 優先復用 src/components/new-forms 下既有欄位元件。
- 若既有元件可滿足需求，不要新增重複的欄位封裝。
- 欄位如果有錯誤訊息，一律顯示在欄位下方，並用紅字 error 呈現。
- 表單格式與驗證檢查優先抽成 rule、schema 或共用 helper，避免把條件散落在 component 內，方便維護。

參考錨點：
- src/components/new-forms/form-field.jsx
- src/components/new-forms/select-field.jsx

## 5) 狀態管理契約

- 跨頁共享、伺服器驅動、多人依賴狀態使用 Redux。
- useImmer 僅用在頁面內局部且較複雜的狀態更新。
- 不可用 useImmer 取代全域狀態管理。

## 6) 樣式契約

- 新頁面樣式必須使用 page.module.scss。
- 需要共用尺寸或顏色變數時，從 src/styles/variables.module.scss 匯入。
- 樣式需維持頁面作用域，避免全域污染。
- 新開發頁面需參考 Joy UI 設計語彙（間距、圓角、陰影、色階與元件層級），做出符合現有系統風格且具良好視覺品質的樣式。

參考錨點：
- src/app/forbidden/page.module.scss
- src/styles/variables.module.scss

## 7) 元件組織契約

- 可重用元件放在 src/components。
- 新增元件優先獨立檔案，避免把多個大型元件塞在同一檔。
- 匯入與輸出模式優先對齊 src/components/index.jsx。
- 單一檔案行數原則上不超過 500 行；若接近上限，需主動拆分為 hooks、utils、與子元件，避免 page/content 檔案過度膨脹。

## 8) 既有開發習慣補充（新增）

- 匯入路徑優先使用 alias（@/、@components、@hooks/*、@redux/*、@utils/*）。
- Redux dispatch 優先使用 @react-redux 提供的 useDispatch/useSelector（含既有追蹤行為）。
- action type 命名慣例採全大寫底線格式（例：FETCH_SUTS、CREATE_SUT、SET_API_ERROR）。
- Saga watcher 依情境使用 takeLatest（查詢/切頁）與 takeEvery（新增/更新/刪除）。
- 新增頁面維持 JSX 生態與既有目錄慣例，不主動引入不必要的新抽象層。
- 如果 Copilot 發現新的可泛用專案開發習慣、架構模式或流程規範，先詢問是否要納入本指導文件；確認後再補進對應章節，讓後續可自動調用。

參考錨點：
- jsconfig.json
- src/hooks/use-redux.jsx
- src/redux/saga/project.jsx

## 9) 內容與輸出規則

- 除非明確要求，不新增額外說明文件。
- 可以保留必要註解（僅限不直觀邏輯）。
- 變更保持聚焦，避免與需求無關的大範圍改動。

## 10) Cookie 與驗證規則

- 與此流程相關的 cookie path 使用 /。
- 不可繞過既有 auth/session/provider 架構。

參考錨點：
- src/app/layout.jsx

## 11) 快速 Do / Don't

Do:
- 新頁面遵守 src/app 的三檔契約。
- 優先使用 react-hook-form + 既有 new-forms 元件。
- API 一律走 Redux/Saga 管線。
- 新頁面樣式一律使用 page.module.scss。
- 新頁面 UI 與樣式需參考 Joy UI，確保風格一致且美觀。
- 優先沿用 alias 匯入與既有 action 命名模式。

Don't:
- 不要在 page/component 直接呼叫 axios。
- 不要在新功能新增 page.scss。
- 不要繞過既有 provider 與 permission 檢查流程。
- 不要引入非英文 UI 文案。