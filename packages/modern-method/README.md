# Modern Method

Define Meteor Methods in a modern way.

- shared variable between client and server files
- strongly typed arguments, result
- mandatory asynchronous calling
- chained construction: instantiate in a shared module, but set and register handlers in isolated modules for complete environment separation (no conditional/dynamic imports necessary)

Planned:

- strongly typed errors
- per-method rate-limiting: `.setRateLimit(...)`
- global rate-limiting: `setGlobalRateLimit(...)`
