@arey-pi @replace-me
Feature: Replace with capability name
  This feature is a canonical behaviour spec.
  It should describe externally observable behaviour,
  not implementation details.

  As a named actor or stakeholder
  I want a concrete capability
  So that a valuable outcome is achieved

  Rule: Replace with the business rule being protected

    Background:
      Given relevant starting context
      And any shared preconditions that every scenario needs

    @happy-path
    Scenario: Primary successful behaviour
      Given a meaningful initial state
      When the actor performs the behaviour
      Then the expected outcome is observable
      And important side effects are visible

    @validation @edge-case
    Scenario Outline: Important validation or boundary behaviour
      Given <precondition>
      When the actor performs the behaviour with <input>
      Then <outcome> is reported

      Examples:
        | precondition | input | outcome |
        | valid setup   | value | result  |

    @regression
    Scenario: Regression behaviour
      Given the historical failure condition
      When the triggering action occurs
      Then the regression is prevented
