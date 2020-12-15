import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';
import { PersonModel } from './Person/Person';

const enumPosition = types.enumeration('postion', ['manager', 'staff']);

const EmployeeBaseModel = types.model('EmployeeBase', {
  level: types.optional(types.number, 0),
  year: types.optional(types.number, 0),
  position: types.optional(enumPosition, 'staff'),
}).actions((self) => ({
  setLevel(level:number) {
    self.level = level;
  },
  setYear(year:number) {
    self.year = year;
  },
  setPosition(position:TPostion) {
    self.position = position;
  },
}));

export type TPostion = SnapshotOut<typeof enumPosition>;
export const PositionType = [{ label: 'Quản lý', value: 'manager' }, { label: 'Nhân viên', value: 'staff' }];

export const EmployeeModel = types.compose(EmployeeBaseModel, PersonModel);

export interface IEmployeeModel extends Instance<typeof EmployeeModel>{}
export type TEmployeeIn = SnapshotIn<typeof EmployeeModel>;
export type TEmployeeOut = SnapshotOut<typeof EmployeeModel>;
