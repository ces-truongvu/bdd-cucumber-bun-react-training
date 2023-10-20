import { expect, Response } from '@playwright/test'
import { requestContext } from '../setup/api'
import { page } from '../setup/hooks'
import { Given, When, Then } from '@cucumber/cucumber'

let response: Response

// Given('I am on the login endpoint and enter the PIN number {int}', async function (int) {
//     response = await requestContext.post(`/users/sign-in`, {
//         data: {
//           pin: int,
//         }
//     });
// });

// Then('the result should be as {string}', async function (string) {
//     const res = await response.json();
//     expect(res).toEqual({ message: string });
// });

Given('I am on the login page', async function () {
  await page.goto('http://localhost:5173/login')
})

When('I enter a valid username and password', async function () {
  await page.getByLabel('Username *').fill('ces-user')
  await page.getByLabel('Password *').fill('blueJeanWhiteTshirt')
})

Then('I should be redirected to the Home page', async function () {
  await page.getByRole('button', { name: 'Sign In' }).click()

  // create state.json file
  await page.context().storageState({
    path: 'state.json'
  })

  expect(page.getByRole('button', { name: 'Welcome! ces-user' })).toBeTruthy()
})

When('I enter an invalid username and password', async function () {
  await page.getByLabel('Username *').fill('wrong-username')
  await page.getByLabel('Password *').fill('wrong-pass')
})

Then('I should see an error message {string}', async function (string) {
  await page.getByRole('button', { name: 'Sign In' }).click()
  expect(await page.getByText(string)).toBeTruthy()
})
