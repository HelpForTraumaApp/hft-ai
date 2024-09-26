'use client'

import { useChat, useAssistant } from 'ai/react'
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

const exampleMessages = {
  '/dashboard': [
    {
      heading: 'Grounding Techniques',
      message:
        'Learn about grounding techniques to stay present and calm in stressful moments.'
    },
    {
      heading: 'Mental Safe Space',
      message: 'Create a personalized mental safe space to use for comfort.'
    },
    {
      heading: 'Understanding True Self',
      message:
        'Explore and map True Self and different Parts of yourself to better understand your inner landscape.'
    },
    {
      heading: 'Conversations for Insight',
      message:
        'Engage in conversations between your True Self and different Parts to gain insight and balance.'
    }
  ],

  '/grounding': [
    {
      heading: 'Understanding Grounding',
      message: 'What are grounding techniques?'
    },
    {
      heading: 'Anxiety Reduction',
      message: 'How does grounding reduce anxiety?'
    },
    {
      heading: 'Sensory Grounding',
      message: 'Why is sensory grounding effective?'
    },
    {
      heading: 'Grounding and Dissociation',
      message: 'Can grounding help dissociation?'
    }
  ],

  '/safe-place': [
    {
      heading: 'Creating a Safe Place',
      message: 'How do I create a Safe Place?'
    },
    { heading: 'Elements of Safety', message: 'What makes a place feel safe?' },
    {
      heading: 'Stress Reduction',
      message: 'How can Safe Place reduce stress?'
    },
    {
      heading: 'Engaging the Senses',
      message: 'What senses engage in Safe Place?'
    }
  ],

  '/parts-map': [
    { heading: 'True Self Exploration', message: 'What is the True Self?' },
    {
      heading: 'Parts in Trauma Recovery',
      message: 'Explain Parts in trauma recovery.'
    },
    {
      heading: 'Healing with Parts Map',
      message: 'How does Parts Map help healing?'
    },
    {
      heading: 'Identifying True Self Qualities',
      message: 'How to identify True Self qualities?'
    }
  ],

  '/dialogue': [
    {
      heading: 'Externalized Dialogue',
      message: 'How does Externalized Dialogue work?'
    },
    { heading: 'Victim Mythology', message: 'What is victim mythology?' },
    {
      heading: 'Healing through Dialogue',
      message: 'How can dialogue heal trauma?'
    },
    {
      heading: 'Communication through Writing',
      message: 'Can parts communicate through writing?'
    }
  ]
}

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    append
  } = useChat({
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
    <div className="flex flex-col w-full max-w-md mx-auto h-full">
      <div className="flex flex-col justify-between h-full pt-4 pb-20  ">
        <div
          className="space-y-5 overflow-scroll"
          style={{ maxHeight: 'calc(100vh - 20px)' }}
        >
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
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 1 &&
            exampleMessages[pathname] &&
            exampleMessages[pathname].map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                  index > 1 && 'hidden md:block'
                }`}
                onClick={() =>
                  append({
                    role: 'user',
                    content: example.message
                  })
                }
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">{example.message}</div>
              </div>
            ))}
        </div>
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
