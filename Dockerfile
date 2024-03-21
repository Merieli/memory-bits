# FROM mysql:8.0.36-debian

# # Nome do banco de dados passado como variável de ambiente
# ENV MYSQL_DATABASE gamedb

# # Adicionando os scripts SQL para serem executados na criação do banco 
# COPY ./database/ /docker-entrypoint-initdb.d/

# EXPOSE 3307