import type { en } from '..';
import type { NestedPaths } from '@nestjs-starter/shared/types';

export type LngFilePath = NestedPaths<typeof en['translation']>;
