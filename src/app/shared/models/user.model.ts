export interface User {
  name: string;
  email: string;
  password: string;
  cpf: string;
  terms: boolean;
  investments: {
    stocks: any;
    fiis: any;
    treasure: any;
    fiagro:any
  };
  payments: [];
}