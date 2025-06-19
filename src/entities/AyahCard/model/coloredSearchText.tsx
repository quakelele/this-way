import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type HighlightWrapperProps = {
  index: number;
  onInView: (index: number) => void;
  children: React.ReactNode;
};

 const HighlightWrapper = ({ index, onInView, children }: HighlightWrapperProps) => {
  const { ref, inView } = useInView({ threshold: 0.6 });

  useEffect(() => {
    if (inView) {
      onInView(index);
    }
  }, [inView, index, onInView]);

  return (
    <span ref={ref} className="highlighted" style={{ backgroundColor: '#ffff0080' }}>
      {children}
    </span>
  );
};




export const coloredSearchText = (
  text: string,
  search: string,
  onInView: (index: number) => void
) => {
  if (!search) return <>{text}</>;

  const cleanSearch = search.trim();
  const regex = new RegExp(`(${cleanSearch})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === cleanSearch.toLowerCase() ? (
          <HighlightWrapper key={i} index={i} onInView={onInView}>
            {part}
          </HighlightWrapper>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};
// export const coloredSearchText = (text: string, search: string) => {
//   if (!search) return <>{text}</>;

//   const cleanSearch = search.trim();
//   const regex = new RegExp(`(${cleanSearch})`, 'gi');
//   const parts = text.split(regex);

//   return (
//     <>
//       {parts.map((part, i) =>
//         part.toLowerCase() === cleanSearch.toLowerCase() ? (
//           <span className="highlighted" key={i}>{part}</span>
//         ) : (
//           <React.Fragment key={i}>{part}</React.Fragment>
//         )
//       )}
//     </>
//   );
// };