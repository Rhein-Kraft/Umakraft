# Depot

## Purpose

The **Depot** department is responsible for storing and retrieving finished products produced by the Refinery.

It serves as the temporary storage facility for compiled products, making them available for the next stage of the UmaKraft architecture.

The Depot does not create, modify, calculate, or distribute information. Its sole responsibility is to safely preserve completed products until they are requested.

## Responsibilities

* Store compiled products.
* Retrieve compiled products upon request.
* Update existing compiled products when necessary.
* Remove obsolete or expired products.
* Maintain the integrity of stored products.

## Does Not Do

The Depot department must **never**:

* Retrieve data from the uma.moe API.
* Calculate statistics or business logic.
* Compile products.
* Validate information.
* Distribute products.
* Send Discord messages or notifications.

These responsibilities belong to other departments within the project.

## Input

* Compiled products from the Compiler.

## Output

* Stored products ready for retrieval by downstream departments.

## Workflow

```text id="7gfz3v"
Compiler
    │
    ▼
  Depot
    │
    ▼
Next Architecture
```

## Design Principle

The Depot is the project's finished product repository.

Every product stored within the Depot has already been refined and compiled. The Depot preserves these products exactly as received, ensuring they remain consistent and ready for the next stage of the architecture.
