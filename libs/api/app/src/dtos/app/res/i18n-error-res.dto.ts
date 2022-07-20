import { ApiProperty } from '@nestjs/swagger';

import type { I18nExceptionResponseInterface } from '@nestjs-starter/shared/types';

export class I18nErrorResponseDto implements I18nExceptionResponseInterface {
	@ApiProperty({ example: 'validate-user' })
	context!: string;

	@ApiProperty({ example: 'Bad Request Exception' })
	error!: string;

	@ApiProperty({ example: 'de-AT' })
	errorLng!: string;

	@ApiProperty({ example: 'Die Anfrage war fehlerhaft.' })
	i18nMessage!: string;

	@ApiProperty({ example: ['exceptions.bad-request'] })
	lngKeys!: string[];

	@ApiProperty({ example: 'The request was malformed' })
	message!: string;

	@ApiProperty({ example: 400 })
	statusCode!: number;

	@ApiProperty({ example: '13371337-1337-1337-1337-133713371337' })
	id!: string;
}
