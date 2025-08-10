import numpy as np
from scipy.sparse import csr_matrix

def build_transition(edges):
    # edges: list of (src_idx, dst_idx, weight); users must be mapped to [0..n)
    # row-normalize into a CSR transition matrix P
    if not edges:
        return csr_matrix((0,0))
    edges = np.array(edges, dtype=np.float32)
    src, dst, w = edges[:,0].astype(np.int32), edges[:,1].astype(np.int32), edges[:,2]
    n = int(max(src.max(), dst.max())) + 1
    # sum by row
    row_sum = np.bincount(src, weights=w, minlength=n)
    nz = row_sum[src]
    probs = np.divide(w, nz, out=np.zeros_like(w), where=nz>0)
    return csr_matrix((probs, (src, dst)), shape=(n, n), dtype=np.float32)

def ppr_single(P: csr_matrix, u_idx: int, alpha=0.15, iters=20):
    n = P.shape[0]
    if n == 0: return np.array([])
    pi = np.zeros(n, dtype=np.float32); pi[u_idx] = 1.0
    e  = np.zeros(n, dtype=np.float32); e[u_idx]  = 1.0
    for _ in range(iters):
        pi = alpha*e + (1-alpha)*(pi @ P)
    return pi
