# Validator

## Purpose

The **Validator** department is responsible for inspecting completed deliverables produced by the Fabricator.

It compares the completed deliverable against its product specification and verifies that the required structure, components, information, and presentation standards have been satisfied.

The Validator is the quality-control stage of the Workshop.

## Responsibilities

* Inspect completed deliverables.
* Compare deliverables against their specifications.
* Verify required components are present.
* Verify required information is included.
* Detect incomplete or malformed outputs.
* Detect structural inconsistencies.
* Confirm that the deliverable meets defined standards.
* Approve valid deliverables for the Terminal.
* Reject invalid deliverables for correction.

## Does Not Do

The Validator department must **never**:

* Retrieve data from external APIs.
* Perform business calculations.
* Create or modify compiled data products.
* Design product specifications.
* Manufacture deliverables.
* Distribute approved deliverables.

These responsibilities belong to other departments.

## Input

* Completed deliverables from the Fabricator.
* Product specifications from the Draftsman.

## Output

### Approved

A deliverable that satisfies all required standards and is ready for the Terminal.

### Rejected

A deliverable that does not satisfy the required standards and must be returned for correction.

## Workflow

```text id="5d7u6b"
Fabricator
    │
    ▼
Completed Deliverable
    │
    ▼
Validator
    │
    ├── Approved ──► Terminal
    │
    └── Rejected ─► Fabricator
```

## Design Principle

The Validator must remain independent from the Fabricator.

The Fabricator creates the deliverable. The Validator determines whether the deliverable satisfies the specification.

A deliverable must never be considered complete simply because the Fabricator successfully generated it. It is complete only after it has passed validation.
