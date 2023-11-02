import { expect, Response } from '@playwright/test'
import { requestContext } from '../../setup/api'
import { Given, When, Then } from '@cucumber/cucumber'

let response: Response

When('a GET request is made to the endpoint {string}', async function (string) {
  response = await requestContext.get(`/api${string}`)
})

Then('the response status code should be {int}', async function (int) {
  expect(response.status()).toBe(int)
})

Then('the response body should contain a list of employee properties:', async function (dataTable) {
  const { data } = await response.json()
  const [first] = data

  // return [ 'id', 'name', 'title', 'image' ]
  const properties = dataTable.hashes().map((row) => {
    return row.properties
  })

  expect(data.length).toBeGreaterThan(1)
  properties.map((property) => {
    expect(first).toHaveProperty(property)
  })
})
