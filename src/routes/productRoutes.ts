import { Router, Request, Response } from 'express';
import { Product } from '../database';
import { categorizeProducts } from '../services/categorizationService';
import { IProduct } from '../interfaces/Product';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - supermarket
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado do produto
 *         title:
 *           type: string
 *           description: Título do produto
 *         supermarket:
 *           type: string
 *           description: Nome do supermercado
 *       example:
 *         id: 1
 *         title: Leite Integral Piracanjuba 1L
 *         supermarket: Supermercado A
 *     
 *     CategorizedProduct:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           description: Nome da categoria
 *         count:
 *           type: integer
 *           description: Quantidade de produtos na categoria
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               supermarket:
 *                 type: string
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Adiciona novos produtos
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produtos adicionados com sucesso
 *       500:
 *         description: Erro ao adicionar produtos
 */
// Rota para adicionar produtos
router.post('/products', async (req: Request, res: Response) => {
    try {
        const products: IProduct[] = req.body;
        await Product.bulkCreate(products);
        res.status(201).json({ message: 'Produtos adicionados com sucesso' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

/**
 * @swagger
 * /api/products/categorized:
 *   get:
 *     summary: Obtém os produtos categorizados
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos categorizados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategorizedProduct'
 *       500:
 *         description: Erro ao obter produtos categorizados
 */
// Rota para obter produtos categorizados
router.get('/products/categorized', async (_req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        const categorized = categorizeProducts(products);
        res.json(categorized);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

/**
 * @swagger
 * /api/products:
 *   delete:
 *     summary: Remove todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Todos os produtos foram removidos
 *       500:
 *         description: Erro ao remover produtos
 */
// Rota para limpar todos os produtos
router.delete('/products', async (_req: Request, res: Response) => {
    try {
        await Product.destroy({ where: {} });
        res.json({ message: 'Todos os produtos foram removidos' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;
