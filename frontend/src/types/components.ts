export type LogoProps = { 
  imgClass?: string,
  textClass?: string
}

export type DocumentTitleProps = {
  title: string,
}

export type SearchProps = {
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  placeholder?: string,
  wrapperClass?: string,
}

export type TruncatedTextProps = {
  text: string;
  width: number;
  lines?: number
  className?: string;
}

export type CustomSpringProps = {
  index?: number,
  className?: string,
  type?: 'fade'| 'slideUp' | 'slideLeft'|  'zoom',
  duration?: number,
  delay?: number,
  children: React.ReactNode,
  id?: string,
}

export type MessageItemProps = {

}
