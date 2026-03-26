'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import { Settings, Star, ExternalLink, Calendar } from 'lucide-react'
import { Button } from '@/common/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/ui/card'
import { Badge } from '@/common/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/common/ui/tabs'
import {
  mockBrand,
  mockMentions,
  mockTimeline,
  mockSentimentCounts,
  mockTopSourcesWithNames,
  type MentionRow,
} from '@/common/mocks/brand'
import { cn } from '@/common/utilities/cn'

const CHART_COLORS = {
  positive: 'var(--raw-success)',
  negative: 'var(--raw-error)',
  neutral: 'var(--raw-text-40)',
  unknown: 'var(--raw-text-60)',
}

const SENTIMENT_LABELS: Record<string, string> = {
  positive: 'Позитивные',
  negative: 'Негативные',
  neutral: 'Нейтральные',
  unknown: 'Не определено',
}

const ANALYTICS_TAB_ORDER = ['timeline', 'sentiment', 'sources'] as const
const SLIDE_FULL = '100%'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatChartDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

export default function BrandPage() {
  const params = useParams()
  const brandName = (params?.brandName as string) ?? ''
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [analyticsTab, setAnalyticsTab] = useState('timeline')
  const [slideDirection, setSlideDirection] = useState(0) // 1 = вправо по вкладкам (контент слева направо), -1 = влево

  const handleAnalyticsTabChange = (value: string) => {
    const newIndex = ANALYTICS_TAB_ORDER.indexOf(value as (typeof ANALYTICS_TAB_ORDER)[number])
    const prevIndex = ANALYTICS_TAB_ORDER.indexOf(analyticsTab as (typeof ANALYTICS_TAB_ORDER)[number])
    if (newIndex !== -1 && prevIndex !== -1) {
      setSlideDirection(Math.sign(newIndex - prevIndex))
    }
    setAnalyticsTab(value)
  }

  const displayName = decodeURIComponent(brandName) || mockBrand.name || 'Бренд'

  const timelineChartData = useMemo(
    () =>
      mockTimeline.map((p) => ({
        date: formatChartDate(p.bucket ?? ''),
        fullDate: p.bucket,
        count: p.count ?? 0,
        sentiment: p.sentiment ?? 'neutral',
      })),
    []
  )

  const sentimentPieData = useMemo(
    () =>
      Object.entries(mockSentimentCounts).map(([name, value]) => ({
        name: SENTIMENT_LABELS[name] ?? name,
        value,
        raw: name,
      })),
    []
  )

  const sourcesChartData = useMemo(
    () => mockTopSourcesWithNames.map((s) => ({ name: s.name, count: s.count })),
    []
  )

  const filteredMentions = useMemo(() => {
    const list = mockMentions as MentionRow[]
    if (favoritesOnly) return list.filter((m) => m.is_favorite)
    return list
  }, [favoritesOnly])

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div
        className="max-w-6xl mx-auto w-full"
        style={{
          paddingLeft: 'var(--page-padding-x)',
          paddingRight: 'var(--page-padding-x)',
          paddingTop: 'var(--page-padding-y)',
          paddingBottom: 'var(--page-padding-y)',
        }}
      >
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-32 font-bold tracking-[-0.02em] text-[var(--color-text)]">
              {displayName}
            </h1>
            <p className="text-[var(--color-text-60)] text-16 mt-1">
              Мониторинг упоминаний и аналитика
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={favoritesOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className="gap-1.5"
            >
              <Star
                className={cn('size-4', favoritesOnly && 'fill-current')}
              />
              Избранное
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/brands/${encodeURIComponent(brandName)}/settings`} className="gap-1.5">
                <Settings className="size-4" />
                Настройки
              </Link>
            </Button>
          </div>
        </section>

        {/* Charts */}
        <section className="space-y-6">
          <h2 className="font-display text-20 font-semibold text-[var(--color-text)]">
            Аналитика
          </h2>

          <Tabs value={analyticsTab} onValueChange={handleAnalyticsTabChange} className="w-full">
            <TabsList className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
              <TabsTrigger value="timeline">Динамика</TabsTrigger>
              <TabsTrigger value="sentiment">Тональность</TabsTrigger>
              <TabsTrigger value="sources">Источники</TabsTrigger>
            </TabsList>
            <div
              className="relative overflow-hidden mt-4 mb-8"
              style={{ minHeight: 'var(--chart-container-min-height)' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {analyticsTab === 'timeline' && (
                  <motion.div
                    key="timeline"
                    initial={{
                      opacity: slideDirection === 0 ? 1 : 0,
                      x: slideDirection > 0 ? `-${SLIDE_FULL}` : slideDirection < 0 ? SLIDE_FULL : 0,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: slideDirection > 0 ? SLIDE_FULL : `-${SLIDE_FULL}`,
                    }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    className="w-full absolute inset-x-0 top-0"
                  >
              <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader>
                  <CardTitle className="text-[var(--color-text)] font-display">
                    Упоминания по дням
                  </CardTitle>
                  <CardDescription className="text-[var(--color-text-60)]">
                    Количество упоминаний за последние 14 дней
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full min-w-0" style={{ height: 'var(--chart-area-height)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={timelineChartData} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                        <defs>
                          <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--raw-accent)" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="var(--raw-accent)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis
                          dataKey="date"
                          stroke="var(--color-text-40)"
                          fontSize={12}
                          tickLine={false}
                        />
                        <YAxis
                          stroke="var(--color-text-40)"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip
                          contentStyle={{
                            background: 'var(--color-popover)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                          }}
                          labelStyle={{ color: 'var(--color-text)' }}
                          formatter={(value) => [value ?? 0, 'Упоминаний']}
                          labelFormatter={(_, payload) =>
                            payload?.[0]?.payload?.fullDate
                              ? formatChartDate(
                                  (payload[0].payload as { fullDate?: string }).fullDate ?? ''
                                )
                              : ''
                          }
                        />
                        <Area
                          type="monotone"
                          dataKey="count"
                          stroke="var(--raw-accent)"
                          strokeWidth={2}
                          fill="url(#fillCount)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
                  </motion.div>
                )}
                {analyticsTab === 'sentiment' && (
                  <motion.div
                    key="sentiment"
                    initial={{
                      opacity: slideDirection === 0 ? 1 : 0,
                      x: slideDirection > 0 ? `-${SLIDE_FULL}` : slideDirection < 0 ? SLIDE_FULL : 0,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: slideDirection > 0 ? SLIDE_FULL : `-${SLIDE_FULL}`,
                    }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    className="w-full absolute inset-x-0 top-0"
                  >
              <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader>
                  <CardTitle className="text-[var(--color-text)] font-display">
                    Распределение тональности
                  </CardTitle>
                  <CardDescription className="text-[var(--color-text-60)]">
                    Доля позитивных, негативных и нейтральных упоминаний
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="w-full flex items-center justify-center min-w-0"
                    style={{ height: 'var(--chart-area-height)' }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                        <Pie
                          data={sentimentPieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={64}
                          outerRadius={110}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                          label={(props) =>
                            `${props.name ?? ''} ${((props.percent ?? 0) * 100).toFixed(0)}%`}
                          labelLine={{ stroke: 'var(--color-border)' }}
                        >
                          {sentimentPieData.map((entry, index) => (
                            <Cell
                              key={entry.raw}
                              fill={
                                CHART_COLORS[entry.raw as keyof typeof CHART_COLORS] ??
                                'var(--color-text-40)'
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: 'var(--color-popover)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                          }}
                          formatter={(value, name) => [value ?? 0, name ?? '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
                  </motion.div>
                )}
                {analyticsTab === 'sources' && (
                  <motion.div
                    key="sources"
                    initial={{
                      opacity: slideDirection === 0 ? 1 : 0,
                      x: slideDirection > 0 ? `-${SLIDE_FULL}` : slideDirection < 0 ? SLIDE_FULL : 0,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: slideDirection > 0 ? SLIDE_FULL : `-${SLIDE_FULL}`,
                    }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    className="w-full absolute inset-x-0 top-0"
                  >
              <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader>
                  <CardTitle className="text-[var(--color-text)] font-display">
                    Топ источников
                  </CardTitle>
                  <CardDescription className="text-[var(--color-text-60)]">
                    Количество упоминаний по источникам
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full min-w-0" style={{ height: 'var(--chart-area-height)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sourcesChartData} layout="vertical" margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="var(--color-border)"
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          stroke="var(--color-text-40)"
                          fontSize={12}
                          tickLine={false}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          width={100}
                          stroke="var(--color-text-40)"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: 'var(--color-text-60)' }}
                        />
                        <Tooltip
                          contentStyle={{
                            background: 'var(--color-popover)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                          }}
                          formatter={(value) => [value ?? 0, 'Упоминаний']}
                        />
                        <Bar
                          dataKey="count"
                          fill="var(--raw-accent)"
                          radius={[0, 4, 4, 0]}
                          name="Упоминаний"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </section>

        <section style={{ marginTop: 'var(--news-feed-margin-top)' }}>
          <h2 className="font-display text-20 font-semibold text-[var(--color-text)] mb-4">
            Лента новостей
          </h2>
          <ul className="space-y-4">
            {filteredMentions.map((mention) => (
              <li key={mention.id}>
                <Card className="border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-colors hover:bg-[var(--color-surface-hover)]">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-16 font-semibold leading-snug text-[var(--color-text)] line-clamp-2">
                          {mention.title || 'Без заголовка'}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-0 mt-2 text-12 text-[var(--color-text-60)] [&>*+*]:before:content-['|'] [&>*+*]:before:px-2 [&>*+*]:before:text-[var(--color-text-40)]">
                          {mention.published_at && (
                            <span className="flex items-center gap-1">
                              <Calendar className="size-3.5" />
                              {formatDate(mention.published_at)}
                            </span>
                          )}
                          <span>
                            {mention.matched_keywords?.length
                              ? mention.matched_keywords.slice(0, 2).join(', ')
                              : mention.author ?? '—'}
                          </span>
                          {mention.sentiment_label && (
                            <span>
                              <Badge
                                variant="secondary"
                                className={cn(
                                  'text-12 font-medium',
                                  mention.sentiment_label === 'positive' &&
                                    'bg-[var(--raw-success-bg)] text-[var(--raw-success)]',
                                  mention.sentiment_label === 'negative' &&
                                    'bg-[var(--raw-error-bg)] text-[var(--raw-error)]',
                                  mention.sentiment_label === 'neutral' &&
                                    'text-[var(--raw-text-60)] bg-transparent border border-[var(--color-border)]'
                                )}
                              >
                                {SENTIMENT_LABELS[mention.sentiment_label] ?? mention.sentiment_label}
                              </Badge>
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {mention.url && (
                          <Button variant="ghost" size="icon-xs" asChild>
                            <a
                              href={mention.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Открыть ссылку"
                            >
                              <ExternalLink className="size-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {mention.text && (
                    <CardContent className="pt-0">
                      <p className="text-14 text-[var(--color-text-80)] line-clamp-3">
                        {mention.text}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </li>
            ))}
          </ul>
          {filteredMentions.length === 0 && (
            <Card className="border-[var(--color-border)] bg-[var(--color-surface)]">
              <CardContent className="py-[var(--space-12)] text-center text-[var(--color-text-60)]">
                {favoritesOnly
                  ? 'В избранном пока ничего нет'
                  : 'Нет упоминаний для отображения'}
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  )
}
