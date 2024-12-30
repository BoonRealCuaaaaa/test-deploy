# Jarvis Helpdesk Zendesk Plugin

## References

- [Zendesk app development guide](https://developer.zendesk.com/documentation/apps/getting-started/overview/)
- [Zendesk app API reference](https://developer.zendesk.com/api-reference/apps/introduction/)

## Getting Started

### Local Development

1. Open a new terminal and run source code in dev mode:

```bash
yarn dev
```

2. Open another terminal and run zendesk app instance in dev mode:

```bash
yarn zcli:src
```

3. Sign in to Zendesk Support and go to the Agent Workspace. From the workspace, open a ticket. The URL should look like this:

```
https://{subdomain}.zendesk.com/agent/tickets/{ticket_id}
```

4. Append `?zcli_apps=true` to the URL and press Enter. The URL should now look like this:

```
https://{subdomain}.zendesk.com/agent/tickets/{ticket_id}?zcli_apps=true
```

### Build Zendesk App

Build artifacts will be located in the `dist` folder.

#### Development mode

1. Run the following command to build the zendesk app in development mode:

```bash
yarn build:dev
```

2. Run the built zendesk app:

```bash
yarn preview
```

3. Open another terminal and run the following command to serve the built zendesk app:

```bash
yarn zcli:dist
```

**NOTE**: This preview mode is only available in development mode as we use the server-side app method to host the app locally. In production, the Zendesk app is built and uploaded directly to Zendesk, where it is hosted on their platform.

#### Production mode

1. Run the following command to build the zendesk app in production mode:

```bash
yarn build:prod
```

2. Open another terminal and run the following command to serve the built zendesk app:

```bash
yarn zcli:dist
```

3. Double check and upload the zendesk app to Zendesk.
