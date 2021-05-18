import {JsonDoc, JsonDocKinds} from '@objects/faces/jsdocjson';

const optionsMatch = (options: Partial<JsonDoc>, doc: JsonDoc) =>
  Object.entries(options).every(([key, value]) => doc.hasOwnProperty(key) && value === doc[key as keyof JsonDoc])

export const docsFind = (kind: JsonDocKinds|null, pool: JsonDoc[], options?: Partial<JsonDoc>): JsonDoc[] =>
  pool.filter((doc) => (kind && doc.kind === kind || true) && (options ? optionsMatch(options, doc) : true));
