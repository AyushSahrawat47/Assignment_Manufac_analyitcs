import { JsonObject } from "../types/common-types";

export interface AsyncError {
  code: string;
  message: string;
}

export interface AsyncResult<T> {
  error?: AsyncError;
  data?: T;
}

export class AsyncOperationError implements AsyncError {
  code: string;
  message: string;

  constructor(json: JsonObject) {
    this.code = json.code as string;
    this.message = json.message as string;
  }
}
