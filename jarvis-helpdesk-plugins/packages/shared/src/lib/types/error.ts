import { ClientErrorIssueId } from '../constants/client-error-issue-id';

export type ClientErrorDetails = {
  field?: string;
  issue: string;
  issueId?: ClientErrorIssueId;
  childrenDetails?: ClientErrorDetails[];
};

export type ErrorResponseBody = {
  requestId: string;
  message: string;
  details: ClientErrorDetails[];
};
