import { expect } from '@playwright/test'
import { page } from '../../setup/hooks'
import { Given, When, Then } from '@cucumber/cucumber'

Given('I am currently logged in', async function () {
  await page.goto('/')
})

When('I click the Log out button', async function () {
  await page.getByRole('button', { name: 'logout' }).click()
})

Then('I should be logged out the system successfully', async function () {
  expect(await page.getByRole('heading', { name: 'Sign in' })).toBeTruthy()
})
