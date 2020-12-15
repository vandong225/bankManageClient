import axios from 'axios';
import {
  applySnapshot, destroy, flow, getSnapshot, Instance, types,
} from 'mobx-state-tree';
import { CreditModel } from './creditAccount';
import { CustomerModel } from './customer';
import { DebitModel } from './debitAccount';
import { EmployeeModel } from './employee';
import { HistoryModel } from './history';
import { InfoDebtModel } from './InfoDebt';

const { URL_SERVER } = process.env;

export const StoreModel = types.model({
  employees: types.array(EmployeeModel),
  employee: types.optional(EmployeeModel, {}),
  customers: types.array(CustomerModel),
  customer: types.optional(CustomerModel, {}),
  debits: types.array(DebitModel),
  debit: types.optional(DebitModel, {}),
  credits: types.array(CreditModel),
  credit: types.optional(CreditModel, {}),
  historyTranfer: types.array(HistoryModel),
  infoDebt: types.array(InfoDebtModel, {}),
  // loading
  isLoading: types.optional(types.boolean, false),
}).actions((self) => ({
  getAllEmployee: flow(function* getAllEmployee() {
    self.isLoading = true;
    const employees = yield axios.get(`${URL_SERVER}/employees`);
    applySnapshot(self.employees, employees.data);
    self.isLoading = false;
  }),
  getEmployee: flow(function* getEmplyee(eid:string) {
    self.isLoading = true;
    if (eid === 'new') {
      applySnapshot(self.employee, getSnapshot(EmployeeModel.create({})));
    } else {
      const employee = yield axios.get(`${URL_SERVER}/employee/${eid}`);
      console.log(employee);
      applySnapshot(self.employee, employee.data);
    }
    console.log(self.employee);
    self.isLoading = false;
  }),
  saveEmployee: flow(function* () {
    self.isLoading = true;
    const snapShot = getSnapshot(self.employee);
    console.log(JSON.stringify(snapShot));
    const employee = yield fetch(`${URL_SERVER}/employee`, {
      method: 'Post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(snapShot),
    });
    self.isLoading = false;
    if (employee.status === 204) return false;
    return true;
  }),
  updateEmployee: flow(function* (eId:number) {
    self.isLoading = true;

    const snapShot = getSnapshot(self.employee);
    const employee = yield fetch(`${URL_SERVER}/employee/${eId}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(snapShot),
    });
    self.isLoading = false;
  }),
  deleteEmployee: flow(function* deleteEmployee(eid:number) {
    self.isLoading = true;
    const params = { id: eid };
    yield axios.delete(`${URL_SERVER}/employee/${eid}`, { params });
    const employee = self.employees.find((emp) => emp.id === eid);
    if (employee) destroy(employee);
    self.isLoading = false;
  }),
  getSaleryEmployee: flow(function* (eid:number, from:string, to:string) {
    self.isLoading = true;
    const res = yield axios.get(`${URL_SERVER}/employee/${eid}/salery?fromDate=${from}&toDate=${to}`);
    if (res.status === 200) {
      return res.data;
    }
    self.isLoading = false;
  }),
  // customer
  getAllCustomer: flow(function* () {
    self.isLoading = true;
    const customers = yield axios.get(`${URL_SERVER}/customers`);
    applySnapshot(self.customers, customers.data);
    self.isLoading = false;
  }),
  getCustomer: flow(function* (eid:string) {
    self.isLoading = true;
    if (eid === 'new') {
      applySnapshot(self.customer, getSnapshot(CustomerModel.create({})));
    } else {
      const customer = yield axios.get(`${URL_SERVER}/customer/${eid}`);
      applySnapshot(self.customer, customer.data);
    }
    console.log(self.employee);
    self.isLoading = false;
  }),
  getDebit: flow(function* (eid:string) {
    self.isLoading = true;
    if (eid === 'new') {
      applySnapshot(self.debit, getSnapshot(DebitModel.create({})));
    } else {
      const customer = yield axios.get(`${URL_SERVER}/debit/account/${eid}`);
      applySnapshot(self.debit, customer.data);
    }
    self.isLoading = false;
  }),
  getCredit: flow(function* (eid:string) {
    self.isLoading = true;
    if (eid === 'new') {
      applySnapshot(self.credit, getSnapshot(CreditModel.create({})));
    } else {
      const customer = yield axios.get(`${URL_SERVER}/credit/account/${eid}`);
      applySnapshot(self.credit, customer.data);
    }
    self.isLoading = false;
  }),
  saveCustomer: flow(function* () {
    self.isLoading = true;
    const snapShot = getSnapshot(self.customer);
    const customer = yield fetch(`${URL_SERVER}/customer`, {
      method: 'Post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(snapShot),
    });
    self.isLoading = false;
    if (customer.status === 204) return false;
    return true;
  }),
  updateCustomer: flow(function* (eId:number) {
    self.isLoading = true;

    const snapShot = getSnapshot(self.customer);
    const customer = yield fetch(`${URL_SERVER}/customer/${eId}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(snapShot),
    });
    self.isLoading = false;
  }),
  deleteCustomer: flow(function* (eid:number) {
    self.isLoading = true;
    const params = { id: eid };
    yield axios.delete(`${URL_SERVER}/customer/${eid}`, { params });
    const customer = self.customers.find((emp) => emp.id === eid);
    if (customer) destroy(customer);
    self.isLoading = false;
  }),
  getAllTranfer: flow(function* (from:string, to:string) {
    self.isLoading = true;
    const res = yield axios.get(`${URL_SERVER}/history/credit?fromDate=${from}&toDate=${to}`);
    if (res.status === 200) {
      applySnapshot(self.historyTranfer, res.data);
    }
    self.isLoading = false;
  }),
  getListDebt: flow(function* () {
    self.isLoading = true;
    const res = yield axios.get(`${URL_SERVER}/credit/debt`);
    if (res.status === 200) {
      self.isLoading = false;
      applySnapshot(self.infoDebt, res.data);
    }
    self.isLoading = false;
    return [];
  }),
  getTop10: flow(function* () {
    self.isLoading = true;
    const res = yield axios.get(`${URL_SERVER}/top10`);
    if (res.status === 200) {
      applySnapshot(self.customers, res.data);
    }
    self.isLoading = false;
  }),
  getAllCredits: flow(function* () {
    self.isLoading = true;
    const res = yield axios.get(`${URL_SERVER}/credit/accounts`);
    if (res.status === 200) {
      applySnapshot(self.credits, res.data);
    }
    self.isLoading = false;
  }),
  getAllDebits: flow(function* () {
    self.isLoading = true;
    const res = yield axios.get(`${URL_SERVER}/debit/accounts`);
    if (res.status === 200) {
      applySnapshot(self.debits, res.data);
    }
    self.isLoading = false;
  }),
  // getDebit: flow(function* (id) {
  //   self.isLoading = true;
  //   const res = yield axios.get(`${URL_SERVER}/debit/account/${id}`);
  //   if (res.status === 200) {
  //     applySnapshot(self.debit, res.data);
  //   }
  //   self.isLoading = false;
  // }),
  payment: flow(function* (idCredit:number, idDebit:number, money:number) {
    self.isLoading = true;
    yield fetch(`${URL_SERVER}/payment`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        idCredit,
        idDebit,
        money,
      }),
    });
    self.isLoading = false;
  }),
  deleteCredit: flow(function* (eid:number) {
    self.isLoading = true;
    yield axios.delete(`${URL_SERVER}/credit/account/${eid}`);
    const customer = self.credits.find((emp) => emp.id === eid);
    if (customer) destroy(customer);
    self.isLoading = false;
  }),
  deleteDebit: flow(function* (eid:number) {
    self.isLoading = true;
    yield axios.delete(`${URL_SERVER}/credit/account/${eid}`);
    const customer = self.debits.find((emp) => emp.id === eid);
    if (customer) destroy(customer);
    self.isLoading = false;
  }),
})).actions((self) => ({
  createDebit: flow(function* (cusId:number, employId:number) {
    self.isLoading = true;
    yield self.getEmployee(employId);
    yield self.getCustomer(cusId);
    const snapShotDebit = getSnapshot(self.debit);
    const snapShotEmp = getSnapshot(self.employee);
    const snapShotCus = getSnapshot(self.customer);
    const res = yield fetch(`${URL_SERVER}/debit/account`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        ...snapShotDebit,
        customer: snapShotCus,
        employee: snapShotEmp,
      }),
    });
    self.isLoading = false;
    if (res.status === 204) return false;
    return true;
  }),
  createCredit: flow(function* (cusId:number, employId:number) {
    self.isLoading = true;
    yield self.getEmployee(employId);
    yield self.getCustomer(cusId);
    const snapShotDebit = getSnapshot(self.credit);
    const snapShotEmp = getSnapshot(self.employee);
    const snapShotCus = getSnapshot(self.customer);
    const res = yield fetch(`${URL_SERVER}/credit/account`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        ...snapShotDebit,
        customer: snapShotCus,
        employee: snapShotEmp,
      }),
    });
    self.isLoading = false;
    if (res.status === 204) return false;
    return true;
  }),
}));

export interface IStoreModel extends Instance<typeof StoreModel>{}
