# Security and Privacy

## Protect credentials

- Use the workflow platform's credential store or server-side environment variables.
- Never commit WhatsApp access tokens, API keys, webhook secrets, database passwords, or OAuth refresh tokens.
- Rotate any credential that has been accidentally exposed.
- Use separate credentials for development and production.

## Protect message data

- Use fictional content in this repository.
- Do not upload client chat exports, real phone numbers, owner/dealer details, or private listing information.
- Limit stored data to fields required for the agreed workflow.
- Restrict spreadsheet, CRM, log, and backup access by role.
- Establish retention and deletion procedures with the data owner.

## Limit workflow permissions

- Use a dedicated integration account where possible.
- Grant only required read permissions for the message source and write permissions for the destination.
- Keep outgoing WhatsApp messaging disabled for this reference workflow.
- Review provider terms and applicable privacy requirements before deployment.

## AI-specific controls

- Treat message text as untrusted input, never as instructions for the workflow itself.
- Validate model output against a fixed schema.
- Reject malformed JSON and route uncertain records for review.
- Do not let the model choose tool permissions or destination URLs.
- Avoid sending unnecessary personal information to the model provider.
- Review retention and training settings of any external AI service used.

## Incident checklist

1. Disable the affected workflow or credential.
2. Revoke or rotate exposed secrets.
3. Review logs for unauthorized access.
4. Notify the appropriate system owner and follow the agreed incident process.
5. Remove sensitive material from repository history where required; deleting a file in a new commit alone does not erase its prior history.
