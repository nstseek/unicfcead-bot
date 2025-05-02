declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    HEADLESS: "true" | "false";
    "2CAPTCHA_API_KEY": string;
    CHROMIUM_TMP_DIR: string;
  }
}
