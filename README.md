# Privacy Patrol Extension

## Descrição

Privacy Patrol é uma extensão de navegador desenvolvida para ajudar usuários a manter sua privacidade enquanto navegam na internet. Ela monitora e informa sobre várias métricas de privacidade, alertando o usuário sobre potenciais riscos e ameaças. A extensão está disponível para Google Chrome e Mozilla Firefox.

## Funcionalidades

- **Detecção de Conexões com Domínios de Terceira Parte**: Monitora e conta todas as conexões feitas a domínios que não são da mesma origem da página visitada.
- **Detecção de Ameaças de Hijacking**: Identifica tentativas de sequestro de navegador, como alterações suspeitas em scripts ou redirecionamentos inesperados.
- **Monitoramento de Armazenamento Local**: Verifica o uso de `localStorage` e `sessionStorage`, alertando sobre uso excessivo que pode indicar rastreamento ou armazenamento inadequado de dados.
- **Detecção de Canvas Fingerprinting**: Detecta o uso da API Canvas que pode ser utilizado para rastrear usuários de maneira única e persistente através de suas sessões de navegação.
- **Pontuação de Privacidade**: Calcula uma pontuação baseada em várias métricas de privacidade, dando ao usuário uma visão rápida sobre a segurança da página que está visitando.

## Instalação

### Pré-requisitos

Antes de instalar a extensão, certifique-se de que você está usando uma versão compatível do Google Chrome ou Mozilla Firefox.

### Passos para Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/AntonioAEMartins/Privacy-Patrol-Browser-Extesion/
   ```
2. **Carregar a extensão no navegador**:
   - **Chrome**:
     - Acesse `chrome://extensions/`
     - Ative o Modo Desenvolvedor no canto superior direito.
     - Clique em "Carregar sem compactação" e selecione a pasta da extensão clonada.
   - **Firefox**:
     - Acesse `about:debugging`
     - Clique em "Este Firefox"
     - Clique em "Carregar extensão temporária" e abra o arquivo `manifest.json` da pasta clonada.

## Uso

Após a instalação, a extensão começará a monitorar automaticamente as páginas visitadas. Você pode visualizar as métricas de privacidade clicando no ícone da extensão na barra de ferramentas do navegador.

## Contribuição

Contribuições são sempre bem-vindas! Se você tem sugestões para melhorar a extensão, sinta-se à vontade para fazer um fork do repositório e enviar um pull request, ou abrir um issue com as tags "melhoria" ou "bug".

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE.md para detalhes.
```

### Notas sobre o README

- **Descrição Geral**: Oferece uma visão clara do propósito e das funcionalidades da extensão.
- **Instruções de Instalação e Uso**: Instruções passo a passo garantem que usuários menos experientes possam instalar e começar a usar a extensão sem dificuldades.
- **Seção de Contribuição**: Encoraja a comunidade a contribuir para o desenvolvimento da extensão.
- **Licença**: Informa sobre a licença sob a qual a extensão é distribuída, esclarecendo o que os usuários podem e não podem fazer com o código.

Certifique-se de adaptar os URLs de exemplo e adicionar informações específicas conforme necessário para adequar o README ao seu projeto específico.
