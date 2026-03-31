1. Configurar o Banco de Dados Relacional na AWS
Criar uma instância do RDS (Relational Database Service):

Acesse o console da AWS e vá para o serviço RDS.
Clique em Create database.
Escolha o mecanismo do banco de dados (por exemplo, MySQL, PostgreSQL, etc.).
Configure:
DB Instance Identifier: Nome da instância.
Master Username e Password: Credenciais do banco.
Database Name: Nome do banco de dados.
Escolha o tipo de instância e o armazenamento.
Configure a conectividade:
Certifique-se de que a instância está acessível pela sua aplicação (use um Security Group para permitir conexões).
Finalize a criação e anote o endpoint do banco de dados.
Configurar o arquivo .env:

Atualize o arquivo .env com as credenciais do banco de dados:
```
DATABASE_HOST=<endpoint-do-rds>
DATABASE_USER=<usuario>
DATABASE_PASSWORD=<senha>
DATABASE_NAME=<nome-do-banco>
DATABASE_PORT=3306
PORT=3001
```

2. Criar a Imagem Docker
Certifique-se de que o Dockerfile está correto:

O trecho fornecido está correto, mas certifique-se de que o server.js usa as variáveis do .env para conectar ao banco.
Construir a imagem Docker:
```
docker build -t meu-projeto .
``` 

No terminal, execute:
Testar localmente:

Execute o container localmente para garantir que tudo está funcionando:
``` 
docker run -p 3001:3001 --env-file .env meu-projeto
``` 

3. Subir a Imagem para o Amazon Elastic Container Registry (ECR)
Criar um repositório no ECR:

Acesse o console da AWS e vá para o serviço ECR.
Clique em Create repository e dê um nome ao repositório.

Fazer login no ECR:

Use o comando fornecido pelo ECR para autenticar o Docker no repositório:
```
aws ecr get-login-password --region <sua-regiao> | docker login --username AWS --password-stdin <seu-id>.dkr.ecr.<sua-regiao>.amazonaws.com
```
Enviar a imagem para o ECR:

Marque a imagem com o repositório do ECR:
```
docker tag meu-projeto:latest <seu-id>.dkr.ecr.<sua-regiao>.amazonaws.com/meu-projeto:latest
```

Envie a imagem:
```
docker push <seu-id>.dkr.ecr.<sua-regiao>.amazonaws.com/meu-projeto:latest
```

4. Implantar no Amazon ECS (Elastic Container Service)
Criar um Cluster no ECS:

Acesse o console da AWS e vá para o serviço ECS.
Clique em Clusters e depois em Create Cluster.
Escolha EC2 ou Fargate (recomendado para aplicações simples).
Criar uma Task Definition:

Vá para Task Definitions e clique em Create new Task Definition.
Escolha Fargate.
Configure o container:
Container name: Nome do container.
Image: Use o link da imagem no ECR.
Port mappings: Configure a porta 3001.
Executar a Task:

No cluster, clique em Run Task e selecione a Task Definition criada.
5. Configurar o Load Balancer (Opcional)
Configure um Application Load Balancer (ALB) para expor sua aplicação na internet.
Certifique-se de que o Security Group permite conexões na porta 80 ou 443.
6. Testar a Aplicação
Acesse o endpoint público do Load Balancer ou do ECS para verificar se a aplicação está funcionando.