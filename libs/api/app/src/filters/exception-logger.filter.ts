import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import {
	getApiErrorResponse,
	getInternalServerErrorResponse,
	getStandardErrorResponse,
	isApiException,
} from '../util';

import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import type { I18nReq } from '@nestjs-starter/api/types';
import type { Response } from 'express';

@Catch()
export class ExceptionLoggerFilter implements ExceptionFilter<unknown> {
	constructor(
		@InjectPinoLogger(ExceptionLoggerFilter.name)
		private readonly pinoLogger: PinoLogger,
	) {}

	private handleHttpException(req: I18nReq, res: Response, e: HttpException): void {
		const status = e.getStatus();

		!isApiException(e) &&
			this.pinoLogger.warn(
				{ error: e },
				`[WARNING]: A plain non translated error was thrown.`,
			);

		const jsonRes = isApiException(e)
			? getApiErrorResponse(e, req)
			: getStandardErrorResponse(e, req);

		this.pinoLogger.error(
			{
				jsonRes,
				body: req.body,
				// TODO: comment in once actors are implemented
				//user: req.user,
				params: req.params,
				query: req.query,
			},
			`[${e.getStatus()}]: ${e.message}`,
		);

		res.status(status).json(jsonRes);
	}

	private handleGeneralException(req: I18nReq, res: Response, e: unknown): void {
		this.pinoLogger.error(
			{
				body: req.body,
				// TODO: comment in once actors are implemented
				//user: req.user,
				params: req.params,
				query: req.query,
				headers: req.headers,
			},
			e instanceof Error ? e.message : 'Internal error',
		);

		res
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json(getInternalServerErrorResponse(req, e));
	}

	catch(e: unknown, host: ArgumentsHost): void {
		const httpHost = host.switchToHttp();
		const req = httpHost.getRequest<I18nReq>();
		const res = httpHost.getResponse<Response>();

		e instanceof HttpException
			? this.handleHttpException(req, res, e)
			: this.handleGeneralException(req, res, e);
	}
}
