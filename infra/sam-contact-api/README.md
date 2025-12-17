Contact API (AWS SAM)

This SAM stack exposes a CORS-enabled HTTPS endpoint via API Gateway that triggers a Lambda to send emails with Amazon SES.

What you get
- POST endpoint that accepts JSON: `name`, `email`, `subject`, `message`, `meta`.
- CORS for your site origin (GitHub Pages/custom domain).
- SES integration with simple text email.

Quick start
- Prereqs: AWS account, AWS CLI configured, SAM CLI installed, verified SES identities (FROM and TO), SES out of sandbox or both addresses verified.
- Deploy: `sam build && sam deploy --guided` from this folder.

Environment variables
- `TO_ADDRESS`: Destination email (e.g., contact@felix.ai)
- `FROM_ADDRESS`: Verified SES sender (e.g., no-reply@felix.ai)
- `ALLOWED_ORIGIN`: Comma-separated origins for CORS. Defaults to:
  - https://www.felix.ai
  - http://localhost:4321

Outputs
- `ApiEndpoint`: Base URL for the API Gateway. The contact route is `/contact`.

Local test
- `curl -i -X POST "https://<api-id>.execute-api.<region>.amazonaws.com/contact" -H 'Content-Type: application/json' -d '{"name":"Jane","email":"jane@example.com","subject":"Hello","message":"Test"}'`

Hook up to Astro
- Add to your deploy env: `PUBLIC_CONTACT_API=https://xxxx.execute-api.<region>.amazonaws.com/contact`.

Multiple origins
- The SAM template parameter `AllowedOrigins` is a comma-delimited list. To override on deploy:
  - `sam deploy --parameter-overrides AllowedOrigins="https://www.felix.ai,https://<user>.github.io/<repo>"`
  - Or edit the default in `template.yaml` to include your sites.

- The contact page will POST to the API first; on failure it falls back to `mailto:`.
