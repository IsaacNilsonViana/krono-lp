import React, { useEffect, useMemo, useState } from 'react';
import {
  Boxes,
  Check,
  Copy,
  Download,
  ExternalLink,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ReleaseInfo, RemoteModuleSplit } from '../types';

interface ModularBuilderSectionProps {
  latest: ReleaseInfo;
}

const DEFAULT_MODULES: RemoteModuleSplit[] = [
  {
    id: 'tasks',
    splitName: 'feature_tasks',
    name: 'Tarefas & Rotina',
    description: 'Hábitos recorrentes, prioridades, subtarefas, XP e lembretes exatos.',
    category: 'Produtividade',
    apkUrl: '',
    apkSizeBytes: 512 * 1024,
    sha256: '',
  },
  {
    id: 'focus',
    splitName: 'feature_focus',
    name: 'Foco & Tempo de Tela',
    description: 'Pomodoro em foreground, alerta de distrações e limites de apps.',
    category: 'Bem-estar',
    apkUrl: '',
    apkSizeBytes: 512 * 1024,
    sha256: '',
  },
  {
    id: 'market',
    splitName: 'feature_market',
    name: 'Mercado & Preços',
    description: 'Scanner de código de barras, comparação de preços, carrinho e histórico.',
    category: 'Dia a Dia',
    highlightNote: 'CameraX + ZXing',
    apkUrl: '',
    apkSizeBytes: 2200 * 1024,
    sha256: '',
  },
  {
    id: 'finance',
    splitName: 'feature_finance',
    name: 'Área Financeira',
    description: 'Receitas, despesas, parcelas 36x, simulador, calendário e OCR.',
    category: 'Financeiro',
    highlightNote: 'OCR offline ML Kit',
    apkUrl: '',
    apkSizeBytes: 12000 * 1024,
    sha256: '',
  },
  {
    id: 'goals',
    splitName: 'feature_goals',
    name: 'Metas & Marcos',
    description: 'Metas quantitativas com marcos automáticos, prazo e progresso.',
    category: 'Planejamento',
    apkUrl: '',
    apkSizeBytes: 420 * 1024,
    sha256: '',
  },
  {
    id: 'notes',
    splitName: 'feature_notes',
    name: 'Notas & Checklists',
    description: 'Notas fixáveis por cor/tag e checklists interativos.',
    category: 'Organização',
    apkUrl: '',
    apkSizeBytes: 420 * 1024,
    sha256: '',
  },
  {
    id: 'qwen',
    splitName: 'feature_qwen',
    name: 'Motor Qwen2.5-3B (C++)',
    description: 'Motor nativo llama.cpp ARM64 para LLM local 100% offline.',
    category: 'IA Avançada',
    highlightNote: 'Native C++ ARM64',
    apkUrl: '',
    apkSizeBytes: 6300 * 1024,
    sha256: '',
  },
  {
    id: 'dokploy',
    splitName: 'feature_dokploy',
    name: 'Dokploy & Servidores',
    description: 'Gerencie apps, domínios HTTPS, logs, deploys e uso do servidor em qualquer painel Dokploy.',
    category: 'DevOps & Cloud',
    highlightNote: 'Multi-servidor • Keystore AES',
    apkUrl: '',
    apkSizeBytes: 180 * 1024,
    sha256: '',
  },
];

function formatMb(bytes: number): string {
  if (!bytes || bytes <= 0) return '—';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function parseQueryModules(): string[] | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('modules');
    if (raw === null) return null;
    if (!raw.trim()) return [];
    return raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  } catch {
    return null;
  }
}

