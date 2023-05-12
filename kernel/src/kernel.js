import { longestCommonPrefix } from 'string-algorithms';
import { suffixArray } from 'string-algorithms';
import { computeValue, getVALArray } from './VALArray.js';
import { getSuffixLinks } from './SuffixLinks.js';
import { computeMatchingStatistics } from './matchingStatistics.js';
import { SparseTable } from './sparseTable.js'

function getSuffixArray(S) {
  return suffixArray(S);
}

function getLCPArray(S, SA) {
  const LCP = longestCommonPrefix(S + '$', SA);
  LCP.unshift(-1);
  LCP.push(-1)
  return LCP;
}

export function getKernel(X, Y) {
  const kernel = Array.from(Array(X.length), () => new Array(Y.length).fill(0));

  for (let i = 0; i < X.length; i++) {
    const rowStart = Date.now();
    let S_i = X[i];
    const SA_i = getSuffixArray(S_i);
    const LCP_i = getLCPArray(S_i, SA_i);
    S_i += '#';

    const ST = new SparseTable(LCP_i);
    const rmq = (qs, qe) => ST.query(qs, qe);

    const VAL_i = getVALArray(S_i, LCP_i, rmq);
    const SL_i = getSuffixLinks(S_i, SA_i, LCP_i, rmq);

    for (let j = 0; j < Y.length; j++) {
      const S_j = Y[j] + '$';
      const MS_j = computeMatchingStatistics(S_i, S_j, SA_i, LCP_i, SL_i, rmq);

      for (let b = 0; b < S_j.length - 1; b++) {
        const [q, lb, rb] = MS_j[b];
        let l, val_be;

        if (LCP_i[lb] >= LCP_i[rb + 1]) {
          l = LCP_i[lb];
          val_be = VAL_i[lb];
        } else {
          l = LCP_i[rb + 1];
          val_be = VAL_i[rb + 1];
        }

        kernel[i][j] += computeValue(l, val_be, q, lb, rb);
      }
    }
    const rowEnd = Date.now();
    if (i % Math.floor(X.length / 10) === 0) {
      // console.log(`${Math.round((i / X.length) * 100)}% row ${i} time ${(rowEnd - rowStart) / 1000}`);
      console.log(`${Math.round((i / X.length) * 100)}%`);
    }
  }

  return kernel;
}
