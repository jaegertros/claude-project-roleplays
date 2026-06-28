# Embedding model trial — recall scoreboard

20 campaign queries · 40-chunk/file sample (1000-char chunks) · hit@5 + MRR

| rank | model | dim | hit@5 | MRR |
|---|---|---|---|---|
| 1 | intfloat/multilingual-e5-large | 1024 | 0.7 | 0.622 |
| 2 | nvidia/llama-nemotron-embed-vl-1b-v2:free | 2048 | 0.7 | 0.539 |
| 3 | sentence-transformers/all-minilm-l6-v2 | 384 | 0.7 | 0.535 |
| 4 | intfloat/e5-large-v2 | 1024 | 0.7 | 0.512 |
