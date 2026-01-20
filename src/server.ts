import express from 'express';
import type {Request, Response} from 'express';
import type { Item } from './types.js';

const app = express();
app.use(express.json());

let iventario : Item[] = []

//Rota para criar um item novo
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

//Rota para listar todos os itens
app.get("/itens", (req:Request, res:Response)=>{
    try {
        if(iventario.length === 0){
            console.log("Consulta realizada: Iventario vazio")
            return res.json([])
        }
         console.log(`Conculta realizada: Retornando ${iventario.length} Itens`)
         return res.json(iventario)
    } catch (error) {
        console.error("Erro ao exibir dados:", error)
        return res.status(500).json({mensagem:"Erro interno no serivor"})
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});