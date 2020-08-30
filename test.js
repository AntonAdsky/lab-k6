import http from 'k6/http';
import { check } from 'k6';

export let options = {
  scenarios: {
    make_order: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1m',
      duration: '4h',
      gracefulStop: '0s',
      preAllocatedVUs: 5,
      maxVUs: 10,
      exec: 'make_order'
     },

  },
};

export function make_order() {
  let url = 'http://185.233.0.230:3000/';
  let resMain = http.get(url);
  check(resMain, {
    'is status 200': (r) => r.status === 200,
  });
}