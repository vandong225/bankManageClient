import { types } from 'mobx-state-tree';
import { CreditModel } from './creditAccount';
import { FullNameModel } from './Person/FullName';

export const InfoDebtModel = types.model('InfoDebtModel', {
  customerName: types.optional(FullNameModel, {}),
  customerId: types.optional(types.number, 0),
  credit: types.optional(CreditModel, {}),
});
