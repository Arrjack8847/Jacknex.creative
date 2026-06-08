export type ProjectCategory =
  | 'music-video'
  | 'event-recap'
  | 'vertical-edit'
  | 'video-teaser'
  | 'supporting-visual'

export type ProjectKind = 'client' | 'concept' | 'personal'

export type ProjectMediaType = 'image' | 'video'

export type ProjectMediaOrientation = 'portrait' | 'landscape' | 'square'

export interface ProjectMedia {
  id: string
  type: ProjectMediaType
  src: string
  poster?: string
  alt: string
  title?: string
  caption?: string
  width: number
  height: number
  orientation: ProjectMediaOrientation
  duration?: string
  order: number
}

export interface Project {
  id: number
  slug: string
  title: string
  subtitle: string
  summary: string
  categories: ProjectCategory[]
  year: string
  client: string
  projectType: string
  projectKind: ProjectKind
  roles: string[]
  tools: string[]
  challenge: string
  approach: string
  outcome: string
  cover: ProjectMedia
  previewVideo?: string
  fullVideo?: ProjectMedia
  externalVideoUrl?: string
  gallery: ProjectMedia[]
  featured: boolean
  order: number
}
