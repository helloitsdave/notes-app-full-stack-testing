import { factory, primaryKey } from '@mswjs/data'

export const db = factory({
    // Create a "user" model,
    note: {
      id: primaryKey(Number),
      title: (String),
      content: (String),
    },
  })