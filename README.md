# Guardiões do Commit

Laboratório acadêmico de SAST, segredos no histórico Git e GitHub Actions.
Os arquivos de aplicação são exemplos didáticos intencionalmente vulneráveis.
Todas as credenciais dos exercícios são fictícias. Não usar em produção.

## Reproduzir as verificações

```sh
semgrep scan --config=auto
semgrep scan --config .semgrep/regras/ --error
gitleaks git . --config .gitleaks.toml --verbose
gitleaks dir . --config .gitleaks.toml --verbose
git config core.hooksPath .githooks
```

Os experimentos foram automatizados em runner Ubuntu do GitHub Actions.
Isso não representa execução na máquina de cada integrante.
Os relatórios completos ficam no artefato `evidencias-laboratorios` do workflow.
As contagens, regras, linhas, commits e fingerprints estão em `evidencias/resultados.json`.
O arquivo `.env` removido do índice continua no histórico; uma cópia ignorada
permaneceu no diretório durante a comparação `git` versus `dir`.
A exceção em `.gitleaksignore` aceita somente um exemplo fictício específico.

## Correções

Main contém as duas correções do Lab 1. A branch `fix/limpeza-geral` contém
as correções adicionais para o bônus. A aplicação nunca foi publicada em servidor.
