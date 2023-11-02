Feature: Login functionality

  Scenario Outline: Login with valid credentials
      Given I am on the login page
      When I enter a valid username and password 
      Then I should be redirected to the Home page

  Scenario Outline: Login with invalid credentials
      Given I am on the login page
      When I enter an invalid username and password
      Then I should see an error message "Unable to sign in"