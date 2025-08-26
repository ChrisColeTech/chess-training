import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { 
  SwatchIcon, 
  CheckIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  HomeIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'
import { useThemeStore, themes } from '../../stores/themeStore'
import { clsx } from 'clsx'

const themeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'cyber-neon': SparklesIcon,
  'dragon-gold': SunIcon,
  'shadow-knight': MoonIcon,
  'emerald-matrix': BeakerIcon,
  'crimson-war': HomeIcon,
}

export function ThemeSwitcher() {
  const { currentTheme, setTheme, getCurrentTheme } = useThemeStore()
  const current = getCurrentTheme()

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <SwatchIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Choose Theme
            </h3>
            
            <div className="space-y-2">
              {Object.entries(themes).map(([themeId, theme]) => {
                const IconComponent = themeIcons[themeId] || SunIcon
                const isSelected = currentTheme === themeId
                
                return (
                  <Menu.Item key={themeId}>
                    {({ active }) => (
                      <button
                        onClick={() => handleThemeChange(themeId)}
                        className={clsx(
                          'w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200',
                          isSelected
                            ? 'bg-blue-50 dark:bg-gray-700 border-2 border-blue-200 dark:border-gray-600'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent',
                          active && 'bg-gray-50 dark:bg-gray-700'
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <IconComponent className={clsx(
                              'w-5 h-5',
                              isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                            )} />
                            <div className="flex space-x-1">
                              <div 
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: theme.chessLight }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: theme.chessDark }}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className={clsx(
                              'font-medium text-sm',
                              isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'
                            )}>
                              {theme.name}
                            </div>
                            <div className={clsx(
                              'text-xs',
                              isSelected ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'
                            )}>
                              {theme.description}
                            </div>
                          </div>
                        </div>
                        
                        {isSelected && (
                          <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                )
              })}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Current: {current.name} • {current.isDark ? 'Dark' : 'Light'} mode
              </div>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}