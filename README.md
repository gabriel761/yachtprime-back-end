# Yatch prime back-end
## SQL
### configuração de código de caracteres
Utilize o comando abaixo com o sistema psql rodando para alterar o código de configuração de caracteres para UTF-8 

```sql
postgres=# \! chcp 65001
```

Caso tenha problemas para inserir dados, utilize os comandos abaixo para configurar os caracteres do servidor e do cliente do postgre

```sql
SET client_encoding TO 'UTF8';
```
