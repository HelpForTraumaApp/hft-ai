import React, { useEffect, useState } from 'react'

interface TypewriterProps {
  text: string
}

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState<string>('')
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        if (text[index] === '\n') {
          setDisplayedText(prev => prev + '\n')
        } else {
          setDisplayedText(prev => prev + text[index])
        }
        setIndex(prevIndex => prevIndex + 1)
      } else {
        clearInterval(interval)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [text, index])

  return <div>{displayedText}</div>
}

export default Typewriter
