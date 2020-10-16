import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionsWithBalance {
  transactions: Transaction[];
  balance: Balance;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance | null {
    const incomeTransactions = this.transactions.filter(
      t => t.type === 'income' && t.value,
    );

    const outcomeTransactions = this.transactions.filter(
      t => t.type === 'outcome' && t.value,
    );

    const balanceIncome = incomeTransactions
      .map(a => a.value)
      .reduce((a, b) => {
        return a + b;
      }, 0);

    const balanceOutcome = outcomeTransactions
      .map(a => a.value)
      .reduce((a, b) => {
        return a + b;
      }, 0);

    const balance: Balance = {
      income: balanceIncome,
      outcome: balanceOutcome,
      total: balanceIncome - balanceOutcome,
    };

    return balance || null;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
