import { HttpStatus } from '@nestjs/common';

import { switchCase } from '@nestjs-starter/shared/util';

import { StandardApiErrorsEnum } from './standard-api-errors.enum';

import type { BaseApiException } from '../../exceptions';
import type { HttpException } from '@nestjs/common';
import type { I18nReq } from '@nestjs-starter/api/types';
import type { I18nExceptionResponseInterface } from '@nestjs-starter/shared/types';

export const isApiException = (e: HttpException): e is BaseApiException =>
	'i18nKeys' in e;

const httpsStatusToLngKey = switchCase({
	[HttpStatus.NOT_FOUND]: StandardApiErrorsEnum.NOT_FOUND,
	[HttpStatus.BAD_REQUEST]: StandardApiErrorsEnum.BAD_REQUEST,
	[HttpStatus.INTERNAL_SERVER_ERROR]: StandardApiErrorsEnum.INTERNAL_SERVER_ERROR,
	[HttpStatus.FORBIDDEN]: StandardApiErrorsEnum.FORBIDDEN,
	[HttpStatus.UNAUTHORIZED]: StandardApiErrorsEnum.UNAUTHORIZED,
})(StandardApiErrorsEnum.UNKNOWN_API_ERROR);

export const getApiErrorResponse = (
	e: BaseApiException,
	req: I18nReq,
): I18nExceptionResponseInterface => ({
	statusCode: e.getStatus(),
	error: e.message,
	message: req.t(e.i18nKeys, { lng: 'en', ...e.metadata }),
	i18nMessage: req.t(e.i18nKeys, e.metadata),
	lngKeys: e.i18nKeys,
	errorLng: req.language,
	id: req.id,
});

export const getStandardErrorResponse = (
	e: HttpException,
	req: I18nReq,
): I18nExceptionResponseInterface => {
	const key = httpsStatusToLngKey(e.getStatus().toString());

	return {
		statusCode: e.getStatus(),
		error: e.message,
		message: req.t(key, { lng: 'en' }),
		i18nMessage: req.t(key),
		lngKeys: [key],
		errorLng: req.language,
		id: req.id,
	};
};

export const getInternalServerErrorResponse = (
	req: I18nReq,
	e: unknown,
): I18nExceptionResponseInterface => ({
	statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
	error: e instanceof Error ? e.message : 'Internal server error.',
	message: req.t(StandardApiErrorsEnum.INTERNAL_SERVER_ERROR, { lng: 'en' }),
	i18nMessage: req.t(StandardApiErrorsEnum.INTERNAL_SERVER_ERROR),
	lngKeys: [StandardApiErrorsEnum.INTERNAL_SERVER_ERROR],
	errorLng: req.language,
	id: req.id,
});
