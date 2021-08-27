---
description: Development - Python how to, guides, examples, and simple usage
---

# Python

## Pip Python Package Manager

### List installed packages with pip

```python
pip list
```

### List outdated packages

```python
pip list --outdated
```

### Instal or update package to specific version

exmaple with MySQL_python package:

```python
pip install MySQL_python==1.2.2
```

### Update package to the latest avalable version

exmaple with MySQL_python package:

```python
pip install MySQL_python --upgrade
```

### Update Pip Itself

```python
pip install --upgrade pip
```

### Update All Packages Installed With Pip

```python
pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1  | xargs -n1 pip install -U
```

## Generate requirements.txt For a Project

Run this command at terminal at the root of the project:

```python
pip freeze > requirements.txt
```
