// BalanceHistory.ts
export interface BalanceHistory {
  id: number;
  pin:string;
  amount:number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
