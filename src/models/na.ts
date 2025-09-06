export const NA = Symbol("NA");
export type NA = typeof NA;

export type WithNA<T> = T | NA;

export function isNA<T>(v: WithNA<T>): v is NA {
  return v === NA;
}

export function toNA<T>(v: T | null | undefined): WithNA<T> {
  return v == null ? NA : v;
}
