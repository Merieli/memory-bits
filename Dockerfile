FROM mysql:8.0.36-debian

# Nome do banco de dados passado como variável de ambiente
ENV MYSQL_DATABASE marvel

# Adicionando os scripts SQL para serem executados na criação do banco 
COPY ./database/ /docker-entrypoint-initdb.d/
