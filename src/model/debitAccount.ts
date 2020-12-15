import { types } from 'mobx-state-tree';

export const DebitModel = types.model('Debit Account', {
  id: types.maybe(types.number),
  balance: types.optional(types.number, 50000),
  type: types.optional(types.string, 'DEBIT'),
  rate: types.optional(types.number, 1),
  minBalance: types.optional(types.number, 50000),
}).actions((self) => ({
  setBalance(balance:number) {
    if (balance < 50000) return;
    self.balance = balance;
  },
  setRate(rate:number) {
    self.rate = rate;
  },
  setMinBalance(minBalance:number) {
    self.minBalance = minBalance;
  },
}));
