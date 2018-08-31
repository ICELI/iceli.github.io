
---
title: git renaming-and-changing-files-in-git-without-losing-history
date: Fri Aug 31 2018 15:58:20 GMT+0800 (CST)
tags:

---

### -M[<n>]
#### --find-renames[=<n>]
Detect renames. If n is specified, it is a threshold on the similarity index (i.e. amount of addition/deletions compared to the file’s size). For example, -M90% means Git should consider a delete/add pair to be a rename if more than 90% of the file hasn’t changed. Without a % sign, the number is to be read as a fraction, with a decimal point before it. I.e., -M5 becomes 0.5, and is thus the same as -M50%. Similarly, -M05 is the same as -M5%. To limit detection to exact renames, use -M100%. The default similarity index is 50%.


https://coderwall.com/p/_csouq/renaming-and-changing-files-in-git-without-losing-history

https://git-scm.com/docs/git-diff#git-diff--Mltngt