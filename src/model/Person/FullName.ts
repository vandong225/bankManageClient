import { Instance, types } from 'mobx-state-tree';

export const FullNameModel = types.model('FullName', {
  id: types.optional(types.number, 0),
  firstName: types.optional(types.string, ''),
  midName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
}).views((self) => ({
  get fullName() {
    const { firstName, lastName, midName } = self;
    return `${firstName} ` + `${midName} ` + `${lastName}`;
  },
}));

export interface IFullNameModel extends Instance<typeof FullNameModel>{}
