### m6-s1-backend

<div>
###Para rodar localmente

###Utilizando Docker
* Atualize o docker-compose.yml com seus dados locais, como DB, USER e PASSWORD
* Rode o comando docker-compose up --build
* Depois que o build finalizar e com o compose ativado, rode o comando yarn DockerGenerateMigration e em seguida yarn DockerRunMigration para gerar e rodar as migrations

###Sem Docker
* Crie o .env pegando como exmeplo o .env.example
* Crie o banco de dados via postgreSQL com o mesmo nome que está no .env 
* Rode o comando yarn GenerateMigration e em seguida yarn RunMigration para gerar e rodar as migrations
* Rode o comando yarn dev para iniciar a aplicação
</div>

<div>
DEPLOY URL: https://s1m6back.herokuapp.com/
</div>
</br>

Esse projeto foi desenvolvido com as seguintes tecnologias/bibliotecas:

<table border="0">
 <tr>
<td> TypeScript</td>
<td> Express</td>
<td> Yup</td>
<td> bcryptJS</td>

 </tr>
 <tr>
<td> express-async-errors</td>
<td> PostgreSQL</td>
<td> jsonwebtoken</td>
<td> uuid</td>
</table>

</br>

<div>
DOC: https://m6-s1-api-docs.vercel.app/
</div>
