import { HttpError } from 'wasp/server'

export const getMessages = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Message.findMany({
    where: {
      userId: context.user.id
    },
    orderBy: {
      id: 'asc'
    }
  });
}
