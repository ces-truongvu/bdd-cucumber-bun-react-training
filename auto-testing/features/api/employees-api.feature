Feature: Get All Employees

  @api @employee
  Scenario Outline: Get all employees
    When a GET request is made to the endpoint "/employees"
    Then the response status code should be 200
    And the response body should contain a list of employee properties:
      | properties |  
      | id         | 
      | name       | 
      | title      |
      | image      | 