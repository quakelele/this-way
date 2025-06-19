import { useState } from 'react'

export const useTabs = tabItems => {
  const [activeTab, setActiveTab] = useState(tabItems[2]?.id || 'settings')

  const handleTabChange = tabId => {
    setActiveTab(tabId)
  }

  const renderContent = () => {
    const activeItem = tabItems.find(item => item.id === activeTab)
    if (!activeItem) return null
    const Component = activeItem.component
    return <Component {...activeItem.props} />
  }

  return { activeTab, handleTabChange, renderContent }
}
