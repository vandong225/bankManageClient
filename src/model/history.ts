import { types } from 'mobx-state-tree';
import { FullNameModel } from './Person/FullName';

export const HistoryModel = types.model('HistoryModel', {
  fullName: types.optional(FullNameModel, {}),
  moneyTranfer: types.optional(types.number, 0),
});
