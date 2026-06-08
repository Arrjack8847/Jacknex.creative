import mainHero from '../assets/projects/jacknex-identity/main-hero.jpg'
import phunkLoveCover from '../assets/projects/phunk-love/cover.jpg'
import phunkLoveVideo from '../assets/projects/phunk-love/main-video.mp4'
import sickOfWaitingGraphicOne from '../assets/projects/sick-of-waiting/graphic-01.jpg'
import sickOfWaitingGraphicTwo from '../assets/projects/sick-of-waiting/graphic-02.jpg'
import sickOfWaitingVideo from '../assets/projects/sick-of-waiting/main-video.mp4'
import sickOfWaitingVideoCover from '../assets/projects/sick-of-waiting/video-cover.jpg'
import sunwayOrientationCover from '../assets/projects/sunway-college-orientation/cover.jpg'
import sunwayOrientationVideo from '../assets/projects/sunway-college-orientation/main-video.mp4'
import tidesCover from '../assets/projects/tides-mv-teaser/cover.jpg'
import tidesMvTeaserVideo from '../assets/projects/tides-mv-teaser/main-video.mp4'
import type { Project, ProjectCategory, ProjectMedia } from '../types/project'

export const categoryLabels: Record<ProjectCategory, string> = {
  'music-video': 'Music Video',
  'event-recap': 'Event Recap',
  'vertical-edit': 'Vertical Edit',
  'video-teaser': 'Video Teaser',
  'supporting-visual': 'Supporting Visual',
}

export const projectCategories: Array<{ value: 'all' | ProjectCategory; label: string }> = [
  { value: 'all', label: 'All Videos' },
  { value: 'music-video', label: 'Music Videos' },
  { value: 'event-recap', label: 'Event Recaps' },
  { value: 'vertical-edit', label: 'Vertical Edits' },
  { value: 'video-teaser', label: 'Teasers' },
]

const media = {
  mainHero: {
    id: 'jacknex-identity-main-hero',
    type: 'image',
    src: mainHero,
    alt: 'Soe Min Khant standing near a lake, used as JackNex Creative identity imagery',
    title: 'JackNex Identity Portrait',
    width: 1440,
    height: 1920,
    orientation: 'portrait',
    order: 1,
  },
  phunkLoveCover: {
    id: 'phunk-love-cover',
    type: 'image',
    src: phunkLoveCover,
    alt: 'Portrait cover artwork for the Phunk Love music teaser',
    title: 'Phunk Love Cover',
    width: 960,
    height: 1745,
    orientation: 'portrait',
    order: 1,
  },
  phunkLoveVideo: {
    id: 'phunk-love-main-video',
    type: 'video',
    src: phunkLoveVideo,
    poster: phunkLoveCover,
    alt: 'Vertical Phunk Love music teaser video',
    title: 'Phunk Love Music Teaser',
    width: 1072,
    height: 1920,
    orientation: 'portrait',
    duration: '00:29',
    order: 2,
  },
  sickOfWaitingCover: {
    id: 'sick-of-waiting-video-cover',
    type: 'image',
    src: sickOfWaitingVideoCover,
    alt: 'Landscape video cover for Sick of Waiting by Sixteen Orbits',
    title: 'Sick of Waiting Video Cover',
    width: 1734,
    height: 960,
    orientation: 'landscape',
    order: 1,
  },
  sickOfWaitingVideo: {
    id: 'sick-of-waiting-main-video',
    type: 'video',
    src: sickOfWaitingVideo,
    poster: sickOfWaitingVideoCover,
    alt: 'Landscape Sick of Waiting music teaser video',
    title: 'Sick of Waiting Music Teaser',
    width: 1920,
    height: 1072,
    orientation: 'landscape',
    duration: '00:38',
    order: 2,
  },
  sickOfWaitingGraphicOne: {
    id: 'sick-of-waiting-graphic-01',
    type: 'image',
    src: sickOfWaitingGraphicOne,
    alt: 'Square-leaning gritty Sick of Waiting poster artwork',
    title: 'Sick of Waiting Graphic 01',
    width: 730,
    height: 728,
    orientation: 'landscape',
    order: 3,
  },
  sickOfWaitingGraphicTwo: {
    id: 'sick-of-waiting-graphic-02',
    type: 'image',
    src: sickOfWaitingGraphicTwo,
    alt: 'Landscape Sick of Waiting teaser poster artwork with rooftop scene',
    title: 'Sick of Waiting Graphic 02',
    width: 960,
    height: 529,
    orientation: 'landscape',
    order: 4,
  },
  sunwayOrientationCover: {
    id: 'sunway-college-orientation-cover',
    type: 'image',
    src: sunwayOrientationCover,
    alt: 'Landscape cover image for the Sunway College orientation recap',
    title: 'Sunway College Orientation Cover',
    width: 2079,
    height: 960,
    orientation: 'landscape',
    order: 1,
  },
  sunwayOrientationVideo: {
    id: 'sunway-college-orientation-main-video',
    type: 'video',
    src: sunwayOrientationVideo,
    poster: sunwayOrientationCover,
    alt: 'Landscape Sunway College orientation recap video',
    title: 'Sunway College Orientation Recap',
    width: 1920,
    height: 1072,
    orientation: 'landscape',
    duration: '00:32',
    order: 2,
  },
  tidesCover: {
    id: 'tides-mv-teaser-cover',
    type: 'image',
    src: tidesCover,
    alt: 'Landscape cover photo for the Tides music video teaser',
    title: 'Tides MV Teaser Cover',
    width: 1292,
    height: 709,
    orientation: 'landscape',
    order: 1,
  },
  tidesVideo: {
    id: 'tides-mv-teaser-main-video',
    type: 'video',
    src: tidesMvTeaserVideo,
    poster: tidesCover,
    alt: 'Landscape 4:3 Tides music video teaser',
    title: 'Tides MV Teaser',
    width: 1920,
    height: 1440,
    orientation: 'landscape',
    duration: '00:31',
    order: 2,
  },
} satisfies Record<string, ProjectMedia>

