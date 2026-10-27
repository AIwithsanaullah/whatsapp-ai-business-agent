# Workflow Design

## Objective

Convert authorized incoming WhatsApp messages into validated property records without sending messages back to WhatsApp.

## Components

### 1. Message receiver

Accept events from the configured provider. Verify the webhook secret or signature where supported. Ignore delivery receipts, status updates, and events that do not contain a usable message.

### 2. Normalization

Extract message ID, timestamp, text, sender metadata, and group metadata only when supplied by the provider. Normalize whitespace without removing meaningful punctuation, phone digits, plot identifiers, or units.

### 3. Relevance classification

Classify the message as a property listing or not relevant. Non-listing messages should be logged or discarded according to the client's retention policy.

### 4. Structured extraction

Use the prompt in `prompts/property-extraction.md`. Require valid JSON and reject malformed output. Preserve the source message separately only when necessary and protected.

### 5. Validation and normalization

- Validate JSON types and required keys.
- Ensure enum values are within the allowed set.
- Keep absent information as null.
- Keep size separate from plot number.
- Normalize sale/rent labels consistently.
- Preserve demand units and context.
- Check phone formatting without inventing missing digits.

### 6. Duplicate detection

A configurable key may use block + plot number + phone when all three values are present. Do not merge records if key fields are missing or ambiguous. If duplicates are found, keep the more complete record and record the decision in an audit log.

### 7. Destination writer

Map validated fields to Google Sheets, a CRM, or a database. Use a stable source message ID for idempotency where possible. Restrict write permissions to the minimum required.

### 8. Monitoring and recovery

Record processing time, message ID, outcome, and sanitized error details. Retry transient failures with limits and backoff. Avoid logging full message bodies or credentials in error messages.

## Suggested processing outcomes

- `accepted`: valid property record created or updated.
- `ignored_non_property`: message was not a listing.
- `needs_review`: ambiguous extraction or validation issue.
- `duplicate_merged`: matching record found and safely consolidated.
- `failed`: processing failed after permitted retries.

## Deployment checklist

- Provider webhook is authenticated.
- Incoming event shape has been tested with sample payloads.
- AI output is parsed and validated before use.
- No outgoing WhatsApp nodes are connected.
- Destination column mapping is reviewed.
- Duplicate handling is tested against missing values and near matches.
- Secrets are stored in platform credentials or environment variables.
- Client approves access, retention, and monitoring policies.
