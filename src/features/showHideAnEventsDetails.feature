Feature: Show and hide an event's details.

  Scenario: An event is collapsed by default.
    Given the main page is displayed,
    When the user hasn't yet selected a specific event,
    Then a list of events is shown, where each event is described only briefly.

  Scenario: The user can expand an event to see its details.
    Given an event is diplayed,
    When the user clicks on the show button,
    Then the details for the event will be shown.

  Scenario: The user can collapse an event to hide its details.
    Given that the details of an event are shown,
    When the user clicks on a button to hide the details,
    Then the details are hidden again.