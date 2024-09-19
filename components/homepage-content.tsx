import { ReactElement } from 'react'

interface ContentProps {
  id: string
  title: string
  description: string
  children: string | ReactElement | ReactElement[]
}

const Content = ({ id, title, description, children }: ContentProps) => {
  return (
    <div id={id} className="homepage-content py-5">
      <h1 className="font-bold text-[24px]">{title}</h1>
      <p className="font-bold text-[16px] my-2">{description}</p>
      {children}
    </div>
  )
}

export default Content
