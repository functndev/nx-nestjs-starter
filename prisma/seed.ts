import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// here you put actual prisma seed code
	// this statement is just for demonstrative purposes only
	const sessions = await prisma.session.findMany();

	console.log('sessions', sessions);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
