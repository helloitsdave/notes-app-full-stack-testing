import { config } from 'dotenv'
import { test, expect } from 'vitest'
import axios from 'axios'

config()

const URL = `${process.env.API_URL}/api/notes`

test('GET /api/notes', async () => {
  const res = await axios.get(URL)
  expect(res.status).toBe(200)
  expect(res.data).toHaveLength(9)
})

