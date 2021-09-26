import {modesEnum} from './enums';
import {mode} from '../config.json';

const LogMessage = (...args) => {
  if (mode === modesEnum.Development) console.log(...args);
};

const LogWarning = (...args) => {
  console.warn(...args);
};

const LogError = (...args) => {
  console.error(...args);
};

export default {
  LogMessage,
  LogWarning,
  LogError,
};
