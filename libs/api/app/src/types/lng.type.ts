import type { en, de } from '..';
import type { NestedPaths } from '@nestjs-starter/shared/types';

type LngType = typeof en | typeof de;

export type LngFilePath = NestedPaths<LngType['translation']>;
