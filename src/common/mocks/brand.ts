/**
 * Mock data for brand page based on openapi.yaml schemas.
 * Types align with: Brand, MentionRow, AnalyticsSummary, TimelinePoint, SourceMentionCount, analytics/sentiment.
 */

import type { components } from '@/common/schema'

export type Brand = components['schemas']['Brand']
export type MentionRow = components['schemas']['MentionRow'] & { is_favorite?: boolean }
export type AnalyticsSummary = components['schemas']['AnalyticsSummary']
export type TimelinePoint = components['schemas']['TimelinePoint']
export type SourceMentionCount = components['schemas']['SourceMentionCount']

const projectId = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
const brandId = 'b2c3d4e5-f6a7-8901-bcde-f12345678901'
const sourceId1 = 'c3d4e5f6-a7b8-9012-cdef-123456789012'
const sourceId2 = 'd4e5f6a7-b8c9-0123-def0-234567890123'
const sourceId3 = 'e5f6a7b8-c9d0-1234-ef01-345678901234'

export const mockBrand: Brand = {
  id: brandId,
  project_id: projectId,
  catalog_id: 100,
  name: 'BrandRadar',
  keywords: ['BrandRadar', 'бренд мониторинг', 'репутация'],
  exclusions: ['спам'],
  risk_words: ['скандал', 'судебный'],
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2025-03-01T12:00:00Z',
}

export const mockAnalyticsSummary: AnalyticsSummary = {
  total_mentions: 1247,
  sentiment_counts: {
    positive: 420,
    negative: 180,
    neutral: 600,
    unknown: 47,
  },
  top_sources: [
    { source_id: sourceId1, count: 450 },
    { source_id: sourceId2, count: 320 },
    { source_id: sourceId3, count: 280 },
  ],
}

/** Timeline for charts (last 14 days by day) */
export const mockTimeline: TimelinePoint[] = [
  { bucket: '2025-03-01T00:00:00Z', count: 72, sentiment: 'neutral' },
  { bucket: '2025-03-02T00:00:00Z', count: 95, sentiment: 'positive' },
  { bucket: '2025-03-03T00:00:00Z', count: 88, sentiment: 'neutral' },
  { bucket: '2025-03-04T00:00:00Z', count: 102, sentiment: 'positive' },
  { bucket: '2025-03-05T00:00:00Z', count: 78, sentiment: 'neutral' },
  { bucket: '2025-03-06T00:00:00Z', count: 115, sentiment: 'positive' },
  { bucket: '2025-03-07T00:00:00Z', count: 92, sentiment: 'neutral' },
  { bucket: '2025-03-08T00:00:00Z', count: 65, sentiment: 'negative' },
  { bucket: '2025-03-09T00:00:00Z', count: 98, sentiment: 'neutral' },
  { bucket: '2025-03-10T00:00:00Z', count: 110, sentiment: 'positive' },
  { bucket: '2025-03-11T00:00:00Z', count: 85, sentiment: 'neutral' },
  { bucket: '2025-03-12T00:00:00Z', count: 120, sentiment: 'positive' },
  { bucket: '2025-03-13T00:00:00Z', count: 89, sentiment: 'neutral' },
  { bucket: '2025-03-14T00:00:00Z', count: 34, sentiment: 'neutral' },
]

/** Sentiment distribution for pie/bar chart: label -> count */
export const mockSentimentCounts: Record<string, number> = {
  positive: 420,
  negative: 180,
  neutral: 600,
  unknown: 47,
}

/** Top sources with names for chart labels */
export const mockTopSourcesWithNames: { source_id: string; count: number; name: string }[] = [
  { source_id: sourceId1, count: 450, name: 'VC.ru' },
  { source_id: sourceId2, count: 320, name: 'Telegram' },
  { source_id: sourceId3, count: 280, name: 'RSS лента' },
]

