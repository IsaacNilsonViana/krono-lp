import React, { useState } from 'react';
import {
  CheckCircle2,
  Flame,
  Smartphone,
  Sparkles,
  Timer,
  Zap,
} from 'lucide-react';

type PreviewTab = 'ai' | 'routine' | 'screentime';

const PhoneShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PreviewTab>('ai');

  return (
    <div className="relative mx-auto w-full max-w-[356px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-[#7C5CFF]/25 via-[#00C2FF]/15 to-[#00D68F]/20 blur-3xl"
      />

      <div className="relative rounded-[2.4rem] border border-[#28324F] bg-[#141928] p-3 shadow-[0_24px_80px_rgba(6,8,15,0.85)]">
        <div className="overflow-hidden rounded-[1.85rem] border border-[#28324F] bg-[#0B0E17]">
          {/* Phone status bar */}
          <div className="flex items-center justify-between border-b border-[#28324F]/70 bg-[#141928]/80 px-4 py-2.5 text-[11px] font-mono text-[#9BA6C7]">
            <span>15:40</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7C5CFF]/20 px-2 py-0.5 text-[10px] font-semibold text-[#00C2FF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D68F]" />
              100% OFFLINE
            </span>
          </div>

          {/* Interactive screen switcher */}
          <div className="grid grid-cols-3 gap-1 border-b border-[#28324F]/70 bg-[#141928]/50 p-1.5">
            {(
              [
                { id: 'ai', label: 'Krono IA' },
                { id: 'routine', label: 'Rotina' },
                { id: 'screentime', label: 'Uso & Apps' },
              ] as const
            ).map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-xl px-2 py-1.5 text-[11px] font-semibold transition-all cursor-pointer ${
                    selected
                      ? 'bg-[#7C5CFF] text-white shadow-sm'
                      : 'text-[#9BA6C7] hover:bg-[#1C2338] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Screen content */}
          <div className="min-h-[390px] p-3.5 text-left">
            {activeTab === 'ai' && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between rounded-xl border border-[#28324F] bg-[#141928] px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#7C5CFF] bg-[#7C5CFF]/20 text-[#00C2FF]">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Qwen2.5-3B Offline</div>
                      <div className="text-[10px] text-[#00D68F]">Em memória RAM • i8mm ativo</div>
                    </div>
                  </div>
                  <span className="rounded-lg border border-[#00C2FF]/40 bg-[#00C2FF]/10 px-2 py-0.5 text-[10px] font-semibold text-[#00C2FF]">
                    Memória (4)
                  </span>
                </div>

                <div className="ml-auto w-[84%] rounded-2xl rounded-br-sm bg-[#7C5CFF] px-3 py-2 text-xs text-white">
                  Quais os top 3 apps que mais usei hoje?
                </div>

                <div className="w-[92%] rounded-2xl rounded-bl-sm border border-[#28324F] bg-[#1C2338] px-3 py-2 text-xs leading-relaxed text-[#F6F8FF]">
                  Hoje você usou 1h 24m (ainda restam 1h 36m do limite diário).
                </div>

                {/* Embedded live widget card preview */}
                <div className="rounded-2xl border border-[#00D68F]/50 bg-[#141928] p-3 shadow-[0_3px_0_#06080F]">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider text-[#00C2FF]">
                      TEMPO DE TELA HOJE
                    </span>
                    <span className="rounded-full bg-[#00D68F]/15 px-2 py-0.5 text-[10px] font-semibold text-[#00D68F]">
                      Dentro do limite
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#00D68F] bg-[#1C2338] text-xs font-bold text-[#00D68F]">
                      47%
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Faltam 1h 36m</div>
                      <div className="text-[11px] text-[#9BA6C7]">Usado: 1h 24m • Limite: 3h</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1.5 border-t border-[#28324F] pt-2.5 text-[11px]">
                    {[
                      { rank: '#1', name: 'YouTube', time: '42m', w: 'w-[78%]', color: 'bg-[#FFB800]' },
                      { rank: '#2', name: 'WhatsApp', time: '26m', w: 'w-[48%]', color: 'bg-[#00C2FF]' },
                      { rank: '#3', name: 'Instagram', time: '16m', w: 'w-[30%]', color: 'bg-[#7C5CFF]' },
                    ].map((app) => (
                      <div key={app.name} className="space-y-1">
                        <div className="flex justify-between text-[#F6F8FF]">
                          <span>
                            <span className="font-mono font-bold text-[#9BA6C7]">{app.rank}</span>{' '}
                            {app.name}
                          </span>
                          <span className="font-mono text-[#9BA6C7]">{app.time}</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1C2338]">
                          <div className={`h-full rounded-full ${app.w} ${app.color}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'routine' && (
              <div className="space-y-2.5">
                <div className="rounded-2xl border border-[#7C5CFF]/50 bg-[#141928] p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold tracking-wider text-[#00C2FF]">
                        NÍVEL 7 • ESTRATEGISTA
                      </div>
                      <div className="mt-0.5 text-sm font-bold text-white">Ofensiva ativa</div>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full border border-[#FF6B35]/50 bg-[#FF6B35]/15 px-2.5 py-1 text-xs font-bold text-[#FF6B35]">
                      <Flame className="h-3.5 w-3.5" />
                      12d
                    </div>
                  </div>
                  <div className="mt-2.5 h-2.5 overflow-hidden rounded-full border border-[#28324F] bg-[#1C2338]">
                    <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#7C5CFF] via-[#00C2FF] to-[#00D68F]" />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[10px] font-mono text-[#9BA6C7]">
                    <span>1.420 XP</span>
                    <span>3/4 tarefas hoje</span>
                  </div>
                </div>

                {[
                  { title: 'Beber 2L de água', meta: 'Diária • 09:00', xp: '+25 XP', done: true },
                  { title: 'Revisar PR do backend', meta: 'Trabalho • 14:00', xp: '+40 XP', done: true },
                  { title: 'Estudar Kotlin NDK', meta: 'Estudos • 19:00', xp: '+40 XP', done: false },
                ].map((task) => (
                  <div
                    key={task.title}
                    className="flex items-center gap-2.5 rounded-xl border border-[#28324F] bg-[#141928] px-3 py-2.5"
                  >
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 ${
                        task.done ? 'text-[#00D68F]' : 'text-[#667194]'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-xs font-semibold ${
                          task.done ? 'text-[#9BA6C7] line-through' : 'text-white'
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="text-[10px] text-[#667194]">{task.meta}</div>
                    </div>
                    <span className="rounded-full bg-[#7C5CFF]/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#00C2FF]">
                      {task.xp}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between rounded-xl border border-[#FF6B35]/45 bg-[#141928] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-[#FF6B35]" />
                    <span className="text-xs font-semibold text-white">Modo Foco Profundo</span>
                  </div>
                  <span className="rounded-lg bg-[#FF6B35] px-2.5 py-1 text-[10px] font-bold text-white">
                    25 min
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'screentime' && (
              <div className="space-y-3">
                <div className="rounded-2xl border border-[#00C2FF]/45 bg-[#141928] p-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00C2FF]">
                    <Smartphone className="h-4 w-4" />
                    TEMPO DE USO • 7 DIAS
                  </div>
                  <div className="mt-3 flex h-28 items-end gap-2 px-1">
                    {[
                      { day: 'Seg', h: 'h-16', over: false },
                      { day: 'Ter', h: 'h-20', over: true },
                      { day: 'Qua', h: 'h-12', over: false },
                      { day: 'Qui', h: 'h-14', over: false },
                      { day: 'Sex', h: 'h-10', over: false },
                      { day: 'Sáb', h: 'h-22', over: true },
                      { day: 'Hoje', h: 'h-11', over: false, today: true },
                    ].map((bar) => (
                      <div key={bar.day} className="flex flex-1 flex-col items-center gap-1.5">
                        <div
                          className={`w-full rounded-t-md ${bar.h} ${
                            bar.over
                              ? 'bg-[#FF4D79]'
                              : bar.today
                                ? 'bg-[#00C2FF]'
                                : 'bg-[#7C5CFF]'
                          }`}
                        />
                        <span className="text-[10px] text-[#9BA6C7]">{bar.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#00D68F]/45 bg-[#141928] p-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00D68F]">
                    <Zap className="h-4 w-4" />
                    AUTO-UPDATE DELTA KDP1
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-[#9BA6C7]">
                    Mantém os 18 MB da engine <span className="font-mono text-white">libkrono_llama.so</span> intactos
                    no aparelho e baixa só os blocos alterados quando há nova versão.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneShowcase;
