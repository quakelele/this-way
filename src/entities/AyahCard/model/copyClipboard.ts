export const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text)
    
    } catch (err) {
      console.error('Ошибка при копировании:', err)
    }
  }