import { Module } from '@nestjs/common';

import { CoreModule } from '@nestjs-starter/api/modules/core';

@Module({
	imports: [CoreModule],
})
export class AppModule {}
