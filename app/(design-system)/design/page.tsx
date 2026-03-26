'use client'

import { useState } from 'react'
import { Button } from '@/common/ui/button'
import { Input } from '@/common/ui/input'
import { Badge } from '@/common/ui/badge'
import { Switch } from '@/common/ui/switch'
import { Label } from '@/common/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/common/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/common/ui/dropdown-menu'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <p className="font-display text-12 tracking-[0.08em] uppercase text-text-40 mb-4">— {title}</p>
    {children}
  </section>
)

const Swatch = ({
  label,
  value,
  bg,
  border,
}: {
  label: string
  value?: string
  bg: string
  border?: string
}) => (
  <div className="flex flex-col gap-2">
    <div
      className="h-14 rounded-lg"
      style={{ background: bg, border: border ?? '1px solid var(--color-border)' }}
    />
    <div>
      <p className="font-display text-12 text-text-80 font-medium">{label}</p>
      {value && <p className="font-display text-12 text-text-40">{value}</p>}
    </div>
  </div>
)

export default function DesignSystem() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [switched, setSwitched] = useState(false)

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-text font-interface transition-colors duration-300">
      <div className="max-w-[960px] mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <h1 className="font-display text-48 font-bold tracking-[-0.03em] leading-[1.1] mb-2">
              Design
              <br />
              <span className="text-accent-custom">System</span>
            </h1>
            <p className="text-text-60 text-16">Golos Text · Geist · #e60031</p>
          </div>
          <button
            onClick={toggleTheme}
            className="bg-[var(--color-surface)] border border-border rounded-lg px-5 py-2.5 text-16 text-text-80 cursor-pointer transition-colors hover:border-border-strong"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        {/* Accent */}
        <Section title="Accent">
          <div className="grid grid-cols-7 gap-3">
            <Swatch label="accent" value="#e60031" bg="var(--color-accent)" border="none" />
            <Swatch label="hover" value="#cc002b" bg="var(--color-accent-hover)" border="none" />
            <Swatch label="active" value="#a80023" bg="var(--color-accent-active)" border="none" />
            <Swatch label="subtle" value="#ff1a47" bg="var(--color-accent-subtle)" border="none" />
            <Swatch label="20%" bg="var(--color-accent-20)" />
            <Swatch label="12%" bg="var(--color-accent-12)" />
            <Swatch label="8%" bg="var(--color-accent-8)" />
          </div>
        </Section>

        {/* Backgrounds */}
        <Section title="Backgrounds & Surfaces">
          <div className="grid grid-cols-5 gap-3">
            <Swatch label="bg" bg="var(--color-bg)" border="1px solid var(--color-border-strong)" />
            <Swatch label="bg-elevated" bg="var(--color-bg-elevated)" />
            <Swatch label="bg-subtle" bg="var(--color-bg-subtle)" />
            <Swatch label="surface" bg="var(--color-surface)" />
            <Swatch label="surface-hover" bg="var(--color-surface-hover)" />
          </div>
        </Section>

        {/* Text opacity */}
        <Section title="Text Opacity">
          <div className="bg-[var(--color-surface)] border border-border rounded-xl p-6 flex flex-col gap-3">
            {[
              { label: 'text', opacity: '100%', color: 'var(--color-text)' },
              { label: 'text-80', opacity: '80%', color: 'var(--color-text-80)' },
              { label: 'text-60', opacity: '60%', color: 'var(--color-text-60)' },
              { label: 'text-40', opacity: '40%', color: 'var(--color-text-40)' },
              { label: 'text-disabled', opacity: '28%', color: 'var(--color-text-disabled)' },
            ].map(({ label, opacity, color }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="font-display text-12 text-text-40 w-[120px] shrink-0">
                  --{label}
                </span>
                <span className="font-interface text-16" style={{ color }}>
                  Тестовый текст для демонстрации шрифта, 42 братуха · {opacity}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography scale */}
        <Section title="Typography Scale">
          <div className="bg-[var(--color-surface)] border border-border rounded-xl p-6 flex flex-col gap-4">
            {[
              { size: '96', label: 'Display XL' },
              { size: '64', label: 'Display' },
              { size: '48', label: 'Heading 1' },
              { size: '36', label: 'Heading 2' },
              { size: '28', label: 'Heading 3' },
              { size: '24', label: 'Heading 4' },
              { size: '20', label: 'Large' },
              { size: '16', label: 'Base' },
              { size: '12', label: 'Small' },
              { size: '8', label: 'Micro' },
            ].map(({ size, label }) => (
              <div key={size} className="flex items-baseline gap-4">
                <span className="font-display text-12 text-text-40 w-20 shrink-0">
                  {size}px · {label}
                </span>
                <span
                  className="font-display font-bold tracking-[-0.02em] leading-[1.1] text-text"
                  style={{ fontSize: `var(--font-size-${size})` }}
                >
                  Geist Bold
                </span>
                <span
                  className="font-interface font-normal text-text-60 leading-[1.1]"
                  style={{ fontSize: `var(--font-size-${size})` }}
                >
                  Golos Regular
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Font weights */}
        <Section title="Font Weights">
          <div className="grid grid-cols-3 gap-3">
            {(['300', '400', '700'] as const).map(w => (
              <div
                key={w}
                className="bg-[var(--color-surface)] border border-border rounded-xl p-6"
              >
                <p className="font-display text-12 text-text-40 mb-3">weight-{w}</p>
                <p
                  className="font-display text-28 tracking-[-0.02em] text-text"
                  style={{ fontWeight: w }}
                >
                  Geist {w === '300' ? 'Light' : w === '400' ? 'Regular' : 'Bold'}
                </p>
                <p className="font-interface text-20 text-text-60 mt-1" style={{ fontWeight: w }}>
                  Golos {w === '300' ? 'Тонкий' : w === '400' ? 'Обычный' : 'Жирный'}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Semantic */}
        <Section title="Semantic Colors">
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                label: 'success',
                color: 'var(--color-success)',
                bg: 'var(--color-success-bg)',
                text: 'Успех',
              },
              {
                label: 'warning',
                color: 'var(--color-warning)',
                bg: 'var(--color-warning-bg)',
                text: 'Внимание',
              },
              {
                label: 'error',
                color: 'var(--color-error)',
                bg: 'var(--color-error-bg)',
                text: 'Ошибка',
              },
              {
                label: 'info',
                color: 'var(--color-info)',
                bg: 'var(--color-info-bg)',
                text: 'Инфо',
              },
            ].map(({ label, color, bg, text }) => (
              <div
                key={label}
                className="rounded-xl p-4"
                style={{ background: bg, border: `1px solid ${color}` }}
              >
                <div className="size-2 rounded-full mb-2.5" style={{ background: color }} />
                <p className="font-interface text-16 font-medium" style={{ color }}>
                  {text}
                </p>
                <p className="font-display text-12 mt-0.5 opacity-70" style={{ color }}>
                  --color-{label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Borders */}
        <Section title="Borders">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--color-surface)] border border-border rounded-xl p-5">
              <p className="font-display text-12 text-text-40">--color-border · 1px solid</p>
            </div>
            <div className="bg-[var(--color-surface)] border border-border-strong rounded-xl p-5">
              <p className="font-display text-12 text-text-40">--color-border-strong · 1px solid</p>
            </div>
          </div>
        </Section>

        {/* Radius */}
        <Section title="Border Radius">
          <div className="flex gap-4 flex-wrap items-end">
            {[
              { label: 'sm', r: 'calc(var(--radius) * 0.6)' },
              { label: 'md', r: 'calc(var(--radius) * 0.8)' },
              { label: 'lg', r: 'var(--radius)' },
              { label: 'xl', r: 'calc(var(--radius) * 1.4)' },
              { label: '2xl', r: 'calc(var(--radius) * 1.8)' },
              { label: '3xl', r: 'calc(var(--radius) * 2.2)' },
              { label: '4xl', r: 'calc(var(--radius) * 2.6)' },
              { label: 'full', r: '999px' },
            ].map(({ label, r }, i) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className="bg-accent-12 border border-accent-custom"
                  style={{ width: `${32 + i * 8}px`, height: `${32 + i * 8}px`, borderRadius: r }}
                />
                <span className="font-display text-12 text-text-40">{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── shadcn: Button ───────────────────────────────── */}
        <Section title="shadcn · Button">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Button>
          </div>
        </Section>

        {/* ── shadcn: Badge ────────────────────────────────── */}
        <Section title="shadcn · Badge">
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </Section>

        {/* ── shadcn: Input + Label ────────────────────────── */}
        <Section title="shadcn · Input & Label">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-1">Обычный инпут</Label>
              <Input id="demo-1" placeholder="Введи что-нибудь..." />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-2">Задисейбленный</Label>
              <Input id="demo-2" placeholder="Недоступно" disabled />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-3">С ошибкой</Label>
              <Input
                id="demo-3"
                placeholder="Неверное значение"
                className="border-error focus-visible:ring-error"
              />
              <p className="text-12 text-error">Поле заполнено неверно</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-4">Пароль</Label>
              <Input id="demo-4" type="password" placeholder="••••••••" />
            </div>
          </div>
        </Section>

        {/* ── shadcn: Switch ───────────────────────────────── */}
        <Section title="shadcn · Switch">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Switch id="sw-1" checked={switched} onCheckedChange={setSwitched} />
              <Label htmlFor="sw-1">{switched ? 'Включено' : 'Выключено'}</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="sw-2" disabled />
              <Label htmlFor="sw-2" className="text-text-disabled">
                Заблокировано
              </Label>
            </div>
          </div>
        </Section>

        {/* ── shadcn: Alert ────────────────────────────────── */}
        <Section title="shadcn · Alert">
          <div className="flex flex-col gap-3">
            <Alert>
              <AlertTitle>Информация</AlertTitle>
              <AlertDescription>
                Это стандартный алерт без иконки и дополнительных стилей.
              </AlertDescription>
            </Alert>
            <Alert className="border-success bg-success-bg text-success">
              <AlertTitle>Успешно</AlertTitle>
              <AlertDescription className="text-success opacity-80">
                Данные сохранены и отправлены на сервер.
              </AlertDescription>
            </Alert>
            <Alert className="border-error bg-error-bg text-error">
              <AlertTitle>Ошибка</AlertTitle>
              <AlertDescription className="text-error opacity-80">
                Не удалось подключиться. Проверь соединение.
              </AlertDescription>
            </Alert>
            <Alert className="border-warning bg-warning-bg text-warning">
              <AlertTitle>Внимание</AlertTitle>
              <AlertDescription className="text-warning opacity-80">
                Срок действия токена истекает через 5 минут.
              </AlertDescription>
            </Alert>
          </div>
        </Section>

        {/* ── shadcn: Card ─────────────────────────────────── */}
        <Section title="shadcn · Card">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Профиль пользователя</CardTitle>
                <CardDescription>Основная информация аккаунта</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-16">
                    <span className="text-text-60">Имя</span>
                    <span className="font-medium">Артём</span>
                  </div>
                  <div className="flex justify-between text-16">
                    <span className="text-text-60">Роль</span>
                    <Badge variant="secondary">Developer</Badge>
                  </div>
                  <div className="flex justify-between text-16">
                    <span className="text-text-60">Статус</span>
                    <Badge className="bg-success-bg text-success border border-success">
                      Активен
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button className="flex-1">Сохранить</Button>
                <Button variant="outline" className="flex-1">
                  Отмена
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика</CardTitle>
                <CardDescription>За последние 7 дней</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Запросов', value: '1 284', delta: '+12%' },
                    { label: 'Ошибок', value: '3', delta: '-80%' },
                    { label: 'Uptime', value: '99.9%', delta: '→' },
                  ].map(({ label, value, delta }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-16 text-text-60">{label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-20">{value}</span>
                        <span className="font-display text-12 text-text-40">{delta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  Подробнее →
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* ── shadcn: Dropdown ─────────────────────────────── */}
        <Section title="shadcn · DropdownMenu">
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Действия ↓</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                <DropdownMenuItem>Дублировать</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-error focus:text-error focus:bg-error-bg">
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Профиль ↓</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>Настройки</DropdownMenuItem>
                <DropdownMenuItem>API ключи</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>
      </div>
    </div>
  )
}
