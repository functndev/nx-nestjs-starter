import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { ConfigService } from '@nestjs-starter/api-shared/modules/global';

@Injectable()
export class HealthService {
	constructor(
		private readonly configService: ConfigService,
		@InjectPinoLogger(HealthService.name)
		private readonly pinoLogger: PinoLogger
	) {}

	public getHealth(): string {
		this.pinoLogger.info('Health info requested.');
		return `[${this.configService.nodeEnv}] - alive!`;
	}
}
