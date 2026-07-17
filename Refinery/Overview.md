# Refinery Architecture Overview

## Purpose

The **Refinery** directory is responsible for transforming trusted information into meaningful products that can be consumed by the rest of UmaKraft.

Unlike the **UmaMoe** directory, which focuses on acquiring and preserving information from external sources, the Refinery operates exclusively on verified data stored within the Vault.

Its responsibility is to analyze, prepare, distribute, and coordinate information throughout the project.

## Core Philosophy

Every department within the Refinery has **one responsibility and one responsibility only**.

Each department performs a specialized task without overlapping the responsibilities of another department. This separation ensures that the architecture remains modular, maintainable, and easy to expand.

## Data Pipeline

```text
Vault
   │
   ▼
Refiner
   │
   ▼
Packager
   │
   ▼
Distributor

Supervisor
   │
   └── Oversees and coordinates the entire Refinery workflow.
```

## Department Overview

### Refiner

Transforms trusted data into meaningful information by performing calculations, analysis, and business logic.

### Packager

Converts refined information into structured outputs suitable for presentation, reports, image generation, or other consumers.

### Distributor

Delivers packaged information to its intended destination, such as Discord channels, direct messages, notifications, or other project components.

### Supervisor

Coordinates Refinery operations by managing automated workflows, scheduled tasks, execution timing, monitoring, and operational control.

---

## Relationship with UmaMoe

The Refinery never communicates directly with external APIs.

All information entering the Refinery must originate from the **Vault**, ensuring that only trusted and validated data is processed.

This separation allows the UmaMoe architecture to focus on **data acquisition**, while the Refinery focuses on **data transformation and distribution**.

---

The Refinery serves as the operational engine of UmaKraft, transforming verified information into meaningful products that power every feature of the project.
