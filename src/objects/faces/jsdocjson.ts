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

export interface JsonDocParamType {
  names: string[];
}

export interface JsonDocParam {
  name?: string;
  optional?: boolean;
  nullable?: boolean;
  variable?: boolean;
  defaultvalue?: any;
  description?: string;
  type: JsonDocParamType[];
  subparams?: JsonDocParam[];
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
  returns?: JsonDocParam[];
  params?: JsonDocParam[];
  properties?: JsonDocParam[];
}
