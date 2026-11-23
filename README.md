# Krono — Landing Page, Hub de Releases e Auto-Atualização OTA

[![Versão](https://img.shields.io/badge/vers%C3%A3o-v2.1.1%20(build%209)-38BDF8?style=flat-square)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v2.1.1)
[![Plataforma](https://img.shields.io/badge/Android-8.0%2B%20%C2%B7%20arm64--v8a-22C55E?style=flat-square)](https://krono.rafixx.com/#versoes)
[![Site Oficial](https://img.shields.io/badge/Site%20Oficial-krono.rafixx.com-6366F1?style=flat-square)](https://krono.rafixx.com/)
[![Releases](https://img.shields.io/badge/GitHub-Releases-181717?style=flat-square&logo=github)](https://github.com/IsaacNilsonViana/krono-lp/releases)

O **Krono** é um aplicativo Android 100% offline e **modular (`Krono Core + 8 Split APKs`)** de gestão de rotina gamificada, foco Pomodoro, monitoramento de tempo de tela, mercado, finanças offline com OCR, metas, notas/checklists, gerenciamento de servidores **Dokploy** e assistente pessoal local com **Qwen2.5-3B-Instruct** rodando nativamente via **`llama.cpp` NDK** com memória duradoura do usuário.

Este repositório (`krono-lp`) hospeda:
- A **Landing Page oficial** em produção: [`https://krono.rafixx.com`](https://krono.rafixx.com/)
- O **Construtor Modular (`#montar`)** para selecionar somente os módulos desejados e gerar kits `krono://setup`: [`https://krono.rafixx.com/#montar`](https://krono.rafixx.com/#montar)
- Uma **prévia usável interativa** no navegador (Rotina, Krono IA, Foco Pomodoro e Uso & Metas): [`https://krono.rafixx.com/#previa`](https://krono.rafixx.com/#previa)
- O **manifesto OTA assinado duplamente (`SHA256withRSA`: `signature` + `modulesSignature`)** consumido pelo app para auto-atualização inteligente e instalação modular: [`/api/releases.json`](https://krono.rafixx.com/api/releases.json)
- O histórico completo de **GitHub Releases**, binários `.apk` assinados (`Core`, `Universal` e `Splits`) e patches delta `.kpatch`.

---

## Downloads

> **Download direto da versão mais recente (`v2.1.1`):**
> - **APK Completo (Universal, todos os 8 módulos):** [`https://krono.rafixx.com/releases/latest/download/Krono-latest.apk`](https://krono.rafixx.com/releases/latest/download/Krono-latest.apk)
> - **APK Core Leve (`14,89 MB`, escolha os módulos depois):** [`https://krono.rafixx.com/releases/latest/download/Krono-core-latest.apk`](https://krono.rafixx.com/releases/latest/download/Krono-core-latest.apk)
> - **Release oficial `v2.1.1`:** [`https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v2.1.1`](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v2.1.1)
> - **Construtor Modular & Documentação:** [`https://krono.rafixx.com/#montar`](https://krono.rafixx.com/#montar) · [`https://krono.rafixx.com/#versoes`](https://krono.rafixx.com/#versoes)

### Tabela Completa de Versões e Artefatos

| Versão | Build | Data | Canal | APK Principal | Patch Delta (`KDP1`) / Módulos |
| --- | :---: | --- | --- | --- | --- |
| [**`v2.1.1`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v2.1.1) | `9` | `2026-11-22` | `Latest / Produção` | [`Krono-v2.1.1.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.1.1/Krono-v2.1.1.apk) (`36,23 MB` / `36.230.615 bytes`) · [`Krono-core-v2.1.1.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.1.1/Krono-core-v2.1.1.apk) (`14,89 MB`, `-58,9%`) | [`v2.1.0 → v2.1.1`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.1.1/Krono-v2.1.0-to-v2.1.1.kpatch) (`2,76 MB`, `-92,38%`) · + 7 deltas (`v1.0.0..v2.0.0`) + **8 Split APKs** (incl. `:feature_dokploy`) |
| [**`v2.1.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v2.1.0) | `8` | `2026-11-22` | `Arquivo` | [`Krono-v2.1.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.1.0/Krono-v2.1.0.apk) (`36,20 MB` / `36.197.847 bytes`) · [`Krono-core-v2.1.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.1.0/Krono-core-v2.1.0.apk) (`14,87 MB`, `-58,9%`) | [`v2.0.0 → v2.1.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.1.0/Krono-v2.0.0-to-v2.1.0.kpatch) (`9,54 MB`, `-73,63%`) · + 6 deltas (`v1.0.0..v1.5.0`) + **8 Split APKs** (incl. `:feature_dokploy`) |
| [**`v2.0.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v2.0.0) | `7` | `2026-11-22` | `Arquivo` | [`Krono-v2.0.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.0.0/Krono-v2.0.0.apk) (`35,94 MB` / `35.935.644 bytes`) · [`Krono-core-v2.0.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.0.0/Krono-core-v2.0.0.apk) (`14,80 MB`, `-58,8%`) | **Deltas:** [`v1.5.0 -> v2.0.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.0.0/Krono-v1.5.0-to-v2.0.0.kpatch) (`15,84 MB` / `-55,91%`) · [`v1.4.0 -> v2.0.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.0.0/Krono-v1.4.0-to-v2.0.0.kpatch) (`21,39 MB` / `-40,48%`) · [`v1.3.0 -> v2.0.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.0.0/Krono-v1.3.0-to-v2.0.0.kpatch) (`21,39 MB` / `-40,48%`) · [`v1.2.0 -> v2.0.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.0.0/Krono-v1.2.0-to-v2.0.0.kpatch) (`21,44 MB` / `-40,35%`) · [`v1.1.0 -> v2.0.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.0.0/Krono-v1.1.0-to-v2.0.0.kpatch) (`21,44 MB` / `-40,35%`) · [`v1.0.0 -> v2.0.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v2.0.0/Krono-v1.0.0-to-v2.0.0.kpatch) (`21,44 MB` / `-40,35%`) |
| [**`v1.5.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.5.0) | `6` | `2026-11-20` | `Arquivo` | [`Krono-v1.5.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.5.0.apk) (`35,83 MB` / `35.828.261 bytes`) | [`v1.4.0 -> v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.4.0-to-v1.5.0.kpatch) (`21,33 MB` / `-40,46%`) · [`v1.3.0 -> v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.3.0-to-v1.5.0.kpatch) (`21,33 MB` / `-40,46%`) · [`v1.2.0 -> v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.2.0-to-v1.5.0.kpatch) (`21,39 MB` / `-40,29%`) · [`v1.1.0 -> v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.1.0-to-v1.5.0.kpatch) (`21,39 MB` / `-40,30%`) · [`v1.0.0 -> v1.5.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.0.0-to-v1.5.0.kpatch) (`21,39 MB` / `-40,30%`) |
| [**`v1.4.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.4.0) | `5` | `2026-11-20` | `Arquivo` | [`Krono-v1.4.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.4.0/Krono-v1.4.0.apk) (`22,44 MB` / `22.442.023 bytes`) | [`v1.3.0 -> v1.4.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.4.0/Krono-v1.3.0-to-v1.4.0.kpatch) (`3,33 MB` / `-85,15%`) · [`v1.2.0 -> v1.4.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.4.0/Krono-v1.2.0-to-v1.4.0.kpatch) (`15,04 MB` / `-33,00%`) · [`v1.1.0 -> v1.4.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.4.0/Krono-v1.1.0-to-v1.4.0.kpatch) (`15,04 MB` / `-33,00%`) · [`v1.0.0 -> v1.4.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.4.0/Krono-v1.0.0-to-v1.4.0.kpatch) (`15,04 MB` / `-33,00%`) |
| [**`v1.3.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.3.0) | `4` | `2026-11-20` | `Arquivo` | [`Krono-v1.3.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.3.0/Krono-v1.3.0.apk) (`22,41 MB` / `22.409.259 bytes`) | [`v1.2.0 -> v1.3.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.3.0/Krono-v1.2.0-to-v1.3.0.kpatch) (`15,01 MB` / `-33,02%`) · [`v1.1.0 -> v1.3.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.3.0/Krono-v1.1.0-to-v1.3.0.kpatch) (`15,01 MB` / `-33,02%`) · [`v1.0.0 -> v1.3.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.3.0/Krono-v1.0.0-to-v1.3.0.kpatch) (`15,01 MB` / `-33,02%`) |
| [**`v1.2.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.2.0) | `3` | `2026-11-20` | `Arquivo` | [`Krono-v1.2.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.2.0/Krono-v1.2.0.apk) (`20,41 MB` / `20.408.937 bytes`) | [`v1.1.0 -> v1.2.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.2.0/Krono-v1.1.0-to-v1.2.0.kpatch) (`13,10 MB` / `-35,8%`) · [`v1.0.0 -> v1.2.0`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.2.0/Krono-v1.0.0-to-v1.2.0.kpatch) (`13,14 MB` / `-35,64%`) |
| [**`v1.1.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.1.0) | `2` | `2026-11-20` | `Arquivo` | [`Krono-v1.1.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.1.0/Krono-v1.1.0.apk) (`20,39 MB` / `20.392.109 bytes`) | [`Krono-v1.0.0-to-v1.1.0.kpatch`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.1.0/Krono-v1.0.0-to-v1.1.0.kpatch) (`13,13 MB` / `13.126.734 bytes` — economia de `7,27 MB` / `35,63%`) |
| [**`v1.0.0`**](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v1.0.0) | `1` | `2026-11-20` | `Arquivo` | [`Krono-v1.0.0.apk`](https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.0.0/Krono-v1.0.0.apk) (`20,36 MB` / `20.358.761 bytes`) | — |

### Verificação de Integridade (SHA-256)

| Arquivo | SHA-256 |
| --- | --- |
| `Krono-v2.1.1.apk` (Universal) | `df3fc28824bbc1a2bb829af2116b949ffa167b96e890005ab6b9d31e27ec6424` |
| `Krono-core-v2.1.1.apk` (Core Base) | `dfc8f02b2201b2059d6619b115ac20268d9e3e2632555e88941452daa6cf5a6d` |
| `Krono-module-tasks-v2.1.1.apk` | `7b40a150e5ac323a0a58f992cfd18c7ec3155d4786778af4382c8fa3c673e570` |
| `Krono-module-focus-v2.1.1.apk` | `b77f27b093bba03b2edb6cace0d0584b0f7683737a0f047c25f9d9246102dfbf` |
| `Krono-module-market-v2.1.1.apk` | `aec909dd62d517f783d8af08510dd4358f5bc2ac627cc25a037db2e0b83233f8` |
| `Krono-module-finance-v2.1.1.apk` | `38cd4ece267d7d47cbcd0e90a3f048afa0aa7afa639b2d74853ec37769c4c15f` |
| `Krono-module-goals-v2.1.1.apk` | `4355bf564ea2bfcdc178b4885c121419d08c0472a58eabb6c6a8e4e2dbfa2ed2` |
| `Krono-module-notes-v2.1.1.apk` | `fa7aa51c885c6a5b34c1bbf86e976f43aa8bc328a1941b5c98009b123cd22939` |
| `Krono-module-qwen-v2.1.1.apk` | `b0d72a041ef62c9de93994b2e2bf1e3e00b64e1d085adff01f520cb813d70a04` |
| `Krono-module-dokploy-v2.1.1.apk` | `5d4c825a3928d3d18280977f63975fea3c8865b756bb9a15f690a735d6cb6900` |
| `Krono-v2.1.0-to-v2.1.1.kpatch` | `c956038a236fb04b2e41efe6a1629cb529128d945eb074fbb4a1f8164b01866b` |
| `Krono-v2.0.0-to-v2.1.1.kpatch` | `4e34b4f978a8c4f94912b8da1de8103cd7b527a991f014caeb0a4af79b8ee860` |
| `Krono-v1.5.0-to-v2.1.1.kpatch` | `fd445b09ef583bb4f7917d8cd9b6a36517cea190d1b88033185a765ad0781d8f` |
| `Krono-v1.4.0-to-v2.1.1.kpatch` | `7ef478a56b832a9e8530fd298452179b57462c466589adecc61ccde0d47a0d5e` |
| `Krono-v1.3.0-to-v2.1.1.kpatch` | `1145f072760346f14834d7a0b3e4883c78719f7658a49be0fd3ef0fe4a6e2d9b` |
| `Krono-v1.2.0-to-v2.1.1.kpatch` | `6d1b5a7ab7a095f7a727800e6aef47e5651eec5a828b0889a4e425d2f3f7e5e9` |
| `Krono-v1.1.0-to-v2.1.1.kpatch` | `bb7249e1bf6a5bb761b19211366fefa90d8996b8512afda7c4a32a0315cedc5c` |
| `Krono-v1.0.0-to-v2.1.1.kpatch` | `63403e181bdc06cacf41724612c2b9f4ee9f8d6e5669b07f7977a9f06d3b25c9` |
| `Krono-v2.1.0.apk` (Universal) | `5d3eeee2b6b809d6c7cd37ebce5df27f83008ac0cf953492db0ca00da4b6b21d` |
| `Krono-core-v2.1.0.apk` (Core Base) | `66806ae924bc0c7ab337118e3788ac4dff0a75ad6009e6108f404baa83ee146d` |
| `Krono-module-tasks-v2.1.0.apk` | `5d966404ac3eb39ea30d32c52a707f0b5abf0ab5031cea1a8765f5662ef9a7cd` |
| `Krono-module-focus-v2.1.0.apk` | `fb3e3b83dae30cef3d064a3e225f4b78f29778e7f187579782d4cb55bb1ca585` |
| `Krono-module-market-v2.1.0.apk` | `ed50ae1d063b603152d645b1434f7c0e204ff705447d86f0a2852fd8d516abe0` |
| `Krono-module-finance-v2.1.0.apk` | `4376c0f6b10b986aec6db85bd1f54a3104c807081695beb86fe309716ef6ac71` |
| `Krono-module-goals-v2.1.0.apk` | `98c9fc1d2e27482b6c14274c34d27cd78d3383974ac730e083e1ede82034d110` |
| `Krono-module-notes-v2.1.0.apk` | `b7da9c83e4f7568af7114462189c629bc55c72e7e289bc92b37ead2e8b8335b3` |
| `Krono-module-qwen-v2.1.0.apk` | `717bb723f2f83ddc21ebe2364b56e75fcb4b9b764ae93f5e655d32009e11e6f9` |
| `Krono-module-dokploy-v2.1.0.apk` | `e99abb035ca6b773d4611a6033e5f1e49e582109382c0d590b672c2a79f152c6` |
| `Krono-v2.0.0-to-v2.1.0.kpatch` | `d0479f02a6cb72ff4b31e0adef08aedc54025a8ff3d31b8c326a00df5c07d3f8` |
| `Krono-v1.5.0-to-v2.1.0.kpatch` | `3b69fcdf20a389e9fe433ab9244d01c467a72ac2a45c0074084bb68e3ef0472a` |
| `Krono-v1.4.0-to-v2.1.0.kpatch` | `3502ead9aa24127acf070d788b547c0c5e76c6e31e0babdc099e51325fd7f0cb` |
| `Krono-v1.3.0-to-v2.1.0.kpatch` | `623f9313e628b5c1036890215afd1b64f8d0f3834eae20da8d64a1a429b5ed62` |
| `Krono-v1.2.0-to-v2.1.0.kpatch` | `f8415d33444a72e12661c64e629d6f1b73987a93eae6c769779138ed4bda7a4e` |
| `Krono-v1.1.0-to-v2.1.0.kpatch` | `5a1c4f3e34e07e586c778900699ffd5e29e5e3de6a3366080be3bd8886a7d5ec` |
| `Krono-v1.0.0-to-v2.1.0.kpatch` | `cf3f3c9d2e27482b6c14274c34d27cd78d3383974ac730e083e1ede82034d110` |
| `Krono-v2.0.0.apk` (Universal) | `4d89a316a0f96e7d6c7b57431b0dc974f1c897da4e4ffa63704b3f712bb729af` |
| `Krono-core-v2.0.0.apk` (Core Base) | `bca75ef81dc641d01a91eedd7f7eb1d9fb7d13662a13b65a334c0b4dfcc7d458` |
| `Krono-module-tasks-v2.0.0.apk` (`74.048 B`) | `f9bb520e4dfb46be5c3ca9f4f5f64420e5651a68a3eace9244741a6dcae2ac16` |
| `Krono-module-focus-v2.0.0.apk` (`84.000 B`) | `8429a943542e94e3163f1bb7b1c7aa69d66c0490a37861147dec8c66b79b20e5` |
| `Krono-module-market-v2.0.0.apk` (`995.664 B`) | `2322879216456af1a46e3fafe95a920685b2c9717cab6e3c25359c3607e9f413` |
| `Krono-module-finance-v2.0.0.apk` (`13.251.008 B`) | `5a6403b39ebd4dc82f56fc6f53ebc75df756fab33050bcd82e352c8d21491eab` |
| `Krono-module-goals-v2.0.0.apk` (`60.984 B`) | `0ba3b5af6a30273466ca10147d56504eda12a743d6181bf843a8d88331b9c303` |
| `Krono-module-notes-v2.0.0.apk` (`47.728 B`) | `e41b22b969b038c33ea6ee4d9b2c33b33b861bff1162661a08448e849d65d1dc` |
| `Krono-module-qwen-v2.0.0.apk` (`6.615.701 B`) | `752f03a4c82e8d311f1b2d87740b4dfeb3e3644ac7726656cdb54ab01c4e6236` |
| `Krono-v1.5.0-to-v2.0.0.kpatch` | `d810c35d79e23be8d03a4c56f73073da3924182d56625f7b49c7a406ddbbee53` |
| `Krono-v1.4.0-to-v2.0.0.kpatch` | `4a445ce0b299ff4781e5c3c4d7880d57744dc9f7e0c08bef387780937be13561` |
| `Krono-v1.3.0-to-v2.0.0.kpatch` | `ed530e76ec67df55bdc460721432294d2038d03536b31dbc443571d7850f37d7` |
| `Krono-v1.2.0-to-v2.0.0.kpatch` | `0c54375140a4561fec0c889aaba0b32b689f591ddefde034c6bf15423a518542` |
| `Krono-v1.1.0-to-v2.0.0.kpatch` | `05516eb5913979634fb84728fd31c505cb233c14048be7d87fde984b192febfc` |
| `Krono-v1.0.0-to-v2.0.0.kpatch` | `a33d9bf67c558bb2adb2d7e9942cddd0d5cf695e144c09ecfe42c040aa740b4a` |
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
sha256sum Krono-v2.1.1.apk Krono-core-v2.1.1.apk
# Krono-v2.1.1.apk:      df3fc28824bbc1a2bb829af2116b949ffa167b96e890005ab6b9d31e27ec6424
# Krono-core-v2.1.1.apk: dfc8f02b2201b2059d6619b115ac20268d9e3e2632555e88941452daa6cf5a6d
```

### Requisitos e Instalação no Android

- **Sistema operacional:** Android 8.0+ (API 26+) em dispositivos ARM64 (`arm64-v8a`), compilado com alinhamento de página ELF 16 KB (compatível com Android 15/16).
- **Escolha Modular ou Completa:** instale [`Krono-core-v2.1.1.apk`](https://krono.rafixx.com/releases/latest/download/Krono-core-latest.apk) (`14,89 MB`) e selecione seus módulos em [`#montar`](https://krono.rafixx.com/#montar) / Central de Módulos do app, ou baixe [`Krono-v2.1.1.apk`](https://krono.rafixx.com/releases/latest/download/Krono-latest.apk) (`36,23 MB`) com todos os 8 módulos incluídos.
- **Espaço adicional opcional:** ~2,1 GB livres caso deseje baixar os pesos do modelo `Qwen2.5-3B-Instruct (Q4_K_M)` dentro do próprio aplicativo (requer o módulo `:feature_qwen`; o **Modo Rápido** com voz PT-BR já vem no Core sem download extra).

**Passo a passo de instalação:**
1. Baixe [`Krono-core-v2.1.1.apk`](https://krono.rafixx.com/releases/latest/download/Krono-core-latest.apk) (modular) ou [`Krono-v2.1.1.apk`](https://krono.rafixx.com/releases/latest/download/Krono-latest.apk) (completo) no dispositivo Android.
2. Ao abrir o arquivo, habilite a permissão **Instalar apps desconhecidos** para o navegador/gerenciador de arquivos, se solicitado.
3. Confirme a instalação (no modo modular, monte seu kit em [`#montar`](https://krono.rafixx.com/#montar) para abrir direto via `krono://setup`).

> **Auto-atualização inteligente Delta (`KDP1`) & Atualização Atômica Modular:** quando conectado à internet, o Krono consulta automaticamente `https://krono.rafixx.com/api/releases.json` (intervalo automático de 6 horas ou manualmente em **Perfil > Atualizações do Krono**), valida as assinaturas criptográficas **RSA-2048 (`SHA256withRSA`: `signature` + `modulesSignature`)** do manifesto, aplica patch binário `.kpatch` (no APK Universal) ou atualiza atomicamente o **Core + apenas os Split APKs instalados** (`MODE_FULL_INSTALL`), verificando SHA-256 e certificado oficial pinado (`db0bfd...37b6`). O banco SQLite Room e os pesos locais do Qwen são preservados durante a atualização.

---

## Changelog de Versões

### [`v2.1.1` (build 9)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v2.1.1) — `2026-11-22`
- **Uso & Containers corrigidos (`DokployApiClient`):** consulta paralela em `/api/project.one` (pois `/api/project.all` omite `appName`), cruzamento com `/api/docker.getContainersByAppNameMatch`, timeout de `45s` em `/api/swarm.getContainerStats` e exibição clara de erro/recarregamento.
- **Métricas reais do servidor & disco:** leitura de vCPU e RAM do nó via `/api/swarm.getNodes` + `/api/swarm.getNodeInfo` e uso de disco Docker via `/api/settings.getDockerDiskUsage`, exibindo `%` real de RAM/CPU no servidor e por aplicação.
- **Logs de Compose & Terminal acima da barra:** pré-seleção automática do container ativo, chips destacados com `shortContainerLabel` na aba **Logs** e `DokployServiceDetailOverlay` em `Dialog` tela cheia acima da `FloatingBottomDock`.
- **Opt-in em atualizações:** `optInByDefault` + `reconcileEmbeddedHiddenIds` impedem novos módulos (como `:feature_dokploy`) de ativarem automaticamente ao atualizar, e `isModularInstallation` mantém aparelhos Core com `0` splits no fluxo modular.
- **Deltas binários `KDP1`:** `v2.1.0 → v2.1.1` (`2,76 MB`, `-92,38%`) e deltas a partir de `v1.0.0..v2.0.0`.

### [`v2.1.0` (build 8)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v2.1.0) — `2026-11-22`
- **Novo módulo sob demanda `:feature_dokploy` (`195,99 KB`):** gerenciamento multi-conta Dokploy via HTTPS + `x-api-key` configurados pelo próprio usuário dentro do app (armazenamento cifrado AES-256-GCM no Android Keystore via `DokployCredentialStore`).
- **Controle completo de aplicações & servidor:** status de projetos/apps/compose, CPU e memória RAM por aplicação (`docker.getContainers` / `server.getServerMetrics`), domínios + validação DNS, controle de containers Docker (`restart`/`start`/`stop`), logs ao vivo de container/deploy, redeploy, editor `.env` e sincronização segura com **Krono IA** (`DokployKnowledgeModule`).
- **Central de Módulos sem código + busca:** consulta automática a `/api/releases.json` ao abrir (`CatalogSyncStatus`), barra de pesquisa normalizada (sem acento), chips de filtro (`Todos`, `Disponíveis`, `Ativos`) e botões diretos em 1 toque.
- **Deltas binários `KDP1`:** `v2.0.0 → v2.1.0` (`9,54 MB`, `-73,63%`) e deltas a partir de todas as versões `v1.0.0..v1.5.0`.

### [`v2.0.0` (build 7)](https://github.com/IsaacNilsonViana/krono-lp/releases/tag/v2.0.0) — `2026-11-22`

#### Novidades — Krono Modular (`Core + 7 Split APKs`) & Krono IA Modular
- **Arquitetura Modular Real (`:app` Core + 7 `com.android.dynamic-feature`)**: redução de **58,8%** no download base (`14,80 MB` no `Krono-core-v2.0.0.apk` vs. `35,94 MB` no APK Universal), isolando **OCR ML Kit (`13,25 MB`)** em `:feature_finance`, **llama.cpp C++ ARM64 (`6,62 MB`)** em `:feature_qwen` e **CameraX + ZXing (`1,00 MB`)** em `:feature_market`.
- **Central de Módulos no App & Construtor `#montar` na LP**: seleção personalizada com cálculo exato de tamanho, instalação em lote via `PackageInstaller(MODE_INHERIT_EXISTING)`, remoção real do sistema (`removeSplit`) com opção de limpar dados locais e deep link `krono://setup` / código `KRONO:...`.
- **Segurança Modular (`krono-modules-v1`)**: dupla assinatura RSA-2048 retrocompatível e verificação por split no dispositivo (`verifySplitApkOnDevice`).
- **Krono IA Modular e Sempre Atualizada**: arquitetura unificada `AiKnowledgeModule` + `AiModuleRegistry` + trava `AiModuleCoverage`, sincronizada dinamicamente aos módulos ativos no aparelho com conhecimento completo de **Finanças**, **Mercado** (preços por produto e carrinho) e cards `AiChatWidget.ModuleSnapshot`.

---

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
│   │   ├── ModularBuilderSection.tsx  # Construtor modular para montar kits Core + Split APKs (#montar)
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
