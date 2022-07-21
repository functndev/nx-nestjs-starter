import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

import type { Path, PathValue } from '@nestjs/config';
import type { EnvironmentType } from '@nestjs-starter/api/types';

@Injectable()
export class ConfigService {
	constructor(private readonly config: NestConfigService<EnvironmentType, true>) {}

	private getInferred<P extends Path<EnvironmentType>, R = PathValue<EnvironmentType, P>>(
		path: P,
	): Exclude<R, undefined> {
		return this.config.get(path, { infer: true });
	}

	public get nodeEnv() {
		return this.getInferred('NODE_ENV');
	}

	public get port() {
		return this.getInferred('PORT');
	}

	public get secret() {
		return this.getInferred('SECRET');
	}

	public get sessionSecret() {
		return this.getInferred('SESSION_SECRET');
	}

	public get isDevEnv() {
		return this.nodeEnv === 'development';
	}

	public get isProdEnv() {
		return !this.isDevEnv;
	}

	public get swaggerAuth() {
		return {
			swaggerUser: this.getInferred('SWAGGER_USER'),
			swaggerPw: this.getInferred('SWAGGER_PW'),
		};
	}
}
