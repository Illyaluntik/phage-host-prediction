// export function buildSparseTable(arr) {

//   var n = arr.length, m = Math.floor(Math.log2(n)) + 1;
//   var fmin = new Array(n * m);
//   var indexTable = new Array(n * m);

//   function getIndex(d1, d2) {
//     return d1 * n + d2;
//   }

//   // build ST
//   var i, j, i_max, idx, idx2, idx3;
//   for (i = 0; i < n; ++i) {
//     idx = getIndex(i, 0);
//     fmin[idx] = arr[i];
//   }
//   for (j = 1; j < m; ++j) {
//     for (i = 0, i_max = n + 1 - (1 << j); i < i_max; ++i) {
//       idx = getIndex(i, j);
//       idx2 = getIndex(i, j - 1);
//       idx3 = getIndex(i + (1 << (j - 1)), j - 1);
//       fmin[idx] = Math.min(fmin[idx2], fmin[idx3]);
//       // indexTable[idx] =
//     }
//   }

//   return function (idxBegin, idxEnd) {
//     var k = Math.floor(Math.log2(idxEnd - idxBegin + 1));
//     return Math.min(fmin[getIndex(idxBegin, k)], fmin[getIndex(idxEnd + 1 - (1 << k), k)]);
//   };
// }

export class SparseTable {
  constructor(arr) {
    const n = arr.length;
    const log_n = Math.ceil(Math.log2(n)) + 1;
    this.sparse_table = new Array(n).fill().map(() => new Array(log_n).fill(0));
    this.index_table = new Array(n).fill().map(() => new Array(log_n).fill(0));

    for (let i = 0; i < n; i++) {
      this.sparse_table[i][0] = arr[i];
      this.index_table[i][0] = i;
    }

    for (let j = 1; j < log_n; j++) {
      const pow_2 = 1 << j;
      for (let i = 0; i <= n - pow_2; i++) {
        const left_val = this.sparse_table[i][j - 1];
        const right_val = this.sparse_table[i + pow_2 / 2][j - 1];
        if (left_val <= right_val) {
          this.sparse_table[i][j] = left_val;
          this.index_table[i][j] = this.index_table[i][j - 1];
        } else {
          this.sparse_table[i][j] = right_val;
          this.index_table[i][j] = this.index_table[i + pow_2 / 2][j - 1];
        }
      }
    }
  }

  query(l, r) {
    const j = Math.floor(Math.log2(r - l + 1));
    const left_val = this.sparse_table[l][j];
    const i = r - (1 << j) + 1;
    const right_val = this.sparse_table[i][j];
    if (left_val <= right_val) {
      return this.index_table[l][j];
    } else {
      return this.index_table[i][j];
    }
  }
}
