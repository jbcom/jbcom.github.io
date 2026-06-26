# Security Policy

## Reporting a Vulnerability

Do not report security vulnerabilities through public GitHub issues. Email the
maintainer directly.

Include:

1. Description of the issue
2. Steps to reproduce
3. Potential impact
4. Suggested mitigation, if known

## Static Site Security Notes

- Do not commit `.env` or credentials.
- Do not add client-side scripts that collect visitor data without explicit
  review.
- Keep the site no-build unless the owner explicitly changes direction.
- `public/assets/resume.pdf` is user-supplied and must not be regenerated
  by site tooling.
