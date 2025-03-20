import { IProduct, ICategorizedProduct } from '../interfaces/Product';

const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .trim();
};

interface ProductInfo {
    normalizedTitle: string;
    type: string | undefined;
    quantity: string | undefined;
    originalTitle: string;
}

const extractProductInfo = (title: string): ProductInfo => {
    const normalized = normalizeText(title);
    const words = normalized.split(' ');
    
    // Identificar marca, tipo e quantidade
    const quantities = words.filter(w => /\d+/.test(w));
    const types = ['integral', 'desnatado', 'semi', 'branco'];
    const type = words.find(w => types.includes(w));
    
    return {
        normalizedTitle: words.sort().join(' '),
        type,
        quantity: quantities[0],
        originalTitle: title
    };
};

export const categorizeProducts = (products: IProduct[]): ICategorizedProduct[] => {
    const categories = new Map<string, ICategorizedProduct>();

    products.forEach(product => {
        const info = extractProductInfo(product.title);
        const key = `${info.normalizedTitle}_${info.type}_${info.quantity}`;

        if (!categories.has(key)) {
            categories.set(key, {
                category: product.title,
                count: 0,
                products: []
            });
        }

        const category = categories.get(key)!;
        category.count++;
        category.products.push({
            title: product.title,
            supermarket: product.supermarket
        });
    });

    return Array.from(categories.values());
};