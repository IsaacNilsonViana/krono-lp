import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Brain,
  Check,
  CheckCircle2,
  Copy,
  Flame,
  Gauge,
  Moon,
  Pause,
  Pencil,
  Play,
  Plus,
  RotateCcw,
  Send,
  Shield,
  Smartphone,
  Sparkles,
  Sun,
  Target,
  Timer,
  Trash2,
  Undo2,
  X,
  Zap,
} from 'lucide-react';

type PreviewTab = 'routine' | 'ai' | 'focus' | 'screentime';
type AiMode = 'qwen' | 'quick';

interface DemoTask {
  id: string;
  title: string;
  time: string;
  category: string;
  xp: number;
  done: boolean;
}

interface DemoMemory {
  id: string;
  text: string;
}

interface DemoAppUsage {
  id: string;
  name: string;
  usedMin: number;
  limitMin: number | null;
  color: string;
}

interface DemoGoal {
  id: string;
  title: string;
  milestones: { label: string; done: boolean }[];
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  widget?: 'routine' | 'screentime' | 'focus';
  memoryChip?: { id: string; text: string; undone?: boolean };
}

const INITIAL_TASKS: DemoTask[] = [
  { id: 't1', title: 'Beber 2L de água', time: '09:00', category: 'Saúde', xp: 25, done: true },
  { id: 't2', title: 'Revisar PR do backend', time: '14:00', category: 'Trabalho', xp: 40, done: true },
  { id: 't3', title: 'Estudar Kotlin NDK', time: '19:00', category: 'Estudos', xp: 40, done: false },
  { id: 't4', title: 'Leitura sem telas (20 min)', time: '22:00', category: 'Hábito', xp: 45, done: false },
];

const INITIAL_MEMORIES: DemoMemory[] = [
  { id: 'm1', text: 'Meta diária de 3h de tela' },
  { id: 'm2', text: 'Prefere blocos Pomodoro de 25 min' },
  { id: 'm3', text: 'Estuda Android/NDK à noite' },
];

const INITIAL_APP_USAGE: DemoAppUsage[] = [
  { id: 'yt', name: 'YouTube', usedMin: 42, limitMin: 60, color: '#FFB800' },
  { id: 'wa', name: 'WhatsApp', usedMin: 26, limitMin: null, color: '#00C2FF' },
  { id: 'ig', name: 'Instagram', usedMin: 16, limitMin: 30, color: '#7C5CFF' },
];

const INITIAL_GOALS: DemoGoal[] = [
  {
    id: 'g1',
    title: 'Lançar Krono v1.2 com OTA blindado',
    milestones: [
      { label: 'Assinatura RSA-2048', done: true },
      { label: 'Testes anti-tamper', done: true },
      { label: 'Publicar delta .kpatch', done: false },
    ],
  },
  {
    id: 'g2',
    title: '14 dias seguidos dentro do limite de tela',
    milestones: [
      { label: '7 dias consecutivos', done: true },
      { label: '14 dias consecutivos', done: false },
    ],
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    text: 'Quais os top 3 apps que mais usei hoje?',
  },
  {
    id: 'msg-2',
    role: 'assistant',
    text: 'Você usou 1h 24m até agora. Veja o detalhamento ao vivo abaixo (altere o limite na aba Uso & Metas para ver atualizar aqui):',
    widget: 'screentime',
  },
];

