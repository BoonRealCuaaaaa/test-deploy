export const createDataTableQueryKey = (baseKeys: string[] | [], searchParams: URLSearchParams) => {
  return [...baseKeys, searchParams.toString()];
};
