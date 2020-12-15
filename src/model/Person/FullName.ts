import { Instance, types } from 'mobx-state-tree';

export const FullNameModel = types.model('FullName', {
  id: types.maybe(types.number),
  firstName: types.optional(types.string, ''),
  midName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
}).actions((self) => ({
  setFirstName(name:string) {
    self.firstName = name;
  },
  setMidName(name:string) {
    self.midName = name;
  },
  setLastName(name:string) {
    self.lastName = name;
  },
})).views((self) => ({
  get fullName() {
    const { firstName, lastName, midName } = self;
    return `${firstName} ` + `${midName} ` + `${lastName}`;
  },
}));

export interface IFullNameModel extends Instance<typeof FullNameModel>{}
