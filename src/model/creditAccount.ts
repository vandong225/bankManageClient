import { types } from 'mobx-state-tree';

export const CreditModel = types.model('Credit Account', {
  id: types.maybe(types.number),
  balance: types.optional(types.number, 0),
  type: types.optional(types.string, 'CREDIT'),
  debt: types.optional(types.number, 0),
  limited: types.optional(types.number, 500000),
}).actions((self) => ({
  setBalance(balance:number) {
    self.balance = balance;
  },
  setRebt(debt:number) {
    self.debt = debt;
  },
  setLimited(limited:number) {
    self.limited = limited;
  },
}));
