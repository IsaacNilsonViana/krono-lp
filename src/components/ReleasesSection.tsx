import React, { useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  FileCode2,
  History,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ReleaseInfo } from '../types';

interface ReleasesSectionProps {
  versions: ReleaseInfo[];
  latestVersionCode: number;
}

function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return '—';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  const kb = bytes / 1024;
  return `${kb.toFixed(0)} KB`;
}

const ReleasesSection: React.FC<ReleasesSectionProps> = ({ versions, latestVersionCode }) => {
  const [expandedDocs, setExpandedDocs] = useState<Record<number, boolean>>({
    [latestVersionCode]: true,
  });
  const [copiedSha, setCopiedSha] = useState<string | null>(null);

  const toggleDocs = (versionCode: number) => {
    setExpandedDocs((prev) => ({
      ...prev,
      [versionCode]: !prev[versionCode],
    }));
  };

  const handleCopySha = async (sha: string) => {
    try {
      await navigator.clipboard.writeText(sha);
      setCopiedSha(sha);
      window.setTimeout(() => {
        setCopiedSha((current) => (current === sha ? null : current));
      }, 1800);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  return (
    <section id="versoes" className="relative border-t border-[#28324F]/70 py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00C2FF]/35 bg-[#00C2FF]/10 px-3 py-1 font-mono text-xs font-semibold text-[#00C2FF]">
              <History className="h-3.5 w-3.5" />
              HISTÓRICO DE VERSÕES & DOCUMENTAÇÃO
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Todas as versões, changelogs e downloads diretos
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9BA6C7] sm:text-base">
              Cada release publicada fica arquivada com APK assinado, pacote delta{' '}
              <span className="font-mono text-[#00D68F]">.kpatch</span> quando aplicável, hash{' '}
              <span className="font-mono text-white">SHA-256</span> verificado e documentação técnica completa.
            </p>
          </div>
          <a
            href="/api/releases.json"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#28324F] bg-[#141928] px-3.5 py-2 font-mono text-xs text-[#9BA6C7] transition hover:border-[#00C2FF] hover:text-white"
          >
            <FileCode2 className="h-4 w-4 text-[#00C2FF]" />
            /api/releases.json
          </a>
        </div>

        <div className="mt-10 space-y-6">
          {versions.map((rel) => {
            const isLatest = rel.versionCode === latestVersionCode;
            const isDocsOpen = !!expandedDocs[rel.versionCode];
            const firstPatch = rel.patches[0];
            const savedPercent =
              firstPatch && rel.apkSizeBytes > 0
                ? Math.max(0, Math.round(((rel.apkSizeBytes - firstPatch.patchSizeBytes) / rel.apkSizeBytes) * 100))
                : null;

            return (
              <article
                key={rel.versionCode}
                className={`rounded-3xl border bg-[#141928] p-6 sm:p-8 shadow-[0_6px_0_#06080F] transition-colors ${
                  isLatest ? 'border-[#7C5CFF]/70' : 'border-[#28324F]'
                }`}
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-display text-2xl font-bold text-white">
                        v{rel.versionName}
                      </span>
                      <span className="rounded-full border border-[#28324F] bg-[#1C2338] px-2.5 py-0.5 font-mono text-xs text-[#9BA6C7]">
                        build {rel.versionCode}
                      </span>
                      {isLatest ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#00D68F]/50 bg-[#00D68F]/15 px-3 py-0.5 text-xs font-semibold text-[#00D68F]">
                          <Sparkles className="h-3 w-3" />
                          Versão Atual em Produção
                        </span>
                      ) : (
                        <span className="rounded-full border border-[#28324F] bg-[#0B0E17] px-3 py-0.5 text-xs text-[#9BA6C7]">
                          Versão Arquivada
                        </span>
                      )}
                      {firstPatch && savedPercent !== null && (
                        <span className="rounded-full border border-[#00C2FF]/45 bg-[#00C2FF]/10 px-3 py-0.5 font-mono text-xs font-semibold text-[#00C2FF]">
                          Delta de v{firstPatch.fromVersionName ?? firstPatch.fromVersionCode}:{' '}
                          {formatBytes(firstPatch.patchSizeBytes)} (-{savedPercent}%)
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-mono text-[#667194]">
                      Publicado em {rel.releasedAt} • {rel.abi ?? 'arm64-v8a'} • Android {rel.minSdk === 26 ? '8.0+' : `API ${rel.minSdk}+`}
                    </p>
                    <p className="max-w-3xl text-sm leading-relaxed text-[#9BA6C7]">
                      {rel.summary}
                    </p>
                  </div>

                  {/* Download & Checksum controls */}
                  <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row lg:flex-col lg:items-end">
                    <a
                      href={rel.apkUrl}
                      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-[0_4px_0_rgba(6,8,15,0.65)] transition hover:-translate-y-0.5 ${
                        isLatest
                          ? 'bg-[#7C5CFF] hover:bg-[#6A48F5]'
                          : 'border border-[#28324F] bg-[#1C2338] hover:border-[#7C5CFF]'
                      }`}
                    >
                      <Download className="h-4 w-4" />
                      Baixar APK v{rel.versionName} ({formatBytes(rel.apkSizeBytes)})
                    </a>

                    {firstPatch && (
                      <a
                        href={firstPatch.patchUrl}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00D68F]/45 bg-[#00D68F]/10 px-4 py-2 font-mono text-xs font-semibold text-[#00D68F] transition hover:bg-[#00D68F]/20"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Baixar Delta .kpatch ({formatBytes(firstPatch.patchSizeBytes)})
                      </a>
                    )}
                  </div>
                </div>

                {/* SHA-256 verification strip */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#28324F] bg-[#0B0E17] px-3.5 py-2.5">
                  <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#00D68F]" />
                    <span className="font-mono text-[#667194]">SHA-256:</span>
                    <code className="truncate font-mono text-[#F6F8FF]">{rel.sha256}</code>
                    {rel.signature && (
                      <span className="rounded-full border border-[#00D68F]/40 bg-[#00D68F]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#00D68F]">
                        Assinado RSA-2048
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopySha(rel.sha256)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#28324F] bg-[#141928] px-2.5 py-1 text-xs font-medium text-[#9BA6C7] transition hover:border-[#00C2FF] hover:text-white cursor-pointer"
                  >
                    {copiedSha === rel.sha256 ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#00D68F]" />
                        <span className="text-[#00D68F]">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar hash</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Changelog bullets */}
                <div className="mt-6">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#00C2FF]">
                    Changelog da v{rel.versionName}
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {rel.changelog.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 rounded-xl border border-[#28324F]/70 bg-[#1C2338]/55 px-3 py-2 text-sm text-[#F6F8FF]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00D68F]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable full technical documentation */}
                <div className="mt-6 border-t border-[#28324F] pt-5">
                  <button
                    type="button"
                    onClick={() => toggleDocs(rel.versionCode)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#00C2FF] transition hover:text-white cursor-pointer"
                  >
                    {isDocsOpen ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        Ocultar documentação completa da v{rel.versionName}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        Ler documentação técnica completa da v{rel.versionName}
                      </>
                    )}
                  </button>

                  {isDocsOpen && rel.documentation.length > 0 && (
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {rel.documentation.map((sec) => (
                        <div
                          key={sec.title}
                          className="rounded-2xl border border-[#28324F] bg-[#0B0E17]/90 p-4"
                        >
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFB800]">
                            {sec.title}
                          </h4>
                          <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-[#9BA6C7] sm:text-sm">
                            {sec.items.map((line) => (
                              <li key={line} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#7C5CFF]" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReleasesSection;
