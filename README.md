## Requisitos Funcionais (RF)

O sistema deve ser capaz de

- [x]  Deve ser possível cadastrar um utilizador
- [ ]  Deve ser possível visualizar utilizadores do sistema
- [ ]  Deve ser possível bloquear um utilizador
- [ ]  Criar um novo produto para empresa
- [ ]  Aumentar a quantidade de um produto existente
- [ ]  Deve ser possível vender um produto
- [ ]  Deve ser possível visualizar os produtos em stock
- [ ]  Deve ser possível definir o stock mínimo
- [ ]  Deve ser possível cadastrar um fornecedor vinculado ao produto
- [ ]  Deve ser possível visualizar o histórico de vendas
- [ ]  Deve ser possível efectuar login no sistema
- [ ]  Deve ser possível emitir alertas de stock baixo
- [ ]  Deve ser possível criar um fornecedor
- [ ]  Deve ser possível cadastrar um cliente fiel

## Regras de Negócio (RN)

- [x]  Um utilizador tem que estar associado a um departamento: Estoque, Vendas, Administração
- [ ]  Um produto só será vendido se a quantidade for superior a quantidade de segurança
- [ ]  Na visualização, será mostrada as quantidades disponíveis
- [ ]  O histórico de vendas será exibido por clientes e atendentes de caixa
- [ ]  Só pode visualizar os utilizadores quem for administrador

## Requisitos Não Funcionais (RNF)

- [ ]  O utilizador deverá ser identificado por um jwt em todas as requisições
- [x]  As senhas devem ser criptografadas