export const siteMedia = {
  heroPoster: media.mainHero,
  showreel: media.phunkLoveVideo,
  aboutWorkspace: media.mainHero,
} as const

const projectList = [
  {
    id: 1,
    slug: 'sick-of-waiting',
    title: 'Sick of Waiting',
    subtitle: 'Music teaser, poster direction, and mood-led rollout assets for Sixteen Orbits.',
    summary:
      'A real music teaser package built around anxious pacing, city-sunset atmosphere, rough handwritten type, and release-ready poster assets.',
    categories: ['music-video', 'video-teaser'],
    year: '2026',
    client: 'Sixteen Orbits',
    projectType: 'Music Teaser',
    projectKind: 'client',
    roles: ['Video Editing', 'Colour Grading', 'Sound Design', 'Poster Support'],
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    challenge:
      'Shape a short teaser that communicates the track mood quickly while giving the release enough visual support for the final rollout.',
    approach:
      'Matched the edit to the music energy, tightened the pacing, and paired the teaser with gritty handwritten poster artwork.',
    outcome:
      'A compact release package with a finished teaser, campaign poster, and supporting image direction for release promotion.',
    cover: media.sickOfWaitingCover,
    previewVideo: media.sickOfWaitingVideo.src,
    fullVideo: media.sickOfWaitingVideo,
    gallery: [media.sickOfWaitingGraphicOne, media.sickOfWaitingGraphicTwo],
    featured: true,
    order: 1,
  },
  {
    id: 2,
    slug: 'sunway-college-orientation',
    title: 'Sunway College Orientation',
    subtitle: 'Event recap edit for Sunway College orientation, built around upbeat campus energy.',
    summary:
      'A short orientation recap that turns event moments, campus movement, and group energy into a polished shareable video.',
    categories: ['event-recap'],
    year: '2026',
    client: 'Sunway College',
    projectType: 'Event Recap',
    projectKind: 'client',
    roles: ['Event Recap Editing', 'Music Timing', 'Colour Cleanup'],
    tools: ['Premiere Pro', 'CapCut', 'Photoshop'],
    challenge:
      'Condense a busy orientation atmosphere into a clear, engaging piece that feels energetic without becoming chaotic.',
    approach:
      'Built the edit around welcoming moments, quick transitions, crowd reaction, and music timing so the recap keeps moving.',
    outcome:
      'A concise event video suitable for campus channels, student sharing, and future orientation promotion.',
    cover: media.sunwayOrientationCover,
    previewVideo: media.sunwayOrientationVideo.src,
    fullVideo: media.sunwayOrientationVideo,
    gallery: [],
    featured: true,
    order: 2,
  },
  {
    id: 3,
    slug: 'tides-mv-teaser',
    title: 'Tides MV Teaser',
    subtitle: 'Music video teaser shaped around atmosphere, movement, and a concise preview arc.',
    summary:
      'A short-form music video preview using pacing, shot selection, and controlled visual rhythm to build anticipation.',
    categories: ['music-video', 'video-teaser'],
    year: '2026',
    client: 'Music Video Project',
    projectType: 'MV Teaser',
    projectKind: 'personal',
    roles: ['Video Editing', 'Rhythm Editing', 'Colour Grading'],
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    challenge:
      'Make the teaser feel complete in under a minute while still leaving enough curiosity for the full music video.',
    approach:
      'Focused on the strongest visual beats, tightened the progression, and let the music guide each cut and reveal.',
    outcome:
      'A focused music video teaser that can work as a release preview, story post, or portfolio editing piece.',
    cover: media.tidesCover,
    previewVideo: media.tidesVideo.src,
    fullVideo: media.tidesVideo,
    gallery: [],
    featured: true,
    order: 3,
  },
  {
    id: 4,
    slug: 'music-teaser',
    title: 'Phunk Love Music Teaser',
    subtitle: 'Vertical teaser edit designed for fast attention, rhythm, and mobile-first viewing.',
    summary:
      'A vertical music teaser that uses compact pacing and full-screen framing for short-form platforms.',
    categories: ['music-video', 'vertical-edit', 'video-teaser'],
    year: '2026',
    client: 'Music Teaser Project',
    projectType: 'Short-form Edit',
    projectKind: 'personal',
    roles: ['Vertical Editing', 'Beat Sync', 'Sound Timing'],
    tools: ['CapCut', 'Premiere Pro', 'After Effects'],
    challenge:
      'Keep a mobile-first edit sharp and immediate while preserving enough mood for the music to land.',
    approach:
      'Used vertical framing, beat-aware cuts, and a simple progression that works without needing extra explanation.',
    outcome:
      'A short teaser ready for reels, stories, and portfolio presentation as a compact editing sample.',
    cover: media.phunkLoveCover,
    previewVideo: media.phunkLoveVideo.src,
    fullVideo: media.phunkLoveVideo,
    gallery: [],
    featured: true,
    order: 4,
  },
  {
    id: 5,
    slug: 'sick-of-waiting-poster-direction',
    title: 'Sick of Waiting Poster Direction',
    subtitle: 'Visual direction for gritty music release artwork and supporting release imagery.',
    summary:
      'A poster-led visual direction using distressed type, uncomfortable texture, and contrast between clean city imagery and darker release mood.',
    categories: ['supporting-visual'],
    year: '2026',
    client: 'Sixteen Orbits',
    projectType: 'Poster Direction',
    projectKind: 'client',
    roles: ['Poster Support', 'Cover Image Design', 'Release Visuals'],
    tools: ['Photoshop', 'Illustrator', 'Figma'],
    challenge:
      'Create release artwork that feels raw and memorable while still reading clearly in small online previews.',
    approach:
      'Built the direction around rough handwritten lettering, strong title placement, and imagery that reinforces the uneasy tone of the track.',
    outcome:
      'A usable poster and mood image set that supports the teaser rollout across thumbnails, covers, and music promotion.',
    cover: media.sickOfWaitingGraphicOne,
    gallery: [media.sickOfWaitingGraphicTwo, media.sickOfWaitingCover],
    featured: false,
    order: 5,
  },
  {
    id: 6,
    slug: 'portfolio-identity-frames',
    title: 'Portfolio Identity Frames',
    subtitle: 'Cinematic portfolio stills used to frame the JackNex Creative visual identity.',
    summary:
      'A small set of visual identity frames used across the portfolio to support a cinematic, editing-first website direction.',
    categories: ['supporting-visual'],
    year: '2026',
    client: 'JackNex Creative',
    projectType: 'Identity Frames',
    projectKind: 'personal',
    roles: ['Portfolio Visuals', 'Image Direction', 'Website Support'],
    tools: ['Photoshop', 'Figma', 'React'],
    challenge:
      'Create a consistent visual mood for the website while keeping the real project work as the main focus.',
    approach:
      'Used cinematic stills, warm contrast, restrained typography, and dark interface surfaces to support the work archive.',
    outcome:
      'A stronger portfolio presentation system with hero and about imagery ready for future project updates.',
    cover: media.mainHero,
    gallery: [],
    featured: false,
    order: 6,
  },
] satisfies Project[]

export const projects: Project[] = [...projectList].sort((first, second) => first.order - second.order)
export const videoProjects = projects.filter((project) => Boolean(project.fullVideo))

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getNextProject(currentSlug: string) {
  const currentIndex = videoProjects.findIndex((project) => project.slug === currentSlug)
  if (currentIndex < 0) {
    return videoProjects[0] ?? projects[0]
  }
  return videoProjects[(currentIndex + 1) % videoProjects.length]
}
