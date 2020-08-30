import http from 'k6/http';
import { check } from 'k6';

const host = `${__ENV.HOST}` ||'localhost';

export let options = {
  scenarios: {
    make_order: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1m',
      duration: '1m',
      gracefulStop: '0s',
      preAllocatedVUs: 5,
      maxVUs: 10,
      exec: 'make_order'
     },

  },
};

export function make_order() {
  var url = host;

  var payload = JSON.stringify({
    adress: '',
    cartItems: [],
    email: '',
    name: '',
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let resMain = http.get(url);
  check(resMain, {
    'is status 200': (r) => r.status === 200,
  });

  let resOrder = http.post(url + '/orders', payload, params);
  check(resOrder, {
    'is status 200': (r) => r.status === 200,
  });
}