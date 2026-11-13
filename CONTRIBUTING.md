# Contribuindo

## Processo

1. Crie uma branch pequena a partir da main.
2. Descreva o problema e a mudança de comportamento esperada.
3. Adicione testes para fluxos modificados quando aplicável.
4. Verifique desktop, mobile e navegação por teclado.
5. Abra PR com escopo, riscos, validações e possibilidade de rollback.

## Convenção de branches

- feat/nome — funcionalidade
- fix/nome — correção
- refactor/nome — melhoria interna
- docs/nome — documentação
- chore/nome — manutenção e infraestrutura

## Validação

~~~bash
npm ci
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test
~~~

## Princípios

- Centralize dados de serviços e projetos nos módulos em src/lib.
- Priorize Server Components e use "use client" quando necessário.
- Preserve HTML semântico, foco visível, labels e suporte a reduced motion.
- Não invente métricas de performance, avaliações ou resultados comerciais.
- Atualize README e .env.example quando alterar configuração.
- Nunca versione tokens, credenciais, dados privados ou .env.local.
- Valide PR e preview antes de publicar em produção.
