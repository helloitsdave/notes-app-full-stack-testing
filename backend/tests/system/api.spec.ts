import { test, expect } from 'vitest'
import axios from 'axios'

const URL = 'http://localhost:5001/api/notes'

test('GET /api/notes', async () => {
  const res = await axios.get(URL)
  expect(res.status).toBe(200)
  expect(res.data).toHaveLength(9)
})
