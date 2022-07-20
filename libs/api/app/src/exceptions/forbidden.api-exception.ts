import { HttpStatus } from '@nestjs/common';

import { BaseApiException } from './base.api-exception';

import type { LngFilePath } from '../types';

export class ForbiddenApiException extends BaseApiException {
	constructor(
		errorKey: LngFilePath = 'exceptions.forbidden',
		metadata?: Record<string, unknown>,
	) {
		super(HttpStatus.FORBIDDEN, 'Bad Request', errorKey, metadata);
	}
}
