import { useRef, useEffect } from 'react'

//source: https://dev.to/luispa/how-to-add-a-dynamic-title-on-your-react-app-1l7k
export default function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  }, [])
}