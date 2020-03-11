import { Model } from './model';

export interface Car {
  id?: string;
  plaque?: string;
  employee?: string;
  model?: Model;
  _links?: {self: {href: string}};
}

export interface GetCars {
  _embedded: {
      car: Car[];
      _links: {self: {href: string}};
  };
}

