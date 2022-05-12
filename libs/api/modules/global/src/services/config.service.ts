import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import { PrismaService } from './prisma.service';

import type { Path, PathValue } from '@nestjs/config';
import type { SessionOptions } from 'express-session';
import type { EnvironmentType } from '@nestjs-starter/api/types';

@Injectable()
export class ConfigService {
	constructor(
		private readonly config: NestConfigService<EnvironmentType, true>,
		private readonly prisma: PrismaService,
	) {}

	private getInferred<P extends Path<EnvironmentType>, R = PathValue<EnvironmentType, P>>(
		path: P,
	): Exclude<R, undefined> {
		return this.config.get(path, { infer: true });
	}

	get nodeEnv() {
		return this.getInferred('NODE_ENV');
	}

	get port() {
		return this.getInferred('PORT');
	}

	get secret() {
		return this.getInferred('SECRET');
	}

	get sessionSecret() {
		return this.getInferred('SESSION_SECRET');
	}

	get expressSessionConfig(): SessionOptions {
		return {
			secret: this.getInferred('SESSION_SECRET'),
			resave: false,
			saveUninitialized: true,
			store: new PrismaSessionStore(this.prisma, {
				checkPeriod: 2 * 60 * 1000,
				dbRecordIdIsSessionId: true,
				dbRecordIdFunction: undefined,
			}),
		};
	}

	get isDevEnv() {
		return this.nodeEnv === 'development';
	}

	get isProdEnv() {
		return !this.isDevEnv;
	}

	get swaggerAuth() {
		return {
			swaggerUser: this.getInferred('SWAGGER_USER'),
			swaggerPw: this.getInferred('SWAGGER_PW'),
		};
	}
}
