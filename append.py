# -*- coding: utf-8 -*-
with open('assets/css/style.css', 'a', encoding='utf-8') as f:
    f.write("\n\n.ptags-row { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-bottom: 2rem; }\n")
    f.write(".pactions { display: flex; gap: 1rem; flex-wrap: wrap; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.05); }\n")
    f.write("body.light-mode .pactions { border-top: 1px solid rgba(0,0,0,0.05); }\n")
