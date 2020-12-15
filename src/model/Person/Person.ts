import { types } from 'mobx-state-tree';
import { AddressModel } from './Address';
import { FullNameModel } from './FullName';

export const PersonModel = types.model('Person', {
  id: types.maybe(types.number),
  idCard: types.optional(types.string, ''),
  dob: types.optional(types.string, ''),
  fullName: types.optional(FullNameModel, {}),
  address: types.optional(AddressModel, {}),
}).actions((self) => ({
  setIdCard(idCard:string) {
    self.idCard = idCard;
  },
  setDob(dob:string) {
    self.dob = dob;
  },
}));
