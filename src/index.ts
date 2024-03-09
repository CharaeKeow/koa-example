import Koa from 'koa';

const PORT = 8000;
const app = new Koa();

app.use((ctx) => {
	ctx.body = 'Hello world';
});

app.listen(PORT);
