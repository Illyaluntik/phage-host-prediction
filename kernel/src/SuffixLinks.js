import { getInterval } from './getInterval.js';

export function getSuffixLinks(S, SA, LCP, rmq) {
  const SL = new Array(S.length).fill([null, null]);

  const computeLink = (l, p, q, i_1, j_1) => {
    const m_1 = rmq(i_1 + 1, j_1);
    const l_1 = LCP[m_1];
    let [p_1, q_1] = [p, q];
    let c = Math.max(l - 1, 0);
    while (c != l_1 - 1) {
      const res = getInterval(S, SA, LCP, [p_1, q_1], S[SA[i_1] + 1 + c], rmq);
      [p_1, q_1] = res;
      c = LCP[rmq(p_1 + 1, q_1)];
    }
    SL[m_1] = [p_1, q_1];
    return [l_1, m_1, p_1, q_1];
  };

  const linkTopDown = (l, i, j, fst, p, q) => {
    let k = i;
    let m = fst;
    while (true) {
      if (k != m - 1) {
        let [l_1, m_1, p_1, q_1] = computeLink(l, p, q, k, m - 1);
        linkTopDown(l_1, k, m - 1, m_1, p_1, q_1);
      }

      k = m; // # k is the left boundary of the next child interval

      if (k == j)
        return; // # no more non-singleton child intervals
      else
        m = rmq(k + 1, j);
      if (LCP[m] != l)
        break;
    }

    // # [k..j] is the last non-singleton child interval of [i..j]
    let [l_1, m_1, p_1, q_1] = computeLink(l, p, q, k, j);
    linkTopDown(l_1, k, j, m_1, p_1, q_1);
  };

  const fst = rmq(1, S.length - 1);
  const [p, q] = [0, S.length - 1];
  SL[fst] = [p, q];
  linkTopDown(0, 0, S.length - 1, fst, p, q);

  return SL;
}
