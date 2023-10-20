Feature: Login functionality

    @logout
    Scenario: Log out the system
        Given I am currently logged in 
        When I click the Log out button 
        Then I should be logged out the system successfully