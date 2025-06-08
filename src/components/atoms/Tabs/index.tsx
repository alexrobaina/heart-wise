import clsx from 'clsx'

export interface Tab {
  name: string
  current: boolean
  count?: number
  disabled?: boolean
  onClick?: () => void
}

interface BaseTabsProps {
  tabs: Tab[]
  className?: string
  variant?: 'primary' | 'secondary'
  onChange?: (selectedTab: Tab) => void
}

export const BaseTabs = ({ tabs, className, onChange }: BaseTabsProps) => {
  const variantStyles = {
    primary: {
      active: 'border-primary-500 text-primary-600',
      inactive:
        'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
      disabled: 'text-gray-300 border-gray-300 cursor-not-allowed',
    },
  }

  const handleTabClick = (tab: Tab) => {
    if (tab.disabled) return
    tab.onClick?.()
    onChange?.(tab)
  }

  return (
    <div className={className}>
      <div className="block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab)}
                className={clsx(
                  tab.current
                    ? variantStyles.primary.active
                    : variantStyles.primary.inactive,
                  'whitespace-nowrap border-b-2 p-4 text-sm font-medium',
                  tab.disabled && variantStyles.primary.disabled,
                )}
                aria-current={tab.current ? 'page' : undefined}
                disabled={tab.disabled}
              >
                {tab.name}
                {tab.count ? (
                  <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                    {tab.count}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
