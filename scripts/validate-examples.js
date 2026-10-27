const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const samples = JSON.parse(fs.readFileSync(path.join(root, "examples/sample_messages.json"), "utf8"));
const expected = JSON.parse(fs.readFileSync(path.join(root, "examples/expected_output.json"), "utf8"));
const keys = [
  "message_id", "is_property_listing", "reason", "date", "transaction_type",
  "society", "phase", "block", "plot_number", "property_type", "size", "demand",
  "commercial", "corner", "facing_park", "road", "owner_or_dealer", "agency",
  "phone", "condition", "beds", "furnished", "basement", "double_unit", "design"
];
const enums = {
  transaction_type: ["SALE", "RENT"],
  property_type: ["PLOT", "HOUSE", "APARTMENT", "COMMERCIAL", "OTHER"],
  owner_or_dealer: ["OWNER", "DEALER"]
};
const errors = [];

if (!Array.isArray(samples) || !Array.isArray(expected)) {
  console.error("Expected sample_messages.json and expected_output.json to contain arrays.");
  process.exit(1);
}
if (samples.length !== expected.length) errors.push(`Sample/expected count differs: ${samples.length} vs ${expected.length}`);

expected.forEach((record, index) => {
  const prefix = `expected_output[${index}]`;
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(record, key)) errors.push(`${prefix}: missing key ${key}`);
  }
  if (typeof record.is_property_listing !== "boolean") errors.push(`${prefix}: is_property_listing must be boolean`);
  for (const key of Object.keys(enums)) {
    if (record[key] !== null && !enums[key].includes(record[key])) errors.push(`${prefix}: invalid ${key} value ${JSON.stringify(record[key])}`);
  }
  for (const key of ["commercial", "corner", "facing_park", "furnished", "basement", "double_unit"]) {
    if (record[key] !== null && typeof record[key] !== "boolean") errors.push(`${prefix}: ${key} must be boolean or null`);
  }
  if (record.beds !== null && typeof record.beds !== "number") errors.push(`${prefix}: beds must be number or null`);
  if (record.phone !== null && typeof record.phone !== "string") errors.push(`${prefix}: phone must be a string or null`);
  if (record.plot_number && record.size && record.plot_number === record.size) errors.push(`${prefix}: plot_number and size appear conflated`);
  if (record.is_property_listing === false && !record.reason) errors.push(`${prefix}: non-listing should include a reason`);
});

if (errors.length) {
  console.error("Example validation failed:");
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Example validation passed: ${expected.length} expected records, ${keys.length} required fields checked.`);
