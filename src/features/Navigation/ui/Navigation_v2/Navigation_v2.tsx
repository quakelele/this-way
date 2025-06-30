import styles from './Navigation_v2.module.scss'
import headerStyles from 'features/Navigation/styles/Header_v2.module.scss'

import { useVisibleInScroll } from 'shared/hooks/useVisibleInScroll'
import { Header_V2 as Header } from 'widgets'
export const Navigation_v2 = () => {
  const isVisible = useVisibleInScroll()

  return (
    <>
      <header
        className={`${headerStyles.header} ${
          isVisible ? headerStyles.visible : headerStyles.hidden
        }`}>
        
      </header>
    </>
  )
}
