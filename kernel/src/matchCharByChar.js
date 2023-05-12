import { getInterval } from './getInterval.js';

export function matchCharByChar(S_i, S_j, SA_i, LCP_i, interval, pos, k, rmq) {
  let [i, j] = interval;
  interval = getInterval(S_i, SA_i, LCP_i, [i, j], S_j[pos + k], rmq);

  while (interval != null) {
    let [lb, rb] = interval;
    if (lb != rb) {
      const l = LCP_i[rmq(lb + 1, rb)]
      while (k < l && S_i[SA_i[lb] + k] == S_j[pos + k])
        k = k + 1;
      if (k < l)
        return [k, lb, rb, i, j];
      [i, j] = [lb, rb]
      interval = getInterval(S_i, SA_i, LCP_i, [i, j], S_j[pos + k], rmq)
    }
    else { // singleton interval found
      while (S_i[SA_i[lb] + k] == S_j[pos + k])
        k = k + 1;
      return [k, lb, rb, i, j];
    }
  }

  return [LCP_i[rmq(i + 1, j)], i, j, i, j];
}
