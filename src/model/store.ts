import axios from 'axios';
import { applySnapshot, flow, Instance, types } from 'mobx-state-tree';
import { EmployeeModel } from './employee';

const { URL_SERVER } = process.env;

export const StoreModel = types.model({
  employees: types.array(EmployeeModel),
  employee: types.optional(EmployeeModel, {}),
  // loading
  isLoading: types.optional(types.boolean, false),
}).actions((self) => ({
  getAllEmployee: flow(function* getAllEmployee() {
    self.isLoading = true;
    const employees = yield axios.get(`${URL_SERVER}/employees`);
    applySnapshot(self.employees, employees.data._embedded.employeeList);
    self.isLoading = false;
  }),
  getEmployee: flow(function* getEmplyee(eid:string) {
    self.isLoading = true;
    const employee = yield axios.get(`${URL_SERVER}/employee/${eid}`);
    console.log(employee);
    applySnapshot(self.employee, employee.data);
    console.log(self.employee)
    self.isLoading = false;
  })
}));

export interface IStoreModel extends Instance<typeof StoreModel>{}
