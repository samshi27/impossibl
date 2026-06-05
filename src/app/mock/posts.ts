import { Post } from '../models/post';

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: "How I'm making this website",
    slug: 'how-im-making-this-website',
    body: `This blog died in 2022. Four years later, I'm finally finishing it - and writing about the process as I go. This time I'm documenting the whole thing, partly to keep myself honest and partly because the *how* turned out to be more interesting than the *what*.

## Why it stalled

The original build looked gorgeous but fought me at every turn. The layout was a showpiece, not a blog. Every post got squeezed into a rigid square tile, titles wrapped in ugly places, and there was never enough room for the actual writing.

The deeper problem was that I designed it *visually first* without asking what the page was actually for. A blog is for reading. The square-grid was for looking at. When form and function fight like that, you lose the will to keep going - which is exactly what happened.

## The new stack

I rebuilt on a fresh foundation:

- **Angular 21** for the frontend
- **Spring Boot** for the eventual backend
- A flat-retro design language I actually love

The Angular jump was the steepest part. I'd last touched it at version 12, and almost everything changed - standalone components, signals, the new control flow, and dependency injection through *inject* instead of constructors. It felt like relearning a language I thought I already knew.

## The design language

The look went through about ten iterations before it clicked. I tried neumorphism (too soft), a lilac palette (too sweet), and a square-tile grid (too rigid) before landing here.

The current system is built on a few stubborn rules: thick dark borders, hard offset shadows with zero blur, flat fills, and tilted little stickers that look slapped on by hand. A typewriter font for the body, a chunky serif for the headings. It reads like an old printed zine, which is exactly the feeling I wanted.

## The layout breakthrough

The thing that unstuck the whole project was admitting the square grid was wrong. I switched to a two-column magazine layout - a wide featured card on top, regular posts flowing beneath - and suddenly it read like something you'd actually want to scroll through.

The lesson stuck with me: the prettiest version of a thing is sometimes the one quietly sabotaging it. Killing a design I was attached to was the most useful decision I made.

## What's next

There's still plenty left to build:

- Markdown rendering (you're reading it right now)
- A table of contents that builds itself from the headings
- The admin tools to write and edit posts properly
- A real backend so this stops running on fake data

One step at a time. The difference this round is that the foundation is one I trust - so finishing feels like *when*, not *if*.`,
    excerpt: 'A short teaser for the card.',
    author: 'Samshi',
    status: 'published',
    viewCount: 0,
    isFeatured: true,
    tags: ['meta', 'angular', 'webdev'],
    createdAt: '2026-06-01T10:00:00Z',
    createdBy: 'Samshi',
    updatedAt: '2026-06-01T10:00:00Z',
    updatedBy: 'Samshi',
    publishedAt: '2026-06-01T10:00:00Z',
  },
  {
    id: 2,
    title: 'Reverse-engineering the Bambalina binding',
    slug: 'reverse-engineering-bambalina-binding',
    body: 'Full markdown body goes here...',
    excerpt: 'Pulling apart a structure I had no instructions for.',
    author: 'Samshi',
    status: 'published',
    viewCount: 142,
    isFeatured: false,
    tags: ['bookbinding', 'experiments'],
    createdAt: '2026-05-20T09:00:00Z',
    createdBy: 'Samshi',
    updatedAt: '2026-05-22T14:30:00Z',
    updatedBy: 'Pooji',
    publishedAt: '2026-05-20T11:00:00Z',
  },
  {
    id: 3,
    title: 'My first granny square in years',
    slug: 'first-granny-square-in-years',
    body: 'Full markdown body goes here...',
    excerpt: 'Mum taught me at 18. Picking it back up.',
    author: 'Pooji',
    status: 'draft',
    viewCount: 0,
    isFeatured: false,
    tags: ['crochet'],
    createdAt: '2026-06-02T18:00:00Z',
    createdBy: 'Pooji',
    updatedAt: '2026-06-12T18:00:00Z',
    updatedBy: 'Phani',
    publishedAt: null,
  },
  {
    id: 4,
    title: 'A slow review of the Pilot Custom 74',
    slug: 'pilot-custom-74-slow-review',
    body: 'Full markdown body goes here...',
    excerpt: 'Six months of daily use, one honest verdict.',
    author: 'Phani',
    status: 'published',
    viewCount: 88,
    isFeatured: false,
    tags: ['fountain pens', 'reviews'],
    createdAt: '2026-05-10T08:00:00Z',
    createdBy: 'Phani',
    updatedAt: '2026-05-10T08:00:00Z',
    updatedBy: 'Phani',
    publishedAt: '2026-05-11T09:00:00Z',
  },
  {
    id: 5,
    title: 'Postcrossing finds from this month',
    slug: 'postcrossing-finds-this-month',
    body: 'Full markdown body goes here...',
    excerpt: 'Cards that travelled further than I have.',
    author: 'Pooji',
    status: 'published',
    viewCount: 54,
    isFeatured: false,
    tags: ['postcrossing', 'collecting'],
    createdAt: '2026-05-28T12:00:00Z',
    createdBy: 'Pooji',
    updatedAt: '2026-05-29T15:00:00Z',
    updatedBy: 'Samshi',
    publishedAt: '2026-05-28T18:00:00Z',
  },
  {
    id: 6,
    title: 'Folding an origami tessellation journal',
    slug: 'origami-tessellation-journal',
    body: 'Full markdown body goes here...',
    excerpt: 'When the cover is harder than the binding.',
    author: 'Samshi',
    status: 'published',
    viewCount: 210,
    isFeatured: false,
    tags: ['origami', 'bookbinding', 'experiments'],
    createdAt: '2026-05-15T07:30:00Z',
    createdBy: 'Samshi',
    updatedAt: '2026-05-16T10:00:00Z',
    updatedBy: 'Samshi',
    publishedAt: '2026-05-15T11:00:00Z',
  },
  {
    id: 7,
    title: 'Barre, three weeks in',
    slug: 'barre-three-weeks-in',
    body: 'Full markdown body goes here...',
    excerpt: 'The soreness nobody warns you about.',
    author: 'Phani',
    status: 'draft',
    viewCount: 0,
    isFeatured: false,
    tags: ['fitness'],
    createdAt: '2026-06-02T20:00:00Z',
    createdBy: 'Phani',
    updatedAt: '2026-06-02T20:00:00Z',
    updatedBy: 'Phani',
    publishedAt: null,
  },
];
