/**
 * Frontend configuration constants
 *
 * Review these values periodically to ensure they remain accurate.
 */

// Cost estimate displayed before query submission
// Based on typical OpenRouter pricing as of January 2026
// Review quarterly or when model pricing changes significantly
export const COST_ESTIMATE = {
  min: 0.02,
  max: 0.10,
  text: "Estimated cost: ~$0.02–$0.10 per inquiry",
  lastReviewed: "2026-01-03",
};

// Demo data version - update when demos.json content changes
export const DEMO_VERSION = {
  version: "1.0.0",
  lastUpdated: "2026-01-02",
  description: "Initial launch demos: Rust vs Go, Quantum Computing, Career advice",
};
