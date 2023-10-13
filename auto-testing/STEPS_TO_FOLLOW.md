# Here are steps to follow

## Open AI website

- [rix](https://hashnode.com/rix/general) or [forefront](https://chat.forefront.ai/)

- Paste the following prompt to ask it for generate feature file
  > Generate cucumber/gherkin feature file with scenario outline for login success with username "standard_user" and password "secret_sauce", login fail with username "fail"  and password "fail" credential.

- Sample response from AI

```feature
Feature: Login Functionality

  Scenario Outline: Login with valid and invalid credentials
    Given I am on the login page
    When I enter "<username>" as the username
    And I enter "<password>" as the password
    And I click the login button
    Then I should see "<expected_result>"

    Examples:
      | username        | password       | expected_result          |
      | standard_user   | secret_sauce   | logged in successfully   |
      | fail            | fail           | error message            |

```

## Tagging your scenario.

Putting @sample-tag before each scenario. For instance: @login for the file above

```feature
Feature: Login Functionality

  @login
  Scenario Outline: Login with valid and invalid credentials
    Given I am on the login page
    When I enter "<username>" as the username
    And I enter "<password>" as the password
    And I click the login button
    Then I should see "<expected_result>"

    Examples:
      | username        | password       | expected_result          |
      | standard_user   | secret_sauce   | logged in successfully   |
      | fail            | fail           | error message            |
```

Then create new file in `features` folder.

## Generate steps definition

Run the following command `npx cucumber-js -p test_runner --tags @login`

Here is the output:

```sh
Failures:

1) Scenario: Login with valid and invalid credentials # features/test.feature:13
   ✔ Before # setup/hooks.ts:30
   ? Given I am on the login page
       Undefined. Implement with the following snippet:

         Given('I am on the login page', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? When I enter "standard_user" as the username
       Undefined. Implement with the following snippet:

         When('I enter {string} as the username', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? And I enter "secret_sauce" as the password
       Undefined. Implement with the following snippet:

         When('I enter {string} as the password', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? And I click the login button
       Undefined. Implement with the following snippet:

         When('I click the login button', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Then I should see "logged in successfully"
       Undefined. Implement with the following snippet:

         Then('I should see {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ✔ After # steps/cart/add-to-cart.steps.ts:24
   ✔ After # setup/hooks.ts:38

2) Scenario: Login with valid and invalid credentials # features/test.feature:14
   ✔ Before # setup/hooks.ts:30
   ? Given I am on the login page
       Undefined. Implement with the following snippet:

         Given('I am on the login page', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? When I enter "fail" as the username
       Undefined. Implement with the following snippet:

         When('I enter {string} as the username', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? And I enter "fail" as the password
       Undefined. Implement with the following snippet:

         When('I enter {string} as the password', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? And I click the login button
       Undefined. Implement with the following snippet:

         When('I click the login button', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Then I should see "error message"
       Undefined. Implement with the following snippet:

         Then('I should see {string}', function (string) {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ✔ After # steps/cart/add-to-cart.steps.ts:24
   ✔ After # setup/hooks.ts:38

2 scenarios (2 undefined)
10 steps (10 undefined)
```

## Using AI to generate step definition file

Copy the output of the previous step and ask AI to generate Typescipt file

Here is example:

```
Failures:

# Content above

2 scenarios (2 undefined)
10 steps (10 undefined)

---

Generate steps definition for cucumber-js using @playwright expectation
```

The last sentence is asking AI to generate Typescript file. Here is example of what I got.

```ts
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("I am on the login page", async function () {
  // Navigate to the login page
  return "pending";
});

When("I enter {string} as the username", async function (username: string) {
  // Enter the username
  return "pending";
});

When("I enter {string} as the password", async function (password: string) {
  // Enter the password
  return "pending";
});

When("I click the login button", async function () {
  // Click the login button
  return "pending";
});

Then("I should see {string}", async function (expectedText: string) {

  // Compare the actual and expected text
  // expect(actualText).toContain(expectedText);

  return "pending";
});
```

Copy this content into a new file says `steps/login.steps.ts`.

## Validate the generated steps definition

Run the following command once again `npx cucumber-js -p test_runner --tags @login`

Get the output like so is our expectation:

```sh
Warnings:

1) Scenario: Login with valid and invalid credentials # features/test.feature:13
   ✔ Before # setup/hooks.ts:30
   ? Given I am on the login page # steps/test.steps.ts:4
       Pending
   - When I enter "standard_user" as the username # steps/test.steps.ts:8
   - And I enter "secret_sauce" as the password # steps/test.steps.ts:12
   - And I click the login button # steps/test.steps.ts:16
   - Then I should see "logged in successfully" # steps/test.steps.ts:20
   ✔ After # steps/cart/add-to-cart.steps.ts:24
   ✔ After # setup/hooks.ts:38

2) Scenario: Login with valid and invalid credentials # features/test.feature:14
   ✔ Before # setup/hooks.ts:30
   ? Given I am on the login page # steps/test.steps.ts:4
       Pending
   - When I enter "fail" as the username # steps/test.steps.ts:8
   - And I enter "fail" as the password # steps/test.steps.ts:12
   - And I click the login button # steps/test.steps.ts:16
   - Then I should see "error message" # steps/test.steps.ts:20
   ✔ After # steps/cart/add-to-cart.steps.ts:24
   ✔ After # setup/hooks.ts:38

2 scenarios (2 pending)
10 steps (2 pending, 8 skipped)
0m00.568s (executing steps: 0m00.203s)
```

Please pay attention to the summary at the end of the output. It should not have `undefined`.
Take a look carefully before and after creating Typescript file, you will see the different.

# Use Playwright to fill in the steps definition

Run the following command to record by using Playwright:

```sh
npx playwright codegen --load-storage state.json https://www.saucedemo.com
```

Then, copy the generated code to fill in these functions in Typescript file.

# Things need to focus

- Automation test is just focus on main business, DO NOT overengineering.

- `Then` function is actual test. You HAVE to define the expectation here.

