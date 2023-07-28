# App


GYMPASS STYPE APP.

## Rfs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins pelo o usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuários academias pelo o nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in em uma academia;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o cadastrar uma academia

 
## RNs (Regras de negócio)

- [x]  O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x]  O usuário não pode fazer 2 check-ins no mesmo dia;
- [x]  O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ]  O ckeck-in só pode ser validado até 20 minutos após criado;
- [ ]  O ckeck-in só pode ser validado pelo os administradores;
- [ ]  A academia só pode ser cadastradas por administradores;


## RNfs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuários deve ser identificado por um JWT ( JSON Web Token )