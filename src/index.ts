import Koa from 'koa';

const PORT = 8000;
const app = new Koa();

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

// response
app.use(async (ctx: Koa.Context) => {
	ctx.body = 'Hello world';
});

app.listen(PORT);
