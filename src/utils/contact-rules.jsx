export const contactRules = {
  name: {
    required: "請輸入您的姓名",
  },
  email: {
    required: "請輸入您的電子郵件",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "請輸入有效的電子郵件地址",
    },
  },
  message: {
    required: "請輸入訊息內容",
  },
};
