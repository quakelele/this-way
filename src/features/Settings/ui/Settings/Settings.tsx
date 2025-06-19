import styles from './Settings.module.scss';

import { LocationSetting } from 'entities/LocationSetting/ui/LocationSetting/LocationSetting';


export const Settings = () => {


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 >Настройки</h1>
          <p >Персонализируйте своё духовное путешествие</p>
        </div>

        <div className={styles.sections}>
          

          <div className={styles.section}>
            <h2 >Местоположение</h2>

            <LocationSetting />
          </div>

          {/* <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Язык и регион</h2>
            <SettingItem
              icon={GlobalOutlined}
              title="Язык приложения"
              description="Выберите основной язык интерфейса"
            >
              <Select value={language} onChange={setLanguage} className={styles.select}>
                {languages.map((lang) => (
                  <Option key={lang.code} value={lang.code}>
                    {lang.native}
                  </Option>
                ))}
              </Select>
            </SettingItem>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Уведомления</h2>
            <SettingItem
              icon={BellOutlined}
              title="Уведомления о молитвах"
              description="Получать напоминания о времени молитв"
            >
              <Switch checked={notifications} onChange={setNotifications} />
            </SettingItem>
            <SettingItem
              icon={SoundOutlined}
              title="Звуковые уведомления"
              description="Воспроизводить звук при уведомлениях"
            >
              <Switch checked={sound} onChange={setSound} />
            </SettingItem>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Прочее</h2>
            <Card className={styles.actionCard} hoverable>
              <div className={styles.actionContent}>
                <div className={styles.actionInfo}>
                  <div className={styles.iconWrapper}>
                    <HeartOutlined className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.actionTitle}>Избранное</h3>
                    <p className={styles.actionDescription}>Управление сохранёнными аятами</p>
                  </div>
                </div>
                <RightOutlined className={styles.arrowIcon} />
              </div>
            </Card>
            <Card className={styles.actionCard} hoverable>
              <div className={styles.actionContent}>
                <div className={styles.actionInfo}>
                  <div className={styles.iconWrapper}>
                    <MobileOutlined className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.actionTitle}>Мобильное приложение</h3>
                    <p className={styles.actionDescription}>Скачать для iOS и Android</p>
                  </div>
                </div>
                <RightOutlined className={styles.arrowIcon} />
              </div>
            </Card>
            <Card className={styles.actionCard} hoverable>
              <div className={styles.actionContent}>
                <div className={styles.actionInfo}>
                  <div className={styles.iconWrapper}>
                    <InfoOutlined className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.actionTitle}>О приложении</h3>
                    <p className={styles.actionDescription}>Информация и поддержка</p>
                  </div>
                </div>
                <RightOutlined className={styles.arrowIcon} />
              </div>
            </Card>
          </div>

          <Card className={styles.quoteCard}>
            <div className={styles.quoteContent}>
              <Decoration/>
            
              <p className={styles.quoteText}>
                "Поистине, в поминании Аллаха успокаиваются сердца"
              </p>
              <p className={styles.quoteRef}>Коран 13:28</p>
            </div>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

