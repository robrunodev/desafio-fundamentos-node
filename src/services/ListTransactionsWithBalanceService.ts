import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionsWithBalance {
  transactions: Transaction[];
  balance: Balance | null;
}

class ListTransactionsWithBalanceService {
  transactionRepostitory: TransactionsRepository;

  constructor(transactionRepostitory: TransactionsRepository) {
    this.transactionRepostitory = transactionRepostitory;
  }

  public execute(): TransactionsWithBalance {
    const transactionsWithBalance: TransactionsWithBalance = {
      transactions: this.transactionRepostitory.all(),
      balance: this.transactionRepostitory.getBalance(),
    };

    return transactionsWithBalance;
  }
}

export default ListTransactionsWithBalanceService;
