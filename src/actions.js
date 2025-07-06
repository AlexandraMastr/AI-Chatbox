import { HttpError } from 'wasp/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const sendMessage = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const newMessage = await context.entities.Message.create({
    data: {
      content: args.content,
      user: { connect: { id: context.user.id } },
      isFromAI: false
    }
  })

  return newMessage
}

export const generateAIResponse = async (args, context) => {
  if (!context.user) throw new HttpError(401)

  // Get the latest user message
  const latestUserMessage = await context.entities.Message.findFirst({
    where: { userId: context.user.id, isFromAI: false },
    orderBy: { id: 'desc' }
  })
  if (!latestUserMessage) throw new HttpError(404, 'No user messages found.')

  let aiResponseContent
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Or 'gpt-4o' if you have access
      messages: [
        { role: 'user', content: latestUserMessage.content }
      ]
    })
    aiResponseContent = completion.choices[0].message.content
  } catch (e) {
    throw new HttpError(500, 'Failed to get AI response: ' + e.message)
  }

  // Store and return AI response
  const aiMessage = await context.entities.Message.create({
    data: {
      content: aiResponseContent,
      userId: context.user.id,
      isFromAI: true
    }
  })
  return aiMessage
}
