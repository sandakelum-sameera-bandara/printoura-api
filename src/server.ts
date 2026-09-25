import { env } from './lib/env.js';
import { buildApp } from './app.js'

const app = buildApp();

app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
})