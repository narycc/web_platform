/**
 * Created by zpp on 2017/06/10.
 */
import apisauce from 'apisauce';

const BASE_URL = location.protocol + '//' + location.host + '/api';
const TIME_OUT = 10000;

export const create = function (baseURL = BASE_URL, timeout = TIME_OUT) {

  const api = apisauce.create({
    baseURL,
    timeout,
    headers: {'Cache-Control': 'no-cache'},
  });

  return api;
};
