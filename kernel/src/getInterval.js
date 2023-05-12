export function getInterval(S, SA, LCP, interval, a, rmq) {
  const [i, j] = interval;

  if (i == j) {
    if (S[SA[i]] == a)
      return [i, i];
    else
      return null;
  }

  let k = i;
  let m = rmq(i + 1, j);
  const l = LCP[m];

  while (true) {
    // # IndexError: string index out of range
    // # if string is not termineted with $
    if (S[SA[k] + l] == a)
      return [k, m - 1];

    k = m;
    if (k == j)
      break;
    else
      m = rmq(k + 1, j);

    if (LCP[m] != l)
      break;
  }
  if (S[SA[k] + l] == a)
    return [k, j];
  else
    return null;
}
