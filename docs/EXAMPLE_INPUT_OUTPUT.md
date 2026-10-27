# Example Input and Output

The examples in this repository are fictional and intended for testing. They do not represent real people, properties, or client records.

## Example: plot for sale

**Input**

```text
DHA Phase 8, Block U, 10 Marla plot U-23 for sale. 100 ft road, demand 2.1 crore. Corner.
```

**Expected extraction**

- Transaction: `SALE`
- Society: `DHA`
- Phase: `8`
- Block: `U`
- Plot number: `U-23`
- Size: `10 Marla`
- Road: `100 ft`
- Demand: `2.1 crore`
- Corner: `true`
- Phone: `null` because no number was supplied

The full machine-readable record is in `examples/expected_output.json`.

## Example: house for rent

**Input**

```text
Bahria Town Phase 4 5 marla house for rent, 3 beds, furnished, demand 95k per month.
```

Expected values include `RENT`, `HOUSE`, `5 Marla`, `beds: 3`, and `furnished: true`. Unknown block, plot number, phone, and other details remain null.

## Example: unrelated message

**Input**

```text
Good morning everyone. Meeting moved to 4 PM.
```

Expected outcome: `is_property_listing: false`. The message must not become a property row.

## Validation cases to add before production

1. A listing with no phone number.
2. A message with two plot numbers.
3. A plot size that could be mistaken for a plot number.
4. A listing containing Urdu/Roman Urdu and English terms.
5. A forwarded message with duplicate text but a different source message ID.
6. Two listings with the same block and plot but different phone numbers.
7. An incomplete or malformed AI response.
8. A message containing instructions that attempt to override the extraction prompt.

A production test suite should compare model output with reviewed expected records and report field-level accuracy, false property classifications, missing phone numbers, and unsupported values.
