# Krono — Landing Page, Hub de Releases e Auto-Atualização OTA

[![Versão](https://img.shields.io/badge/vers%C3%A3o-v1.5.0%20(build%206)-38BDF8?style=flat-square)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.5.0)
[![Plataforma](https://img.shields.io/badge/Android-8.0%2B%20%C2%B7%20arm64--v8a-22C55E?style=flat-square)](https://krono.rafixx.com/#versoes)
[![Site Oficial](https://img.shields.io/badge/Site%20Oficial-krono.rafixx.com-6366F1?style=flat-square)](https://krono.rafixx.com/)
[![Releases](https://img.shields.io/badge/GitHub-Releases-181717?style=flat-square&logo=github)](https://github.com/IsaacNilsonViana/krono-lp/releases)

O **Krono** é um aplicativo Android 100% offline de gestão de rotina gamificada, foco Pomodoro, monitoramento de tempo de tela, metas, notas/checklists e assistente pessoal local com **Qwen2.5-3B-Instruct** rodando nativamente via **`llama.cpp` NDK** com memória duradoura do usuário.

Este repositório (`krono-lp`) hospeda:
- A **Landing Page oficial** em produção: [`https://krono.rafixx.com`](https://krono.rafixx.com/)
- Uma **prévia usável interativa** no navegador (Rotina, Krono IA, Foco Pomodoro e Uso & Metas): [`https://krono.rafixx.com/#previa`](https://krono.rafixx.com/#previa)
- O **manifesto OTA assinado (`SHA256withRSA`)** consumido pelo app para auto-atualização inteligente: [`/api/releases.json`](https://krono.rafixx.com/api/releases.json)
- O histórico completo de **GitHub Releases**, binários `.apk` assinados e patches delta `.kpatch`.

---

## Downloads

> **Download direto da versão mais recente (`v1.5.0`):**
> - **APK Latest (redirect oficial):** [`https://krono.rafixx.com/releases/latest/download/Krono-latest.apk`](https://krono.rafixx.com/releases/latest/download/Krono-latest.apk)
> - **Release oficial `v1.5.0`:** [`https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.5.0)
> - **Landing Page com documentação interativa:** [`https://krono.rafixx.com/#versoes`](https://krono.rafixx.com/#versoes)

### Tabela Completa de Versões e Artefatos

| Versão | Build | Data | Canal | APK Completo | Patch Delta (`KDP1`) |
| --- | :---: | --- | --- | --- | --- |
| [**`v1.5.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.5.0) | `6` | `2026-11-20` | `Latest / Produção` | [`Krono-v1.5.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.5.0.apk) (`35,83 MB` / `35.828.261 bytes`) | [`v1.4.0 -> v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.4.0-to-v1.5.0.kpatch) (`21,33 MB` / `-40,46%`) · [`v1.3.0 -> v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.3.0-to-v1.5.0.kpatch) (`21,33 MB` / `-40,46%`) · [`v1.2.0 -> v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.2.0-to-v1.5.0.kpatch) (`21,39 MB` / `-40,29%`) · [`v1.1.0 -> v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.1.0-to-v1.5.0.kpatch) (`21,39 MB` / `-40,30%`) · [`v1.0.0 -> v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.0.0-to-v1.5.0.kpatch) (`21,39 MB` / `-40,30%`) |
| [**`v1.4.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.4.0) | `5` | `2026-11-20` | `Arquivo` | [`Krono-v1.4.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.4.0/Krono-v1.4.0.apk) (`22,44 MB` / `22.442.023 bytes`) | [`v1.3.0 -> v1.4.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.4.0/Krono-v1.3.0-to-v1.4.0.kpatch) (`3,33 MB` / `-85,15%`) · [`v1.2.0 -> v1.4.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.4.0/Krono-v1.2.0-to-v1.4.0.kpatch) (`15,04 MB` / `-33,00%`) · [`v1.1.0 -> v1.4.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.4.0/Krono-v1.1.0-to-v1.4.0.kpatch) (`15,04 MB` / `-33,00%`) · [`v1.0.0 -> v1.4.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.4.0/Krono-v1.0.0-to-v1.4.0.kpatch) (`15,04 MB` / `-33,00%`) |
| [**`v1.3.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.3.0) | `4` | `2026-11-20` | `Arquivo` | [`Krono-v1.3.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.3.0/Krono-v1.3.0.apk) (`22,41 MB` / `22.409.259 bytes`) | [`v1.2.0 -> v1.3.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.3.0/Krono-v1.2.0-to-v1.3.0.kpatch) (`15,01 MB` / `-33,02%`) · [`v1.1.0 -> v1.3.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.3.0/Krono-v1.1.0-to-v1.3.0.kpatch) (`15,01 MB` / `-33,02%`) · [`v1.0.0 -> v1.3.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.3.0/Krono-v1.0.0-to-v1.3.0.kpatch) (`15,01 MB` / `-33,02%`) |
| [**`v1.2.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.2.0) | `3` | `2026-11-20` | `Arquivo` | [`Krono-v1.2.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.2.0/Krono-v1.2.0.apk) (`20,41 MB` / `20.408.937 bytes`) | [`v1.1.0 -> v1.2.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.2.0/Krono-v1.1.0-to-v1.2.0.kpatch) (`13,10 MB` / `-35,8%`) · [`v1.0.0 -> v1.2.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.2.0/Krono-v1.0.0-to-v1.2.0.kpatch) (`13,14 MB` / `-35,64%`) |
| [**`v1.1.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.1.0) | `2` | `2026-11-20` | `Arquivo` | [`Krono-v1.1.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.1.0/Krono-v1.1.0.apk) (`20,39 MB` / `20.392.109 bytes`) | [`Krono-v1.0.0-to-v1.1.0.kpatch`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.1.0/Krono-v1.0.0-to-v1.1.0.kpatch) (`13,13 MB` / `13.126.734 bytes` — economia de `7,27 MB` / `35,63%`) |
| [**`v1.0.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.0.0) | `1` | `2026-11-20` | `Arquivo` | [`Krono-v1.0.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.0.0/Krono-v1.0.0.apk) (`20,36 MB` / `20.358.761 bytes`) | — |

### Verificação de Integridade (SHA-256)

| Arquivo | SHA-256 |
| --- | --- |
| `Krono-v1.5.0.apk` | `36bae381c7abcd3a0d06ed61f784b51dbb36006e70ac92bf0e90509734157bf0` |
| `Krono-v1.4.0-to-v1.5.0.kpatch` | `f7640f8ed73714d3618d0b11c2c5503faf192fd56b3adc760e812cb143c911d9` |
| `Krono-v1.3.0-to-v1.5.0.kpatch` | `7d9a0b37108607f2e871b623b82d95d09a17d8b3fab12202b0dc94883f6284e2` |
| `Krono-v1.2.0-to-v1.5.0.kpatch` | `c1b926cc33d2309f0b2849a58d9bf23a69396dbf4af62fdeb35f31ac105005bf` |
| `Krono-v1.1.0-to-v1.5.0.kpatch` | `8097d71cbebf6aae3c1fc5fabed24dbbe69f427a42ef2b8adc0e332a84866c66` |
| `Krono-v1.0.0-to-v1.5.0.kpatch` | `c4131a5b38e7e0e43cdd312e2d5e9116abf9de3bdf4a1a62dabdbd3267bf48f1` |
| `Krono-v1.4.0.apk` | `8bcba358dd9e9fdd6a260f4fde30ea8ab2a879e85fb8137424f51779814ca15d` |
| `Krono-v1.3.0-to-v1.4.0.kpatch` | `01e39d6d1b485d5f68be82a8667cb83b815aa8b25ae1779b3ef2f34b45c14c19` |
| `Krono-v1.2.0-to-v1.4.0.kpatch` | `ddb717f470ed213723e1b5ba3034c401cb1938aefaa986d963adc70a27408f02` |
| `Krono-v1.1.0-to-v1.4.0.kpatch` | `68085db4e721fd631c90be925c2b967a1b9ef09faf92606faf7e3fe100a75ce8` |
| `Krono-v1.0.0-to-v1.4.0.kpatch` | `279e86a22d4942a9476919b1cd2977ad4a7693d84678e54dddec0ad9f7aef227` |
| `Krono-v1.3.0.apk` | `f070e81eef8d3625ad077afc2df47ba4cb715b04574b171488c955921b4da4b1` |
| `Krono-v1.2.0-to-v1.3.0.kpatch` | `647f4c7cc30d3b00180055a68040538960593cd3e88eb83b0e06192116fbded9` |
| `Krono-v1.1.0-to-v1.3.0.kpatch` | `edc812512f684bee2013bfb7a89700c6d9c288323af6f90733add1e0e3ad3a4c` |
| `Krono-v1.0.0-to-v1.3.0.kpatch` | `bafc5f8a6a275709d06e3ad592eae57add26a5b91506874ddc5f4180aff2e4fd` |
| `Krono-v1.2.0.apk` | `2f32d581635314478fe110d8b483770ac25374c9fa3f861e0fe0c4bec6e6dbe4` |
| `Krono-v1.1.0-to-v1.2.0.kpatch` | `58f4194ccabebc977148bc1c1232ff8c88ccac41318ed3c6d428da515d64e03c` |
| `Krono-v1.0.0-to-v1.2.0.kpatch` | `190322eb32c029c0cf4f326beb46bb637730538ca12bab4e25bb4c5c2574f3be` |
| `Krono-v1.1.0.apk` | `fb9255738e24ad90a45abaa20ac6189a6500d8e151b59e773bf6d3eff30c6b48` |
| `Krono-v1.0.0-to-v1.1.0.kpatch` | `7ded93eb49f949547329c5076cd3b57121611aba8e92671e89cbb5cedc6ab80f` |
| `Krono-v1.0.0.apk` | `553806636f1bfc241fb1ef8787abd1c33dc3cd8ca66289a233779db3dc7e8ef2` |

Exemplo de verificação local após baixar o APK:

```bash
sha256sum Krono-v1.5.0.apk
# Esperado: 36bae381c7abcd3a0d06ed61f784b51dbb36006e70ac92bf0e90509734157bf0
```

### Requisitos e Instalação no Android

- **Sistema operacional:** Android 8.0+ (API 26+) em dispositivos ARM64 (`arm64-v8a`), compilado com alinhamento de página ELF 16 KB (compatível com Android 15/16).
- **Espaço adicional opcional:** ~2,1 GB livres caso deseje baixar os pesos do modelo `Qwen2.5-3B-Instruct (Q4_K_M)` dentro do próprio aplicativo (o **Modo Rápido** com voz PT-BR funciona imediatamente sem download extra).

**Passo a passo de instalação:**
1. Baixe [`Krono-v1.5.0.apk`](https://krono.rafixx.com/releases/latest/download/Krono-latest.apk) no dispositivo Android.
2. Ao abrir o arquivo, habilite a permissão **Instalar apps desconhecidos** para o navegador/gerenciador de arquivos, se solicitado.
3. Confirme a instalação.

> **Auto-atualização inteligente Delta (`KDP1`):** quando conectado à internet, o Krono consulta automaticamente `https://krono.rafixx.com/api/releases.json` (intervalo automático de 6 horas ou manualmente em **Perfil > Atualizações do Krono**), valida a assinatura criptográfica **RSA-2048 (`SHA256withRSA`)** do manifesto, baixa apenas o patch binário `.kpatch` (reaproveitando blocos idênticos do APK instalado), valida o SHA-256 do patch e do APK reconstruído e verifica o certificado oficial pinado (`SHA-256`) antes de propor a instalação — com fallback automático para download resumível do APK completo caso necessário. O banco SQLite Room e os pesos locais do Qwen são preservados durante a atualização.

---

## Changelog de Versões

### [`v1.5.0` (build 6)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.5.0) — `2026-11-20`

#### Novidades — Área Financeira Offline
- **Novo módulo Finanças (`KronoTab.FINANCE`)**: receitas e despesas 100% offline com 4 sub-abas (**Resumo**, **Calendário**, **Simular**, **Ajustes**), atalho na grade do dock expansível e card **Finanças do Mês** no Dashboard.
- **Parcelamentos, Recorrências e Controle por Ocorrência**: contas mensais recorrentes, compras parceladas em até `36x` com divisão exata dos centavos, ajuste de datas de fim de mês, status pago/recebido individual por parcela e detalhamento de itens, encargos e descontos.
- **Leitura OCR On-Device (Imagens e PDFs até 5 págs.)**: anexos privados separados para boleto e comprovante em `files/finance_attachments/`, reconhecimento offline (`ML Kit Text Recognition` + `PdfRenderer`) e revisão dos campos sugeridos antes de aplicar.
- **Calendário, Simulador & Lembretes Locais**: calendário mensal de vencimentos, simulador de compras parceladas sem alterar dados salvos, lembretes locais configuráveis (`0..3` dias antes às `09:00`), migração **Room v6 → v7 (`MIGRATION_6_7`)** e suporte completo no backup JSON.

---

### [`v1.4.0` (build 5)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.4.0) — `2026-11-20`

#### Melhorias de UI & Navegação
- **Dock inferior expansível (`FloatingBottomDock`)**: barra recolhida exibe apenas os **4 ícones principais**, com indicador `▲ <Aba>` quando estiver em módulo secundário; puxar para cima ou tocar na alça expande a grade com todos os módulos.
- **Remanejamento persistente (`DockOrderEngine` + Room v6)**: segure qualquer ícone ou toque em **Reorganizar** para permutar módulos por dois toques, mover (`◀` / `▶`), fixar/ocultar nos 4 principais ou restaurar o **Padrão** (`MIGRATION_5_6`, incluído no backup JSON).

---

### [`v1.3.0` (build 4)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.3.0) — `2026-11-20`

#### Novidades
- **Módulo de Mercado Offline (`KronoTab.MARKET`)**: nova aba inferior e atalho rápido no Dashboard com **Compra Atual**, **Histórico** e **Produtos**.
- **Scanner de Código de Barras (CameraX + ZXing)**: decodificação offline de `EAN-13`, `EAN-8`, `UPC-A`, `UPC-E`, `CODE-128`, `CODE-39`, `ITF` e `QR_CODE` com toque para focar, lanterna e entrada manual.
- **Comparação com Último Preço Pago**: ao escanear ou escolher um produto cadastrado, exibe o último preço pago, data, supermercado, menor valor histórico e variação em `R$` / `%`.
- **Histórico & Migração Room v5**: gasto mensal, ticket médio, recibos detalhados, evolução por produto e compatibilidade completa no backup JSON.

---

### [`v1.2.0` (build 3)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.2.0) — `2026-11-20`

#### Segurança & Infraestrutura
- **Assinatura criptográfica `SHA256withRSA` no manifesto**: `AppUpdateSecurity` valida assinatura RSA-2048 de todas as releases com chave pública pinada no APK antes de confiar em URLs, tamanhos ou checksums.
- **Certificate Pinning SHA-256**: verificação obrigatória de certificado assinante único oficial (`db0bfd...37b6`), `packageName`, contenção em `filesDir/updates/` e bloqueio de downgrade antes da instalação.
- **Allowlist estrita de domínios HTTPS & Anti-Bomb**: redirecionamentos validados salto a salto (`HttpsURLConnection`), proteção contra GZIP decompression bomb no `KronoDeltaPatcher` (`128 MB`), `network_security_config.xml` (`cleartextTrafficPermitted="false"`) e `allowBackup="false"`.
- **Hardening Nginx & Prévia ao vivo**: cabeçalhos de segurança (`HSTS`, `CSP`, `X-Frame-Options: DENY`, `nosniff`, `Permissions-Policy`), rate limit, webroot read-only, porta `8080` do dashboard Traefik desativada e nova prévia usável interativa em [`https://krono.rafixx.com/#previa`](https://krono.rafixx.com/#previa).

---

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
│   │   ├── InteractiveAppPreview.tsx  # Emulador interativo usável direto no navegador (#previa)
│   │   ├── PhoneShowcase.tsx          # Simulação visual compacta no Hero
│   │   └── ReleasesSection.tsx        # Seção de histórico de versões, downloads, SHA-256 e docs
│   ├── App.tsx                        # Página principal da Landing Page
│   ├── index.css                      # Configuração Tailwind CSS e estilos globais
│   ├── main.tsx                       # Ponto de entrada React
│   └── types.ts                       # Tipagens TypeScript do manifesto releases.json
├── Dockerfile                         # Build multi-stage Node -> Nginx (webroot read-only)
├── nginx.conf                         # SPA, rate limit, headers /api/releases.json e redirect APK
├── security-headers.conf              # HSTS, CSP, X-Frame-Options, nosniff, Permissions-Policy
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
2. Atualize [`public/api/releases.json`](public/api/releases.json) preenchendo o objeto `latest` e adicionando a nova entrada ao topo do array `versions` (mantendo todas as versões anteriores intactas, com `apkSizeBytes`, `sha256`, `patches`, `changelog` e `documentation` exatos) e execute o script de assinatura criptográfica do manifesto (`sign_manifest.py`) com a chave oficial para atualizar os campos `signatureAlg` (`SHA256withRSA`) e `signature`.
3. Atualize o destino do redirect `/releases/latest/download/Krono-latest.apk` em [`nginx.conf`](nginx.conf).
4. Atualize a tabela de downloads e o changelog neste `README.md`.
5. Valide o build com `npm run build` e publique com `git push origin main` para disparar o deploy automático no Dokploy em [`https://krono.rafixx.com`](https://krono.rafixx.com/).
