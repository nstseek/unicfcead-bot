import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { startAsyncRecaptchaSolving } from "../api/2captcha/startAsyncRecaptchaSolving";
import { checkAsyncRecaptchaSolvingResult } from "../api/2captcha/checkAsyncRecaptchaSolvingResult";

chromium.use(StealthPlugin());

const { CHROMIUM_TMP_DIR } = process.env;

const PAGE_URL = "https://www.google.com/recaptcha/api2/demo";

export const executeRecaptchaTest = async () => {
  const browser = await chromium.launchPersistentContext(CHROMIUM_TMP_DIR, {
    headless: false,
    timeout: 0,
  });
  const page = browser.pages()[0] || (await browser.newPage());

  await page.goto(PAGE_URL);

  const recaptchaDiv = await page.$("[data-sitekey]");
  if (!recaptchaDiv) {
    throw new Error("Recaptcha div not found");
  }

  const dataSitekey = await recaptchaDiv.getAttribute("data-sitekey");
  if (!dataSitekey) {
    throw new Error("data-sitekey attribute not found");
  }

  const recaptchaTextarea = await page.$("textarea#g-recaptcha-response");
  if (!recaptchaTextarea) {
    throw new Error("Recaptcha textarea not found");
  }

  const recaptchaSolvingIdResponse = await startAsyncRecaptchaSolving({
    googleRecaptchaKey: dataSitekey,
    pageUrl: PAGE_URL,
  });
  if (!recaptchaSolvingIdResponse.data.result) {
    throw new Error("Recaptcha solving ID not found in response");
  }

  let checkStatusRetriesCount = 0;

  const intervalId = setInterval(async () => {
    const recaptchaResponse = await checkAsyncRecaptchaSolvingResult({
      recaptchaSolvingId: recaptchaSolvingIdResponse.data.result,
    });
    checkStatusRetriesCount++;

    if (recaptchaResponse.data.result) {
      clearInterval(intervalId);
      console.log(
        checkStatusRetriesCount,
        "Recaptcha result found:",
        recaptchaResponse.data
      );

      await page.evaluate((recaptchaResult) => {
        const recaptchaTextarea = document.querySelector(
          "textarea#g-recaptcha-response"
        ) as HTMLTextAreaElement;

        if (!recaptchaTextarea) {
          throw new Error(
            "Recaptcha textarea not found when filling it with result"
          );
        }
        if (!recaptchaResult) {
          throw new Error("Recaptcha result is undefined when filling it");
        }

        recaptchaTextarea.value = recaptchaResult;
      }, recaptchaResponse.data.result);

      await page.getByRole("button", { name: "Submit" }).click();
    } else {
      console.log(
        checkStatusRetriesCount,
        "Recaptcha result not found in response - trying again in a few seconds...",
        recaptchaResponse.data
      );
    }
  }, 10000);
};
