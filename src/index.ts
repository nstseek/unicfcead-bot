import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { setupDotenv } from "./setup/dotenv";
import { setupChromiumTempDir } from "./setup/chromium-temp-dir";
import { executeRecaptchaTest } from "./tasks/testRecaptcha.task";

setupDotenv();
setupChromiumTempDir();

chromium.use(StealthPlugin());

executeRecaptchaTest();
