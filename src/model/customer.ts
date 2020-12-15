import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { PersonModel } from './Person/Person';

const CustomerBaseModel = types.model('CustomerBase', {});

export const CustomerModel = types.compose(CustomerBaseModel, PersonModel);

export interface ICustomerModel extends Instance<typeof CustomerModel>{}
export type TCustomerIn = SnapshotIn<typeof CustomerModel>;
export type TCustomerOut = SnapshotOut<typeof CustomerModel>;
