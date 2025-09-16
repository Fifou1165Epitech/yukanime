export type Author = {
  id: string
  name: string
  username: string
}

export type Quote = {
  id: number
  quote: string
  character: string
  manga: string
  image: string
  chapter: string | null
  episode: string | null
  verified: boolean
  createdAt: Date
  updatedAt: Date
  authorId: string
  author?: Author | null
}

// Types dérivés
export type CreateQuoteData = {
  quote: string
  character: string
  manga: string
  image: string
  episode?: string
  chapter?: string
  authorId: string
}

export type UpdateQuoteData = Partial<CreateQuoteData> & {
  id: number
}

export type QuoteFilters = {
  search?: string
  manga?: string
  verified?: boolean
  authorId?: string
  page?: number
  limit?: number
}

export type QuotePaginationResult = {
  quotes: Quote[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Types utilitaires
export type QuoteStatus = 'verified' | 'pending'
export type QuoteWithoutDates = Omit<Quote, 'createdAt' | 'updatedAt'>
export type QuoteResponse = {
  success: boolean
  data?: Quote
  error?: string
}