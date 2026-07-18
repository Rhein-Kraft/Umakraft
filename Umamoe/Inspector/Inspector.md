# Inspector

## Purpose

The **Inspector** is responsible for examining data received from the Courier before it enters the Vault.

It checks whether the acquired data is structurally usable, complete enough for the system, and suitable for permanent storage.

The Inspector is a data examination and validation component.

It does not acquire data, transport data, modify data into a new form, or permanently store data.

---

# Implementation Authority

This document is the authoritative specification for the implementation of `inspector.js`.

The implementation must follow the responsibilities, boundaries, inputs, outputs, and restrictions defined in this document.

If a behavior is not defined in this specification, the implementation must not invent additional responsibilities for the Inspector.

---

# Responsibilities

The Inspector is responsible for:

1. Receiving transported data from the Courier.
2. Examining the structure of the received data.
3. Checking whether required information is present.
4. Detecting malformed or unusable data.
5. Detecting invalid API responses.
6. Determining whether the data is acceptable for storage.
7. Rejecting data that fails inspection.
8. Passing accepted data to the Vault.
9. Reporting inspection results clearly.

---

# Input

The Inspector receives transported data from the Courier.

The input may include:

* API response data.
* Data structure information.
* Acquisition metadata.
* Transport metadata.
* Error information related to the acquisition process.

The Inspector must examine the data it receives without assuming that all received data is valid.

---

# Inspection Categories

The Inspector should examine data using clearly defined inspection categories.

## 1. Existence

Determine whether the expected data exists.

Examples:

* Response is not empty.
* Expected primary object exists.
* Expected collection exists when required.

---

## 2. Structure

Determine whether the data has the expected structure.

Examples:

* Expected object is an object.
* Expected list is an array.
* Required fields exist.
* Required nested structures are available.

---

## 3. Completeness

Determine whether the required information is present.

The Inspector must identify missing information required by the system.

It must not silently treat incomplete data as complete.

---

## 4. Type Integrity

Determine whether values have usable data types.

Examples:

* A fan count expected to be numeric is not a string containing invalid text.
* An identifier expected to be a string is not an unusable object.
* A collection expected to be an array is not a malformed value.

---

## 5. Response Integrity

Determine whether the received response represents a usable API result.

The Inspector must detect conditions such as:

* Failed API responses.
* Error responses.
* Unexpected response structures.
* Empty responses where data is required.
* Malformed data.

---

# Data Modification

The Inspector should not modify the original data during inspection.

Inspection should produce a result describing whether the data is acceptable.

The implementation may create inspection metadata, such as:

```text id="z0l1q6"
Inspection Result
├── Accepted
├── Rejected
└── Reason
```

However, the original acquired data must remain unchanged.

---

# Output

The Inspector produces an inspection result.

## Accepted Data

If the data passes inspection:

```text id="88m65x"
Courier
    │
    ▼
Inspector
    │
    ├── Inspection: Accepted
    │
    ▼
Vault
```

The accepted data is passed to the Vault for storage.

---

## Rejected Data

If the data fails inspection:

```text id="g7v3z5"
Courier
    │
    ▼
Inspector
    │
    ├── Inspection: Rejected
    │
    ▼
Failure Report
```

Rejected data must not be stored in the Vault as trusted data.

The rejection result must clearly identify the reason for rejection.

---

# Validation Boundary

The Inspector is responsible for determining whether data is structurally and technically acceptable.

The Inspector must not perform business calculations or interpret the meaning of the data.

For example, the Inspector may determine:

> `fans` is missing.

But it must not determine:

> This trainer qualifies for the 50 million fan achievement.

The second responsibility belongs to the Refinery.

---

# Separation of Responsibilities

The Inspector must not perform responsibilities belonging to other departments.

## The Inspector must not:

* Request data from the uma.moe API.
* Acquire external data.
* Transport data.
* Calculate fan gains.
* Calculate rankings.
* Determine achievements.
* Determine milestones.
* Apply business logic.
* Generate reports.
* Create images.
* Create Discord embeds.
* Distribute products.
* Permanently store accepted data.

These responsibilities belong to other departments.

---

# Relationship with Courier

The Courier transports data.

The Inspector examines the transported data.

```text id="x4u6j9"
Miner
    │
    ▼
Courier
    │
    ▼
Inspector
```

The Inspector must not assume that transported data is automatically valid.

The Courier guarantees transportation.

The Inspector determines whether the transported data is acceptable.

---

# Relationship with Vault

The Inspector is the final gate before data enters the Vault.

```text id="2r9eqp"
Inspector
    │
    ├── Rejected
    │      │
    │      ▼
    │   Rejection
    │
    └── Accepted
           │
           ▼
         Vault
```

Only data that successfully passes inspection may be sent to the Vault.

---

# Implementation Requirements for inspector.js

The implementation of `inspector.js` must:

* Provide a clear inspection interface.
* Receive data from the Courier.
* Check required structures and values.
* Detect malformed data.
* Detect incomplete data.
* Produce a clear accepted or rejected result.
* Provide rejection reasons.
* Avoid modifying the original acquired data.
* Avoid permanent storage.
* Avoid business calculations.
* Avoid achievement logic.
* Avoid milestone logic.
* Avoid presentation logic.
* Avoid Discord-specific logic.

The implementation should allow inspection rules to be expanded as the project's data requirements evolve.

---

# Expected Implementation Boundary

The expected responsibility of `inspector.js` is:

```text id="w6q89r"
Receive Data
     │
     ▼
Examine Data
     │
     ▼
Determine Inspection Result
     │
     ├── Rejected
     │
     └── Accepted
             │
             ▼
           Vault
```

The implementation must stop at the inspection boundary.

The Vault is responsible for storing accepted data.

---

# Design Principle

> **The Inspector determines whether data is fit to be trusted.**

The Inspector is the gatekeeper between external information and the trusted internal data stored by UmaKraft.

It does not decide what the data means.

It decides whether the data is structurally reliable enough to be preserved and processed by the next stage of the architecture.

---

# Implementation Rule

When creating or modifying `inspector.js`, the implementation agent must:

1. Read this document completely.
2. Follow the responsibilities defined here.
3. Respect all prohibited responsibilities.
4. Preserve the boundaries between Courier, Inspector, and Vault.
5. Avoid inventing undefined business logic.
6. Ask for clarification when a required inspection rule is missing instead of silently creating unrelated validation behavior.

The resulting `inspector.js` must be an implementation of this specification, not an independent redesign of the Inspector architecture.
