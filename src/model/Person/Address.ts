import { types } from 'mobx-state-tree';

export const AddressModel = types.model('Person', {
  id: types.optional(types.number, 0),
  des: types.optional(types.string, ''),
  district: types.optional(types.string, ''),
  city: types.optional(types.string, ''),
  street: types.optional(types.string, ''),
  country: types.optional(types.string, ''),
});
