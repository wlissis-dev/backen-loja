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

//Rota para listar itens por categoria
app.get("/itens", (req:Request, res:Response)=>{
    const {categoria}= req.query
    try {
        if(categoria){
            const itensFiltrados = iventario.filter(i => i.categoria === categoria);

            if(itensFiltrados.length === 0){
                return res.status(404).json({mensagem:"Nenhum item encontrado!"})
            }
            return res.status(200).json(itensFiltrados)
        }
        
        return res.status(200).json(iventario)
        
    } catch (error) {
        console.error("Erro ao exibir dados:", error)
        return res.status(500).json({mensagem:"Erro interno no serivor"})
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});