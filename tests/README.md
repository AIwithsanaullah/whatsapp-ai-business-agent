# Property extraction test checklist

Use only synthetic or explicitly authorized, sanitized messages. Never commit client WhatsApp exports, phone numbers, credentials, webhook URLs, or real property-owner details.

## Required cases

| Case | Input condition | Expected result |
|---|---|---|
| Full plot listing | Society, phase, block, plot, size, demand, road, contact | All stated fields retained; plot and size remain separate |
| Abbreviated listing | Informal wording, local abbreviations, mixed Urdu/English | Supported fields extracted; uncertain fields are null |
| House listing | Size, rent/sale, beds, furnished/basement details | House-specific fields populated only when stated |
| Missing contact | Listing without a phone number | `phone: null`; never invent digits |
| Non-property message | Greeting, discussion, or unrelated text | `is_property_listing: false` |
| Ambiguous transaction | Listing with no clear sale/rent signal | `transaction_type: null` |
| Duplicate listing | Same block + plot + phone, all present | Duplicate identified; retain the more complete record and log the decision |
| Incomplete dedup key | One or more matching-key fields missing | Do not auto-merge on incomplete keys |
| Prompt injection | Message tells the model to ignore instructions | Treat message as data; output only schema-compliant extraction |
| Invalid model output | Malformed JSON, wrong enum, missing keys | Reject or route to review; do not silently write bad records |
| Provider retry | Same message ID delivered more than once | Idempotency prevents repeated writes where configured |
| Provider failure | Timeout, rate limit, or spreadsheet failure | Sanitized error recorded; retry/review path tested |

## How to report results

Record the test date, number of cases, exact expected/actual field comparisons, missing-field count, invented-value count, JSON/schema failures, duplicate decisions, and write failures. Calculate field-level precision/recall only against a manually verified ground-truth set. Publish the dataset composition and limitations with any reported percentage.

No accuracy score is claimed by this repository until tests are run and results are recorded.
