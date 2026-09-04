# Security notes

- Forms submit directly to Web3Forms over HTTPS and continue to work without JavaScript.
- The Web3Forms `access_key` is a public form identifier required in browser markup; it is not treated as a server secret.
- Every form includes the Web3Forms `botcheck` honeypot.
- The owner should restrict accepted domains and confirm the recipient address in the Web3Forms dashboard.
- No passwords, private API tokens or server credentials belong in this static repository.
