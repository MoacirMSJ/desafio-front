# Funcionalidade: Busca de CEP

Como usuário do sistema
Quero consultar um CEP na tela de busca
Para obter o endereço correspondente (logradouro, bairro, cidade e UF)

Rota: `/buscar-cep`

## Cenário 1: CEP encontrado

```gherkin
Dado que estou na tela "Consultar CEP"
Quando eu digito um CEP válido e existente, por exemplo "01001-000"
E clico no botão "Buscar"
Então devo ver o resultado da consulta com os campos:
  | Campo      | Valor esperado |
  | CEP        | 01001-000      |
  | Logradouro | Praça da Sé    |
  | Bairro     | Sé             |
  | Cidade     | São Paulo      |
  | UF         | SP             |
E a mensagem de erro não deve ser exibida
```

## Cenário 2: CEP não encontrado

```gherkin
Dado que estou na tela "Consultar CEP"
Quando eu digito um CEP no formato válido, porém inexistente, por exemplo "99999-999"
E clico no botão "Buscar"
Então devo ver a mensagem de erro "CEP não encontrado."
E o resultado da consulta não deve ser exibido
```
