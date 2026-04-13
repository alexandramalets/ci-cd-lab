Feature: Fitness calories calculation

  Scenario Outline: Calculate calories based on activity

    Given user with id <userId>
    When I request activity data
    Then I receive steps and pulse

    When I calculate calories with weight <weight>
    Then calories should be calculated correctly

  Examples:
    | userId | weight |
    | 1      | 70     |
    | 2      | 80     |
    | 3      | 60     |


  Scenario: Minimum weight validation

    When I calculate calories with weight 3
    Then I receive weight validation error