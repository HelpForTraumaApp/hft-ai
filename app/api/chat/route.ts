export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);
    
    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages: convertToCoreMessages(messages),
      system: `You are a helpful assistant. Check your knowledge base before answering any questions.
      Only respond to questions using information from tool calls.
      if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
      tools: {
        addResource: tool({
          description: `add a resource to your knowledge base.
            If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
          parameters: z.object({
            content: z.string().describe('the content or resource to add to the knowledge base'),
          }),
          execute: async ({ content }) => createResource({ content }),
        }),
        getInformation: tool({
          description: `get information from your knowledge base to answer questions.`,
          parameters: z.object({
            question: z.string().describe('the users question'),
          }),
          execute: async ({ question }) => findRelevantContent(question),
        }),
      },
    });
    
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in POST request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}