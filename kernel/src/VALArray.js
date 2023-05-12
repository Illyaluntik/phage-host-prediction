export function computeValue(l, val, q, lb, rb) {
  return val + ((rb - lb + 1) * (q - l));
}

export function getVALArray(S, LCP, rmq) {
  const VALArray = new Array(S.length);
  VALArray[0] = 0;

  const valTopDown = (interval, idx, val) => {
    let [l, k, j] = interval;
    let m = idx;

    while (LCP[m] == l) {
      VALArray[m] = val;

      if (k != m - 1) {
        const childIdx = rmq(k + 1, m - 1);
        const q = LCP[childIdx];
        const childVal = computeValue(l, val, q, k, m - 1);
        valTopDown([q, k, m - 1], childIdx, childVal);
      }

      k = m;

      if (k == j)
        return;
      else
        m = rmq(k + 1, j);
    }

    const q = LCP[m];
    const childVal = computeValue(l, val, q, k, j);
    valTopDown([q, k, j], m, childVal);
  };

  valTopDown([0, 0, S.length - 1], rmq(1, S.length - 1), 0);

  return VALArray;
}
