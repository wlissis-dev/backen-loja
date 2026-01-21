import express from 'express';

import itemRoutes from './routes.js'

const app = express();
app.use(express.json());

app.use(itemRoutes)




const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});