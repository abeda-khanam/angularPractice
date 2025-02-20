export class Customer {
  customerNo: number;
  name: string;
  address: string;
  city: string;
  country: string;

  constructor(customerNo: number, name: string, address: string, city: string, country: string) {
    this.customerNo = customerNo;
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
  }

  // // Method to display customer info
  // getCustomerInfo(): string {
  //   return `Customer No: ${this.customerNo}, Name: ${this.name}, Address: ${this.address}, City: ${this.city}, Country: ${this.country}`;
  // }
}
