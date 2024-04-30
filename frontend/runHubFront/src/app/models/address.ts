export interface IAddressDto {
  city: string;
  street: string;
  postalCode: string;
}

export class AddressDto implements IAddressDto {
  constructor(init: Partial<AddressDto>) {
    Object.assign(this, init);
  }

  city: string = "";
  street: string = "";
  postalCode: string = "";
}
