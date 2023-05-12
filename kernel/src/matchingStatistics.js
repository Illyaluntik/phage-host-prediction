import { getInterval } from './getInterval.js';
import { matchCharByChar } from './matchCharByChar.js';

export function computeMatchingStatistics(S_i, S_j, SA_i, LCP_i, SL_i, rmq) {
  const n1 = S_i.length;
  const n2 = S_j.length - 1;
  const MS_j = new Array(n2).fill([0, 0, 0]);

  let [k, lb, rb, i, j] = matchCharByChar(S_i, S_j, SA_i, LCP_i, [0, n1 - 1], 0, 0, rmq);
  MS_j[0] = [k, lb, rb];

  for (let p2 = 1; p2 < n2; p2++) {
    if (k == 0) {
      [k, lb, rb, i, j] = matchCharByChar(S_i, S_j, SA_i, LCP_i, [0, n1 - 1], p2, 0, rmq);
      MS_j[p2] = [k, lb, rb];
    }
    else {
      let [p, q] = SL_i[rmq(i + 1, j)] // suffix link interval of [i..j]
      let l = LCP_i[rmq(p + 1, q)]; // lcp-value of [p..q]
      [i, j] = [p, q];
      while (l < k - 1 && p != q) { // skip and count
        [p, q] = getInterval(S_i, SA_i, LCP_i, [p, q], S_j[p2 + l], rmq);
        if (p != q) { // lcp-interval found
          l = LCP_i[rmq(p + 1, q)];
          if (l <= k - 1)
            [i, j] = [p, q];
        }
      }
      if (l == k - 1) {
        [k, lb, rb, i, j] = matchCharByChar(S_i, S_j, SA_i, LCP_i, [i, j], p2, k - 1, rmq);
        MS_j[p2] = [k, lb, rb];
      }
      else {
        k = k - 1;
        MS_j[p2] = [k, p, q];
      }
    }
  }

  return MS_j;
}
