import { expect } from '@playwright/test'
import { page } from '../../setup/hooks'
import { Given, When, Then } from '@cucumber/cucumber'

const phoneNumber = '455-123-456-789'

Given('I am a logged user', async () => {
  await page.goto('/')

  // pick first element with class `.employee`
  const employee = await page.$('.employee')
  await employee.click()
  // await page.pause()
})

When('I update one of employee information in the system', async () => {
  await page.locator('input[type="text"]').nth(2).fill(phoneNumber)
  await page.locator('input[type="text"]').nth(2).press('Tab')
  await page.waitForResponse('/api/employees')
})

Then('the their information should be updated successfully', async () => {
  await page.reload()
  expect(await page.locator('input[type="text"]').nth(2).inputValue()).toEqual(phoneNumber)
})
