# WhatsApp AI Business Agent

<p align="center"><strong>WhatsApp message processing · AI-assisted extraction · Structured business data</strong></p>
<p align="center"><a href="https://github.com/AIwithsanaullah">GitHub</a> · <a href="https://nexoraaihq.com/">NEXORA AI Solutions</a> · <a href="https://www.linkedin.com/in/sana-ullah-4447a0427/">LinkedIn</a></p>

## Overview

A reference project for building a WhatsApp-connected business workflow that identifies property information in incoming messages, extracts structured fields, validates records, and prepares clean data for a spreadsheet or CRM.

It is designed for real-estate teams receiving property details in varied formats, including abbreviations and mixed Urdu/English or Roman Urdu text.

**Processing boundary:** this reference design processes authorized incoming messages only. It does not send replies or messages to WhatsApp groups. Production use requires approved access, secure credentials, and compliance with the provider's terms and the client's data-handling requirements.

## Related case study

See the [sanitized real-estate property extraction case study](https://github.com/AIwithsanaullah/ai-web-and-app-development/blob/main/docs/CASE_STUDY_WHATSAPP_PROPERTY_EXTRACTION.md) for the business problem, workflow stages, privacy boundary, and clearly qualified operator-reported throughput. It contains no private client messages or contact data.

## Business problem

Property details often arrive as unstructured text. Manually copying them into spreadsheets can be slow and inconsistent. This project describes a repeatable workflow to:

- Identify relevant property listings.
- Extract available details without inventing missing values.
- Normalize society, phase, block, plot number, size, demand, and contact details.
- Validate structured output before saving.
- Reduce duplicates using an explicit matching rule.
- Track processing outcomes and errors.

## Reference workflow

    Authorized WhatsApp event
              |
              v
    Webhook / message receiver
              |
              v
    Normalize text and metadata
              |
              v
    Classify property listing
              |
              v
    Extract structured fields
              |
              v
    Validate and normalize
              |
              v
    Check duplicate key
              |
              v
    Save to Google Sheets / CRM
              |
              v
    Log outcome and sanitized errors

This repository contains the design, prompt, sample data, and workflow blueprint. Provider credentials and client-specific endpoints must be configured privately.

## Suggested record fields

| Field | Purpose |
|---|---|
| message_id | Source event identifier, when available |
| date | Listing or message date, if known |
| transaction_type | Sale, rent, or unknown |
| society | Housing society or project |
| phase | Phase or sector |
| block | Block or sector identifier |
| plot_number | Explicit plot number or combination |
| property_type | Plot, house, apartment, commercial, or other |
| size | Stated size, preserving the original unit |
| demand | Asking price as stated |
| commercial | Commercial status when explicitly stated |
| corner | Corner status when explicitly stated |
| facing_park | Park-facing status when explicitly stated |
| road | Road width or detail, if stated |
| beds | Bedroom count, if stated |
| furnished | Furnishing status, if stated |
| owner_or_dealer | Role only when explicitly available |
| agency | Agency name, if stated |
| phone | Contact number from the source, subject to authorization |
| condition | Property condition, if stated |

Missing information should remain null. Never infer a phone number, price, plot number, or property feature.

## Repository contents

- prompts/property-extraction.md — extraction rules and output contract.
- examples/sample_messages.json — fictional input messages.
- examples/expected_output.json — expected structured records.
- workflows/whatsapp-property-extraction-blueprint.json — tool-agnostic workflow blueprint (not a directly importable n8n export).
- scripts/validate-examples.js — dependency-free structural validator for the synthetic expected-output records.
- tests/README.md — recommended test cases for extraction, deduplication, retries, and failures.
- docs/TESTING_AND_METRICS.md — test instructions and responsible performance reporting.
- docs/WORKFLOW_DESIGN.md — component responsibilities and operating rules.
- docs/EXAMPLE_INPUT_OUTPUT.md — sample walkthrough and validation cases.
- docs/SECURITY_AND_PRIVACY.md — deployment and data protection checklist.

## Quick start

1. Review the extraction rules in prompts/property-extraction.md.
2. Run the fictional examples through your chosen model or workflow platform.
3. Compare the result with examples/expected_output.json.
4. Configure your authorized message provider, AI credentials, and destination privately.
5. Validate and check duplicates before writing to a live sheet or CRM.
6. Test with synthetic data before processing real customer messages.

## Duplicate handling

A project-specific duplicate rule may match records when block, plot number, and phone number all match. When a duplicate is found, retain the more complete record and preserve an audit trail. If key fields are missing or ambiguous, do not merge automatically.

## Security

- Never commit API keys, access tokens, webhook secrets, exported customer chats, or real phone numbers.
- Use synthetic data in examples and screenshots.
- Restrict access to spreadsheets and logs containing personal information.
- Store only fields required for the agreed business purpose.
- Define retention and deletion rules with the client.
- Outgoing WhatsApp messaging is outside this reference workflow.

## Project scope

This is a documented reference blueprint, not a turnkey production integration. Provider-specific credentials, payload mapping, model configuration, destination fields, and end-to-end tests must be configured and verified for each deployment.

## Maintainer

**Sana Ullah** · AI Automation & Agentic AI Engineer · NEXORA AI Solutions

- Website: https://nexoraaihq.com/
- LinkedIn: https://www.linkedin.com/in/sana-ullah-4447a0427/
- GitHub: https://github.com/AIwithsanaullah
