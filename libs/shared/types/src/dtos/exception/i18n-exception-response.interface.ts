import type { ReqId } from 'pino-http';

export interface I18nExceptionResponseInterface {
	statusCode: number;
	message: string;
	error: string;
	i18nMessage: string;
	errorLng: string;
	id: ReqId;
}
