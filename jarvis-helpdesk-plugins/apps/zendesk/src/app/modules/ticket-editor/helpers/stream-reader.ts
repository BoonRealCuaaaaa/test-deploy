import { ZafClient } from '@/src/app/lib/types/zaf-client';

// Handler for stream response
export const streamReader = async (
  res: Response | undefined,
  client: ZafClient,
  setCurrentResponse: (value: string) => void
) => {
  if (!res) {
    return;
  }

  const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();
  let fullResponse = '';

  if (reader) {
    let isDone = false;

    do {
      const { value, done: readDone } = await reader.read();
      isDone = readDone;

      if (!isDone && value) {
        fullResponse += value.replace(/data: |#|\*|\n/g, '').trim() + ' ';
        client.set('comment.text', fullResponse);
      }
    } while (!isDone);

    setCurrentResponse(fullResponse);

    return fullResponse;
  }
};
