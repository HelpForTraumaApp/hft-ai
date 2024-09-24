'use client'

import { useChat } from 'ai/react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Typewriter from './typewriter'

type Pathname =
  | '/dashboard'
  | '/grounding'
  | '/safe-place'
  | '/parts-map'
  | '/dialogue'

const initialMessages: Record<Pathname, string> = {
  '/dashboard':
    "Welcome to Help for Trauma! I'm your AI companion, here to guide you on your self-healing journey. Together, we’ll practice Grounding to help you stay present and we will create a Safe Place to use as a tool for that. We will explore the essence of your True Self and inner Parts, map them out, and use Externalized Dialogue® to give them a voice. We will make movies of when you were brave using Graphic Narrative® and put an end to troubling experiences and the symptoms caused by them. These techniques will empower you now and in the future. Feel free to ask me questions at any time, and I’ll be here to support you along the way.",
  '/grounding':
    "Welcome to your Grounding page. Grounding tools help you stay present in the moment when things feel overwhelming. Here, you'll focus on simple techniques to reconnect with your body and surroundings. Pay attention to sensations like the firmness of the ground beneath your feet, the texture of an object in your hand, or the rhythm of your breathing. Engaging your senses—what you see, hear, touch,taste, smell and feel—can help bring you back to the present and restore a sense of calm and control.",
  '/safe-place':
    "Welcome to your Safe Place page. Safe Place is where you'll create your personal drawing that you can visit whenever you need comfort or calm. A Safe Place consists of drawing yourself alone in a place where you feel safe and/or secure. Include your face with an expression and your whole body, Use some color. Think about the temperature, sounds, and smells, and the things about it that bring you the feeling of being safe, and/or secure. Imagine yourself there and make it as vivid as possible, so it becomes a space you can look at or imagine whenever you need a moment of calm.",
  '/parts-map':
    'Welcome to your True Self and Parts Map page. This is where you’ll become more aware of your True Self and Parts. Each Part represents a unique aspect of your emotions, thoughts, feelings or behaviors. They all have a good intention and were needed at some point to aid in your survival. Some of these Parts are hurt, stuck or left behind in past experiences.  By identifying and mapping your Parts, you can gain deeper insight into how they interact with True Self and each other and influence your well-being. Take your time as you create your map. This map is dynamic and can change as you learn more in your journey toward healing.',
  '/dialogue':
    'Welcome to your Externalized Dialogue page. This area is set up for you to get to know your Parts better and to have conversations between your True Self and a Part.  By giving voice to your Parts, you can express their thoughts, needs, and emotions in a safe and constructive way and allow True Self to take the lead and relieve the Part’s burdens. Externalized Dialogue can be used to help make everyday decisions, resolve inner conflicts, or better understand a Part that got stuck in a past experience and needs to be relieved now in the present day. Explore these interactions at your own pace, as each Part has something valuable to share. Externalized Dialogue is a useful tool for life.'
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      maxSteps: 3
    })

  const pathname = usePathname() as Pathname
  useEffect(() => {
    const messageContent = initialMessages[pathname]

    setMessages([
      {
        id: pathname,
        role: 'assistant',
        content: messageContent
      }
    ])
  }, [pathname])

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map(m => {
          if (m.content?.length > 0) {
            return (
              <div key={m.id} className="whitespace-pre-wrap">
                <div>
                  <div className="font-bold">
                    {m.role === 'assistant' ? 'AI Guide' : 'You'}
                  </div>
                  {m.role !== 'assistant' ? (
                    <p>{m.content}</p>
                  ) : (
                    <Typewriter text={m.content}></Typewriter>
                  )}
                </div>
              </div>
            )
          }
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