export const mockMentions: MentionRow[] = [
  {
    id: 'm1',
    project_id: projectId,
    source_id: sourceId1,
    brand_id: brandId,
    external_id: 'ext-1',
    title: 'BrandRadar запустил новый модуль аналитики тональности',
    text: 'Сервис мониторинга репутации брендов BrandRadar представил обновление с улучшенной ML-моделью для определения тональности упоминаний в соцсетях и СМИ.',
    url: 'https://example.com/news/1',
    author: 'Редакция VC.ru',
    published_at: '2025-03-14T09:30:00Z',
    matched_keywords: ['BrandRadar', 'бренд мониторинг'],
    matched_risk_words: [],
    sentiment_label: 'positive',
    sentiment_score: 0.92,
    is_duplicate: false,
    status: 'ready',
    created_at: '2025-03-14T09:35:00Z',
    is_favorite: true,
  },
  {
    id: 'm2',
    project_id: projectId,
    source_id: sourceId2,
    brand_id: brandId,
    external_id: 'ext-2',
    title: 'Как мониторить репутацию бренда в 2025 году',
    text: 'Эксперты обсудили инструменты для мониторинга: BrandRadar, Mention, другие сервисы. Важно учитывать не только количество, но и тональность упоминаний.',
    url: 'https://t.me/channel/123',
    author: 'Маркетинг дайджест',
    published_at: '2025-03-13T14:00:00Z',
    matched_keywords: ['BrandRadar'],
    matched_risk_words: [],
    sentiment_label: 'neutral',
    sentiment_score: 0.05,
    is_duplicate: false,
    status: 'ready',
    created_at: '2025-03-13T14:10:00Z',
    is_favorite: false,
  },
  {
    id: 'm3',
    project_id: projectId,
    source_id: sourceId1,
    brand_id: brandId,
    external_id: 'ext-3',
    title: 'Жалобы пользователей на задержки в отчётах',
    text: 'Часть пользователей BrandRadar сообщает о задержках в формировании отчётов за последнюю неделю. В поддержке обещают исправление до конца дня.',
    url: 'https://example.com/news/3',
    author: 'Новости IT',
    published_at: '2025-03-12T11:20:00Z',
    matched_keywords: ['BrandRadar'],
    matched_risk_words: [],
    sentiment_label: 'negative',
    sentiment_score: -0.45,
    is_duplicate: false,
    status: 'ready',
    created_at: '2025-03-12T11:25:00Z',
    is_favorite: true,
  },
  {
    id: 'm4',
    project_id: projectId,
    source_id: sourceId3,
    brand_id: brandId,
    external_id: 'ext-4',
    title: 'Еженедельный дайджест: мониторинг брендов',
    text: 'В обзоре — обновления BrandRadar, новые интеграции и кейсы клиентов. Сервис наращивает долю на рынке мониторинга репутации.',
    url: 'https://rss.example.com/digest',
    author: null,
    published_at: '2025-03-11T08:00:00Z',
    matched_keywords: ['BrandRadar', 'репутация'],
    matched_risk_words: [],
    sentiment_label: 'positive',
    sentiment_score: 0.78,
    is_duplicate: false,
    status: 'ready',
    created_at: '2025-03-11T08:05:00Z',
    is_favorite: false,
  },
  {
    id: 'm5',
    project_id: projectId,
    source_id: sourceId2,
    brand_id: brandId,
    external_id: 'ext-5',
    title: 'Сравнение платформ для медиамониторинга',
    text: 'BrandRadar вошёл в топ-5 решений по соотношению цена/качество. Отмечают удобную визуализацию и быструю настройку алертов.',
    url: 'https://t.me/channel/456',
    author: 'Аналитика и данные',
    published_at: '2025-03-10T16:45:00Z',
    matched_keywords: ['BrandRadar'],
    matched_risk_words: [],
    sentiment_label: 'positive',
    sentiment_score: 0.85,
    is_duplicate: false,
    status: 'ready',
    created_at: '2025-03-10T16:50:00Z',
    is_favorite: false,
  },
]
