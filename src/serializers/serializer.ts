export type MimeType = 'application/json' | 'multipart/form-data';

export interface Serializer {
  serialize(type: MimeType, data: Record<string, unknown>): unknown;
  deserialize(type: MimeType, data: unknown): Record<string, unknown>;
}
