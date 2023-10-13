import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import { Browser, BrowserContext, request, Request, BrowserContextOptions, Page, chromium } from "playwright";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { config } from "./config";

let page: Page;
let browser: Browser;
let context: BrowserContext;
let requestContext;

setDefaultTimeout(config.setDefaultTimeout);

BeforeAll(async () => {
  browser = await chromium.launch(config.playwrightLaunchOptions);
});

AfterAll(async () => {
  await browser.close();
});

// Create a fresh browser context for each test.
Before(async (scenario) => {
  requestContext = await request.newContext({ baseURL: config.baseUrl });

  const tags = scenario.pickle.tags.map((tag) => tag.name);
  const noneLoggedInTags = config.noneLoggedInTags;
  const hasNoneLoggeInTags = tags.some((item) => noneLoggedInTags.includes(item));

  const storageState = hasNoneLoggeInTags ? {} : { storageState: "state.json" };
  const contextOptions: BrowserContextOptions = {
    baseURL: config.baseUrl,
    ...storageState
  };
  context = await browser.newContext(contextOptions);

  page = await context.newPage();
  await page.setViewportSize(config.screen);
});

// close the page and context after each test.
After(async () => {
  await page.close();
  await context.close();
});

// After(async function (scenario) {
// if (scenario.result.status === Status.FAILED) {
//   var buffer = await global.page.screenshot({
//     path: `reports/${scenario.pickle.name}.png`,
//     fullPage: true,
//   });
//   this.attach(buffer, "image/png");
// }
// });

export { page, browser, context, requestContext };
