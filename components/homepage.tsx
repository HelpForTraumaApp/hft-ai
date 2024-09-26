'use client'

import { useEffect, useRef, useState } from 'react'
import Content from '@/components/homepage-content'

export const HomePage = () => {
  const [activeNav, setActiveNav] = useState('')

  const leftParentRef = useRef<HTMLDivElement>(null)
  const leftChildRef = useRef<HTMLDivElement>(null)
  const rightContentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      leftParentRef.current &&
      leftChildRef.current &&
      rightContentsRef.current
    ) {
      rightContentsRef.current.style.paddingTop =
        (
          leftChildRef.current.getBoundingClientRect().top -
          leftParentRef.current.getBoundingClientRect().top -
          64
        ).toFixed() + 'px'

      rightContentsRef.current.style.paddingBottom =
        (
          leftParentRef.current.getBoundingClientRect().bottom -
          leftChildRef.current.getBoundingClientRect().top -
          (rightContentsRef.current.querySelector('#contact') as HTMLDivElement)
            .offsetHeight -
          10
        ).toFixed() + 'px'
    }
  }, [leftParentRef.current, leftChildRef.current, rightContentsRef.current])

  useEffect(() => {
    if (rightContentsRef.current) {
      rightContentsRef.current.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => {
      rightContentsRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (
      !leftParentRef.current ||
      !leftChildRef.current ||
      !rightContentsRef.current
    ) {
      return
    }

    const children =
      rightContentsRef.current.querySelectorAll('.homepage-content')

    let activeChild = ''
    const childTop =
      leftChildRef.current.getBoundingClientRect().top -
      leftParentRef.current.getBoundingClientRect().top

    for (let i = 0; i < children.length; i++) {
      const child = children[i]

      if (
        rightContentsRef.current.scrollTop >=
        (child as HTMLDivElement).offsetTop - childTop - 50
      ) {
        activeChild = children[i].getAttribute('id') || ''
      }
    }

    setActiveNav(activeChild)
  }

  const handleClickNavigation = (id: string) => {
    if (
      !leftParentRef.current ||
      !leftChildRef.current ||
      !rightContentsRef.current
    ) {
      return
    }

    const contentItemElement: HTMLDivElement | null =
      rightContentsRef.current.querySelector(`#${id}`)

    if (!contentItemElement) return

    const childTop =
      leftChildRef.current.getBoundingClientRect().top -
      leftParentRef.current.getBoundingClientRect().top

    rightContentsRef.current.scrollTop =
      contentItemElement.offsetTop - childTop - 36
  }

  return (
    <div className="flex bg-[#faf9fa] text-black w-2/3 ml-40 max-h-full">
      <div
        className="flex flex-col basis-1/3 min-h-full py-12 pl-12 text-right justify-center"
        ref={leftParentRef}
      >
        <div className="border-r-4 pr-8" ref={leftChildRef}>
          <div className="flex justify-end items-center gap-2">
            <img src="/logo.png" alt="" width={80} height={80} />
            <span className="text-2xl font-bold">
              Help for
              <br />
              Trauma
            </span>
          </div>
          <div className="navigation my-10">
            <ul className="">
              {mainNavs.map((nav, index) => (
                <li
                  key={index}
                  className={`text-2xl font-semibold hover:text-[#74549d] ${activeNav == nav.id ? ' text-[#74549d]' : ''}`}
                >
                  <button onClick={() => handleClickNavigation(nav.id)}>
                    {nav.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-nowrap">
            {subNavs.map((nav, index) => (
              <span key={index}>
                {index == 0 ? <></> : <> | </>}
                <button
                  className={`hover:text-[#74549d] ${activeNav == nav.id ? ' text-[#74549d]' : ''}`}
                  onClick={() => handleClickNavigation(nav.id)}
                >
                  {nav.label}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col basis-2/3 max-h-[calc(100vh-64px)] gradient-mask">
        <div
          className={`my-10 px-20 max-h-full overflow-y-auto scroll-smooth scrollbar-hidden`}
          ref={rightContentsRef}
        >
          {homepageContents.map((content, index) => (
            <Content
              title={content.title}
              description={content.description}
              key={index}
              id={content.id}
            >
              {content.content}
            </Content>
          ))}
        </div>
      </div>
    </div>
  )
}

const mainNavs = [
  { id: 'who', label: 'Who' },
  { id: 'what', label: 'What' },
  { id: 'why', label: 'Why' },
  { id: 'how', label: 'How' },
  { id: 'features', label: 'Features' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'privacy-security', label: 'Privacy & Security' }
]

const subNavs = [
  { id: 'get-started', label: 'Get Started' },
  { id: 'resources', label: 'Resources' },
  { id: 'contact', label: 'Contact Us' }
]

const homepageContents = [
  {
    title: '1. Who',
    description: 'Who We Are',
    id: 'who',
    content: (
      <div>
        At <b>Help for Trauma.ai</b>, we are dedicated to transforming the
        landscape of trauma healing through innovative technology. Our team
        comprises mental health professionals, AI experts, and passionate
        individuals committed to making healing accessible to everyone,
        everywhere. Inspired by <b>The Instinctual Trauma Response (ITR)</b>{' '}
        developed by Dr. Linda Gantt and Dr. Louis Tinnin, we blend proven
        therapeutic methods with cutting-edge artificial intelligence to provide
        personalized and effective support for trauma survivors.
      </div>
    )
  },
  {
    title: '2. What',
    description: 'What We Do',
    id: 'what',
    content: (
      <div>
        <b>Help for Trauma.ai</b> is an AI-powered platform designed to
        facilitate trauma healing by providing accessible, personalized, and
        secure support. Leveraging <b>Retrieval-Augmented Generation (RAG)</b>{' '}
        and <b>OpenAI</b> technologies, our application guides users through
        essential healing steps based on the ITR methodology. From grounding
        techniques to interactive art therapy sessions, our comprehensive suite
        of tools ensures that users receive the care they need, tailored to
        their unique experiences and needs.
      </div>
    )
  },
  {
    title: '3. Why',
    description: 'Why Choose Help for Trauma.ai',
    id: 'why',
    content: (
      <div>
        Trauma can be isolating and overwhelming, often leaving individuals
        feeling unsupported and misunderstood. <b>Help for Trauma.ai</b> bridges
        the gap between traditional therapy and modern technology, addressing
        several critical challenges:
        <ul className="list-disc px-8 py-2 space-y-2">
          <li>
            <b>Accessibility:</b> Break down geographical, financial, and social
            barriers to provide trauma healing resources to underserved and
            diverse communities.
          </li>
          <li>
            <b>Real-Time Support:</b> Offer immediate assistance and guidance
            whenever users need it, ensuring timely intervention during moments
            of distress.
          </li>
          <li>
            <b>Privacy & Security:</b> Empower users with complete ownership of
            their data and the option to remain anonymous through Web3 wallet
            integration, fostering a safe and trusting environment.
          </li>
          <li>
            <b>Stigma Reduction:</b> Promote mental health awareness and
            encourage open conversations around trauma, reducing the stigma
            associated with seeking help.
          </li>
        </ul>
        By addressing these challenges, <b>Help for Trauma.ai</b> aims to create
        a supportive and inclusive platform where everyone can embark on their
        healing journey with confidence and ease.
      </div>
    )
  },
  {
    title: '4. How',
    description: 'How It Works',
    id: 'how',
    content: (
      <div>
        <b>Help for Trauma.ai</b> utilizes advanced artificial intelligence to
        deliver a seamless and effective trauma healing experience. Here's how
        our platform operates:
        <ul className="list-decimal px-8 py-2 space-y-2">
          <li>
            <b>Account Creation and Pre-Assessment:</b>
            <ul className="list-disc pl-4 py-2 space-y-2">
              <li>
                <b>Sign Up:</b> Users create an account and complete an initial
                assessment to evaluate their current state.
              </li>
              <li>
                <b>Safety Protocol:</b> If assessment scores indicate severe
                trauma, the AI gently advises seeking professional help,
                ensuring user safety.
              </li>
            </ul>
          </li>
          <li>
            <b>AI-Powered Guidance:</b>
            <ul className="list-disc pl-4 py-2 space-y-2">
              <li>
                <b>Step-by-Step Assistance:</b> The AI assistant guides users
                through each healing step based on The Instinctual Trauma
                Response (ITR) methodology.
              </li>
              <li>
                <b>Interactive Prompts:</b> When users need support or get
                stuck, the AI provides contextual prompts and suggestions.
              </li>
            </ul>
          </li>
          <li>
            <b>Example Interaction:</b>
            <ul className="list-disc pl-4 py-2 space-y-2">
              <li>
                <b>AI Assistant:</b> "Let's work on grounding. Here are some
                effective grounding techniques: holding an object with a
                pleasant texture, deep breathing exercises, or focusing on your
                senses. What grounding technique would you like to try today?"
              </li>
              <li>
                <b>User:</b> "My Dog"
              </li>
              <li>
                <b>AI Assistant:</b> "A dog might not be a suitable grounding
                technique in this context. How about choosing an object with a
                pleasant texture or nice appearance that can fit in the palm of
                your hand?"
              </li>
            </ul>
          </li>
          <li>
            <b>Interactive Art Therapy:</b>
            <ul className="list-disc pl-4 py-2 space-y-2">
              <li>
                <b>Safe Place Drawing:</b> The AI guides users through creating
                a Safe Place drawing.
              </li>
            </ul>
          </li>
          <li>
            <b>Example Interaction:</b>
            <ul className="list-disc pl-4 py-2 space-y-2">
              <li>
                <b>AI Assistant:</b> "Great, now that we've completed the
                grounding exercise, let's draft your Safe Place drawing. A Safe
                Place is a mental sanctuary where you feel secure and calm. What
                kind of place would you like to draw?"
              </li>
            </ul>
          </li>
          <li>
            <b>Continuous Support and Adaptation:</b>
            <ul className="list-disc pl-4 py-2 space-y-2">
              <li>
                <b>24/7 AI Chatbot:</b> Provides ongoing support, monitors
                progress, and adapts guidance based on user interactions.
              </li>
              <li>
                <b>Dynamic Adjustments:</b> The AI adjusts its prompts and
                suggestions as users advance through their healing journey.
              </li>
            </ul>
          </li>
          <li>
            <b>Data Ownership and Anonymity:</b>
            <ul className="list-disc pl-4 py-2 space-y-2">
              <li>
                <b>Web3 Wallet Integration:</b> Users can connect their Web3
                wallets to remain anonymous and retain full ownership of their
                data.
              </li>
              <li>
                <b>Privacy Assurance:</b> User data is never shared or used to
                train any models, ensuring complete privacy and security.
              </li>
            </ul>
          </li>
          <li>
            <b>Multi-Platform Accessibility:</b>
            <ul className="list-disc pl-4 py-2 space-y-2">
              <li>
                <b>Web and Mobile:</b> Accessible via both web and mobile
                platforms, ensuring support is available anytime, anywhere.
              </li>
            </ul>
          </li>
        </ul>
        By integrating these features, <b>Help for Trauma.ai</b> offers a
        comprehensive, secure, and personalized approach to trauma healing,
        empowering users to take control of their mental well-being with the
        support they need, precisely when they need it.
      </div>
    )
  },
  {
    title: '5. Features',
    description: 'Key Features',
    id: 'features',
    content: (
      <div>
        <ul className="list-disc px-8 py-2 space-y-2">
          <li>
            <b>Retrieval-Augmented Generation (RAG):</b> Provides contextually
            relevant guidance and explanations for each trauma healing step.
          </li>
          <li>
            <b>Real-Time AI Assistance:</b> Offers immediate support and
            suggestions whenever users need help or get stuck.
          </li>
          <li>
            <b>Interactive Art Therapy:</b> Engaging exercises that promote
            emotional expression and processing.
          </li>
          <li>
            <b>Pre-Assessment Protocol:</b> Evaluates user readiness and directs
            those in need of professional help.
          </li>
          <li>
            <b>24/7 AI Chatbot Support:</b> Continuous assistance and dynamic
            healing plan adjustments.
          </li>
          <li>
            <b>Web3 Wallet Integration:</b> Ensures user anonymity and data
            ownership, enhancing privacy and trust.
          </li>
          <li>
            <b>Multi-Platform Accessibility:</b> Available on both web and
            mobile devices for convenient access anytime, anywhere.
          </li>
          <li>
            <b>Data Privacy and Security:</b> Robust measures to protect
            sensitive user information and ensure compliance with privacy
            standards.
          </li>
        </ul>
      </div>
    )
  },
  {
    title: '6. Testimonials',
    description: 'What Our Users Say',
    id: 'testimonials',
    content: (
      <div>
        <ul className="px-4 py-2 space-y-2">
          <li>
            <p>
              "Help for Trauma.ai provided me with the tools to understand and
              manage my trauma in a way that felt safe and personalized. The
              AI-driven sessions were both comforting and effective."
            </p>
            <p>
              <b>— Jane D.</b>
            </p>
          </li>
          <li>
            <p>
              "The ability to remain anonymous while accessing comprehensive
              trauma healing resources was a game-changer for me. I finally feel
              in control of my healing journey."
            </p>
            <p>
              <b>— Marcus T.</b>
            </p>
          </li>
          <li>
            <p>
              "Integrating art therapy with AI support made my healing process
              both creative and structured. I'm grateful for the continuous
              support and personalized prompts."
            </p>
            <p>
              <b>— Aisha K.</b>
            </p>
          </li>
        </ul>
      </div>
    )
  },
  {
    title: '7. Privacy & Security',
    description: 'Your Privacy, Our Priority',
    id: 'privacy-security',
    content: (
      <div>
        At <b>Help for Trauma.ai</b>, we understand the sensitivity surrounding
        trauma healing. That's why we've implemented robust privacy and security
        measures to protect your personal data:
        <ul className="list-disc px-8 py-2 space-y-2">
          <li>
            <b>Data Ownership:</b> You retain full ownership of your data. Your
            information is never shared or used to train any models.
          </li>
          <li>
            <b>Anonymity Through Web3:</b> Our Web3 wallet integration allows
            you to use the platform anonymously, ensuring your privacy is
            maintained at all times.
          </li>
          <li>
            <b>Secure Data Storage:</b> We employ advanced encryption and
            security protocols to safeguard your information against
            unauthorized access.
          </li>
          <li>
            <b>Compliance:</b> Our platform adheres to all relevant data
            protection regulations, including GDPR and HIPAA, to ensure your
            data is handled with the utmost care and responsibility.
          </li>
        </ul>
        Your trust is paramount to us, and we are committed to providing a safe
        and secure environment for your healing journey.
      </div>
    )
  },
  {
    title: '8. Get Started',
    description: 'Begin Your Healing Journey Today',
    id: 'get-started',
    content: (
      <div>
        Taking the first step towards healing is empowering and transformative.
        <b>Help for Trauma.ai</b> is here to support you every step of the way.
        <ul className="list-decimal px-8 py-2 space-y-2">
          <li>
            <b>Sign Up:</b> Create your free account and complete the initial
            assessment to personalize your healing experience.
          </li>
          <li>
            <b>Connect Anonymously:</b> Use your Web3 wallet to maintain your
            privacy and control your data.
          </li>
          <li>
            <b>Start Healing:</b> Engage with our AI-powered tools and
            interactive sessions tailored to your unique needs.
          </li>
          <li>
            <b>Continuous Support:</b> Benefit from real-time AI assistance and
            dynamic guidance as you progress through your healing journey.
          </li>
        </ul>
        <b>Get Started Now</b>
      </div>
    )
  },
  {
    title: '9. Resources',
    description: 'Additional Resources',
    id: 'resources',
    content: (
      <div>
        Explore a wealth of information and tools to support your trauma healing
        journey:
        <ul className="list-disc px-8 py-2 space-y-2">
          <li>
            <b>Blog:</b> Stay updated with the latest insights, tips, and
            stories related to trauma healing and mental health.
          </li>
          <li>
            <b>Guides:</b> Access comprehensive guides on using{' '}
            <b>Help for Trauma.ai</b> and understanding the ITR methodology.
          </li>
          <li>
            <b>Community Forums:</b> Connect with others on similar healing
            paths, share experiences, and offer mutual support.
          </li>
        </ul>
      </div>
    )
  },
  {
    title: '10. Contact Us',
    description: "We're Here to Help",
    id: 'contact',
    content: (
      <div>
        Have questions or need assistance? Our dedicated support team is here to
        help you navigate your healing journey.
        <ul className="list-disc px-8 py-2 space-y-2">
          <li>
            <b>Email:</b> support@helpfortrauma.ai
          </li>
          <li>
            <b>Contact form</b>
          </li>
        </ul>
      </div>
    )
  }
]
