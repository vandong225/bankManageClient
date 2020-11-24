import { types } from 'mobx-state-tree';
import { AddressModel } from './Address';
import { FullNameModel } from './FullName';

export const PersonModel = types.model('Person', {
  id: types.optional(types.number, 0),
  idCard: types.optional(types.string, ''),
  dob: types.optional(types.string, ''),
  fullName: types.optional(FullNameModel, {}),
  address: types.optional(AddressModel, {}),
});
