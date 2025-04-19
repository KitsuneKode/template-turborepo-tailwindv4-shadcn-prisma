import type { SafeParseReturnType, ZodSchema } from 'zod';

export function validate<T>(schema: ZodSchema<T>, data: T) {
  return schema.safeParse(data);
}

export const getValidationErrors = <T>(result: SafeParseReturnType<T, T>) => {
  return (
    result.error?.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })) || []
  );
};
