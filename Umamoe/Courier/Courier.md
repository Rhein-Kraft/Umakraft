# Courier

## Purpose

The **Courier** is responsible for transporting acquired data from the Miner to the next stage of the UmaMoe data acquisition pipeline.

The Courier receives data acquired by the Miner and delivers it to the Inspector.

The Courier is a transport component only.

It must not acquire data from external APIs, analyze data, validate data quality, or permanently store data.

---

# Implementation Authority

This document is the authoritative specification for the implementation of `courier.js`.

The implementation must follow the responsibilities, boundaries, inputs, outputs, and restrictions defined in this document.

If a behavior is not defined in this specification, the implementation must not invent additional responsibilities for the Courier.

---

# Responsibilities

The Courier is responsible for:

1. Receiving acquired data from the Miner.
2. Maintaining the data during internal transport.
3. Delivering the data to the Inspector.
4. Preserving the data during transportation.
5. Reporting transport failures clearly.

The Courier exists to create a clear separation between:

```text
Acquisition
    │
    ▼
Miner
    │
    ▼
Transport
    │
    ▼
Courier
    │
    ▼
Inspector
```

---

# Input

The Courier receives acquired data from the Miner.

The input may include:

* Raw API response data.
* Acquisition metadata required for transport.
* Request context required by the next stage.
* Error information when acquisition was unsuccessful.

The Courier must only receive data that has been produced by the Miner or an approved upstream acquisition component.

---

# Output

The Courier delivers the received data to the Inspector.

The Courier must preserve the meaning and content of the data during transport.

The Courier must not:

* Calculate values.
* Analyze data.
* Validate business rules.
* Determine whether data is correct.
* Store permanent records.
* Generate reports.
* Create images.
* Send Discord messages.

Its output is the transported data delivered to the Inspector.

---

# Data Pipeline

```text
Miner
   │
   ▼
Acquired Data
   │
   ▼
Courier
   │
   ▼
Transported Data
   │
   ▼
Inspector
```

The Courier is the transport boundary between acquisition and inspection.

---

# Data Integrity

The Courier must preserve the data it receives.

Unless explicitly required by the transport mechanism, the Courier must not:

* Change values.
* Rename fields.
* Remove fields.
* Add calculated fields.
* Reinterpret information.
* Reorganize data for business purposes.

Transport must not change the meaning of the data.

If the Courier must serialize or deserialize data for transportation, the result must preserve the original information.

---

# Transport Behavior

The Courier must provide a predictable method for moving data between the Miner and Inspector.

The transport implementation may use an appropriate internal mechanism such as:

* Function calls.
* Internal modules.
* Events.
* Queues.
* Controlled data channels.

The selected mechanism must follow the project's architecture and must not introduce responsibilities belonging to other departments.

---

# Error Handling

The Courier must handle transport failures safely.

The implementation must:

1. Detect when data cannot be received from the Miner.
2. Detect when data cannot be delivered to the Inspector.
3. Avoid silently losing data.
4. Report transport failures clearly.
5. Preserve the original failure information where possible.

The Courier must not pretend that data was successfully delivered when the transport operation failed.

---

# Invalid Input

The Courier must not silently transport unusable input.

If the received input is:

* Missing.
* Unavailable.
* Unusable for transport.
* Structurally impossible to pass to the next stage.

The Courier must clearly report the failure and prevent the invalid transport operation from being treated as successful.

The Courier must not perform full data validation.

Data quality inspection belongs to the Inspector.

---

# Separation of Responsibilities

The Courier must not perform responsibilities belonging to other departments.

## The Courier must not:

* Request data from the uma.moe API.
* Perform external data acquisition.
* Calculate statistics.
* Apply business logic.
* Determine achievements.
* Determine milestones.
* Validate data accuracy.
* Permanently store data.
* Generate reports.
* Create images.
* Create Discord embeds.
* Distribute final products.

These responsibilities belong to other departments.

---

# Relationship with Miner

The Miner acquires data.

The Courier transports data.

```text
Miner
  │
  │ Acquires
  ▼
Raw Data
  │
  │ Transports
  ▼
Courier
  │
  │ Delivers
  ▼
Inspector
```

The Miner must not be responsible for internal transportation.

The Courier must not be responsible for external acquisition.

---

# Relationship with Inspector

The Courier delivers data to the Inspector but does not determine whether the data is trustworthy.

The Inspector is responsible for examining the received data.

```text
Courier
    │
    ▼
Received Data
    │
    ▼
Inspector
    │
    ├── Accepted
    │
    └── Rejected
```

The Courier's responsibility ends when the data has been successfully delivered to the Inspector.

---

# Implementation Requirements for courier.js

The implementation of `courier.js` must:

* Provide a clear transport interface.
* Receive data from the Miner.
* Deliver data to the Inspector.
* Preserve the data during transportation.
* Clearly report transport failures.
* Avoid permanent storage.
* Avoid business logic.
* Avoid data analysis.
* Avoid validation logic.
* Avoid presentation logic.
* Avoid Discord-specific logic.
* Avoid direct communication with unrelated systems.

The implementation should be modular so that the internal transport mechanism can evolve without changing the responsibilities of the Miner or Inspector.

---

# Expected Implementation Boundary

The expected responsibility of `courier.js` is:

```text
Receive Data
     │
     ▼
Transport Data
     │
     ▼
Deliver Data
     │
     ▼
Report Transport Result
```

The implementation must stop at the transportation boundary.

---

# Design Principle

> **The Courier moves data. It does not acquire, interpret, or judge data.**

The Courier exists to ensure that information acquired by the Miner reaches the Inspector without being lost, silently altered, or mixed with responsibilities belonging to other departments.

---

# Implementation Rule

When creating or modifying `courier.js`, the implementation agent must:

1. Read this document completely.
2. Follow the responsibilities defined here.
3. Respect all prohibited responsibilities.
4. Preserve the boundary between Miner, Courier, and Inspector.
5. Avoid inventing undefined behavior.
6. Ask for clarification when a required implementation detail is missing instead of silently creating unrelated functionality.

The resulting `courier.js` must be an implementation of this specification, not an independent redesign of the Courier architecture.