function formatDurationMin(totalMin: number): string {
  const abs = Math.abs(Math.round(totalMin));
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

function formatTimerClock(sec: number): string {
  const safe = Math.max(0, Math.floor(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const InteractiveAppPreview: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [activeTab, setActiveTab] = useState<PreviewTab>('ai');
  const [xp, setXp] = useState(1420);
  const [xpFlash, setXpFlash] = useState<string | null>(null);

  const [tasks, setTasks] = useState<DemoTask[]>(INITIAL_TASKS);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskXp, setNewTaskXp] = useState(35);

  const [aiMode, setAiMode] = useState<AiMode>('qwen');
  const [memories, setMemories] = useState<DemoMemory[]>(INITIAL_MEMORIES);
  const [showMemoryDrawer, setShowMemoryDrawer] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const [focusDurationSec, setFocusDurationSec] = useState(1500);
  const [focusRemainingSec, setFocusRemainingSec] = useState(1500);
  const [focusRunning, setFocusRunning] = useState(false);
  const [focusDemoFast, setFocusDemoFast] = useState(false);
  const [focusCompletedCount, setFocusCompletedCount] = useState(2);
  const [focusBanner, setFocusBanner] = useState<string | null>(null);
  const [guardianApps, setGuardianApps] = useState<Record<string, boolean>>({
    Instagram: true,
    YouTube: true,
    TikTok: true,
  });

  const [dailyLimitMin, setDailyLimitMin] = useState(180);
  const [appUsage, setAppUsage] = useState<DemoAppUsage[]>(INITIAL_APP_USAGE);
  const [goals, setGoals] = useState<DemoGoal[]>(INITIAL_GOALS);

  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const level = xp >= 1500 ? 8 : 7;
  const levelTitle = level === 8 ? 'MESTRE DA ROTINA' : 'ESTRATEGISTA';
  const levelProgressPct =
    level === 8
      ? Math.min(100, Math.round(((xp - 1500) / 300) * 100))
      : Math.min(100, Math.round(((xp - 1200) / 300) * 100));

  const totalUsedMin = useMemo(
    () => appUsage.reduce((acc, item) => acc + item.usedMin, 0),
    [appUsage],
  );
  const remainingMin = dailyLimitMin - totalUsedMin;
  const usagePct = Math.min(100, Math.round((totalUsedMin / dailyLimitMin) * 100));
  const doneTasksCount = tasks.filter((t) => t.done).length;

  const grantXp = (delta: number, label: string) => {
    setXp((prev) => Math.max(0, prev + delta));
    setXpFlash(label);
    window.setTimeout(() => {
      setXpFlash((curr) => (curr === label ? null : curr));
    }, 1800);
  };

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, aiThinking, activeTab]);

  useEffect(() => {
    if (!focusRunning) return;
    const step = focusDemoFast ? 60 : 1;
    const id = window.setInterval(() => {
      setFocusRemainingSec((prev) => {
        if (prev <= step) {
          setFocusRunning(false);
          setFocusCompletedCount((c) => c + 1);
          setFocusBanner('Sessão concluída! +50 XP creditados no seu perfil.');
          grantXp(50, '+50 XP Foco');
          return focusDurationSec;
        }
        return prev - step;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [focusRunning, focusDemoFast, focusDurationSec]);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const nextDone = !task.done;
        grantXp(nextDone ? task.xp : -task.xp, `${nextDone ? '+' : '-'}${task.xp} XP`);
        return { ...task, done: nextDone };
      }),
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTaskTitle.trim();
    if (!trimmed) return;
    const newTask: DemoTask = {
      id: `t-${Date.now()}`,
      title: trimmed,
      time: 'Hoje',
      category: 'Personalizada',
      xp: newTaskXp,
      done: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
    setShowAddTask(false);
  };

  const toggleMilestone = (goalId: string, idx: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const updated = g.milestones.map((m, i) => {
          if (i !== idx) return m;
          const nextDone = !m.done;
          grantXp(nextDone ? 30 : -30, `${nextDone ? '+' : '-'}30 XP Meta`);
          return { ...m, done: nextDone };
        });
        return { ...g, milestones: updated };
      }),
    );
  };

  const cycleAppLimit = (appId: string) => {
    setAppUsage((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const nextLimit =
          app.limitMin === null ? 30 : app.limitMin === 30 ? 60 : null;
        return { ...app, limitMin: nextLimit };
      }),
    );
  };

  const undoMemoryChip = (msgId: string, memoryId: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== memoryId));
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId && m.memoryChip
          ? { ...m, memoryChip: { ...m.memoryChip, undone: true } }
          : m,
      ),
    );
  };

  const handleCopyMessage = async (msgId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMsgId(msgId);
      window.setTimeout(() => {
        setCopiedMsgId((curr) => (curr === msgId ? null : curr));
      }, 1500);
    } catch {
      // Clipboard API restricted
    }
  };

  const buildAssistantReply = (prompt: string): ChatMessage => {
    const q = prompt.toLowerCase();
    const id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    if (q.startsWith('lembrar') || q.includes('lembra que') || q.includes('salva na memória')) {
      const cleaned = prompt
        .replace(/^(lembrar|lembra)( que)?[:\s-]*/i, '')
        .trim();
      const memText = cleaned || 'Treino às 19h';
      const formatted = memText.charAt(0).toUpperCase() + memText.slice(1);
      const memId = `mem-${Date.now()}`;
      setMemories((prev) => [{ id: memId, text: formatted }, ...prev]);
      return {
        id,
        role: 'assistant',
        text: `Combinado! Guardei "${formatted}" na sua memória pessoal local (Room). Você pode remover clicando em Desfazer abaixo.`,
        memoryChip: { id: memId, text: formatted },
      };
    }

    if (q.includes('criar tarefa') || q.startsWith('adicionar tarefa') || q.startsWith('nova tarefa')) {
      const cleaned = prompt
        .replace(/^(criar tarefa|adicionar tarefa|nova tarefa)[:\s-]*/i, '')
        .trim();
      const title = cleaned
        ? cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
        : 'Revisar código';
      setTasks((prev) => [
        {
          id: `t-${Date.now()}`,
          title,
          time: 'Hoje',
          category: aiMode === 'quick' ? 'Modo Rápido' : 'IA Qwen',
          xp: 35,
          done: false,
        },
        ...prev,
      ]);
      return {
        id,
        role: 'assistant',
        text: `Pronto! Adicionei "${title}" à sua rotina de hoje via ${
          aiMode === 'quick' ? 'parser instantâneo offline' : 'Qwen2.5-3B'
        }. Você já pode marcá-la aqui ou na aba Rotina:`,
        widget: 'routine',
      };
    }

    if (q.includes('top') || q.includes('app') || q.includes('tempo') || q.includes('tela') || q.includes('limite')) {
      const statusText =
        remainingMin >= 0
          ? `ainda restam ${formatDurationMin(remainingMin)} do limite de ${formatDurationMin(dailyLimitMin)}`
          : `você passou ${formatDurationMin(Math.abs(remainingMin))} do limite de ${formatDurationMin(dailyLimitMin)}`;
      return {
        id,
        role: 'assistant',
        text: `Hoje seu uso acumulado é ${formatDurationMin(totalUsedMin)} (${statusText}).`,
        widget: 'screentime',
      };
    }

    if (q.includes('rotina') || q.includes('tarefa') || q.includes('hoje')) {
      const pending = tasks.filter((t) => !t.done).length;
      return {
        id,
        role: 'assistant',
        text: `Você concluiu ${tasks.length - pending} de ${tasks.length} tarefas hoje (${xp.toLocaleString('pt-BR')} XP, Nível ${level}). Toque em qualquer item do card abaixo para concluir agora:`,
        widget: 'routine',
      };
    }

    if (q.includes('foco') || q.includes('pomodoro')) {
      return {
        id,
        role: 'assistant',
        text: `Seu timer Pomodoro atual está em ${formatTimerClock(focusRemainingSec)} com ${Object.values(guardianApps).filter(Boolean).length} apps vigiados pelo Guardião:`,
        widget: 'focus',
      };
    }

    return {
      id,
      role: 'assistant',
      text: `Entendi (${
        aiMode === 'quick' ? 'Modo Rápido instantâneo' : 'Qwen2.5-3B offline • 3072 ctx'
      }). Hoje você está no Nível ${level} com ${doneTasksCount}/${tasks.length} tarefas feitas e ${memories.length} memórias salvas. Experimente perguntar sobre rotina, tempo de tela ou criar uma tarefa!`,
    };
  };

  const sendPrompt = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || aiThinking) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    if (editingMsgId) {
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === editingMsgId);
        const kept = idx >= 0 ? prev.slice(0, idx) : prev;
        return [...kept, userMsg];
      });
      setEditingMsgId(null);
    } else {
      setMessages((prev) => [...prev, userMsg]);
    }

    setChatInput('');
    setActiveTab('ai');
    setAiThinking(true);

    window.setTimeout(() => {
      const reply = buildAssistantReply(trimmed);
      setMessages((prev) => [...prev, reply]);
      setAiThinking(false);
    }, 360);
  };

  const handleResetDemo = () => {
    setXp(1420);
    setTasks(INITIAL_TASKS);
    setMemories(INITIAL_MEMORIES);
    setMessages(INITIAL_MESSAGES);
    setChatInput('');
    setEditingMsgId(null);
    setAiThinking(false);
    setFocusRunning(false);
    setFocusDurationSec(1500);
    setFocusRemainingSec(1500);
    setFocusDemoFast(false);
    setFocusCompletedCount(2);
    setFocusBanner(null);
    setGuardianApps({ Instagram: true, YouTube: true, TikTok: true });
    setDailyLimitMin(180);
    setAppUsage(INITIAL_APP_USAGE);
    setGoals(INITIAL_GOALS);
    setShowMemoryDrawer(false);
    setShowAddTask(false);
  };

  // Theme tokens inside emulator screen (Dark Obsidian vs Crisp Light)
  const phoneBg = darkTheme ? 'bg-[#0B0E17] text-[#F6F8FF]' : 'bg-[#F4F6FC] text-[#111827]';
  const cardBg = darkTheme ? 'bg-[#141928] border-[#28324F]' : 'bg-white border-[#D9E1F2]';
  const subCardBg = darkTheme ? 'bg-[#1C2338] border-[#28324F]' : 'bg-[#EDF1FA] border-[#D9E1F2]';
  const mutedText = darkTheme ? 'text-[#9BA6C7]' : 'text-[#52607D]';
  const headingText = darkTheme ? 'text-white' : 'text-[#0F172A]';

  const focusTotal = focusDurationSec;
  const focusRingRadius = 46;
  const focusCircumference = 2 * Math.PI * focusRingRadius;
  const focusFraction = focusTotal > 0 ? focusRemainingSec / focusTotal : 0;
  const focusDashOffset = focusCircumference * (1 - focusFraction);

  return (
    <section id="previa" className="border-t border-[#28324F]/70 bg-[#0E1320]/80 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left Interactive Control Panel & Live Synced State */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7C5CFF]/45 bg-[#7C5CFF]/15 px-3 py-1 font-mono text-xs font-semibold text-[#00C2FF]">
                <Smartphone className="h-3.5 w-3.5" />
                PRÉVIA USÁVEL INTERATIVA
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Experimente o Krono direto no navegador antes de baixar
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#9BA6C7] sm:text-base">
                As quatro telas do simulador compartilham o mesmo estado ao vivo: conclua tarefas,
                teste o chat com widgets táteis, rode o Pomodoro acelerado e ajuste limites de tela.
                Tudo roda 100% no seu navegador sem enviar nada a servidores.
              </p>
            </div>

            {/* External Theme + Reset Toolbar */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setDarkTheme((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#28324F] bg-[#141928] px-3.5 py-2 text-xs font-semibold text-[#F6F8FF] transition hover:border-[#00C2FF] cursor-pointer"
              >
                {darkTheme ? (
                  <>
                    <Sun className="h-4 w-4 text-[#FFB800]" />
                    Alternar para Tema Claro
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 text-[#7C5CFF]" />
                    Alternar para Tema Escuro
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetDemo}
                className="inline-flex items-center gap-2 rounded-xl border border-[#28324F] bg-[#141928] px-3.5 py-2 text-xs font-semibold text-[#9BA6C7] transition hover:border-[#FF4D79] hover:text-white cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Resetar demonstração
              </button>
            </div>

            {/* Live Synced Telemetry Strip */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Nível Atual', value: `Nv. ${level}`, accent: 'text-[#00C2FF]' },
                { label: 'XP Total', value: `${xp.toLocaleString('pt-BR')}`, accent: 'text-[#00D68F]' },
                { label: 'Tarefas', value: `${doneTasksCount}/${tasks.length}`, accent: 'text-white' },
                { label: 'Memórias IA', value: `${memories.length} ativas`, accent: 'text-[#FFB800]' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#28324F] bg-[#141928] px-3.5 py-3"
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#667194]">
                    {stat.label}
                  </div>
                  <div className={`mt-1 font-mono text-sm font-bold ${stat.accent}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Guided Interactive Flows */}
            <div className="space-y-2.5">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#667194]">
                Roteiro sugerido (clique para testar)
              </div>
              {[
                {
                  tab: 'routine' as PreviewTab,
                  step: '01',
                  title: 'Subir para o Nível 8 concluindo tarefas',
                  desc: 'Você começa com 1.420 XP — marque "Estudar Kotlin NDK" e "Leitura" ou crie uma nova tarefa.',
                },
                {
                  tab: 'ai' as PreviewTab,
                  step: '02',
                  title: 'Testar cards ao vivo, edição e Memória IA',
                  desc: 'Pergunte sobre rotina ou tempo de tela, salve uma memória com Desfazer, ou edite sua pergunta anterior.',
                },
                {
                  tab: 'focus' as PreviewTab,
                  step: '03',
                  title: 'Rodar Pomodoro com Modo Demo 60x',
                  desc: 'Ative o Modo Demo 60x e inicie o timer de 5m para ver uma sessão completar e premiar +50 XP.',
                },
                {
                  tab: 'screentime' as PreviewTab,
                  step: '04',
                  title: 'Mudar limite diário de uso para 2h',
                  desc: 'Altere o teto diário e volte na aba Krono IA para ver o gráfico sincronizado automaticamente.',
                },
              ].map((guide) => {
                const selected = activeTab === guide.tab;
                return (
                  <button
                    key={guide.step}
                    type="button"
                    onClick={() => setActiveTab(guide.tab)}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition cursor-pointer ${
                      selected
                        ? 'border-[#7C5CFF] bg-[#141928] shadow-[0_4px_0_#06080F]'
                        : 'border-[#28324F]/80 bg-[#141928]/60 hover:border-[#00C2FF]/60'
                    }`}
                  >
                    <span
                      className={`rounded-lg px-2 py-1 font-mono text-xs font-bold ${
                        selected
                          ? 'bg-[#7C5CFF] text-white'
                          : 'bg-[#1C2338] text-[#00C2FF]'
                      }`}
                    >
                      {guide.step}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-white">{guide.title}</div>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#9BA6C7]">{guide.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Usable Android App Simulator */}
          <div className="relative mx-auto w-full max-w-[400px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-[#7C5CFF]/25 via-[#00C2FF]/15 to-[#00D68F]/20 blur-3xl"
            />

            <div className="relative rounded-[2.6rem] border border-[#28324F] bg-[#141928] p-3 shadow-[0_24px_80px_rgba(6,8,15,0.85)]">
              <div className={`relative flex h-[620px] flex-col overflow-hidden rounded-[2rem] border border-[#28324F] ${phoneBg}`}>
                {/* Status Bar */}
                <div
                  className={`flex items-center justify-between border-b px-4 py-2.5 text-[11px] font-mono ${
                    darkTheme
                      ? 'border-[#28324F]/70 bg-[#141928]/90 text-[#9BA6C7]'
                      : 'border-[#D9E1F2] bg-white text-[#52607D]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Krono</span>
                    <span className="rounded-full bg-[#7C5CFF]/15 px-2 py-0.5 text-[10px] font-bold text-[#7C5CFF]">
                      Nv.{level}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {xpFlash && (
                      <span className="rounded-full bg-[#00D68F]/20 px-2 py-0.5 text-[10px] font-bold text-[#00D68F]">
                        {xpFlash}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#00D68F]/15 px-2 py-0.5 text-[10px] font-semibold text-[#00D68F]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00D68F]" />
                      SIMULADOR
                    </span>
                  </div>
                </div>

                {/* Main Interactive Viewport */}
                <div className="flex-1 overflow-y-auto p-3.5">
                  {/* TAB 1: ROTINA */}
                  {activeTab === 'routine' && (
                    <div className="space-y-3">
                      <div className={`rounded-2xl border p-3.5 ${cardBg}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] font-bold tracking-wider text-[#00C2FF]">
                              NÍVEL {level} • {levelTitle}
                            </div>
                            <div className={`mt-0.5 text-sm font-bold ${headingText}`}>
                              {xp >= 1500 ? 'Meta diária batida!' : 'Falta pouco para o Nível 8'}
                            </div>
                          </div>
                          <div className="inline-flex items-center gap-1 rounded-full border border-[#FF6B35]/50 bg-[#FF6B35]/15 px-2.5 py-1 text-xs font-bold text-[#FF6B35]">
                            <Flame className="h-3.5 w-3.5" />
                            12d
                          </div>
                        </div>

                        <div className={`mt-2.5 h-2.5 overflow-hidden rounded-full border ${subCardBg}`}>
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#7C5CFF] via-[#00C2FF] to-[#00D68F] transition-all duration-300"
                            style={{ width: `${levelProgressPct}%` }}
                          />
                        </div>
                        <div className={`mt-1.5 flex justify-between font-mono text-[10px] ${mutedText}`}>
                          <span>{xp.toLocaleString('pt-BR')} XP</span>
                          <span>
                            {doneTasksCount}/{tasks.length} tarefas hoje
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-[11px] font-bold uppercase tracking-wider ${mutedText}`}>
                          Rotina de hoje
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowAddTask((v) => !v)}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#7C5CFF] px-2.5 py-1 text-[11px] font-bold text-white transition hover:bg-[#6A48F5] cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Nova tarefa
                        </button>
                      </div>

                      {showAddTask && (
                        <form
                          onSubmit={handleAddTask}
                          className={`space-y-2 rounded-2xl border p-3 ${cardBg}`}
                        >
                          <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Ex.: Treinar 40 min..."
                            className={`w-full rounded-xl border px-3 py-2 text-xs outline-none focus:border-[#7C5CFF] ${subCardBg} ${headingText}`}
                          />
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1">
                              {[25, 35, 50].map((val) => (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => setNewTaskXp(val)}
                                  className={`rounded-lg px-2 py-1 font-mono text-[10px] font-bold cursor-pointer ${
                                    newTaskXp === val
                                      ? 'bg-[#7C5CFF] text-white'
                                      : `${subCardBg} ${mutedText}`
                                  }`}
                                >
                                  +{val} XP
                                </button>
                              ))}
                            </div>
                            <button
                              type="submit"
                              className="rounded-lg bg-[#00D68F] px-3 py-1 text-[11px] font-bold text-[#062419] cursor-pointer"
                            >
                              Salvar
                            </button>
                          </div>
                        </form>
                      )}

                      <div className="space-y-2">
                        {tasks.map((task) => (
                          <button
                            key={task.id}
                            type="button"
                            onClick={() => toggleTask(task.id)}
                            className={`flex w-full items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition cursor-pointer ${cardBg} hover:border-[#7C5CFF]`}
                          >
                            <CheckCircle2
                              className={`h-4 w-4 shrink-0 transition ${
                                task.done ? 'text-[#00D68F]' : 'text-[#667194]'
                              }`}
                            />
                            <div className="min-w-0 flex-1">
                              <div
                                className={`truncate text-xs font-semibold ${
                                  task.done ? `${mutedText} line-through` : headingText
                                }`}
                              >
                                {task.title}
                              </div>
                              <div className="text-[10px] text-[#667194]">
                                {task.category} • {task.time}
                              </div>
                            </div>
                            <span className="rounded-full bg-[#7C5CFF]/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#00C2FF]">
                              +{task.xp} XP
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: KRONO IA */}
                  {activeTab === 'ai' && (
                    <div className="flex h-full flex-col">
                      {/* AI Top Bar */}
                      <div className={`flex items-center justify-between rounded-xl border px-3 py-2 ${cardBg}`}>
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#7C5CFF] bg-[#7C5CFF]/20 text-[#00C2FF]">
                            <Sparkles className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <div className={`text-xs font-bold ${headingText}`}>
                              {aiMode === 'qwen' ? 'Qwen2.5-3B Offline' : 'Modo Rápido Offline'}
                            </div>
                            <div className="text-[10px] text-[#00D68F]">
                              {aiMode === 'qwen' ? '3072 ctx • 12 turnos' : 'Parser instantâneo PT-BR'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setAiMode((m) => (m === 'qwen' ? 'quick' : 'qwen'))}
                            className={`rounded-lg border px-2 py-1 font-mono text-[10px] font-semibold cursor-pointer ${subCardBg} ${mutedText}`}
                          >
                            {aiMode === 'qwen' ? 'Qwen' : 'Rápido'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowMemoryDrawer((v) => !v)}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#00C2FF]/45 bg-[#00C2FF]/10 px-2 py-1 text-[10px] font-semibold text-[#00C2FF] cursor-pointer"
                          >
                            <Brain className="h-3 w-3" />
                            {memories.length}
                          </button>
                        </div>
                      </div>

                      {/* Memory Drawer */}
                      {showMemoryDrawer && (
                        <div className={`mt-2 space-y-1.5 rounded-2xl border p-2.5 ${cardBg}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold uppercase text-[#00C2FF]">
                              Memória pessoal (Room)
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowMemoryDrawer(false)}
                              className={`${mutedText} cursor-pointer`}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          {memories.length === 0 ? (
                            <p className={`text-[11px] ${mutedText}`}>
                              Nenhuma memória ativa. Peça à IA para lembrar algo!
                            </p>
                          ) : (
                            memories.map((mem) => (
                              <div
                                key={mem.id}
                                className={`flex items-center justify-between rounded-lg border px-2 py-1 text-[11px] ${subCardBg}`}
                              >
                                <span className={`truncate ${headingText}`}>{mem.text}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMemories((prev) => prev.filter((m) => m.id !== mem.id))
                                  }
                                  className="ml-2 text-[#FF4D79] cursor-pointer"
                                  title="Remover memória"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {/* Messages Scroll Area */}
                      <div
                        ref={chatScrollRef}
                        className="my-2.5 flex-1 space-y-2.5 overflow-y-auto pr-1"
                      >
                        {messages.map((msg) => {
                          const isUser = msg.role === 'user';
                          return (
                            <div key={msg.id} className="space-y-1.5">
                              <div
                                className={`max-w-[90%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                                  isUser
                                    ? 'ml-auto rounded-br-sm bg-[#7C5CFF] text-white'
                                    : `rounded-bl-sm border ${subCardBg} ${headingText}`
                                }`}
                              >
                                <p>{msg.text}</p>
                                <div className="mt-1.5 flex items-center justify-end gap-2 text-[10px] opacity-80">
                                  <button
                                    type="button"
                                    onClick={() => handleCopyMessage(msg.id, msg.text)}
                                    className="inline-flex items-center gap-1 hover:opacity-100 cursor-pointer"
                                  >
                                    {copiedMsgId === msg.id ? (
                                      <>
                                        <Check className="h-3 w-3 text-[#00D68F]" />
                                        Copiado
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="h-3 w-3" />
                                        Copiar
                                      </>
                                    )}
                                  </button>
                                  {isUser && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingMsgId(msg.id);
                                        setChatInput(msg.text);
                                      }}
                                      className="inline-flex items-center gap-1 hover:opacity-100 cursor-pointer"
                                    >
                                      <Pencil className="h-3 w-3" />
                                      Editar
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Interactive Live Widget inside Chat */}
                              {msg.widget === 'screentime' && (
                                <div className={`rounded-2xl border p-3 ${cardBg}`}>
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold tracking-wider text-[#00C2FF]">
                                      TEMPO DE TELA HOJE
                                    </span>
                                    <span
                                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                        remainingMin >= 0
                                          ? 'bg-[#00D68F]/15 text-[#00D68F]'
                                          : 'bg-[#FF4D79]/15 text-[#FF4D79]'
                                      }`}
                                    >
                                      {remainingMin >= 0 ? 'Dentro do limite' : 'Limite excedido'}
                                    </span>
                                  </div>
                                  <div className="mt-2 flex items-center gap-3">
                                    <div
                                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 text-[11px] font-bold ${
                                        remainingMin >= 0
                                          ? 'border-[#00D68F] text-[#00D68F]'
                                          : 'border-[#FF4D79] text-[#FF4D79]'
                                      } ${subCardBg}`}
                                    >
                                      {usagePct}%
                                    </div>
                                    <div>
                                      <div className={`text-xs font-bold ${headingText}`}>
                                        {remainingMin >= 0
                                          ? `Faltam ${formatDurationMin(remainingMin)}`
                                          : `Passou ${formatDurationMin(Math.abs(remainingMin))}`}
                                      </div>
                                      <div className={`text-[10px] ${mutedText}`}>
                                        Usado: {formatDurationMin(totalUsedMin)} • Limite:{' '}
                                        {formatDurationMin(dailyLimitMin)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`mt-2.5 space-y-1.5 border-t pt-2 text-[11px] ${darkTheme ? 'border-[#28324F]' : 'border-[#D9E1F2]'}`}>
                                    {appUsage.map((app, i) => (
                                      <div key={app.id} className="space-y-1">
                                        <div className={`flex justify-between ${headingText}`}>
                                          <span>
                                            <span className={`font-mono font-bold ${mutedText}`}>
                                              #{i + 1}
                                            </span>{' '}
                                            {app.name}
                                          </span>
                                          <span className={`font-mono ${mutedText}`}>
                                            {formatDurationMin(app.usedMin)}
                                          </span>
                                        </div>
                                        <div className={`h-1.5 w-full overflow-hidden rounded-full ${subCardBg}`}>
                                          <div
                                            className="h-full rounded-full"
                                            style={{
                                              width: `${Math.min(100, Math.round((app.usedMin / 55) * 100))}%`,
                                              backgroundColor: app.color,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {msg.widget === 'routine' && (
                                <div className={`space-y-1.5 rounded-2xl border p-2.5 ${cardBg}`}>
                                  <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-[#00C2FF]">
                                    <span>ROTINA INTERATIVA</span>
                                    <span>
                                      {doneTasksCount}/{tasks.length} feitas
                                    </span>
                                  </div>
                                  {tasks.slice(0, 4).map((t) => (
                                    <button
                                      key={t.id}
                                      type="button"
                                      onClick={() => toggleTask(t.id)}
                                      className={`flex w-full items-center justify-between rounded-xl border px-2.5 py-1.5 text-left text-[11px] cursor-pointer ${subCardBg}`}
                                    >
                                      <span className="flex items-center gap-1.5 truncate">
                                        <CheckCircle2
                                          className={`h-3.5 w-3.5 shrink-0 ${
                                            t.done ? 'text-[#00D68F]' : 'text-[#667194]'
                                          }`}
                                        />
                                        <span className={t.done ? `${mutedText} line-through` : headingText}>
                                          {t.title}
                                        </span>
                                      </span>
                                      <span className="ml-2 font-mono text-[10px] text-[#00C2FF]">
                                        +{t.xp}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              )}

                              {msg.widget === 'focus' && (
                                <div className={`flex items-center justify-between rounded-2xl border p-3 ${cardBg}`}>
                                  <div className="flex items-center gap-2">
                                    <Timer className="h-4 w-4 text-[#FF6B35]" />
                                    <div>
                                      <div className={`text-xs font-bold ${headingText}`}>
                                        Pomodoro {formatTimerClock(focusRemainingSec)}
                                      </div>
                                      <div className={`text-[10px] ${mutedText}`}>
                                        {focusCompletedCount} sessões hoje
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => setActiveTab('focus')}
                                    className="rounded-lg bg-[#FF6B35] px-2.5 py-1 text-[10px] font-bold text-white cursor-pointer"
                                  >
                                    Abrir Foco
                                  </button>
                                </div>
                              )}

                              {msg.memoryChip && (
                                <div className="flex items-center justify-between rounded-xl border border-[#00D68F]/45 bg-[#00D68F]/10 px-2.5 py-1.5 text-[11px]">
                                  <span className="truncate font-medium text-[#00D68F]">
                                    {msg.memoryChip.undone
                                      ? 'Memória removida'
                                      : `Memória salva: ${msg.memoryChip.text}`}
                                  </span>
                                  {!msg.memoryChip.undone && (
                                    <button
                                      type="button"
                                      onClick={() => undoMemoryChip(msg.id, msg.memoryChip!.id)}
                                      className="ml-2 inline-flex shrink-0 items-center gap-1 font-bold text-[#00C2FF] cursor-pointer"
                                    >
                                      <Undo2 className="h-3 w-3" />
                                      Desfazer
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {aiThinking && (
                          <div className={`inline-flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-[11px] ${subCardBg} ${mutedText}`}>
                            <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#00C2FF]" />
                            Gerando resposta local...
                          </div>
                        )}
                      </div>

                      {/* Quick Suggested Prompts */}
                      <div className="flex gap-1.5 overflow-x-auto pb-2">
                        {[
                          'Como está minha rotina hoje?',
                          'Lembrar que treino às 19h',
                          'Criar tarefa revisar código',
                        ].map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => sendPrompt(chip)}
                            className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium transition hover:border-[#7C5CFF] cursor-pointer ${subCardBg} ${headingText}`}
                          >
                            {chip}
                          </button>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          sendPrompt(chatInput);
                        }}
                        className={`flex items-center gap-2 rounded-2xl border px-2.5 py-1.5 ${cardBg}`}
                      >
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder={
                            editingMsgId
                              ? 'Editando mensagem enviada...'
                              : 'Pergunte ou crie uma tarefa...'
                          }
                          className={`min-w-0 flex-1 bg-transparent text-xs outline-none ${headingText}`}
                        />
                        {editingMsgId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingMsgId(null);
                              setChatInput('');
                            }}
                            className={`text-[10px] ${mutedText} cursor-pointer`}
                          >
                            Cancelar
                          </button>
                        )}
                        <button
                          type="submit"
                          aria-label="Enviar mensagem"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF] text-white transition hover:bg-[#6A48F5] cursor-pointer"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </form>
                    </div>
                  )}

                  {/* TAB 3: FOCO POMODORO */}
                  {activeTab === 'focus' && (
                    <div className="space-y-3">
                      <div className={`rounded-2xl border p-4 text-center ${cardBg}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF6B35]">
                            MODO FOCO PROFUNDO
                          </span>
                          <button
                            type="button"
                            onClick={() => setFocusDemoFast((v) => !v)}
                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold cursor-pointer ${
                              focusDemoFast
                                ? 'border-[#00D68F] bg-[#00D68F]/15 text-[#00D68F]'
                                : `${subCardBg} ${mutedText}`
                            }`}
                          >
                            <Gauge className="h-3 w-3" />
                            {focusDemoFast ? 'Demo 60x ON' : 'Demo 60x'}
                          </button>
                        </div>

                        {/* Circular Animated SVG Timer */}
                        <div className="relative mx-auto my-3 flex h-32 w-32 items-center justify-center">
                          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 110 110">
                            <circle
                              cx="55"
                              cy="55"
                              r={focusRingRadius}
                              fill="none"
                              stroke={darkTheme ? '#1C2338' : '#E2E8F0'}
                              strokeWidth="8"
                            />
                            <circle
                              cx="55"
                              cy="55"
                              r={focusRingRadius}
                              fill="none"
                              stroke="#FF6B35"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray={focusCircumference}
                              strokeDashoffset={focusDashOffset}
                              className="transition-all duration-300"
                            />
                          </svg>
                          <div className="absolute text-center">
                            <div className={`font-mono text-2xl font-bold ${headingText}`}>
                              {formatTimerClock(focusRemainingSec)}
                            </div>
                            <div className={`text-[10px] ${mutedText}`}>
                              {focusCompletedCount} sessões
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center gap-1.5">
                          {[
                            { label: '25m', sec: 1500 },
                            { label: '15m', sec: 900 },
                            { label: '5m', sec: 300 },
                          ].map((preset) => (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() => {
                                setFocusRunning(false);
                                setFocusDurationSec(preset.sec);
                                setFocusRemainingSec(preset.sec);
                                setFocusBanner(null);
                              }}
                              className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold cursor-pointer ${
                                focusDurationSec === preset.sec
                                  ? 'bg-[#FF6B35] text-white'
                                  : `${subCardBg} ${mutedText}`
                              }`}
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>

                        <div className="mt-3 flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setFocusBanner(null);
                              setFocusRunning((r) => !r);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#7C5CFF] px-4 py-2 text-xs font-bold text-white cursor-pointer"
                          >
                            {focusRunning ? (
                              <>
                                <Pause className="h-3.5 w-3.5" />
                                Pausar
                              </>
                            ) : (
                              <>
                                <Play className="h-3.5 w-3.5" />
                                Iniciar
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFocusRunning(false);
                              setFocusRemainingSec(focusDurationSec);
                              setFocusBanner(null);
                            }}
                            className={`inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-xs font-semibold cursor-pointer ${subCardBg} ${mutedText}`}
                          >
                            Resetar
                          </button>
                        </div>

                        {focusBanner && (
                          <div className="mt-2.5 rounded-xl border border-[#00D68F]/45 bg-[#00D68F]/10 px-2.5 py-1.5 text-[11px] font-semibold text-[#00D68F]">
                            {focusBanner}
                          </div>
                        )}
                      </div>

                      <div className={`rounded-2xl border p-3 ${cardBg}`}>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-[#00C2FF]">
                          <Shield className="h-3.5 w-3.5" />
                          Guardião durante o Foco
                        </div>
                        <div className="mt-2 space-y-1.5">
                          {Object.entries(guardianApps).map(([appName, enabled]) => (
                            <button
                              key={appName}
                              type="button"
                              onClick={() =>
                                setGuardianApps((prev) => ({
                                  ...prev,
                                  [appName]: !prev[appName],
                                }))
                              }
                              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs cursor-pointer ${subCardBg}`}
                            >
                              <span className={headingText}>{appName}</span>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  enabled
                                    ? 'bg-[#00D68F]/15 text-[#00D68F]'
                                    : 'bg-[#FF4D79]/15 text-[#FF4D79]'
                                }`}
                              >
                                {enabled ? 'Bloqueado no foco' : 'Liberado'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: USO & METAS */}
                  {activeTab === 'screentime' && (
                    <div className="space-y-3">
                      <div className={`rounded-2xl border p-3.5 ${cardBg}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold uppercase text-[#00C2FF]">
                            LIMITE DIÁRIO DE TELA
                          </span>
                          <div className="flex gap-1">
                            {[120, 180, 240].map((mins) => (
                              <button
                                key={mins}
                                type="button"
                                onClick={() => setDailyLimitMin(mins)}
                                className={`rounded-lg px-2 py-0.5 font-mono text-[10px] font-bold cursor-pointer ${
                                  dailyLimitMin === mins
                                    ? 'bg-[#00C2FF] text-[#061826]'
                                    : `${subCardBg} ${mutedText}`
                                }`}
                              >
                                {formatDurationMin(mins)}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mt-2.5 flex items-baseline justify-between">
                          <div className={`text-lg font-bold ${headingText}`}>
                            {formatDurationMin(totalUsedMin)}
                          </div>
                          <div
                            className={`text-xs font-semibold ${
                              remainingMin >= 0 ? 'text-[#00D68F]' : 'text-[#FF4D79]'
                            }`}
                          >
                            {remainingMin >= 0
                              ? `Restam ${formatDurationMin(remainingMin)}`
                              : `Excedido em ${formatDurationMin(Math.abs(remainingMin))}`}
                          </div>
                        </div>

                        <div className={`mt-2 h-2 overflow-hidden rounded-full ${subCardBg}`}>
                          <div
                            className={`h-full rounded-full transition-all ${
                              usagePct >= 90
                                ? 'bg-[#FF4D79]'
                                : usagePct >= 70
                                  ? 'bg-[#FFB800]'
                                  : 'bg-[#00D68F]'
                            }`}
                            style={{ width: `${usagePct}%` }}
                          />
                        </div>

                        <div className="mt-3 space-y-1.5">
                          {appUsage.map((app) => (
                            <button
                              key={app.id}
                              type="button"
                              onClick={() => cycleAppLimit(app.id)}
                              className={`flex w-full items-center justify-between rounded-xl border px-2.5 py-1.5 text-left text-[11px] cursor-pointer ${subCardBg}`}
                              title="Clique para ajustar o limite deste app"
                            >
                              <span className={`font-semibold ${headingText}`}>
                                {app.name}{' '}
                                <span className={`font-mono text-[10px] ${mutedText}`}>
                                  ({app.usedMin}m)
                                </span>
                              </span>
                              <span className="rounded-full bg-[#7C5CFF]/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#00C2FF]">
                                {app.limitMin ? `Limite ${app.limitMin}m` : 'Sem limite'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className={`rounded-2xl border p-3.5 ${cardBg}`}>
                        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase text-[#FFB800]">
                          <Target className="h-3.5 w-3.5" />
                          Metas & Marcos (+30 XP cada)
                        </div>
                        <div className="mt-2 space-y-2.5">
                          {goals.map((goal) => {
                            const doneCount = goal.milestones.filter((m) => m.done).length;
                            return (
                              <div
                                key={goal.id}
                                className={`rounded-xl border p-2.5 ${subCardBg}`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className={`text-xs font-bold ${headingText}`}>
                                    {goal.title}
                                  </span>
                                  <span className="font-mono text-[10px] text-[#00D68F]">
                                    {doneCount}/{goal.milestones.length}
                                  </span>
                                </div>
                                <div className="mt-1.5 space-y-1">
                                  {goal.milestones.map((m, idx) => (
                                    <button
                                      key={m.label}
                                      type="button"
                                      onClick={() => toggleMilestone(goal.id, idx)}
                                      className="flex w-full items-center gap-2 text-left text-[11px] cursor-pointer"
                                    >
                                      <CheckCircle2
                                        className={`h-3.5 w-3.5 shrink-0 ${
                                          m.done ? 'text-[#00D68F]' : 'text-[#667194]'
                                        }`}
                                      />
                                      <span className={m.done ? `${mutedText} line-through` : headingText}>
                                        {m.label}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom App Navigation Bar */}
                <nav
                  aria-label="Navegação do simulador Krono"
                  className={`grid grid-cols-4 border-t p-1.5 ${
                    darkTheme
                      ? 'border-[#28324F] bg-[#141928]'
                      : 'border-[#D9E1F2] bg-white'
                  }`}
                >
                  {[
                    { id: 'routine' as PreviewTab, label: 'Rotina', icon: Zap },
                    { id: 'ai' as PreviewTab, label: 'Krono IA', icon: Sparkles },
                    { id: 'focus' as PreviewTab, label: 'Foco', icon: Timer },
                    { id: 'screentime' as PreviewTab, label: 'Uso & Metas', icon: Smartphone },
                  ].map((item) => {
                    const Icon = item.icon;
                    const active = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-semibold transition cursor-pointer ${
                          active
                            ? 'bg-[#7C5CFF] text-white'
                            : `${mutedText} hover:text-[#00C2FF]`
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveAppPreview;
