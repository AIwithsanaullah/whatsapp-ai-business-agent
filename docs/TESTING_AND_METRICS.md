# Testing and performance reporting

This repository currently contains a reference blueprint, prompt, and synthetic examples. The checks below validate example structure; they do **not** measure the accuracy or reliability of a live workflow.

## Run the example validator

Requires Node.js; no external packages are needed:

```bash
node scripts/validate-examples.js
```

The validator checks the expected-output records for required fields, basic types, supported enum values, and a few common consistency mistakes.

## Before describing the workflow as production-ready

1. Export the actual n8n workflow from the environment in which it runs.
2. Remove credentials, tokens, webhook secrets, private hostnames, client data, message content, phone numbers, and account identifiers.
3. Replace sensitive values with obvious placeholders and inspect every node parameter and expression.
4. Import the sanitized copy into a clean test n8n instance and confirm the node types and expressions work with the documented n8n version.
5. Replay a ground-truth set of synthetic or approved, anonymized messages.
6. Compare each extracted field against a manually reviewed expected record.
7. Test duplicate handling, retries, malformed model output, rate limits, and destination write failures.
8. Publish only measured results with the test-set size, date, error definitions, and limitations.

## Metrics to record

- **Listing classification:** true positives, false positives, false negatives.
- **Field extraction:** per-field exact-match rate and missing/invented-value counts.
- **Phone preservation:** exact match against source text; no inferred digits.
- **Duplicate handling:** correct duplicate decisions and incorrect merges.
- **Reliability:** JSON/schema failure rate, retry success, failed destination writes.
- **Operations:** records processed, elapsed period, model/provider, and estimated cost.

Do not infer accuracy from throughput. Any previously reported throughput is operator-reported and has not been independently audited here.
