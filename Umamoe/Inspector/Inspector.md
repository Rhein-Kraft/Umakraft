# Inspector

## Purpose

The **Inspector** department is responsible for examining all incoming information before it is accepted by the system.

Its primary duty is to verify that the received data is complete, valid, and suitable for further processing. Any information that fails inspection should be rejected or reported according to project rules.

Inspector serves as the quality assurance department of the UmaMoe architecture.

## Responsibilities

* Verify the integrity of incoming data.
* Check that required fields exist.
* Validate data types and formats.
* Detect missing or invalid information.
* Approve or reject incoming data.

## Does Not Do

The Inspector department must **never**:

* Request data from the API.
* Transport data between departments.
* Modify data to change its meaning.
* Store data.
* Calculate statistics.
* Execute Discord-related actions.

## Input

* Data received from the Courier department.

## Output

* Validated data approved for storage.
* Validation results or error reports when inspection fails.

## Workflow

```text
Courier
   │
   ▼
Inspector
   │
   ▼
Vault
```

## Design Principle

Inspector protects the integrity of the system.

Nothing should enter the Vault unless it has successfully passed inspection.
