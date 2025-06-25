import { useState } from 'react'
import styles from './QuranReader.module.scss'
import { useGetAyahsQuery } from 'features/QuranReader/api/quranApi'
import { AyahCardQuran } from 'entities'
import { Spin, Select, Form } from 'antd'
import { Pagination } from 'features/Pagination/ui/Pagination/Pagination'
import { surahOptions } from 'features/QuranReader/constants/surahs'

export const QuranReader = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [chapterId, setChapterId] = useState(1)

  const { data, isLoading, isFetching } = useGetAyahsQuery(
    { chapterId, page: currentPage },
    { refetchOnMountOrArgChange: true }
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleChapterChange = (value: number) => {
    setChapterId(value)
    setCurrentPage(1)
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Чтение Корана</h1>
      </header>

      <section className={styles.controls}>
        <Form layout="vertical">
          <Form.Item label="Сура">
            <Select
              className={styles.select}
              value={chapterId}
              onChange={handleChapterChange}
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) => {
                const label = option?.label as string
                return label.toLowerCase().includes(input.toLowerCase())
              }}
              options={surahOptions.map(option => ({
                value: option.value,
                label: `Сура ${option.value}: ${option.label.russian} (${option.label.arabic})`,
              }))}
            />
          </Form.Item>
        </Form>
      </section>

      <section className={styles.content}>
        {isLoading || isFetching ? (
          <div className={styles.status}>
            <Spin />
            <p className={styles.loadingText}>Загрузка аятов...</p>
          </div>
        ) : (
          <div>
            {data?.ayahs?.map(ayah => (
              <AyahCardQuran
                key={ayah.id}
                ayah={ayah}
              />
            ))}
            {data?.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={data.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </section>
    </main>
  )
}
