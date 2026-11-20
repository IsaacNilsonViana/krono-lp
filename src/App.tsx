import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
  BellRing,
  Bot,
  CalendarClock,
  CheckCircle2,
  Cpu,
  Download,
  ExternalLink,
  HardDriveDownload,
  Lock,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react';
import PhoneShowcase from './components/PhoneShowcase';
import InteractiveAppPreview from './components/InteractiveAppPreview';
import ReleasesSection from './components/ReleasesSection';
import { ReleasesManifest } from './types';

const FALLBACK_MANIFEST: ReleasesManifest = {
  latest: {
    versionCode: 6,
    versionName: '1.5.0',
    releasedAt: '2026-11-20',
    channel: 'production',
    summary:
      'Nova Área Financeira 100% offline com receitas/despesas, contas mensais, parcelamento em até 36x, OCR no aparelho para boletos e comprovantes (imagens e PDFs), calendário de vencimentos, simulador de compras e lembretes locais.',
    changelog: [
      'Novo módulo Finanças offline com Resumo, Calendário mensal, Simulador de compras e Ajustes',
      'OCR no aparelho para boletos, comprovantes Pix e cupons em imagem ou PDF (até 5 páginas)',
      'Parcelamentos em 1x..36x com centavos exatos, recorrência mensal e status pago por ocorrência',
      'Migração Room v7 preservando dados locais e integração completa ao backup JSON',
    ],
    apkUrl: 'https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.5.0.apk',
    apkSizeBytes: 35828261,
    sha256: '36bae381c7abcd3a0d06ed61f784b51dbb36006e70ac92bf0e90509734157bf0',
    minSdk: 26,
    abi: 'arm64-v8a',
    patches: [
      {
        fromVersionCode: 5,
        fromVersionName: '1.4.0',
        patchUrl:
          'https://github.com/IsaacNilsonViana/krono-lp/releases/download/v1.5.0/Krono-v1.4.0-to-v1.5.0.kpatch',
        patchSizeBytes: 21333209,
        patchSha256: 'f7640f8ed73714d3618d0b11c2c5503faf192fd56b3adc760e812cb143c911d9',
      },
    ],
    documentation: [],
  },
  versions: [],
};
FALLBACK_MANIFEST.versions = [FALLBACK_MANIFEST.latest];

