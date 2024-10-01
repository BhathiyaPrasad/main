// src/types/Invoice.ts
export interface Invoice {
    invoiceNo: string;
    customerName: string;
    payment: number;
    record: 'paid' | 'credit';
  }
  