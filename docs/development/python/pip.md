---
description: Pip Cli Useful Commands
---

# Pip Python Package Manager

## List installed packages with pip

```python
pip list
```

## List outdated packages

```python
pip list --outdated
```

## Instal or update package to specific version

exmaple with MySQL_python package:

```python
pip install MySQL_python==1.2.2
```

## Update package to the latest avalable version

exmaple with MySQL_python package:

```python
pip install MySQL_python --upgrade
```

## Update Pip Itself

```python
pip install --upgrade pip
```

## Update All Packages Installed With Pip

```python
pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 pip install -U
```
