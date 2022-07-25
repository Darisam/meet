Feature: Change the number of events shown.

  Scenario: 32 events are shown by default.
    Given a list of events is shown,
    When the user hasn't changed anything,
    Then at most 32 events will be displayed at once.

  Scenario: The user can change the number of events shown.
    Given a list of events is shown,
    When the user changes the number in a field specifying the number of events shown,
    Then up to the new number of events will be shown at once.