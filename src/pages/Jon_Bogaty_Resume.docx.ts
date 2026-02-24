import type { APIRoute } from 'astro'
import { buildResumeDocx } from '../lib/docx-builder'

export const GET: APIRoute = async () => {
  const buffer = await buildResumeDocx()
  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    },
  })
}
