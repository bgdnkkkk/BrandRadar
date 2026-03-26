import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-bg text-text font-interface overflow-hidden">
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-8 blur-[120px]" />
        <div className="absolute top-0 left-0 w-px h-full bg-border" style={{ left: '10%' }} />
        <div className="absolute top-0 left-0 w-px h-full bg-border" style={{ left: '90%' }} />
        <div className="absolute top-0 left-0 h-px w-full bg-border" style={{ top: '15%' }} />
        <div className="absolute top-0 left-0 h-px w-full bg-border" style={{ top: '85%' }} />
      </div>

      {/* Большой 404 на фоне */}
      <p
        className="absolute select-none font-display font-bold text-text leading-none tracking-[-0.05em] opacity-[0.03]"
        style={{ fontSize: 'clamp(180px, 30vw, 360px)' }}
      >
        404
      </p>

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-0">
        {/* Accent line + номер */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px w-12 bg-accent-custom" />
          <span className="font-display text-12 font-bold tracking-[0.2em] uppercase text-accent-custom">
            Error 404
          </span>
          <div className="h-px w-12 bg-accent-custom" />
        </div>

        <h1 className="font-display text-48 font-bold tracking-[-0.03em] leading-[1.05] mb-4">
          Страница
          <br />
          не найдена
        </h1>

        <p className="text-16 text-text-60 max-w-xs leading-relaxed mb-10">
          Возможно, она была удалена, перемещена или никогда не существовала
        </p>

        {/* Кнопки */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group relative flex items-center gap-2 bg-accent-custom text-white px-6 py-3 rounded-lg text-16 font-medium overflow-hidden transition-all hover:bg-accent-hover active:bg-accent-active"
          >
            <span>На главную</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
