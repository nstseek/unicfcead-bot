import {
  axios2CaptchaInstance,
  TwoCaptchaResponse,
} from "./axios2CaptchaInstance";

export const checkAsyncRecaptchaSolvingResult = ({
  recaptchaSolvingId,
}: {
  recaptchaSolvingId: string;
}) => {
  return axios2CaptchaInstance.get<TwoCaptchaResponse>("/res.php", {
    params: {
      action: "get",
      id: recaptchaSolvingId,
    },
  });
};
