module.exports = {
  test_runner: `
      ./features/
      --require-module ts-node/register
      --format-options \'{"snippetInterface": "synchronous"}\'
      --require steps/**/*.steps.ts
      --format progress
      --format json:reports/cucumber_report.json
      --format html:./reports/cucumber_report.html
      --publish-quiet
      `,
};
