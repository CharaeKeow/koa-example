import Koa from 'koa';
import Router from '@koa/router';

const PORT = 8000;
const app = new Koa();
const router = new Router();

// logger
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
	await next();
	const responseTime = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${responseTime}`);
});

// x-response-time
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
	const startTime = Date.now();
	await next();
	const responseTime = Date.now() - startTime;
	ctx.set('X-Response-Time', `${responseTime}ms`);
});

// routes
router.get('hello', '/', async (ctx: Koa.Context) => {
	ctx.body = { message: 'Hello world' };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT);
