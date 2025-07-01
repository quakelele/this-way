import parse, { domToReact, Element, DOMNode } from 'html-react-parser'
import styles from './RenderTajweed.module.scss'

export const RenderTajweed = (text: string) => {
  return parse(text, {
    replace: (domNode: DOMNode) => {
      if (
        domNode.type === 'tag' &&
        (domNode as Element).name === 'tajweed'
      ) {
        const node = domNode as Element
        const className = node.attribs?.class
        if (!className) return

        return (
          <span
            className={`${styles.tajweed} ${styles[className] || ''}`}
            data-title={className.replace(/_/g, ' ')}
          >
            {domToReact(node.children as DOMNode[])}
          </span>
        )
      }

      // 💡 Обработка <span class="end">١</span>
      if (
        domNode.type === 'tag' &&
        (domNode as Element).name === 'span' &&
        (domNode as Element).attribs?.class === 'end'
      ) {
        return (
          <span className={styles.ayahEnd}>
            {domToReact((domNode as Element).children as DOMNode[])}
          </span>
        )
      }
    },
  })
}