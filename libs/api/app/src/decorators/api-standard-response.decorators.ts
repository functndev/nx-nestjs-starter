import { applyDecorators } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { I18nErrorResponseDto } from '../dtos';

const AuthDecorators = [
	ApiBearerAuth(),
	ApiUnauthorizedResponse({ type: I18nErrorResponseDto }),
	ApiForbiddenResponse({ type: I18nErrorResponseDto }),
	ApiBadRequestResponse({ type: I18nErrorResponseDto }),
];

const StandardDecorators = [
	ApiBadRequestResponse({ type: I18nErrorResponseDto }),
	ApiNotFoundResponse({ type: I18nErrorResponseDto }),
	ApiInternalServerErrorResponse({ type: I18nErrorResponseDto }),
];

export const ApiStandardClassAuthDecorators = (
	...tags: string[]
): ReturnType<typeof applyDecorators> =>
	applyDecorators(ApiTags(...tags), ...AuthDecorators, ...StandardDecorators);

export const ApiStandardClassPublicDecorators = (
	...tags: string[]
): ReturnType<typeof applyDecorators> =>
	applyDecorators(ApiTags(...tags), ...StandardDecorators);

export const ApiMethodAuthDecorators = (): ReturnType<typeof applyDecorators> =>
	applyDecorators(...AuthDecorators);