const App: React.FC = () => {
  const [manifest, setManifest] = useState<ReleasesManifest>(FALLBACK_MANIFEST);

  useEffect(() => {
    let active = true;
    fetch('/api/releases.json', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: ReleasesManifest) => {
        if (active && data?.latest && Array.isArray(data?.versions)) {
          setManifest(data);
        }
      })
      .catch(() => {
        // Fallback manifest already loaded
      });
    return () => {
      active = false;
    };
  }, []);

  const latest = manifest.latest;
  const latestSizeMb = (latest.apkSizeBytes / (1024 * 1024)).toFixed(1);
  const deltaInfo = latest.patches[0];
  const deltaSavedMb = deltaInfo
    ? ((latest.apkSizeBytes - deltaInfo.patchSizeBytes) / (1024 * 1024)).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-[#0B0E17] text-[#F6F8FF]">
      {/* Ambient radial lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_at_top,rgba(124,92,255,0.22),rgba(0,194,255,0.08)_45%,transparent_75%)]"
      />

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-[#28324F]/70 bg-[#0B0E17]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#topo" className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="Logo Krono" className="h-9 w-9 rounded-xl" />
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Krono
              </span>
              <span className="ml-2 hidden rounded-full border border-[#28324F] bg-[#141928] px-2 py-0.5 font-mono text-[10px] text-[#00C2FF] sm:inline-block">
                v{latest.versionName}
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#9BA6C7] md:flex">
            <a href="#previa" className="transition hover:text-white">
              Prévia ao vivo
            </a>
            <a href="#recursos" className="transition hover:text-white">
              Recursos
            </a>
            <a href="#ia-offline" className="transition hover:text-white">
              IA Offline
            </a>
            <a href="#updater" className="transition hover:text-white">
              Auto-Update Delta
            </a>
            <a href="#versoes" className="transition hover:text-white">
              Versões & Docs
            </a>
          </nav>

          <a
            href={latest.apkUrl}
            className="inline-flex items-center gap-2 rounded-xl bg-[#7C5CFF] px-4 py-2 text-xs font-bold text-white shadow-[0_3px_0_#5336CC] transition hover:-translate-y-0.5 hover:bg-[#6A48F5] sm:text-sm"
          >
            <Download className="h-4 w-4" />
            Baixar APK
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="topo" className="relative overflow-hidden py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#7C5CFF]/45 bg-[#141928] px-3.5 py-1.5 text-xs font-medium text-[#00C2FF]">
              <span className="h-2 w-2 rounded-full bg-[#00D68F]" />
              <span>v{latest.versionName} em produção • 100% Offline • Android 8.0+</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Sua rotina, foco e{' '}
              <span className="bg-gradient-to-r from-[#7C5CFF] via-[#00C2FF] to-[#00D68F] bg-clip-text text-transparent">
                assistente IA offline
              </span>{' '}
              no Android.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#9BA6C7] sm:text-lg">
              Organize tarefas recorrentes, acompanhe o tempo real de uso dos aplicativos e
              converse com o <strong className="text-white">Qwen2.5-3B</strong> rodando direto no
              processador do celular via NDK <span className="font-mono text-[#00C2FF]">llama.cpp</span>{' '}
              — com memória pessoal local, cards interativos e atualização automática inteligente.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={latest.apkUrl}
                className="inline-flex items-center gap-2.5 rounded-2xl bg-[#7C5CFF] px-6 py-3.5 text-sm font-bold text-white shadow-[0_5px_0_#5336CC] transition hover:-translate-y-0.5 hover:bg-[#6A48F5] sm:text-base"
              >
                <Download className="h-5 w-5" />
                Baixar Krono v{latest.versionName} ({latestSizeMb} MB)
              </a>

              <a
                href="#previa"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#00C2FF]/50 bg-[#141928] px-5 py-3.5 text-sm font-semibold text-[#00C2FF] transition hover:border-[#00C2FF] hover:bg-[#1C2338] sm:text-base"
              >
                <Sparkles className="h-4 w-4" />
                Testar prévia ao vivo
              </a>

              <a
                href="#versoes"
                className="inline-flex items-center gap-2 rounded-2xl border border-[#28324F] bg-[#141928] px-5 py-3.5 text-sm font-semibold text-[#F6F8FF] transition hover:border-[#00C2FF] hover:text-[#00C2FF] sm:text-base"
              >
                Histórico & Documentação
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: 'Motor Nativo', value: 'llama.cpp v1.0' },
                { label: 'Arquitetura', value: 'ARMv8.2 + i8mm' },
                {
                  label: 'Update Delta',
                  value: deltaSavedMb ? `-${deltaSavedMb} MB KDP1` : 'KDP1 GZIP',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#28324F] bg-[#141928]/85 px-3.5 py-2.5"
                >
                  <div className="text-[11px] font-mono text-[#667194]">{stat.label}</div>
                  <div className="mt-0.5 font-mono text-xs font-semibold text-white sm:text-sm">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PhoneShowcase />
        </div>
      </section>

      {/* Interactive Browser Preview */}
      <InteractiveAppPreview />

      {/* Feature Bento Grid */}
      <section id="recursos" className="border-t border-[#28324F]/70 py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#7C5CFF]">
              // OBSIDIAN ARCADE WORKFLOW
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Tudo o que importa no seu dia, sem nuvem obrigatória
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9BA6C7] sm:text-base">
              Seus hábitos, lembretes, tempo de tela e conversas com a IA ficam salvos localmente em
              SQLite (Room) e nunca dependem de assinatura ou servidores terceiros.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: CalendarClock,
                accent: 'text-[#7C5CFF]',
                title: 'Rotina & Recorrência Completa',
                desc: 'Tarefas únicas, diárias, semanais, mensais ou por intervalo de dias, com subtarefas, prioridades, XP e alarmes exatos.',
              },
              {
                icon: Smartphone,
                accent: 'text-[#00C2FF]',
                title: 'Tempo de Uso & Guardião',
                desc: 'Rastreamento real via UsageStatsManager corrigido para transições entre telas e bloqueio do aparelho, com limites diários e por app.',
              },
              {
                icon: Zap,
                accent: 'text-[#FF6B35]',
                title: 'Modo Foco em Foreground',
                desc: 'Temporizador Pomodoro em serviço dedicado com notificação contínua, vibração ao concluir e alerta se abrir apps distrativos.',
              },
              {
                icon: Award,
                accent: 'text-[#FFB800]',
                title: 'Gamificação & Ofensiva',
                desc: 'Evolua níveis com XP, proteja sua sequência diária com avisos configuráveis e desbloqueie 14 conquistas.',
              },
              {
                icon: Lock,
                accent: 'text-[#00D68F]',
                title: 'Privacidade Total & Backup JSON',
                desc: 'Banco Room local + exportação/importação completa em JSON offline de tarefas, metas, notas, conquistas e memórias.',
              },
              {
                icon: Sparkles,
                accent: 'text-[#00C2FF]',
                title: 'Cards Interativos no Chat',
                desc: 'Perguntas sobre rotina, tempo restante, top 3/5 apps, metas ou notas renderizam widgets táteis clicáveis direto na resposta.',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-3xl border border-[#28324F] bg-[#141928] p-6 shadow-[0_5px_0_#06080F] transition hover:border-[#7C5CFF]/60"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#28324F] bg-[#1C2338]">
                    <Icon className={`h-5 w-5 ${card.accent}`} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9BA6C7]">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Offline AI Architecture */}
      <section id="ia-offline" className="border-t border-[#28324F]/70 bg-[#141928]/45 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00D68F]/40 bg-[#00D68F]/10 px-3 py-1 font-mono text-xs font-semibold text-[#00D68F]">
              <Cpu className="h-3.5 w-3.5" />
              IA DUAL ON-DEVICE
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Modo Rápido instantâneo ou Qwen2.5-3B rodando nativamente em C++
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#9BA6C7] sm:text-base">
              Alterne com um toque entre o interpretador determinístico instantâneo (ideal para
              criar lembretes e listas por voz em PT-BR em milissegundos) e o modelo{' '}
              <strong className="text-white">Qwen2.5-3B-Instruct (Q4_K_M)</strong> compilado em JNI
              próprio sobre o <span className="font-mono text-[#00C2FF]">llama.cpp v1.0.0</span>.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-[#F6F8FF]">
              {[
                'KV-cache Q8_0 com reutilização exata de prefixo e warmup automático ao abrir o chat',
                'Contexto de 3072 tokens e histórico de até 12 turnos com sampler anti-loop',
                'Memória pessoal duradoura no Room (tabela user_memories) com chips Desfazer',
                'Continuidade em segundo plano: troque de tela ou minimize e receba notificação ao concluir',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00D68F]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Bot,
                title: 'Pinagem nos núcleos grandes (big_cpus)',
                detail:
                  'Detecta automaticamente os núcleos de maior clock em /sys/devices/system/cpu e pausa a threadpool em repouso para 0% de dreno em standby.',
                tag: 'ARMv8.2 + dotprod + fp16 + i8mm',
              },
              {
                icon: BellRing,
                title: 'Notificação quando terminar',
                detail:
                  'AiGenerationForegroundService mantém a geração viva ao sair do chat ou minimizar o app e dispara alerta clicável no canal krono_ai_ready.',
                tag: 'Background Ready + Copiar & Editar',
              },
              {
                icon: ShieldCheck,
                title: 'Alinhamento 16 KB & UTF-8 Seguro',
                detail:
                  'libkrono_llama.so compilada com -Wl,-z,max-page-size=16384 para Android 15/16 e streaming de bytes UTF-8 sem quebra em acentos ou emojis.',
                tag: 'Android 15/16 Ready',
              },
            ].map((box) => {
              const Icon = box.icon;
              return (
                <div
                  key={box.title}
                  className="rounded-3xl border border-[#28324F] bg-[#0B0E17] p-5 shadow-[0_4px_0_#06080F]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-5 w-5 text-[#00C2FF]" />
                      <h3 className="text-base font-bold text-white">{box.title}</h3>
                    </div>
                    <span className="hidden rounded-full bg-[#1C2338] px-2.5 py-0.5 font-mono text-[10px] text-[#00C2FF] sm:inline-block">
                      {box.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#9BA6C7]">{box.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Smart Delta Auto-Updater Section */}
      <section id="updater" className="border-t border-[#28324F]/70 py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="rounded-3xl border border-[#00D68F]/45 bg-gradient-to-br from-[#141928] to-[#0B0E17] p-6 sm:p-10 shadow-[0_6px_0_#06080F]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00D68F]/45 bg-[#00D68F]/10 px-3 py-1 font-mono text-xs font-semibold text-[#00D68F]">
              <HardDriveDownload className="h-3.5 w-3.5" />
              AUTO-ATUALIZAÇÃO DELTA KDP1
            </div>

            <div className="mt-4 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Atualiza sozinho quando está online — baixando só o necessário
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#9BA6C7] sm:text-base">
                  O aplicativo verifica automaticamente{' '}
                  <span className="font-mono text-white">krono.rafixx.com/api/releases.json</span>.
                  Quando há uma versão nova e existe um patch <span className="font-mono text-[#00D68F]">.kpatch</span>{' '}
                  compatível, ele reaproveita os blocos inalterados direto do APK já instalado (como
                  os ~18 MB da engine nativa em C++) e baixa apenas o delta binário comprimido.
                </p>
              </div>

              <div className="grid gap-3">
                {[
                  {
                    step: '01',
                    title: 'Checagem automática online',
                    desc: 'Compara versionCode remoto vs instalado silenciosamente a cada 6h ou sob demanda no Perfil.',
                  },
                  {
                    step: '02',
                    title: 'Assinatura RSA-2048 + SHA-256 duplo + Cert Pinning',
                    desc: 'Valida assinatura RSA do manifesto, aplica o delta KDP1 com SHA-256 duplo e confere o certificado oficial do APK antes de instalar.',
                  },
                  {
                    step: '03',
                    title: 'Dados e Qwen 100% preservados',
                    desc: 'Peso Qwen2.5-3B (~2,1 GB) e banco SQLite Room ficam intactos; basta tocar para instalar.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-3 rounded-2xl border border-[#28324F] bg-[#141928]/90 p-4"
                  >
                    <span className="rounded-lg bg-[#7C5CFF]/20 px-2 py-1 font-mono text-xs font-bold text-[#00C2FF]">
                      {item.step}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#9BA6C7]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Version History & Complete Documentation */}
      <ReleasesSection
        versions={manifest.versions}
        latestVersionCode={latest.versionCode}
      />

      {/* Footer */}
      <footer className="border-t border-[#28324F]/70 bg-[#0B0E17] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-2.5 text-sm text-[#9BA6C7]">
            <img src="/favicon.svg" alt="Krono" className="h-6 w-6 rounded-md" />
            <span>
              <strong className="text-white">Krono Android</strong> • Desenvolvido por Isaac Nilson
              Viana
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-[#9BA6C7]">
            <a
              href="https://inv.rafixx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition hover:text-[#00C2FF]"
            >
              Portfólio inv.rafixx.com
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/IsaacNilsonViana/krono-lp/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition hover:text-[#00C2FF]"
            >
              GitHub Releases
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
