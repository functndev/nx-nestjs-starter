import type { en, de } from '..';
import type { Path } from '@nestjs/config';

type LngType = typeof en | typeof de;

export type LngFilePath = Path<LngType['translation']>;
