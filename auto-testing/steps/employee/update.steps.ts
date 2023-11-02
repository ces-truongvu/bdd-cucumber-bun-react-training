import { expect } from '@playwright/test'
import { page } from '../../setup/hooks'
import { Given, When, Then } from '@cucumber/cucumber'

Given('I am a logged user', async () => {
  await page.goto('/')

  // pick first element with class `.employee`
  const employee = await page.$('.employee')
  await employee.click()
  // await page.pause()
})

When('I update one of employee information in the system', async () => {
  await page.locator('input[type="text"]').nth(2).fill('111-222-333-444')
  await page.locator('input[type="text"]').nth(2).press('Tab')
})

Then('the their information should be updated successfully', async () => {
  await page.reload()
  expect(await page.locator('input[type="text"]').nth(2).inputValue()).toEqual('111-222-333-444')
})
