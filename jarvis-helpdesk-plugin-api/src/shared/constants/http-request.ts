export const GLOBAL_ROOT_PREFIX = 'api';

export const REDACTED_FIELD_MESSAGE = 'This is redacted';

// NOTE: This is used as keys in HTTP request headers
export enum HeaderKey {
  AUTHORIZATION = 'Authorization',
  GUID = 'x-jarvis-guid',
  X_CITY = 'x-city',
  X_REGION = 'x-region',
  X_REQUEST_ID = 'x-request-id',
  X_USER_ID = 'x-user-id',
}

export enum RedactedHeaderKey {
  AUTHORIZATION = 'authorization',
}

export enum QueryKey {
  REFRESH_TOKEN = 'refreshToken',
}
