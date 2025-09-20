type LCHook =
 | 'beforeCreate'
 | 'created'
 | 'beforeMount'
 | 'mounted'
 | 'beforeUpdate'
 | 'updated'
 | 'beforeUnmount'
 | 'unmounted';

type UserData = {
 id: number;
 name: string;
 username: string;
 email: string;
 address: {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
   lat: string;
   lng: string;
  };
 };
 phone: string;
 website: string;
 company: {
  name: string;
  catchPhrase: string;
  bs: string;
 };
};

type PostData = {
 userId: number;
 id: number;
 title: string;
 body: string;
};
