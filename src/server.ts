import express from 'express';
import type {Request, Response} from 'express';
import type { Item } from './types.js';

const app = express();
app.use(express.json());

let iventario = []

app.post("/itens", (req:Request, res: Response)=>{
    const {id, nome, categoria, preco, estoque} = req.body;
    const novoItem : Item  = {
        id,
        nome,
        categoria,
        preco,
        estoque
    }

    iventario.push(novoItem)
    return res.status(201).json(novoItem)
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor TypeScript rodando em http://localhost:${PORT}`);
});