import {JsonDoc, JsonDocKinds} from '@objects/faces/jsdocjson';

export const parseType = (typeName: string): Partial<JsonDoc> => {
  const [memberof, name] = typeName.replace(/[.#]/,`~`).split(`~`);
  const options: Partial<JsonDoc> = {
    kind: JsonDocKinds.typedef,
  };

  if (![`string`, `number`, `boolean`, `Object`].includes(memberof)) {
    if (!name) {
      options.kind = JsonDocKinds.class;
      options.name = memberof;
      options.scope = `global`;
    } else {
      options.memberof = memberof;
      options.name = name;
    }

    return options;
  }

  return {name: memberof};
}
