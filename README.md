# UNICFCEAD Bot

This project is an automated captcha solver built using [Playwright](https://playwright.dev/) and the [2captcha](https://2captcha.com/) service. It demonstrates how to launch a Chromium browser instance, navigate to a page with a reCAPTCHA, and have it solved automatically using the 2captcha API.

## Features

- **Automated Browser Control:** Uses Playwright to control a Chromium instance.
- **Captcha Solving:** Integrates with 2captcha to solve Google reCAPTCHAs.
- **Stealth Mode:** Uses `puppeteer-extra-plugin-stealth` to bypass detection.
- **Environment Configuration:** Sensitive API keys and configuration are loaded via a `.env` file.

## Prerequisites

- [Node.js v22](https://nodejs.org/) installed on your system.
- A valid API key for [2captcha](https://2captcha.com/).

## Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd unicfcead-bot
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright Browsers**

   ```bash
   npx playwright install
   ```

4. **Create a `.env` File**

   In the project root, create a file named `.env` with the following content (replace the placeholder values accordingly):

   ```properties
   2CAPTCHA_API_KEY=YOUR_2CAPTCHA_API_KEY_HERE
   CHROMIUM_TMP_DIR=./chromium_tmp_dir
   ```

## Running the Project

Simply run the project with:

```bash
npm start
```

A Chromium browser will launch on your screen, navigate to the demo reCAPTCHA page, solve the captcha using the 2captcha service, fill the captcha response, and submit the form.

## How It Works

- **Playwright:** Manages the browser instance and interactions with the page.
- **2captcha:** Receives the captcha challenge and returns a solution which is then injected into the page.
- **Stealth Plugin:** Helps to avoid bot detection.

## Notes

- Make sure your `.env` file is configured with the correct values.
- The project uses `ts-node` with the `--transpile-only` flag, so type errors will be bypassed at runtime.
- This project is for educational purposes. Use it responsibly.

## License

ISC
