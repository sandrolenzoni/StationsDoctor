# Desafio Técnico Stations Doctor: Agendamento de Consultas Médicas

## Objetivo

Desenvolver um sistema de controle de consultas médicas para um consultório, utilizando **Typescript-Node.js**.

## Detalhes do Desafio

- Cada consulta tem uma duração média de 20 a 60 minutos, dependendo da especialidade.
- Consultas só podem ser agendadas durante o horário de trabalho do médico.
- Um médico não pode ter duas consultas marcadas para o mesmo horário.
- Não é permitido cadastrar consultas em feriados.

## Funcionalidades a serem entregues

### Rota de Listagem de Médicos Disponíveis

- Deve exibir os médicos disponíveis para consulta.
- Pode incluir informações como nome, CRM (Cadastro de Registro Médico) e especialidade.

### Rota de Cadastro de Consulta

- Permite agendar uma consulta.
- Deve validar se o horário está dentro do expediente do médico e se não há conflito com outras consultas.

### Rota de Listagem de Consultas por Médico

- Exibe as consultas agendadas para um médico específico.
- Pode incluir informações sobre o paciente, data e horário da consulta.

### Rota de Listagem de Consultas por Paciente

- Mostra as consultas agendadas para um paciente específico.
- Pode incluir informações sobre o médico, data e horário da consulta.

## Entidades

### Paciente

- Atributos: nome, CPF, data de nascimento.

### Médico

- Atributos: nome, CRM, especialidade.

### Consulta

- Atributos: paciente, médico, data e horário da consulta.
