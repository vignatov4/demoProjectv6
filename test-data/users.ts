export type Credentials = {
  email: string;
  password: string;
};

export type User = Credentials & {
  name: string;
};

// Public demo accounts provided by practicesoftwaretesting.com.
export const admin: User = {
  email: 'admin@practicesoftwaretesting.com',
  password: 'welcome01',
  name: 'John Doe',
};

export const customer: User = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
  name: 'Jane Doe',
};

export const customer2: User = {
  email: 'customer2@practicesoftwaretesting.com',
  password: 'welcome01',
  name: 'Jack Howe',
};

export const customer3: User = {
  email: 'customer3@practicesoftwaretesting.com',
  password: 'pass123',
  name: 'Bob Smith',
};

// Not a real account, so failed logins can't lock the shared demo customer.
export const unknownUser: Credentials = {
  email: 'nobody@example.com',
  password: 'wrongpass1',
};
