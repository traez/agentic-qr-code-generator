import * as migration_20260709_152323 from './20260709_152323';
import * as migration_20260712_remove_status from './20260712_remove_status';

export const migrations = [
  {
    up: migration_20260709_152323.up,
    down: migration_20260709_152323.down,
    name: '20260709_152323'
  },
  {
    up: migration_20260712_remove_status.up,
    down: migration_20260712_remove_status.down,
    name: '20260712_remove_status'
  },
];
