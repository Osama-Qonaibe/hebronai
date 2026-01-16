import { SearchResults } from '@/lib/types'
import { BaseSearchProvider } from './base'

export class SerperSearchProvider extends BaseSearchProvider {
  async search(
    query: string,
    maxResults: number = 10
  ): Promise<SearchResults> {
    const apiKey = process.env.SERPER_API_KEY
    this.validateApiKey(apiKey, 'SERPER')

    const response = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: query,
        num: maxResults
      })
    })

    if (!response.ok) {
      throw new Error(
        `Serper API error: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    
    // Transform Serper results to common SearchResults format
    const results = (data.organic || []).map((item: any) => ({
      title: item.title,
      url: item.link,
      content: item.snippet
    }))

    const images = (data.images || []).map((img: any) => ({
      url: img.imageUrl,
      description: img.title
    }))

    return {
      results,
      images,
      query
    }
  }
}
