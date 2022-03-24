---
title: Diagrams
description: This Markdown cheat sheet provides a quick overview of Diagrams based on Mermaid.js a very popular and flexible solution for drawing diagrams.
tags: [markdown-cheatsheet, mkdocs, diagram, mermaid]
---

# Mermaid Diagrams

Diagrams help to communicate complex relationships and interconnections between
different technical components, and are a great addition to project
documentation. Material for MkDocs integrates with [Mermaid.js][mermaid.js-url]{target=\_blank}, a very
popular and flexible solution for drawing diagrams.

## Usage

### Using Flowcharts

[Flowcharts][flowcharts-url]{target=\_blank} are diagrams that represent workflows or processes. The steps
are rendered as nodes of various kinds and are connected by edges, describing
the necessary order of steps:

````markdown title="Flow chart"
```mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```
````

_Result:_

```mermaid
graph LR
  A[Start] --> B{Error?};
  B -->|Yes| C[Hmm...];
  C --> D[Debug];
  D --> B;
  B ---->|No| E[Yay!];
```

### Using Sequence Diagrams

[Sequence diagrams][sequence-diagrams-url]{target=\_blank} describe a specific scenario as sequential interactions
between multiple objects or actors, including the messages that are exchanged
between those actors:

````markdown title="Sequence diagram"
```mermaid
sequenceDiagram
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
```
````

_Result:_

```mermaid
sequenceDiagram
  Alice->>John: Hello John, how are you?
  loop Healthcheck
      John->>John: Fight against hypochondria
  end
  Note right of John: Rational thoughts!
  John-->>Alice: Great!
  John->>Bob: How about you?
  Bob-->>John: Jolly good!
```

### Using State Diagrams

[State diagrams][state-diagrams-url]{target=\_blank} are a great tool to describe the behavior of a system,
decomposing it into a finite number of states, and transitions between those
states:

````markdown title="State diagram"
```mermaid
stateDiagram-v2
  state fork_state <<fork>>
    [*] --> fork_state
    fork_state --> State2
    fork_state --> State3

    state join_state <<join>>
    State2 --> join_state
    State3 --> join_state
    join_state --> State4
    State4 --> [*]
```
````

_Result:_

```mermaid
stateDiagram-v2
  state fork_state <<fork>>
    [*] --> fork_state
    fork_state --> State2
    fork_state --> State3

    state join_state <<join>>
    State2 --> join_state
    State3 --> join_state
    join_state --> State4
    State4 --> [*]
```

### Using Class Diagrams

[Class diagrams][class-diagrams-url]{target=\_blank} are central to object oriented programing, describing the
structure of a system by modelling entities as classes and relationships between
them:

````markdown title="Class diagram"
```mermaid
classDiagram
  Person <|-- Student
  Person <|-- Professor
  Person : +String name
  Person : +String phoneNumber
  Person : +String emailAddress
  Person: +purchaseParkingPass()
  Address "1" <-- "0..1" Person:lives at
  class Student{
    +int studentNumber
    +int averageMark
    +isEligibleToEnrol()
    +getSeminarsTaken()
  }
  class Professor{
    +int salary
  }
  class Address{
    +String street
    +String city
    +String state
    +int postalCode
    +String country
    -validate()
    +outputAsLabel()
  }
```
````

_Result:_

```mermaid
classDiagram
  Person <|-- Student
  Person <|-- Professor
  Person : +String name
  Person : +String phoneNumber
  Person : +String emailAddress
  Person: +purchaseParkingPass()
  Address "1" <-- "0..1" Person:lives at
  class Student{
    +int studentNumber
    +int averageMark
    +isEligibleToEnrol()
    +getSeminarsTaken()
  }
  class Professor{
    +int salary
  }
  class Address{
    +String street
    +String city
    +String state
    +int postalCode
    +String country
    -validate()
    +outputAsLabel()
  }
```

### Using Entity-Relationship Diagrams

An [entity-relationship diagram][entity-relationship-diagram-url]{target=\_blank} is composed of entity types and specifies
relationships that exist between entities. It describes inter-related things in
a specific domain of knowledge:

````markdown title="Entity-relationship diagram"
```mermaid
erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```
````

_Result:_

```mermaid
erDiagram
  CUSTOMER ||--o{ ORDER : places
  ORDER ||--|{ LINE-ITEM : contains
  CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```

<!-- appendices -->

[mermaid.js-url]: https://mermaid-js.github.io/mermaid/ 'Mermaid.js'
[flowcharts-url]: https://mermaid-js.github.io/mermaid/#/flowchart 'Mermaid.js Flowcharts'
[sequence-diagrams-url]: https://mermaid-js.github.io/mermaid/#/sequenceDiagram 'Mermaid.js Sequence Diagrams'
[state-diagrams-url]: https://mermaid-js.github.io/mermaid/#/stateDiagram 'Mermaid.js State Diagrams'
[class-diagrams-url]: https://mermaid-js.github.io/mermaid/#/classDiagram 'Mermaid.js Class Diagrams'
[entity-relationship-diagram-url]: https://mermaid-js.github.io/mermaid/#/entityRelationshipDiagram 'Mermaid.js Entity-Relationship Diagrams'

<!-- end appendices -->
