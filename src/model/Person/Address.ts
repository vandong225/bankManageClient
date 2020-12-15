import { types } from 'mobx-state-tree';

export const AddressModel = types.model('Person', {
  id: types.maybe(types.number),
  des: types.optional(types.string, ''),
  district: types.optional(types.string, ''),
  city: types.optional(types.string, ''),
  street: types.optional(types.string, ''),
  country: types.optional(types.string, ''),
}).actions((self) => ({
  setDes(des:string) {
    self.des = des;
  },
  setDistrict(district:string) {
    self.district = district;
  },
  setStreet(street:string) {
    self.street = street;
  },
  setCity(city:string) {
    self.city = city;
  },
  setCountry(country:string) {
    self.country = country;
  },
})).views((self) =>({
  get fullAdress() {
    return `${self.des}-${self.street}-${self.district}-${self.city}-${self.city}`;
  }
}));
