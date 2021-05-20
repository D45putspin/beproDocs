export enum JsonDocKinds {
  class = `class`,
  function = `function`,
  typedef = `typedef`,
}

export enum JsonDocMetaCodeKind {
  ClassProperty = `ClassProperty`,
}

export interface JsonDocMetaCode {
  id: string;
  name: string;
  type: JsonDocMetaCodeKind
}

export interface JsonDocMeta {
  filename: string;
  path: string;
  lineno: number;
  columnno: number;
  code: JsonDocMetaCode;
  range?: [number, number];
}

export interface JsonDoc {
  comment: string;
  meta: JsonDocMeta;
  kind: JsonDocKinds;
  name: string;
  longname: string;
  scope: string;
  memberof: string;
  ___id: string;
  ___s: boolean;
  description?: string;
  returns?: any;
  params?: any;
}
