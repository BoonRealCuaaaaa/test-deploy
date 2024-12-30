export enum FormalizeResponseActions {
  SHORTENING = 'The output should be more concise, focusing on key points while eliminating unnecessary details. Keep it brief without sacrificing essential information or context.',
  SIMPLIFY_WORDS = 'The output should use simpler words if applicable and expressions for easier understanding. Do not remove salutations (e.g., "Hello John," "Dear Jane") to keep the response personal.',
  LENGTHENING = 'The output must be slightly more detailed, incorporating examples and explanations to provide richer context while maintaining the original message and intent.',
  CORRECTING_SPELLING = 'The output should correct spelling and grammatical errors in the text provided. Ensure the revised version preserves the original meaning while enhancing clarity and readability.',
}

export enum FormalizeResponseRules {
  HTML_RESPONSE = 'The response should be in HTML format.',
  DIRECT_ANSWER = 'Answer directly to the point, without unnecessary preambles.',
  MAINTAIN_FORMATTING = 'Ensure that the givenText maintains its original formatting.',
  ADD_HYPERLINK = 'Add the reference below as hyperlink the response if applicable',
  NO_KNOWLEDGE_BASE_SOURCES = 'Do not insert sources from the knowledge base at the bottom of response.',
  CORRECT_SPELLING_ERRORS = 'Correct only obvious spelling errors in the following text. Keep names and unique words unchanged, unless asked to change them.',
  NO_BACKTICKS = "Don't use any backtick. And just generate response so that agent can just copy and paste to the textbox",
}
