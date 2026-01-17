# Testing

Requirements:
- Node.js (v12+ recommended)

Run tests:

```powershell
cd quality-assurance-agent
node run-tests.js
```

Notes:
- Tests are standalone and do not require external frameworks.
- If `node` is not available, install Node.js from https://nodejs.org/
- Tests include deterministic checks; for tests involving randomness a fixed `randomFn` is used where needed.
