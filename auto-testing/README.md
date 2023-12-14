# Automation using Playwright Library with Cucumber JS

## Introduction

This project is an example of how to use Playwright library with Cucumber JS to automate web testing.

## Getting Started

1. Clone the repository
2. Install dependencies using `npm install`
3. Run tests using `npm test`
4. To view the report, use the command `npm run report`

## Project Structure

```
├── features
│   └── example.feature
├── pages
│   └── example.ts
├── cucumber.js
├── .env.example
├── package.json
├── README.md
└── setup
    └── hooks.ts
└── steps
    └── example.steps.ts
```

### Feature File

The `example.feature` file contains the feature and scenarios to be tested by using [gherkin](https://cucumber.io/docs/gherkin/reference/) syntax.

### Step defenitions

The `example.steps.js` file contains the handlers for the feature scenarios.

### Playwright configuration

The `setup/hooks` file contains the playwright configuration to work together with cucumber

### Cucumber configuration

The `cucumber.js` file contains the cucumber configuration.

### Environment variables

Copy `.env.example` to `.env` then adjust the environment variables as you wish.

### Page folder

The `example.ts` file contains the reusable functions for specific page.

# Tutorial

Open the following [file](./STEPS_TO_FOLLOW.md) to learn how to use this repository step by step.

# Publish report

To publish your report please go through this [article](https://cucumber.io/blog/open-source/cucumber-reports/).

Once you got the publish token, run the following command:

```
export CUCUMBER_PUBLISH_TOKEN=your-token
npm run test --publish
```

Your report will show up like so:

```
┌──────────────────────────────────────────────────────────────────────────┐
│ View your Cucumber Report at:                                            │
│ https://reports.cucumber.io/reports/9fd0de9a-1234-5dfc-937d-7b0211ab340d │
│                                                                          │
│ This report was published in collection "YOUR_COLLECTION"                │
└──────────────────────────────────────────────────────────────────────────┘
```

# Tips

- Asking AI to generate feature file and step file. Sample prompt:

  > Generate cucumber/gherkin feature file with scenario outline for login success with username "standard_user" and password "secret_sauce", login fail with username "fail" and password "fail"
  > credential.

- AI websites: [forefront](https://chat.forefront.ai/), [rix](https://hashnode.com/rix/general)

- Use tag when define the feature file, so you can run the specific feature by executing this command `npx cucumber-js -p test_runner --tags @your-tag`
- Run playwright command to generate code `npx playwright codegen --load-storage state.json https://www.saucedemo.com/inventory.html`
