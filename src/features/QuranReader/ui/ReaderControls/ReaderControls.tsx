import { Select, Checkbox, Drawer } from 'antd'
import { useTranslation } from 'shared/hooks/useTranslation'
import { surahOptions } from 'features/QuranReader/constants/surahs'
import { reciters } from 'features/QuranReader/constants/reciters'
import {
  optionsQuranReader,
  TranslationOption,
} from 'features/QuranReader/lib/optionsQuranReader'
import { surahs } from 'entities/AyahCard/model/surahs'
import styles from './ReaderControls.module.scss'
import { SurahTitle } from 'shared/ui/SuharTitle/SurahTitle'
import { UseToggleTypes } from 'shared/hooks/useToggle'
import { Language } from 'app/store/slice/languageSlice'

interface ReaderControlsProps {
  chapterId: number
  reciter: string
  isVisible: boolean
  language: Language
  isVisibleTransliteration: boolean
  quranToggle: UseToggleTypes
  drawerToggler: UseToggleTypes
  onChapterChange: (value: number) => void
  onReciterChange: (value: string) => void
  onLanguageChange: (value: number, option: TranslationOption) => void
  onTajweedChange: (checked: boolean) => void
  onTransliterationChange: (checked: boolean) => void
  onMushafToggle: (checked: boolean) => void
}

export const ReaderControls = ({
  chapterId,
  reciter,
  isVisible,
  language,
  isVisibleTransliteration,
  quranToggle,
  drawerToggler,
  onChapterChange,
  onReciterChange,
  onLanguageChange,
  onTajweedChange,
  onTransliterationChange,
  onMushafToggle,
}: ReaderControlsProps) => {
  const { t } = useTranslation()

  return (
    <section
      className={`${styles.controls} ${
        isVisible ? styles.visible : styles.hidden
      }`}>
      <div className={styles.selectWrapper}>
        <header
          onDoubleClick={drawerToggler.setTrue}
          className={styles.header}>
          <SurahTitle
            surah_tr={t(surahs[chapterId.toString()]?.russian || '')}
            verse_id={chapterId.toString()}
          />
        </header>
        <Drawer
          placement="bottom"
          closable={{ 'aria-label': 'Close Button' }}
          onClose={drawerToggler.setFalse}
          open={drawerToggler.value}>
          <div className={styles.formInner}>
            <Select
              placeholder={t('Выберите перевод')}
              className={styles.select}
              options={optionsQuranReader}
              value={language.translationLanguage}
              onChange={(val, opt) =>
                onLanguageChange(val as number, opt as TranslationOption)
              }
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
            <Select
              className={styles.select}
              value={chapterId}
              onChange={onChapterChange}
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={surahOptions.map(option => ({
                value: option.value,
                label: `${t('Сура')} ${option.value}: ${t(
                  option.label.russian
                )} (${option.label.arabic})`,
              }))}
              popupMatchSelectWidth={false}
            />
            <Select
              className={styles.select}
              value={reciter}
              onChange={onReciterChange}
              options={reciters.map(option => ({
                value: option.value,
                label: t(option.label),
              }))}
              placeholder={t('Чтец')}
            />
            <div className={styles.checkboxes}>
              <Checkbox
                className={styles.checkBox}
                checked={language.isTajweedEnabled}
                onChange={e => onTajweedChange(e.target.checked)}>
                {t('Таджвид')}
              </Checkbox>
              <Checkbox
                className={styles.checkBox}
                checked={isVisibleTransliteration}
                onChange={e => onTransliterationChange(e.target.checked)}>
                {t('Переводы')}
              </Checkbox>
              <Checkbox
                className={styles.checkBox}
                checked={quranToggle.value}
                onChange={e => onMushafToggle(e.target.checked)}>
                {t('Мусхаф')}
              </Checkbox>
            </div>
          </div>
        </Drawer>
      </div>
    </section>
  )
}
