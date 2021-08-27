---
description: Linux - ESXi how to, guides, examples, and simple usage
---

# ESXi

## Reload VM after UUID change

```bash
vim-cmd vmsvc/getallvms
vim-cmd vmsvc/reload $vmID
```
