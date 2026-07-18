# Miner

## Purpose

The **Miner** is responsible for acquiring raw data from the external **uma.moe API**.

It is the entry point of the UmaMoe data acquisition pipeline. The Miner retrieves information from the external source and passes the original acquired data to the Courier for transport through the internal architecture.

The Miner is an acquisition component only.

It must not process, analyze, validate, transform, or permanently store the data it retrieves.

---

# Implementation Authority

This document is the authoritative specification for the implementation of `miner.js`.

The implementation must follow the responsibilities, boundaries, inputs, outputs, and restrictions defined in this document.

If a behavior is not defined in this specification, the implementation must not invent additional responsibilities for the Miner.

---

# Responsibilities

The Miner is responsible for:

1. Connecting to the uma.moe API.
2. Requesting the required data from the API.
3. Receiving the raw API response.
4. Preserving the acquired data without business-logic transformation.
5. Returning or passing the acquired data to the Courier.
6. Handling communication failures according to the defined error-handling rules.

---

# Data Source

The Miner may acquire data only from the approved uma.moe API endpoints defined by the project.

The API endpoint configuration must not be scattered throughout the implementation.

API configuration should be centralized so that endpoints can be changed without rewriting the acquisition logic.

---

# Input

The Miner receives the information required to perform an acquisition request.

Depending on the endpoint, this may include:

* API endpoint.
* Request parameters.
* Query parameters.
* Request body.
* Authentication or API configuration if required.

The Miner must only accept the input required to perform the acquisition request.

---

# Output

The Miner outputs the data received from the uma.moe API.

The output must represent the acquired source data as closely as possible.

The Miner must not:

* Calculate values.
* Add business conclusions.
* Determine achievements.
* Determine milestones.
* Calculate fan gain.
* Reorganize data for presentation.
* Store data permanently.

The acquired result is passed to the Courier for the next stage of the data pipeline.

---

# Data Pipeline

```text
External uma.moe API
        │
        ▼
     Miner
        │
        ▼
   Raw Acquired Data
        │
        ▼
    Courier
```

The Miner is the first internal component in the acquisition pipeline.

---

# Data Integrity

The Miner must preserve the meaning of the source data.

It must not modify values for convenience or apply project-specific interpretations.

Examples of prohibited transformations include:

* Converting fan counts into fan gains.
* Calculating rankings.
* Determining achievement tiers.
* Determining milestone status.
* Renaming data fields for presentation.
* Combining multiple records into analytical summaries.

Any transformation required by the project belongs to a later department.

---

# Error Handling

The Miner must handle acquisition failures safely.

The implementation must:

1. Detect failed API requests.
2. Detect network or communication failures.
3. Detect invalid or unusable API responses.
4. Return or report the failure clearly.
5. Avoid passing unusable data to the Courier.

The Miner must not silently treat a failed request as successful.

The implementation must not invent replacement data when the API request fails.

---

# Retry Behavior

Retry behavior must be explicitly defined by the system configuration.

The Miner must not perform unlimited retries.

If retry logic is implemented, it must:

* Have a defined maximum retry count.
* Avoid infinite retry loops.
* Preserve the original failure information.
* Clearly report when all retry attempts fail.

---

# Separation of Responsibilities

The Miner must not perform responsibilities belonging to other departments.

## The Miner must not:

* Transport data through internal systems.
* Validate data quality.
* Store permanent data.
* Calculate statistics.
* Apply business logic.
* Generate reports.
* Create images.
* Create Discord embeds.
* Send Discord messages.
* Distribute products.

These responsibilities belong to other departments.

---

# Relationship with Courier

The Miner acquires data.

The Courier transports acquired data.

```text
Miner
  │
  │  Acquires
  ▼
Raw API Data
  │
  │  Transports
  ▼
Courier
```

The Miner must not assume the responsibilities of the Courier.

The Miner should provide the acquired result in a form that the Courier can receive and transport through the next stage of the architecture.

---

# Implementation Requirements for miner.js

The implementation of `miner.js` must:

* Use the project's approved HTTP/API communication method.
* Keep API configuration organized and maintainable.
* Expose a clear acquisition interface.
* Return acquired data or a clearly defined failure result.
* Avoid hidden side effects.
* Avoid permanent storage.
* Avoid business logic.
* Avoid presentation logic.
* Avoid Discord-specific logic.
* Avoid direct communication with downstream systems that do not belong to the Miner.

The implementation should be modular so that additional API acquisition operations can be added without rewriting the entire Miner.

---

# Expected Implementation Boundary

The expected responsibility of `miner.js` is:

```text
Request
   │
   ▼
uma.moe API
   │
   ▼
Receive Response
   │
   ▼
Handle Acquisition Failure
   │
   ▼
Return Raw Acquired Data
```

The implementation must stop at the acquisition boundary.

---

# Design Principle

> **The Miner retrieves what exists. It does not decide what the data means.**

The Miner is the extraction point of the UmaMoe architecture.

Its job is to acquire source information accurately and pass it into the next stage of the pipeline without adding business logic or taking responsibility for later processing.

---

# Implementation Rule

When creating or modifying `miner.js`, the implementation agent must:

1. Read this document completely.
2. Follow the responsibilities defined here.
3. Respect all prohibited responsibilities.
4. Preserve the boundaries between Miner and Courier.
5. Avoid inventing undefined behavior.
6. Ask for clarification when a required implementation detail is missing instead of silently creating unrelated functionality.

The resulting `miner.js` must be an implementation of this specification, not an independent redesign of the Miner architecture.
