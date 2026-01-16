import { SearchProvider } from './base'
import { ExaSearchProvider } from './exa'
import { FirecrawlSearchProvider } from './firecrawl'
import { SearXNGSearchProvider } from './searxng'
import { TavilySearchProvider } from './tavily'
import { SerperSearchProvider } from './serper'

export type SearchProviderType = 'tavily' | 'exa' | 'searxng' | 'firecrawl' | 'serper'
export const DEFAULT_PROVIDER: SearchProviderType = 'tavily'

export function createSearchProvider(
  type?: SearchProviderType
): SearchProvider {
  const providerType =
    type || (process.env.SEARCH_API as SearchProviderType) || DEFAULT_PROVIDER

  switch (providerType) {
    case 'tavily':
      return new TavilySearchProvider()
    case 'exa':
      return new ExaSearchProvider()
    case 'searxng':
      return new SearXNGSearchProvider()
    case 'firecrawl':
      return new FirecrawlSearchProvider()
    case 'serper':
      return new SerperSearchProvider()
    default:
      return new TavilySearchProvider()
  }
}

export type { ExaSearchProvider } from './exa'
export type { FirecrawlSearchProvider } from './firecrawl'
export { SearXNGSearchProvider } from './searxng'
export { TavilySearchProvider } from './tavily'
export { SerperSearchProvider } from './serper'
export type { SearchProvider }
