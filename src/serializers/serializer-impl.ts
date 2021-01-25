import { camelCase, snakeCase } from 'change-case';

import { createFormData } from './form-data';
import { MimeType, Serializer } from './serializer';

export const isObject = (x: unknown): x is Record<string, unknown> =>
  typeof x === 'object' && x !== null && x.constructor === Object;

const fromEntries = <T>(entries: [string, unknown][]) => {
  const object: { [key: string]: unknown } = {};

  for (const [key, value] of entries) {
    object[key] = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object as any) as T;
};

// prettier-ignore
export const transformKeys = <T>(
    data: Record<string, unknown>,
    transform: (key: string) => string,
  ): T => fromEntries<T>(
    Object.entries(data).map(([key, value]) => [
      transform(key),
      isObject(value) ? transformKeys(value, transform) : value,
    ] as [string, T[keyof T]]),
  );

export class SerializerImpl implements Serializer {
  serialize(type: MimeType, data: Record<string, unknown>): unknown {
    const casedData = transformKeys(data, snakeCase);

    if (type === 'application/json') {
      return JSON.stringify(casedData);
    }

    if (type === 'multipart/form-data') {
      return createFormData(casedData);
    }

    throw new Error(`Unexpected mime type ${type}`);
  }

  deserialize(type: MimeType, data: string): Record<string, unknown> {
    if (type === 'application/json') {
      return transformKeys(JSON.parse(data), camelCase);
    }

    throw new Error(`Unexpected mime type ${type}`);
  }
}
