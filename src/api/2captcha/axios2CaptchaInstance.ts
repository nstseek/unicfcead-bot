import axios from "axios";

export type TwoCaptchaResponse = {
  status: string;
  result: string;
};

export const axios2CaptchaInstance = axios.create<TwoCaptchaResponse>({
  baseURL: "https://2captcha.com",
});

axios2CaptchaInstance.interceptors.request.use((config) => {
  const apiKey = process.env["2CAPTCHA_API_KEY"];

  if (!apiKey) {
    throw new Error("2CAPTCHA_API_KEY is not set in .env file");
  }

  config.params = {
    ...(config.params || {}),
    key: apiKey,
  };

  return config;
});

axios2CaptchaInstance.interceptors.response.use((response) => {
  if (typeof response.data === "string") {
    const [status, result] = response.data.split("|");

    const parsed: TwoCaptchaResponse = {
      status,
      result,
    };

    response.data = parsed;
  }

  return response;
});
