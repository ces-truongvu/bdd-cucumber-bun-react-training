import { expect, Response } from '@playwright/test'
import { requestContext } from '../setup/api'
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

Given('I am on the login page', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

When('I enter a valid username {string} and password {string}', function (string, string2) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

Then('I should be redirected to the Home page', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

When('I enter an invalid username and password', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

Then('I should see an error message {string}', function (string) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})
