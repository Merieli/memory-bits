```bash
# Construir container docker
docker build -t gamedb:1.0 .

# Verificar se imagem está sendo executada 
docker images

# Executar container docker
docker run -d -p 3307:3307 --name memory-bits-db \
-e MYSQL_ROOT_PASSWORD=memory123 gamedb:1.0

# Executar o container com o bash
docker exec -it memory-bits-db bash

# Acessar o terminal do MySQL
mysql -uroot -p
# Depois digitar a senha e começar a usar o Banco de Dados
```