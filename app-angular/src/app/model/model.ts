export interface Model {
  name?: string;
  brand?: string;
  _links?: {self: {href: string}};
}

export interface GetModels {
  _embedded: {
      model: Model[];
      _links: {self: {href: string}};
  };
}
