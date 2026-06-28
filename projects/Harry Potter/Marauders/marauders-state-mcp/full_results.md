# FULL embedding trial — all chunks, all models

20 queries · full corpus = 8819 chunks (~1000-char) · hit@5 + MRR

| rank | model | dim | hit@5 | MRR |
|---|---|---|---|---|
| 1 | thenlper/gte-base | 768 | 1.0 | 0.938 |
| 2 | intfloat/e5-large-v2 | 1024 | 1.0 | 0.927 |
| 3 | thenlper/gte-large | 1024 | 1.0 | 0.925 |
| 4 | sentence-transformers/multi-qa-mpnet-base-dot-v1 | 768 | 1.0 | 0.897 |
| 5 | sentence-transformers/all-minilm-l6-v2 | 384 | 0.95 | 0.95 |
| 6 | nvidia/llama-nemotron-embed-vl-1b-v2:free | 2048 | 0.95 | 0.917 |
| 7 | intfloat/e5-base-v2 | 768 | 0.95 | 0.917 |
| 8 | intfloat/multilingual-e5-large | 1024 | 0.95 | 0.912 |
| 9 | sentence-transformers/all-mpnet-base-v2 | 768 | 0.95 | 0.892 |
| 10 | sentence-transformers/paraphrase-minilm-l6-v2 | 384 | 0.95 | 0.85 |
| 11 | perplexity/pplx-embed-v1-0.6b | 1024 | 0.9 | 0.9 |
| 12 | sentence-transformers/all-minilm-l12-v2 | 384 | 0.9 | 0.825 |

**Incomplete (endpoint kept erroring — rerun to retry):** baai/bge-base-en-v1.5
