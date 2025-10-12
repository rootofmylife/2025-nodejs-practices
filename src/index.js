import app from './server.js';
import env from './env.js';

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});
