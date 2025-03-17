import { ConfigurationError } from 'errors';
import {isNil, toString} from 'lodash';

export const generateUUID = (): string=> {
  return crypto.randomUUID();
}

export const EnvFrom = <T1, T2 = string>(
  config: T1,
  prop: keyof T1,
  message?: string,
  isValid = (val: T2) => !isNil(val)
): T2 => {
  const value = config[prop] as unknown as T2;
  if (!isValid(value)) {
    throw new ConfigurationError(
      message || `${toString(prop)} is expected to be set`
    );
  }
  return value;
};
