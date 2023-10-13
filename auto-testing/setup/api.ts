import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import { request } from "playwright";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { config } from "./config";

let requestContext;

setDefaultTimeout(config.setDefaultTimeout);

Before(async () => {
    requestContext = await request.newContext({ baseURL: config.baseUrl, extraHTTPHeaders: {
        'ContentType': 'application/json'
    } });
});

export { requestContext };
