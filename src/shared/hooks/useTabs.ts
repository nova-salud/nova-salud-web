import { useState } from 'react'

export const useTabs = <T extends string>(defaultTab: T) => {
  const [activeTab, setActiveTab] = useState<T>(defaultTab)
  const [activatedTabs, setActivatedTabs] = useState<Set<T>>(new Set([defaultTab]))

  const changeTab = (tab: T) => {
    setActiveTab(tab)
    setActivatedTabs(prev => new Set([...prev, tab]))
  }

  return { activeTab, activatedTabs, changeTab }
}
