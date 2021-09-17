import {modesEnum} from './enums';
import {mode} from '../../../config.json';

const LogMessage = (...args) => {
  if (mode === modesEnum.Development) console.log(...args);
};

const LogWarning = (...args) => {
  if (mode === modesEnum.Development) console.warn(...args);
};

const LogError = (...args) => {
  if (mode === modesEnum.Development) console.error(...args);
};

export default {
  LogMessage,
  LogWarning,
  LogError,
};
