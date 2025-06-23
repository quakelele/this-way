import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input, Select, Spin } from 'antd'
import { useEffect, useState } from 'react'
import styles from './LocationSetting.module.scss'
import { SettingItem } from 'features/Settings/ui/SettingItem/SettingItem'

import { useLocationWithSearch } from 'entities/LocationSetting/hooks/useLocationWithSearch'
import { methods } from 'entities/LocationSetting/lib/methods'
import { useDispatch } from 'react-redux'
import { setLocationForm } from 'app/store/slice/locationForm'
import { useTranslation } from 'shared/hooks/useTranslation'

export const LocationSetting = () => {
  const { location, loading, searchCity, autoDetect } = useLocationWithSearch()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  useEffect(() => {}, [location])

  const onFinish = (values: { city: string; method: number }) => {
    if (values.city.trim()) {
      dispatch(setLocationForm(values))
      searchCity(values.city)
    }
    if (location) setOpen(false)
  }

  return (
    <>
      <SettingItem
        icon={EnvironmentOutlined}
        title={t('Текущее местоположение')}
        description={
          loading ? (
            <em>{t('Определение...')}</em>
          ) : location ? (
            <em>
              <span className={location.isAuto ? styles.auto : styles.manual}>
                {location.city}{' '}
                {location.timezone}{' '}
                {location.isAuto
                  ? t('(определено авто.)')
                  : t('(выбрано вручную)')}
              </span>
            </em>
          ) : (
            <em>{t('Нет данных')}</em>
          )
        }>
        <Button
          onClick={() => setOpen(true)}
          className={styles.submitButton}>
          Изменить
        </Button>
      </SettingItem>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={t('Изменить местоположение')}
        placement="bottom"
        height="auto"
        closable
        forceRender
        style={{ paddingBottom: 24 }}>
        <div className={styles.drawerInner}>
          <Form
            onFinish={onFinish}
            form={form}
            layout="vertical"
            className={styles.form}>
            <Form.Item
              name="city"
              label={t('Введите название вашего города:')}>
              <Input
                autoFocus
                placeholder={t('Введите город')}
              />
            </Form.Item>

            <div className={styles.drawerActions}>
              <Form.Item>
                <Button
                  onClick={autoDetect}
                  disabled={loading}
                  icon={loading ? <Spin size="small" /> : <SearchOutlined />}
                  block>
                  {t('Определить автоматически')}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  icon={loading && <Spin size="small" />}
                  disabled={loading}
                  block>
                  {t('Найти город')}
                </Button>
              </Form.Item>
            </div>
            <Form.Item
              name="timezone"
              label={t('Метод расчёта')}>
              <Select
                placeholder={t('Выберите метод')}
                options={methods}
              />
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  )
}

// import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
// import { Button, Drawer, Form, Input, Select, Spin } from 'antd';
// import { useEffect, useState } from 'react';
// import styles from './LocationSetting.module.scss';
// import { SettingItem } from 'features/Settings/ui/SettingItem/SettingItem';

// import { useLocationWithSearch } from 'entities/LocationSetting/hooks/useLocationWithSearch';
// import { methods } from 'entities/LocationSetting/lib/methods';
// import { useDispatch, useSelector } from 'react-redux';
// import { setCity, setLocationForm } from 'app/store/slice/locationForm';
// // import { useGetTodayPrayerQuery } from 'entities/LocationSetting/api/locationApi';
// // import { skipToken } from '@reduxjs/toolkit/query';

// export const LocationSetting = () => {

//   const { location, loading,searchCity, autoDetect, } = useLocationWithSearch();
//   // const [method, setMethod] = useState(4);
//   // const [cityInput, setCityInput] = useState('');
//   // const [inputFocused, setInputFocused] = useState(false);

//   const [open, setOpen] = useState(false);
//   const [form] = Form.useForm();
// const dispatch = useDispatch()

//   // const { data, isLoading } = useGetTodayPrayerQuery(
//   //   location
//   //     ? {
//   //       latitude: location.lat,
//   //       longitude: location.lng,
//   //       timezone: location.timezone,
//   //       method,
//   //     }
//   //     : skipToken
//   // );
//   // const {form}  = useSelector(state => state.locationForm)

//   useEffect(() => {
//   }, [location, ]);

//   // const handleSearch = async () => {
//   //   if (cityInput.trim()) {

//   //     searchCity(cityInput.trim());
//   //     setCityInput('');
//   //   }
//   // };
//   // const handleSearch = async () => {
//   //   if (cityInput.trim()) {
//   //     searchCity(cityInput.trim());
//   //     setCityInput('');
//   //   }
//   // };

//   const onFinish = (values: { city: string, method: string }) => {
//     // const { city, timezone} = values
//     if (values.city.trim()) {
//       dispatch(setLocationForm(values))
//       searchCity()
//       // searchCity(values.city.trim());

//     }
//   }

//   return (
//     <>
//       <SettingItem
//         icon={EnvironmentOutlined}
//         title="Текущее местоположение"
//         description={loading ? (
//           <em>Определение...</em>
//         ) : location ? (
//           <span className={location.isAuto ? styles.auto : styles.manual}>
//             {location.city} {location.isAuto ? '(определено автоматически)' : '(выбрано вручную)'}
//           </span>
//         ) : (
//           <em>Нет данных</em>
//         )}
//       >
//         <Button onClick={() => setOpen(true)} className={styles.triggerBtn}>
//           Изменить
//         </Button>
//       </SettingItem>

//       <Drawer
//         open={open}
//         onClose={() => setOpen(false)}
//         title="Изменить местоположение"
//         placement="bottom"
//         height="auto"
//         closable
//         forceRender
//         style={{ paddingBottom: 24 }}
//       >
//         <div className={styles.drawerInner}>
//           <Form onFinish={onFinish} form={form} layout="vertical" className={styles.form}>
//             <Form.Item name="city" label="Введите название вашего города:">
//               <Input
//                 autoFocus
//                 onFocus={() => setInputFocused(true)}
//                 onBlur={() => setInputFocused(false)}
//                 onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                 // value={cityInput}
//                 // onChange={(e) => setCityInput(e.target.value)}
//                 placeholder="Введите город"
//               />
//             </Form.Item>

//             <div className={styles.drawerActions}>
//               <Form.Item>
//                 <Button
//                   onClick={autoDetect}
//                   disabled={loading}
//                   icon={loading ? <Spin size="small" /> : <SearchOutlined />}
//                   block
//                 >
//                   Определить автоматически
//                 </Button>
//               </Form.Item>
//               <Form.Item>
//                 <Button
//                   htmlType='submit'
//                   type="primary"
//                   // onClick={handleSearch}
//                   icon={loading && <Spin size="small" />}
//                   // disabled={loading}
//                   block
//                 >
//                   Найти город
//                 </Button>
//               </Form.Item>
//             </div>
//             <Form.Item name="timezone" label="Метод расчёта">
//               <Select
//                 // value={method}
//                 // onChange={(value) => setMethod(value)}
//                 placeholder="Выберите метод"
//                 options={methods}
//               />
//             </Form.Item>
//           </Form>
//         </div>
//       </Drawer>

//     </>
//   );
// };
