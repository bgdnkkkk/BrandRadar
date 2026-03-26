'use client'

import { useState } from 'react'

const DEV1 = { name: 'Артём', color: '#6366f1', bg: '#6366f115', border: '#6366f140' }
const DEV2 = { name: 'Богдан', color: '#f59e0b', bg: '#f59e0b15', border: '#f59e0b40' }
const BOTH = { name: 'Оба', color: '#10b981', bg: '#10b98115', border: '#10b98140' }

const phases = [
  {
    id: 0,
    label: 'Фаза 0',
    title: 'Старт проекта',
    subtitle: 'Один раз, вместе',
    who: BOTH,
    steps: [
      {
        who: BOTH,
        title: 'Git: создать репозиторий и ветки',
        items: [
          'main — финальная сдача, только через PR',
          'dev — интеграция, только через PR',
          'Защита main и dev: merge только после аппрува',
        ],
        code: `git checkout -b dev\ngit push -u origin dev\n# Защитить main и dev в настройках репо`,
      },
      {
        who: BOTH,
        title: 'Договориться об инструментах',
        items: [
          'Husky + lint-staged: prettier + eslint на каждый commit',
          'Именование веток: feat/, fix/, chore/',
          'PR обязателен даже если нет конфликтов — Артём ревьюит',
          'Commit message: feat(module-name): описание',
        ],
        code: `feat(auth): add login form schema\nfeat(ui): animate sidebar entry\nfix(profile): correct avatar upload handler`,
      },
      {
        who: DEV1,
        title: 'Артём: поднять App слой',
        items: [
          'app/providers.tsx — QueryClientProvider, ThemeProvider, Toaster (sonner)',
          'app/layout.tsx — корневой layout',
          'src/common/api/base.ts — openapi-fetch клиент',
          'src/common/api/middlewares.ts — auth middleware',
          'src/common/api/tokenManager.ts — access/refresh логика',
          'src/common/constants/endpoints.ts — все эндпоинты',
          'src/common/constants/queryKeys.ts — фабрика ключей',
        ],
      },
      {
        who: DEV2,
        title: 'Богдан: поднять Common/UI',
        items: [
          'Добавить shadcn-компоненты по списку зависимостей (уже установлены)',
          'src/common/ui/ — кастомные обёртки над shadcn если нужны',
          'Настроить tw-animate-css в globals.css',
          'Проверить что все Radix пакеты подключены корректно',
        ],
      },
    ],
  },
  {
    id: 1,
    label: 'Фаза 1',
    title: 'Контракт модуля',
    subtitle: 'Перед каждым новым модулем — 15 минут вместе',
    who: BOTH,
    steps: [
      {
        who: BOTH,
        title: 'Обсудить и зафиксировать структуру модуля',
        items: [
          'Какие данные нужны с бека? → описать типы сразу',
          'Какие actions? (мутации, навигация, side-effects)',
          'Из каких UI-блоков состоит? → Артём набрасывает, второй уточняет',
          'Есть ли подмодули? (слишком большой → делим)',
          'Что экспортируется через index.ts публично?',
        ],
        code: `// Артём создаёт этот файл до расхождения:\n// src/modules/profile/profile.types.ts\n\nexport interface Profile {\n  id: string;\n  username: string;\n  avatarUrl: string | null;\n  bio: string;\n}\n\nexport interface ProfileCardProps {\n  profile: Profile;\n  isLoading: boolean;\n  onEdit: () => void;\n}\n\n// mock для второго разраба:\nexport const mockProfile: Profile = {\n  id: '1',\n  username: 'johndoe',\n  avatarUrl: null,\n  bio: 'Frontend dev',\n};`,
      },
      {
        who: DEV1,
        title: 'Артём создаёт скелет модуля',
        items: [
          'Папка src/modules/{name}/ с подпапками ui/ и logic/',
          'profile.types.ts — интерфейсы + моки',
          'index.ts — пустой, но с TODO что будет экспортировать',
          'ui/{ComponentName}.tsx — заглушка с правильными пропсами',
          'Коммит в feat/module-{name}, второй разраб делает checkout',
        ],
        code: `src/modules/profile/\n├── index.ts                  ← публичный API\n├── profile.types.ts          ← типы + моки\n├── logic/\n│   ├── useProfile.ts         ← TanStack Query хук\n│   ├── useProfileMutation.ts ← react-hook-form + zod + мутация\n│   └── profile.store.ts      ← zustand если нужен локальный стейт\n└── ui/\n    ├── ProfileCard.tsx       ← второй разраб\n    ├── ProfileEditModal.tsx  ← второй разраб\n    └── ProfileSkeleton.tsx   ← второй разраб`,
      },
    ],
  },
  {
    id: 2,
    label: 'Фаза 2',
    title: 'Параллельная разработка',
    subtitle: 'Каждый в своих файлах — конфликтов нет',
    who: null,
    columns: [
      {
        who: DEV1,
        title: 'Артём — logic/',
        steps: [
          {
            title: '1. API-слой',
            items: [
              'Добавить эндпоинт в common/constants/endpoints.ts',
              'Добавить queryKey в common/constants/queryKeys.ts',
            ],
            code: `// queryKeys.ts\nexport const profileKeys = {\n  all: ['profile'] as const,\n  detail: (id: string) => [...profileKeys.all, id] as const,\n};`,
          },
          {
            title: '2. Query хук',
            items: [
              'useQuery через openapi-fetch клиент',
              'Обработка loading / error состояний',
              'Типизация через сгенерированные openapi-typescript типы',
            ],
            code: `// logic/useProfile.ts\nexport const useProfile = (id: string) => {\n  return useQuery({\n    queryKey: profileKeys.detail(id),\n    queryFn: () => apiClient.GET('/profile/{id}', {\n      params: { path: { id } }\n    }),\n  });\n};`,
          },
          {
            title: '3. Мутация + форма',
            items: [
              'zod schema для react-hook-form',
              'useMutation + оптимистичный апдейт',
              'toast через sonner при успехе/ошибке',
            ],
            code: `// logic/useProfileMutation.ts\nconst profileSchema = z.object({\n  username: z.string().min(3),\n  bio: z.string().max(200),\n});\n\nexport const useProfileMutation = () => {\n  const form = useForm({\n    resolver: zodResolver(profileSchema),\n  });\n  const mutation = useMutation({ ... });\n  return { form, mutation };\n};`,
          },
          {
            title: '4. Экспорт через index.ts',
            items: [
              'Только публичное API — хуки, типы, компоненты',
              'Никаких внутренних деталей наружу',
            ],
            code: `// index.ts\nexport { ProfileCard } from './ui/ProfileCard';\nexport { ProfileEditModal } from './ui/ProfileEditModal';\nexport { useProfile } from './logic/useProfile';\nexport type { Profile } from './profile.types';`,
          },
        ],
      },
      {
        who: DEV2,
        title: 'Богдан — ui/',
        steps: [
          {
            title: '1. Получить скелет',
            items: [
              'git pull feat/module-profile',
              'Читает profile.types.ts — понимает пропсы',
              'Работает только с ui/ папкой',
            ],
            code: `// Богдан никогда не трогает logic/\n// Только читает типы как контракт`,
          },
          {
            title: '2. Верстка на моках',
            items: [
              'Импортирует mockProfile из types файла',
              'Использует shadcn: Avatar, Card, Dialog, Separator',
              'Никаких реальных данных — всё через пропсы',
            ],
            code: `// ui/ProfileCard.tsx\nimport { mockProfile } from '../profile.types';\n\nexport const ProfileCard = ({\n  profile = mockProfile, // дефолт для разработки\n  isLoading,\n  onEdit,\n}: ProfileCardProps) => {\n  // верстка + анимации\n};`,
          },
          {
            title: '3. Анимации',
            items: [
              'tw-animate-css классы: animate-fade-in, animate-slide-in-*',
              'Skeleton через shadcn Skeleton компонент',
              'Hover / transition эффекты через Tailwind',
            ],
            code: `// ProfileCard.tsx\n<div className={\n  "animate-fade-in transition-all duration-200 "\n  + "hover:shadow-md hover:-translate-y-0.5"\n}>\n  <Avatar>\n    <AvatarImage src={profile.avatarUrl ?? ''} />\n    <AvatarFallback>\n      {profile.username[0].toUpperCase()}\n    </AvatarFallback>\n  </Avatar>\n</div>`,
          },
          {
            title: '4. Skeleton state',
            items: [
              'ProfileSkeleton.tsx — отдельный компонент',
              'Используется когда isLoading=true',
              'shadcn Skeleton + те же размеры что у реального UI',
            ],
            code: `// ui/ProfileSkeleton.tsx\nexport const ProfileSkeleton = () => (\n  <div className="flex gap-3 p-4">\n    <Skeleton className="size-12 rounded-full" />\n    <div className="space-y-2">\n      <Skeleton className="h-4 w-32" />\n      <Skeleton className="h-3 w-48" />\n    </div>\n  </div>\n);`,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Фаза 3',
    title: 'Интеграция',
    subtitle: 'Артём подключает логику к UI второго разраба',
    who: DEV1,
    steps: [
      {
        who: DEV1,
        title: 'Артём подключает хуки в UI',
        items: [
          'Открывает ui/ProfileCard.tsx — заменяет mock на реальный хук',
          'Передаёт data, isLoading, handlers через пропсы',
          'UI второго разраба не меняется — только пропсы заполняются реальными данными',
        ],
        code: `// Артём создаёт «умный» wrapper, не трогая UI компонент:\n// ui/ProfileCardConnected.tsx (или прямо в странице)\n\nconst ProfileCardConnected = ({ userId }: { userId: string }) => {\n  const { data, isLoading } = useProfile(userId);\n  const { mutate: onEdit } = useProfileMutation();\n\n  if (isLoading) return <ProfileSkeleton />;\n  if (!data) return null;\n\n  return <ProfileCard profile={data} isLoading={false} onEdit={onEdit} />;\n};`,
      },
      {
        who: DEV1,
        title: 'Сборка страницы в app/',
        items: [
          'app/(private)/profile/page.tsx — Next.js RSC',
          'Импорт только через index.ts модуля',
          'Если нужен layout — app/(private)/layout.tsx',
        ],
        code: `// app/(private)/profile/page.tsx\nimport { ProfileCardConnected } from '@/modules/profile';\n\nexport default function ProfilePage() {\n  return (\n    <main className="container py-8">\n      <ProfileCardConnected userId="me" />\n    </main>\n  );\n}`,
      },
    ],
  },
  {
    id: 4,
    label: 'Фаза 4',
    title: 'PR и ревью',
    subtitle: 'Каждая фича → PR → dev',
    who: BOTH,
    steps: [
      {
        who: DEV2,
        title: 'Богдан открывает PR когда UI готов',
        items: [
          'Ветка: feat/module-profile-ui → dev',
          'В описании: скриншот или описание что сделано',
          'Артём ревьюит: только UI файлы, проверяет пропсы',
        ],
        code: `# PR title: feat(profile): add profile card UI and skeleton\n# \n# Changes:\n# - ui/ProfileCard.tsx\n# - ui/ProfileSkeleton.tsx  \n# - ui/ProfileEditModal.tsx`,
      },
      {
        who: DEV1,
        title: 'Артём открывает PR когда логика + интеграция готовы',
        items: [
          'Ветка: feat/module-profile → dev',
          'В описании: что работает, есть ли зависимость от бека',
          'Если бека нет — мок должен быть отключаемым флагом',
          'Self-review перед открытием PR',
        ],
        code: `# PR title: feat(profile): connect profile data layer\n#\n# Changes:\n# - logic/useProfile.ts\n# - logic/useProfileMutation.ts\n# - index.ts\n# - app/(private)/profile/page.tsx\n#\n# Note: works with mock data until /profile endpoint is ready`,
      },
      {
        who: BOTH,
        title: 'Merge в dev → проверка → merge в main',
        items: [
          'dev → периодически проверяете что всё работает вместе',
          'Перед сдачей: dev → main через PR, оба аппрувят',
          'Не мёрджите сломанный код в main даже под давлением дедлайна',
        ],
      },
    ],
  },
]

const Tag = ({ who }: { who: any }) => (
  <span
    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold"
    style={{ background: who.bg, color: who.color, border: `1px solid ${who.border}` }}
  >
    {who.name}
  </span>
)

const CodeBlock = ({ code }: { code: string }) => (
  <pre
    className="mt-3 p-3 rounded-lg text-xs overflow-x-auto"
    style={{
      background: '#0f0f0f',
      color: '#e2e8f0',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      lineHeight: 1.6,
      border: '1px solid #1e1e1e',
    }}
  >
    {code}
  </pre>
)

type StepType = {
  who: { name: string; color: string; bg: string; border: string; };
  title: string;
  items: string[];
  code?: string;
}

const Step = ({ step, compact }: { step: StepType; compact?: boolean }) => (
  <div
    className="rounded-xl p-4 mb-3"
    style={{
      background: step.who.bg,
      border: `1px solid ${step.who.border}`,
    }}
  >
    <div className="flex items-center gap-2 mb-2">
      <Tag who={step.who} />
      <span className="font-semibold text-sm" style={{ color: '#f8fafc' }}>
        {step.title}
      </span>
    </div>
    <ul className="space-y-1">
      {step.items?.map((item: string, i: number) => (
        <li key={i} className="text-xs flex gap-2" style={{ color: '#94a3b8' }}>
          <span style={{ color: step.who.color, flexShrink: 0 }}>›</span>
          {item}
        </li>
      ))}
    </ul>
    {step.code && <CodeBlock code={step.code} />}
  </div>
)

export default function Workflow() {
  const [activePhase, setActivePhase] = useState<number | null>(null)

  return (
    <div
      style={{
        background: '#080c14',
        minHeight: '100vh',
        fontFamily: "'Inter', system-ui, sans-serif",
        color: '#f8fafc',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="text-xs font-mono px-2 py-1 rounded"
              style={{ background: '#1e293b', color: '#64748b' }}
            >
              FEOD · Next.js · олимпиада
            </div>
          </div>
          <h1
            className="text-3xl font-bold mb-1"
            style={{ color: '#f8fafc', letterSpacing: '-0.03em' }}
          >
            Team Workflow
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            Полный цикл разработки для двух разработчиков
          </p>

          {/* Legend */}
          <div className="flex gap-3 mt-4">
            {[DEV1, DEV2, BOTH].map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs" style={{ color: '#94a3b8' }}>
                  {d.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase nav */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {phases.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePhase(activePhase === p.id ? null : p.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: activePhase === p.id ? '#1e293b' : 'transparent',
                color: activePhase === p.id ? '#f8fafc' : '#64748b',
                border: `1px solid ${activePhase === p.id ? '#334155' : '#1e293b'}`,
                cursor: 'pointer',
              }}
            >
              {p.label}: {p.title}
            </button>
          ))}
          {activePhase !== null && (
            <button
              onClick={() => setActivePhase(null)}
              className="px-3 py-1.5 rounded-lg text-xs"
              style={{
                color: '#475569',
                cursor: 'pointer',
                background: 'transparent',
                border: '1px solid #1e293b',
              }}
            >
              Показать всё
            </button>
          )}
        </div>

        {/* Phases */}
        {phases
          .filter(p => activePhase === null || activePhase === p.id)
          .map(phase => (
            <div key={phase.id} className="mb-10">
              {/* Phase header */}
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    background: phase.who ? phase.who.bg : BOTH.bg,
                    color: phase.who ? phase.who.color : BOTH.color,
                    border: `1px solid ${phase.who ? phase.who.border : BOTH.border}`,
                  }}
                >
                  {phase.label}
                </span>
                <h2
                  className="text-xl font-bold"
                  style={{ color: '#f8fafc', letterSpacing: '-0.02em' }}
                >
                  {phase.title}
                </h2>
                <span className="text-xs" style={{ color: '#475569' }}>
                  {phase.subtitle}
                </span>
              </div>

              {/* Two-column parallel phase */}
              {phase.columns ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.columns.map(col => (
                    <div
                      key={col.who.name}
                      className="rounded-2xl p-4"
                      style={{
                        background: '#0d1117',
                        border: `1px solid ${col.who.border}`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Tag who={col.who} />
                        <span className="text-sm font-semibold" style={{ color: col.who.color }}>
                          {col.title}
                        </span>
                      </div>
                      {col.steps.map((step, i) => (
                        <div key={i} className="mb-4">
                          <div className="text-xs font-semibold mb-2" style={{ color: '#e2e8f0' }}>
                            {step.title}
                          </div>
                          <ul className="space-y-1 mb-2">
                            {step.items.map((item, j) => (
                              <li
                                key={j}
                                className="text-xs flex gap-2"
                                style={{ color: '#64748b' }}
                              >
                                <span style={{ color: col.who.color, flexShrink: 0 }}>›</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                          {step.code && <CodeBlock code={step.code} />}
                          {i < col.steps.length - 1 && (
                            <div className="my-3" style={{ height: 1, background: '#1e293b' }} />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {phase.steps.map((step: any, i: number) => (
                    <Step key={i} step={step} />
                  ))}
                </div>
              )}
            </div>
          ))}

        {/* Git flow diagram */}
        <div
          className="rounded-2xl p-5 mt-4"
          style={{ background: '#0d1117', border: '1px solid #1e293b' }}
        >
          <h3 className="font-bold mb-4 text-sm" style={{ color: '#f8fafc' }}>
            Git Flow — наглядно
          </h3>
          <div className="text-xs font-mono" style={{ color: '#64748b', lineHeight: 2 }}>
            <div>
              <span style={{ color: '#6366f1' }}>feat/module-profile</span>
              {'  '}──── commit ──── commit ─────────────────┐
            </div>
            <div>
              <span style={{ color: '#f59e0b' }}>feat/module-profile-ui</span> ──── commit ────
              commit ──────────────┐ │
            </div>
            <div>
              {'                                             '}
              <span style={{ color: '#10b981' }}>↓ PR + review ↓ PR + review</span>
            </div>
            <div>
              <span style={{ color: '#38bdf8' }}>dev</span>
              {'                 '}════════════════════════════ merge ══ merge ══▶
            </div>
            <div>
              {'                                                         '}
              <span style={{ color: '#10b981' }}>↑ финальный PR перед сдачей</span>
            </div>
            <div>
              <span style={{ color: '#f43f5e' }}>main</span>
              {'               '}════════════════════════════════════════════════ merge ▶
            </div>
          </div>

          <div
            className="mt-4 pt-4 grid grid-cols-1 md:grid-cols-3 gap-3"
            style={{ borderTop: '1px solid #1e293b' }}
          >
            {[
              {
                branch: 'feat/*',
                color: '#6366f1',
                rule: 'Создаёт тот, кто работает над фичей. Merge в dev через PR с аппрувом Артёма.',
              },
              {
                branch: 'dev',
                color: '#38bdf8',
                rule: 'Интеграция. Всегда должен быть в рабочем состоянии. Прямые коммиты запрещены.',
              },
              {
                branch: 'main',
                color: '#f43f5e',
                rule: 'Только финальный merge из dev перед сдачей. Оба аппрувят.',
              },
            ].map(({ branch, color, rule }) => (
              <div
                key={branch}
                className="rounded-lg p-3"
                style={{ background: '#161b22', border: '1px solid #21262d' }}
              >
                <div className="text-xs font-mono font-bold mb-1" style={{ color }}>
                  {branch}
                </div>
                <div className="text-xs" style={{ color: '#64748b' }}>
                  {rule}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick ref */}
        <div
          className="rounded-2xl p-5 mt-4"
          style={{ background: '#0d1117', border: '1px solid #1e293b' }}
        >
          <h3 className="font-bold mb-4 text-sm" style={{ color: '#f8fafc' }}>
            Быстрая шпаргалка — кто что никогда не трогает
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: DEV2.color }}>
                Богдан разраб — НИКОГДА не трогает:
              </div>
              {[
                'src/modules/*/logic/**',
                'src/modules/*/index.ts',
                'src/common/api/**',
                'src/common/constants/**',
                'app/providers.tsx',
                'app/**/page.tsx (только по согласованию)',
              ].map(p => (
                <div key={p} className="flex items-center gap-2 mb-1">
                  <span style={{ color: '#f43f5e' }}>✗</span>
                  <code className="text-xs" style={{ color: '#64748b', fontFamily: 'monospace' }}>
                    {p}
                  </code>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: DEV1.color }}>
                Артём — старается не трогать без нужды:
              </div>
              {[
                'src/modules/*/ui/**  (только интеграция)',
                'src/common/ui/**',
                'globals.css / variables.css',
                'tw-animate-css конфиги',
              ].map(p => (
                <div key={p} className="flex items-center gap-2 mb-1">
                  <span style={{ color: '#f59e0b' }}>~</span>
                  <code className="text-xs" style={{ color: '#64748b', fontFamily: 'monospace' }}>
                    {p}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs" style={{ color: '#1e293b' }}>
          FEOD Workflow · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}
