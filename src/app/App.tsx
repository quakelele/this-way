import { Layout } from 'antd';
import styles from './styles/App.module.scss';
import { Navigation } from 'features';
import { Outlet } from 'react-router';
import { useAutoAnimate } from '@formkit/auto-animate/react'

const App = () => {
  const [parent,] = useAutoAnimate(/* optional config */)
  return (
    <Layout className={styles.app}>


      <Navigation />
      <div ref={parent}>
        <Outlet />
      </div>
    </Layout>
  );
};

export default App;





{/* <PatternSvg position="topLeft" />
      <PatternSvg position="botRight" /> */}