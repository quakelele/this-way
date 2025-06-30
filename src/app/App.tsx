import { Layout } from 'antd'
import styles from './styles/App.module.scss'
import { Outlet } from 'react-router'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Header_V2 as Header } from 'widgets'

const App = () => {
  const [parent] = useAutoAnimate(/* optional config */)
  return (
    <Layout className={styles.app}>
      <Header />

      <div ref={parent}>
        <Outlet />
      </div>
    </Layout>
  )
}

export default App
