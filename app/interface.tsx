export interface APIArtist {
    external_urls: {
        spotify: string
    }
    followers: {
        href: null | string
        total: number
    }
    genres: string[]
    href: string
    id: string
    images: image[]
    name: string
    popularity: number
    type: string
    uri: string
}
interface image {
    height: number
    url: string
    width: number
}

export interface APITrack {
    album: {
        album_type: string
        artists: artist[]
        available_markets: string[]
        external_urls: {
            spotify: string
        }
        href: string
        id: string
        images: image[]
        name: string
        release_date: string
        release_date_precision: string
        total_tracks: number
        type: string
        uri: string
    }
    artists: artist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
        irsc: string
    }
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
    external_urls: {
        spotify: string
    }
}
interface artist {
    external_urls: {
        spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
}
