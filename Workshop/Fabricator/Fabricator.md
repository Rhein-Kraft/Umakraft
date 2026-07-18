# Fabricator

## Purpose

The **Fabricator** department is responsible for manufacturing final deliverables according to the specifications defined by the Draftsman.

It retrieves the required compiled products from the Depot, follows the appropriate product specification, and constructs the completed deliverable.

The Fabricator transforms structured data products into usable outputs.

## Responsibilities

* Retrieve required products from the Depot.
* Read and follow product specifications.
* Assemble required components.
* Populate templates with compiled information.
* Construct final deliverables.
* Generate image reports.
* Generate Discord embeds.
* Generate other supported output formats.
* Produce outputs that are ready for validation.

## Does Not Do

The Fabricator department must **never**:

* Retrieve data from external APIs.
* Perform business calculations.
* Determine achievements or rankings.
* Compile raw information into data products.
* Create or modify product specifications.
* Approve its own completed work.
* Distribute deliverables to external destinations.

These responsibilities belong to other departments.

## Input

* Compiled products from the Depot.
* Product specifications from the Draftsman.

## Output

* Newly fabricated deliverables ready for validation.

## Workflow

```text id="m0h9ef"
Depot
   │
   ├──────────────► Compiled Product
   │
Draftsman
   │
   └──────────────► Product Specification
          │
          ▼
      Fabricator
          │
          ▼
  Unvalidated Deliverable
          │
          ▼
      Validator
```

## Design Principle

The Fabricator builds according to specification.

It does not decide what a product should contain, calculate the information inside it, or determine whether the completed product meets the required standard.

Its responsibility is to transform the required compiled product and its specification into a complete deliverable.
