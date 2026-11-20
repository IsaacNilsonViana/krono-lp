# Krono — Landing Page, Hub de Releases e Auto-Atualização OTA

[![Versão](https://img.shields.io/badge/vers%C3%A3o-v1.1.0%20(build%202)-38BDF8?style=flat-square)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.1.0)
[![Plataforma](https://img.shields.io/badge/Android-8.0%2B%20%C2%B7%20arm64--v8a-22C55E?style=flat-square)](https://krono.rafixx.com/#versoes)
[![Site Oficial](https://img.shields.io/badge/Site%20Oficial-krono.rafixx.com-6366F1?style=flat-square)](https://krono.rafixx.com/)
[![Releases](https://img.shields.io/badge/GitHub-Releases-181717?style=flat-square&logo=github)](https://github.com/IsaacNilsonViana/krono-lp/releases)

O **Krono** é um aplicativo Android 100% offline de gestão de rotina gamificada, foco Pomodoro, monitoramento de tempo de tela, metas, notas/checklists e assistente pessoal local com **Qwen2.5-3B-Instruct** rodando nativamente via **`llama.cpp` NDK** com memória duradoura do usuário.

Este repositório (`krono-lp`) hospeda:
- A **Landing Page oficial** em produção: [`https://krono.rafixx.com`](https://krono.rafixx.com/)
- O **manifesto OTA** consumido pelo app para auto-atualização inteligente: [`/api/releases.json`](https://krono.rafixx.com/api/releases.json)
- O histórico completo de **GitHub Releases**, binários `.apk` assinados e patches delta `.kpatch`.

---

## Downloads

> **Download direto da versão mais recente (`v1.1.0`):**
> - **APK Latest (redirect oficial):** [`https://krono.rafixx.com/releases/latest/download/Krono-latest.apk`](https://krono.rafixx.com/releases/latest/download/Krono-latest.apk)
> - **Release oficial `v1.1.0`:** [`https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.1.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.1.0)
> - **Landing Page com documentação interativa:** [`https://krono.rafixx.com/#versoes`](https://krono.rafixx.com/#versoes)

### Tabela Completa de Versões e Artefatos

| Versão | Build | Data | Canal | APK Completo | Patch Delta (`KDP1`) |
| --- | :---: | --- | --- | --- | --- |
| [**`v1.1.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.1.0) | `2` | `2026-11-20` | `Latest / Produção` | [`Krono-v1.1.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.1.0/Krono-v1.1.0.apk) (`20,39 MB` / `20.392.109 bytes`) | [`Krono-v1.0.0-to-v1.1.0.kpatch`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.1.0/Krono-v1.0.0-to-v1.1.0.kpatch) (`13,13 MB` / `13.126.734 bytes` — economia de `7,27 MB` / `35,63%`) |
| [**`v1.0.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.0.0) | `1` | `2026-11-20` | `Arquivo` | [`Krono-v1.0.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.0.0/Krono-v1.0.0.apk) (`20,36 MB` / `20.358.761 bytes`) | — |

### Verificação de Integridade (SHA-256)

| Arquivo | SHA-256 |
| --- | --- |
| `Krono-v1.1.0.apk` | `fb9255738e24ad90a45abaa20ac6189a6500d8e151b59e773bf6d3eff30c6b48` |
| `Krono-v1.0.0-to-v1.1.0.kpatch` | `7ded93eb49f949547329c5076cd3b57121611aba8e92671e89cbb5cedc6ab80f` |
| `Krono-v1.0.0.apk` | `553806636f1bfc241fb1ef8787abd1c33dc3cd8ca66289a233779db3dc7e8ef2` |

Exemplo de verificação local após baixar o APK:

```bash
sha256sum Krono-v1.1.0.apk
# Esperado: fb9255738e24ad90a45abaa20ac6189a6500d8e151b59e773bf6d3eff30c6b48
```

### Requisitos e Instalação no Android

- **Sistema operacional:** Android 8.0+ (API 26+) em dispositivos ARM64 (`arm64-v8a`), compilado com alinhamento de página ELF 16 KB (compatível com Android 15/16).
- **Espaço adicional opcional:** ~2,1 GB livres caso deseje baixar os pesos do modelo `Qwen2.5-3B-Instruct (Q4_K_M)` dentro do próprio aplicativo (o **Modo Rápido** com voz PT-BR funciona imediatamente sem download extra).

**Passo a passo de instalação:**
1. Baixe [`Krono-v1.1.0.apk`](https://krono.rafixx.com/releases/latest/download/Krono-latest.apk) no dispositivo Android.
2. Ao abrir o arquivo, habilite a permissão **Instalar apps desconhecidos** para o navegador/gerenciador de arquivos, se solicitado.
3. Confirme a instalação.

> **Auto-atualização inteligente Delta (`KDP1`):** a partir da `v1.1.0`, quando conectado à internet, o Krono consulta automaticamente `https://krono.rafixx.com/api/releases.json` (intervalo automático de 6 horas ou manualmente em **Perfil > Atualizações do Krono**), baixa apenas o patch binário `.kpatch` (reaproveitando blocos idênticos do APK instalado), valida o SHA-256 do patch e do APK reconstruído e realiza o fallback automático para download resumível do APK completo caso necessário. O banco SQLite Room e os pesos locais do Qwen são preservados durante a atualização.

---

## Changelog de Versões

### [`v1.1.0` (build 2)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.1.0) — `2026-11-20`

#### Novidades
- **Auto-atualização inteligente online (Delta Patch `KDP1`)**: consulta automática de `https://krono.rafixx.com/api/releases.json`, download mínimo via `.kpatch` com dupla verificação SHA-256 e fallback automático para APK completo, preservando dados do Room e pesos do Qwen.
- **Central de Atualizações e Banner ao vivo**: card dedicado em **Perfil > Atualizações do Krono** com progresso em tempo real, economia de MB exibida e banner flutuante no painel quando o pacote verificado estiver pronto para instalar.
- **Cards e gráficos interativos na IA**: widgets ao vivo no chat para Tempo de Tela, Top 3/5 Apps mais usados, rotina do dia, tarefas, notas/checklists, metas e foco.
- **Memória conversacional estendida e anti-loop**: janela de contexto ampliada para `3072` tokens e histórico de até `12` turnos preservado no KV-cache, com sampler ajustado (`repeat_penalty = 1.12`, janela `128`, `presence_penalty = 0.10`).
- **Copiar e Editar mensagens**: ação `Copiar` em todas as mensagens e `Editar` para corrigir/reenviar mensagens enviadas mantendo o prefixo do KV-cache.
- **Processamento contínuo em segundo plano**: geração do Qwen desacoplada da Activity via `AiSessionHolder` + `AiGenerationForegroundService`, mantendo a resposta ativa ao trocar de aba ou minimizar o app e emitindo notificação ao concluir.

#### Melhorias e Correções
- Correção da máquina de estados de **Tempo de Uso** (`ScreenTimeManager`) para transições entre Activities do mesmo aplicativo e encerramento de sessão ao apagar/bloquear a tela.

---

### [`v1.0.0` (build 1)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.0.0) — `2026-11-20`

#### Lançamento Inicial
- **Interface e Experiência**: aplicativo em Jetpack Compose + Material 3 com tema **Obsidian Arcade** (modos claro e escuro) e abas de Rotina, Tarefas, Foco Pomodoro, Metas, Notas, Perfil & Ajustes e Krono IA.
- **Motor Nativo Offline NDK (`libkrono_llama.so`)**: `llama.cpp v1.0.0` compilado para `arm64-v8a` (`armv8.2-a+dotprod+fp16+i8mm`, `GGML_USE_CPU_REPACK`, KV cache `Q8_0`, FlashAttention e alinhamento de página 16 KB) com threadpool fixado nos núcleos grandes.
- **LLM Local Qwen2.5-3B-Instruct (`Q4_K_M`)**: download resumível dentro do app com streaming token-a-token seguro em UTF-8 e warmup de prefixo de sistema.
- **Memória Pessoal Duradoura (Room v4)**: tabela `user_memories` com salvamento, atualização, remoção automática pelo assistente, chips com `Desfazer` e gerenciamento manual.
- **Modo Rápido Offline + Voz PT-BR**: parser determinístico instantâneo para criar tarefas recorrentes, metas com marcos, notas/checklists e sessões Pomodoro sem depender de download do modelo.
- **Produtividade e Offline-first**: monitoramento de uso via `UsageStatsManager`, limites por aplicativo, Modo Foco em foreground, gamificação (XP, níveis, ofensiva e 14 conquistas), notificações agendadas e backup/restauração em JSON.

---

## Instruções de Uso do Código

### Stack Tecnológica
- **React 19** + **TypeScript 5.8**
- **Vite 6** + **Tailwind CSS 4** (`@tailwindcss/vite`)
- **Lucide React** (`lucide-react`)
- **Container de Produção**: build multi-stage Docker (`node:20-alpine` -> `nginx:1.27-alpine`)

### Estrutura do Projeto

```text
krono-lp/
├── public/
│   ├── api/
│   │   └── releases.json        # Manifesto OTA (latest, versions, SHA-256, patches e docs)
│   └── favicon.svg              # Ícone vetorial da marca Krono
├── src/
│   ├── components/
│   │   ├── PhoneShowcase.tsx    # Simulação interativa da interface do app Android
│   │   └── ReleasesSection.tsx  # Seção de histórico de versões, downloads e documentação
│   ├── App.tsx                  # Página principal da Landing Page
│   ├── index.css                # Configuração Tailwind CSS e estilos globais
│   ├── main.tsx                 # Ponto de entrada React
│   └── types.ts                 # Tipagens TypeScript do manifesto releases.json
├── Dockerfile                   # Build multi-stage Node -> Nginx
├── nginx.conf                   # Configuração SPA, headers de /api/releases.json e redirect APK
├── index.html                   # HTML raiz e metadados SEO
├── package.json                 # Scripts e dependências do projeto
├── tsconfig.json                # Configuração TypeScript
└── vite.config.ts               # Configuração Vite + React + Tailwind
```

### Pré-requisitos
- **Node.js `20+`** e **npm `10+`** (para desenvolvimento e build local)
- **Docker** (opcional, para rodar o container Nginx idêntico ao ambiente de produção)

### Executar em Desenvolvimento Local

```bash
git clone https://github.com/IsaacNilsonViana/krono-lp.git
cd krono-lp
npm install
npm run dev
```

Por padrão, o Vite inicia o servidor de desenvolvimento em `http://localhost:5173`.

### Build de Produção e Preview Local

```bash
npm run build
npm run preview
```

O comando `npm run build` executa a verificação de tipos (`tsc`) seguida pelo empacotamento estático do Vite em `dist/`.

### Executar via Docker (Igual à Produção)

```bash
docker build -t krono-lp .
docker run -d --name krono-lp -p 8080:80 krono-lp
```

Acesse `http://localhost:8080` para testar a aplicação servida exatamente com as regras do Nginx de produção.

### Rotas Servidas pelo Nginx (`nginx.conf`)

| Rota | Comportamento |
| --- | --- |
| `/` | Entrega a SPA React com fallback `try_files $uri $uri/ /index.html`. |
| `/api/releases.json` | Serve o manifesto OTA sem cache (`Cache-Control: no-cache, no-store, must-revalidate`) e com `Access-Control-Allow-Origin: *`. |
| `/releases/latest/download/Krono-latest.apk` | Retorna `302` apontando para o APK da versão mais recente no GitHub Releases. |
| `/assets/` | Assets estáticos versionados servidos com cache imutável de 30 dias (`max-age=2592000`). |

### Como Publicar e Atualizar uma Nova Versão

1. Crie uma nova release `vX.Y.Z` no GitHub anexando o `Krono-vX.Y.Z.apk` assinado e o(s) patch(es) delta `KDP1` (`.kpatch`) gerados a partir das versões anteriores.
2. Atualize [`public/api/releases.json`](public/api/releases.json) preenchendo o objeto `latest` e adicionando a nova entrada ao topo do array `versions` (mantendo todas as versões anteriores intactas, com `apkSizeBytes`, `sha256`, `patches`, `changelog` e `documentation` exatos).
3. Atualize o destino do redirect `/releases/latest/download/Krono-latest.apk` em [`nginx.conf`](nginx.conf).
4. Atualize a tabela de downloads e o changelog neste `README.md`.
5. Valide o build com `npm run build` e publique com `git push origin main` para disparar o deploy automático no Dokploy em [`https://krono.rafixx.com`](https://krono.rafixx.com/).
