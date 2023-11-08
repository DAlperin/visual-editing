import type {
  ContentSourceMap,
  QueryParams,
  SanityClient,
} from '@sanity/client'
import type { SanityStegaClient } from '@sanity/client/stega'
import type { MapStore } from 'nanostores'

export type { ContentSourceMap, MapStore, QueryParams }

/** @public */
export interface QueryStoreState<QueryResponseResult, QueryResponseError> {
  loading: boolean
  error: QueryResponseError | undefined
  data: QueryResponseResult | undefined
  sourceMap: ContentSourceMap | undefined
}

/** @public */
export interface EnableLiveModeOptions {
  /**
   * The origin that are allowed to connect to the loader.
   * If left unspecified it will default to the current origin, and the Studio will have to be hosted by the same origin.
   * @example `https://my.sanity.studio`
   * @defaultValue `location.origin`
   */
  allowStudioOrigin: string
  /**
   * You may use any client that is an `instanceof SanityClient` or `instanceof SanityStegaClient`.
   * Required when `ssr: true`, optional otherwise.
   * @example `import {createClient} from '@sanity/client'`
   * @example `import {createClient} from '@sanity/client/stega'`
   * @example `import {createClient} from '@sanity/preview-kit/client'`
   * @example `import {createClient} from 'next-sanity'`
   */
  client?: SanityClient | SanityStegaClient
  /**
   * Fires when a connection is established to a parent Studio window.
   */
  onConnect?: () => void
  /**
   * Fires when a connection is established to a parent Studio window and then lost.
   */
  onDisconnect?: () => void
}

/** @public */
export type EnableLiveMode = (options: EnableLiveModeOptions) => () => void

/** @internal */
export type SetFetcher = (fetcher: Fetcher) => () => void

/** @internal */
export interface Fetcher {
  hydrate: <QueryResponseResult, QueryResponseError>(
    query: string,
    params: QueryParams,
    initial?: Pick<
      QueryStoreState<QueryResponseResult, QueryResponseError>,
      'data' | 'sourceMap'
    >,
  ) => QueryStoreState<QueryResponseResult, QueryResponseError>
  fetch: <QueryResponseResult, QueryResponseError>(
    query: string,
    params: QueryParams,
    $fetch: MapStore<QueryStoreState<QueryResponseResult, QueryResponseError>>,
    controller: AbortController,
  ) => void
}
