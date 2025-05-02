import dotenv from "dotenv";
dotenv.config();

export const setupDotenv = () => {
  dotenv.config();

  if (!process.env.CHROMIUM_TMP_DIR) {
    throw new Error("CHROMIUM_TMP_DIR is not set in .env file");
  }

  if (!process.env["2CAPTCHA_API_KEY"]) {
    throw new Error("2CAPTCHA_API_KEY is not set in .env file");
  }
};
