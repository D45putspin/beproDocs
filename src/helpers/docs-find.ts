import {JsonDoc, JsonDocKinds} from '@objects/faces/jsdocjson';

const optionsMatch = (options: Partial<JsonDoc>, doc: JsonDoc) =>
  Object.entries(options).every(([key, value]) => doc.hasOwnProperty(key) && value === doc[key as keyof JsonDoc])

export const docsFind = (kind: JsonDocKinds|null, pool: JsonDoc[], options?: Partial<JsonDoc>, checkTagged?: string): JsonDoc[] =>
  pool.filter((doc) => (!checkTagged || checkTagged && !doc[checkTagged as keyof JsonDoc]) && (kind && doc.kind === kind || true) && (options ? optionsMatch(options, doc) : true));
