import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { ApiStandardClassPublicDecorators } from '@nestjs-starter/api/app';

import { HealthService } from '../services/health.service';

@Controller()
@ApiStandardClassPublicDecorators('Health')
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	@ApiOperation({
		description: 'This endpoint is there to see if the app is up and running.',
		summary: 'Test health',
	})
	@ApiOkResponse({ type: String })
	getHealth() {
		return this.healthService.getHealth();
	}

	@Get('error')
	@ApiOperation({
		description: 'This endpoint is there to test exceptions.',
		summary: 'Test exceptions',
	})
	getError() {
		return this.healthService.testError();
	}
}
