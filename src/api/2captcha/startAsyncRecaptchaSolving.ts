import {
  axios2CaptchaInstance,
  TwoCaptchaResponse,
} from "./axios2CaptchaInstance";

export const startAsyncRecaptchaSolving = ({
  googleRecaptchaKey,
  pageUrl,
}: {
  googleRecaptchaKey: string;
  pageUrl: string;
}) => {
  return axios2CaptchaInstance.post<TwoCaptchaResponse>("/in.php", null, {
    params: {
      method: "userrecaptcha",
      googlekey: googleRecaptchaKey,
      pageurl: pageUrl,
    },
  });
};
