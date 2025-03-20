export interface IProduct {
  id?: number;
  title: string;
  supermarket: string;
}

export interface ICategorizedProduct {
  category: string;
  count: number;
  products: Array<Omit<IProduct, 'id'>>;
}
