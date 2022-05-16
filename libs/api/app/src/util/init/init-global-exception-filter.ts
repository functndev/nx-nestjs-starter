import { APP_FILTER } from '@nestjs/core';

import { ExceptionLoggerFilter } from '../../filters';

import type { Provider } from '@nestjs/common';

export const GlobalExceptionFilterProvider: Provider = {
	provide: APP_FILTER,
	useClass: ExceptionLoggerFilter,
};
