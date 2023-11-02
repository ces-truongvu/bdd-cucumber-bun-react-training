Feature: Update employee 

    @employee
    Scenario:  Update employee information
        Given I am a logged user
        When I update one of employee information in the system
        Then the their information should be updated successfully 