const ModularBuilderSection: React.FC<ModularBuilderSectionProps> = ({ latest }) => {
  const catalog = useMemo<RemoteModuleSplit[]>(() => {
    if (latest.modules && latest.modules.length > 0) {
      return latest.modules;
    }
    return DEFAULT_MODULES;
  }, [latest.modules]);

  const allIds = useMemo(() => catalog.map((m) => m.id), [catalog]);

  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const fromUrl = parseQueryModules();
    if (fromUrl !== null) return fromUrl;
    return ['tasks', 'focus', 'market', 'finance'];
  });
  const [copiedCode, setCopiedCode] = useState(false);
  const [showIndividualSplits, setShowIndividualSplits] = useState(false);

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const canonicalSelected = useMemo(
    () => catalog.filter((m) => selectedSet.has(m.id)),
    [catalog, selectedSet],
  );

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const encoded = canonicalSelected.map((m) => m.id).join(',');
      if (encoded) {
        url.searchParams.set('modules', encoded);
      } else {
        url.searchParams.set('modules', 'core');
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore history API errors
    }
  }, [canonicalSelected]);

  const coreBytes = latest.coreApkSizeBytes && latest.coreApkSizeBytes > 0
    ? latest.coreApkSizeBytes
    : 15 * 1024 * 1024;
  const universalBytes = latest.apkSizeBytes > 0 ? latest.apkSizeBytes : 36 * 1024 * 1024;
  const selectedSplitsBytes = canonicalSelected.reduce((sum, m) => sum + (m.apkSizeBytes || 0), 0);
  const customTotalBytes = coreBytes + selectedSplitsBytes;

  const isAllSelected = canonicalSelected.length === catalog.length;
  const isCoreOnly = canonicalSelected.length === 0;
  const effectiveBytes = isAllSelected ? universalBytes : customTotalBytes;
  const savedBytes = Math.max(0, universalBytes - effectiveBytes);
  const savedPct = universalBytes > 0 ? Math.max(0, Math.round((savedBytes / universalBytes) * 100)) : 0;

  const presetParam = canonicalSelected.map((m) => m.id).join(',');
  const setupUri = `krono://setup?modules=${presetParam}`;
  const setupCode = `KRONO:${presetParam}`;

  const coreDownloadUrl = latest.coreApkUrl || latest.apkUrl;

  const toggleModule = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const applyPreset = (ids: string[]) => {
    setSelectedIds(ids.filter((id) => allIds.includes(id)));
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(setupCode);
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <section id="montar" className="relative border-t border-[#28324F]/70 bg-[#141928]/35 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00D68F]/40 bg-[#00D68F]/10 px-3 py-1 font-mono text-xs font-semibold text-[#00D68F]">
              <Boxes className="h-3.5 w-3.5" />
              KRONO MODULAR • CORE + SPLIT APKS
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Monte o Krono só com os módulos que você quer usar
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9BA6C7] sm:text-base">
              Baixe apenas o <strong className="text-white">Krono Core</strong> e instale somente os
              módulos selecionados (Split APKs verificados por SHA-256 + RSA-2048). Depois você pode
              adicionar ou remover qualquer módulo direto dentro do aplicativo.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Só Core', ids: [] },
              { label: 'Rotina Leve', ids: ['tasks', 'focus', 'goals', 'notes'] },
              { label: 'Finanças & Mercado', ids: ['tasks', 'market', 'finance'] },
              { label: 'Completo (Tudo)', ids: allIds },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset.ids)}
                className="rounded-xl border border-[#28324F] bg-[#141928] px-3 py-1.5 font-mono text-xs text-[#9BA6C7] transition hover:border-[#00C2FF] hover:text-white cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Core always included banner */}
        <div className="mt-8 rounded-2xl border border-[#7C5CFF]/45 bg-[#141928] p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#7C5CFF]/50 bg-[#7C5CFF]/15 text-[#7C5CFF]">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-white">Krono Core (Base Obrigatória)</span>
                <span className="rounded-full bg-[#7C5CFF]/20 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#00C2FF]">
                  {formatMb(coreBytes)}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#9BA6C7] sm:text-sm">
                Inclui Dashboard, Krono IA (Modo Rápido offline), Tema Obsidian Arcade, Backup JSON,
                Auto-Update e Central de Módulos.
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#00D68F]/45 bg-[#00D68F]/15 px-3 py-1 font-mono text-xs font-semibold text-[#00D68F]">
            <Check className="h-3.5 w-3.5" /> Sempre incluído
          </span>
        </div>

        {/* Selectable module cards */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((mod) => {
            const active = selectedSet.has(mod.id);
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => toggleModule(mod.id)}
                className={`group text-left rounded-3xl border p-5 shadow-[0_4px_0_#06080F] transition cursor-pointer ${
                  active
                    ? 'border-[#00C2FF] bg-[#141928]'
                    : 'border-[#28324F] bg-[#0B0E17]/90 opacity-80 hover:opacity-100 hover:border-[#7C5CFF]/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {mod.category && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#9BA6C7]">
                        {mod.category}
                      </span>
                    )}
                    <h3 className="mt-0.5 text-base font-bold text-white">{mod.name}</h3>
                  </div>

                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition ${
                      active
                        ? 'border-[#00C2FF] bg-[#00C2FF] text-[#0B0E17]'
                        : 'border-[#28324F] bg-[#141928] text-transparent'
                    }`}
                  >
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                </div>

                {mod.description && (
                  <p className="mt-2 text-xs leading-relaxed text-[#9BA6C7] sm:text-sm">
                    {mod.description}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#28324F]/70 pt-3">
                  <span className="font-mono text-xs font-semibold text-[#00D68F]">
                    +{formatMb(mod.apkSizeBytes)}
                  </span>
                  {mod.highlightNote && (
                    <span className="rounded-full border border-[#FFB800]/40 bg-[#FFB800]/10 px-2 py-0.5 font-mono text-[10px] text-[#FFB800]">
                      {mod.highlightNote}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Summary & Download Flow Box */}
        <div className="mt-8 rounded-3xl border border-[#00C2FF]/45 bg-[#0B0E17] p-6 sm:p-8 shadow-[0_6px_0_#06080F]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs uppercase tracking-wider text-[#00C2FF]">
                  SEU KRONO PERSONALIZADO
                </span>
                {savedBytes > 0 && !isAllSelected && (
                  <span className="rounded-full border border-[#00D68F]/45 bg-[#00D68F]/15 px-2.5 py-0.5 font-mono text-xs font-semibold text-[#00D68F]">
                    Economiza {formatMb(savedBytes)} (-{savedPct}%) vs. APK completo
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-white">
                  {formatMb(effectiveBytes)}
                </span>
                <span className="text-sm text-[#9BA6C7]">
                  Core ({formatMb(coreBytes)})
                  {canonicalSelected.length > 0 && !isAllSelected
                    ? ` + ${canonicalSelected.length} módulo(s) (${formatMb(selectedSplitsBytes)})`
                    : isAllSelected
                      ? ' + Todos os 7 módulos em 1 APK completo'
                      : ' apenas'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#667194]">
                <ShieldCheck className="h-4 w-4 text-[#00D68F]" />
                <span>Assinado RSA-2048 • Verificação SHA-256 automática no aparelho</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:justify-end">
              {isAllSelected ? (
                <a
                  href={latest.apkUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7C5CFF] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_0_#5336CC] transition hover:-translate-y-0.5 hover:bg-[#6A48F5]"
                >
                  <Download className="h-4 w-4" />
                  Baixar APK Completo ({formatMb(universalBytes)})
                </a>
              ) : isCoreOnly ? (
                <a
                  href={coreDownloadUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00D68F] px-6 py-3.5 text-sm font-bold text-[#0B0E17] shadow-[0_4px_0_#009B67] transition hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" />
                  Baixar Krono Core ({formatMb(coreBytes)})
                </a>
              ) : (
                <>
                  <a
                    href={coreDownloadUrl}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7C5CFF] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_#5336CC] transition hover:-translate-y-0.5 hover:bg-[#6A48F5]"
                  >
                    <Download className="h-4 w-4" />
                    1. Baixar Krono Core ({formatMb(coreBytes)})
                  </a>
                  <a
                    href={setupUri}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#00D68F]/60 bg-[#00D68F]/15 px-5 py-3 text-sm font-bold text-[#00D68F] transition hover:bg-[#00D68F]/25"
                  >
                    <Sparkles className="h-4 w-4" />
                    2. Instalar Kit no App
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </>
              )}
            </div>
          </div>

          {!isCoreOnly && !isAllSelected && (
            <div className="mt-5 flex flex-col gap-3 border-t border-[#28324F] pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9BA6C7]">
                <span>Ou cole este código na Central de Módulos do app:</span>
                <code className="rounded-lg border border-[#28324F] bg-[#141928] px-2.5 py-1 font-mono text-[#00C2FF]">
                  {setupCode}
                </code>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#28324F] bg-[#141928] px-2.5 py-1 font-mono text-xs text-white transition hover:border-[#00C2FF] cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#00D68F]" />
                      <span className="text-[#00D68F]">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {canonicalSelected.some((m) => !!m.apkUrl) && (
                <button
                  type="button"
                  onClick={() => setShowIndividualSplits((v) => !v)}
                  className="text-left font-mono text-xs text-[#00C2FF] underline-offset-4 hover:underline cursor-pointer"
                >
                  {showIndividualSplits
                    ? 'Ocultar downloads diretos (.apk)'
                    : `Baixar Split APKs selecionados manualmente (${canonicalSelected.length})`}
                </button>
              )}
            </div>
          )}

          {showIndividualSplits && !isAllSelected && canonicalSelected.length > 0 && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {canonicalSelected.map((mod) => (
                <a
                  key={mod.id}
                  href={mod.apkUrl || '#versoes'}
                  className="flex items-center justify-between rounded-xl border border-[#28324F] bg-[#141928] px-3.5 py-2.5 text-xs transition hover:border-[#00C2FF]"
                >
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-white">{mod.name}</div>
                    <div className="font-mono text-[10px] text-[#667194]">{mod.splitName}</div>
                  </div>
                  <span className="ml-2 shrink-0 font-mono font-semibold text-[#00D68F]">
                    {formatMb(mod.apkSizeBytes)} ↓
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModularBuilderSection;
