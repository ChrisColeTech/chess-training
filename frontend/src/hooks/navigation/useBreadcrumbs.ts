import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { getBreadcrumbPath } from '../../constants/breadcrumbRoutes'
import type { BreadcrumbConfig } from '../../constants/breadcrumbRoutes'

export interface BreadcrumbItem {
  path: string
  label: string
  isCurrentPage: boolean
}

export interface BreadcrumbState {
  items: BreadcrumbItem[]
  currentPage: string | null
  hasMultipleItems: boolean
}

export const useBreadcrumbs = (): BreadcrumbState => {
  const location = useLocation()
  
  const breadcrumbData = useMemo(() => {
    const pathname = location.pathname
    const breadcrumbConfigs = getBreadcrumbPath(pathname)
    
    const items: BreadcrumbItem[] = breadcrumbConfigs.map((config: BreadcrumbConfig, index: number) => ({
      path: config.path,
      label: config.label,
      isCurrentPage: index === breadcrumbConfigs.length - 1 || config.path === pathname
    }))
    
    const currentPage = items.find(item => item.isCurrentPage)?.label || null
    const hasMultipleItems = items.length > 1
    
    return {
      items,
      currentPage,
      hasMultipleItems
    }
  }, [location.pathname])
  
  return breadcrumbData
}