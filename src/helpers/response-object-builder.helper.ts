import { RequestResult } from 'src/enums/request-result.enum';

export function buildResponseObject(
  result: RequestResult,
  errorMessages?: string[],
  data?: Record<string, unknown>,
) {
  return {
    ok: result === RequestResult.Success,
    errors: errorMessages ?? [],
    data,
  };
}
