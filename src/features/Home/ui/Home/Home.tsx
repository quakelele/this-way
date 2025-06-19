

import styles from './Home.module.scss'
import { PrayerTimes } from 'entities/PrayerTimes/ui/PrayerTimes/PrayerTimes'


import { DividerSvg as Divider } from 'shared/ui/DividerSvg/DividerSvg'
import {
  //  CustomWidget,
   Header, RandomAyah } from 'widgets'


export const Home = () => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>

        <Header />

        <Divider />

        <PrayerTimes  />

        {/* <CustomWidget /> */}

        <RandomAyah />
      </div>
    </div>
  )
}
