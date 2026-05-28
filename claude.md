# Hashnode Blog - Project Documentation

This document provides comprehensive information about the Hashnode Blog project for AI assistants and developers.

## Project Overview

A personal blog application built with React, TypeScript, and Vite that fetches content from Hashnode's GraphQL API. The blog features posts, series, search functionality, and GitHub repository integration.

**Tech Stack:**

- **Frontend**: React 19.1, TypeScript 5.8
- **Routing**: React Router DOM 7.8
- **State Management**: Zustand 5.0
- **API**: Apollo Client 4.0 (GraphQL)
- **Styling**: Bootstrap (custom CSS), custom CSS modules
- **Build Tool**: Vite 7.1
- **Deployment**: Netlify

## Project Structure

```
src/
├── api/
│   ├── graphql/
│   │   ├── index.ts              # Main GraphQL API functions
│   │   ├── mutations/            # GraphQL mutations
│   │   ├── queries/              # GraphQL queries
│   │   │   ├── fragments/        # Reusable query fragments
│   │   │   ├── publication.ts    # Posts & series list query
│   │   │   ├── publicationSeries.ts # Series list query
│   │   │   ├── series.ts         # Series detail query
│   │   │   ├── postById.ts       # Post by ID query
│   │   │   ├── postBySlug.ts     # Post by slug query
│   │   │   └── searchPosts.ts    # Search query
│   │   └── util/                 # GraphQL utilities
│   └── github.ts                 # GitHub API integration
├── components/
│   ├── atoms/                    # Small reusable components
│   ├── BlogCard.tsx              # Blog post card component
│   ├── SeriesCard.tsx            # Series card component
│   ├── Breadcrumb.tsx            # Generic breadcrumb navigation
│   ├── Pagination.tsx            # Generic pagination component
│   ├── Searchbar.tsx             # Search input component
│   ├── Navbar.tsx                # Navigation bar
│   ├── Footer.tsx                # Footer component
│   ├── Loader.tsx                # Loading spinner
│   ├── Image.tsx                 # Image wrapper component
│   ├── Code.tsx                  # Code syntax highlighting
│   └── index.tsx                 # Component exports
├── pages/
│   ├── Home.tsx                  # Homepage with recent posts & series
│   ├── Blog.tsx                  # Blog list page with search
│   ├── BlogPost.tsx              # Individual blog post page
│   ├── SeriesList.tsx            # Series list page
│   ├── Series.tsx                # Series detail with posts
│   ├── OpenSource.tsx            # GitHub repositories page
│   ├── About.tsx                 # About page
│   └── PageNotFound.tsx          # 404 page
├── styles/
│   ├── index.css                 # Global styles & shared classes
│   ├── bootstrap-custom.css      # Bootstrap customizations
│   ├── Blog.css                  # Blog-specific styles
│   ├── BlogCard.css              # Blog card styles
│   ├── Home.css                  # Home page styles
│   └── OpenSource.css            # Open source page styles
├── types/
│   └── index.ts                  # TypeScript type definitions
├── utils/
│   ├── languageColors.ts         # GitHub language color mapping
│   └── sortRepos.ts              # Repository sorting utilities
├── store.ts                      # Zustand global state
├── App.tsx                       # Main app component with routes
└── main.tsx                      # App entry point
```

## Environment Variables

Required environment variables (set in `.env` file):

- `VITE_HASHNODE_HOST`: Your Hashnode publication hostname (e.g., `yourblog.hashnode.dev`)
- `VITE_GITHUB_USERNAME`: Your GitHub username for repository integration

## Core Concepts

### State Management (Zustand)

The app uses Zustand for global state management (`src/store.ts`). Key state includes:

**Posts & Pagination:**

- `blogPosts`: Posts displayed on the blog page
- `homePosts`: Posts displayed on the home page (limited to 2)
- `pagination`: Blog posts pagination state (totalPosts, currentPage, hasNextPage, cursor)

**Series & Pagination:**

- `homeSeriesList`: Series displayed on home page
- `seriesList`: Series displayed on series list page
- `seriesPagination`: Series list pagination state
- `seriesDetail`: Currently viewed series with its posts
- `seriesPostsPagination`: Pagination for posts within a series

**Search:**

- `searchTerm`: Current search query
- `isSearchActive`: Whether search results are being displayed

**Other:**

- `publicationId`: Hashnode publication ID
- `user`: User profile data
- `githubRepos`: GitHub repositories
- `loading`: Global loading state

### GraphQL API (`src/api/graphql/index.ts`)

Key API functions:

- `getPublication({ count, page })`: Fetch blog posts (paginated)
- `getSeriesList({ count, page })`: Fetch series list (paginated)
- `getSeries({ slug, count, page })`: Fetch series detail with posts (paginated)
- `getPostBySlug({ slug })`: Fetch individual post by slug
- `searchPublication({ count, page, search })`: Search posts
- `getUser()`: Fetch user profile data
- `subscribeToNewsletter({ email })`: Newsletter subscription

Helper functions update Zustand state:

- `updateBlogPosts()`, `updateHomePosts()`, `updateSeriesList()`, etc.
- `updatePagination()`, `updateSeriesPagination()`, `updateSeriesPostsPagination()`
- `setLoading()`, `setSearchActive()`

### Routing

Routes defined in `src/App.tsx`:

- `/` - Home page (recent posts & series)
- `/blog` - Blog list page with search
- `/blog/*` - Individual blog post (dynamic slug)
- `/series` - Series list page
- `/series/:slug` - Series detail page with posts
- `/opensource` - GitHub repositories
- `/about` - About page
- `*` - 404 page

### Pagination Component (`src/components/Pagination.tsx`)

Generic pagination component that supports three types:

- `type="posts"`: Blog posts pagination
- `type="series"`: Series list pagination
- `type="seriesPosts"`: Posts within a series (requires `seriesSlug` prop)

The component dynamically selects the appropriate state and fetch function based on type.

### Layout System

**Grid Layouts (CSS Grid):**

- `.card-deck-blog`: 2-column grid for blog cards and series cards
  - `grid-template-columns: repeat(2, 1fr)`
  - Gap: `0.75rem 1.85rem` (vertical, horizontal)
  - Responsive: Single column on mobile (`max-width: 768px`)

**Flex Layout:**

- `.card-deck-flex`: Vertical list for search results
  - `flex-direction: column`
  - Gap: `0.5rem`

**Card Sizing:**

- `.cards-fixed-width`: Default card width
- `.cards-fixed-width2`: Cards with images (`max-width: 30rem`)

## Coding Conventions

### 1. Component Structure

**Functional Components:**

```typescript
import { type JSX } from "react";

const ComponentName = (): JSX.Element => {
  // Component logic
  return (
    <Fragment>
      {/* JSX */}
    </Fragment>
  );
};

export default ComponentName;
```

### 2. State Management

**Always use Zustand for global state:**

```typescript
const stateProp = useAppStore((state) => state.stateProp);
```

**Update state via helper functions in `src/api/graphql/index.ts`:**

```typescript
const updateStateProp = (value: Type) => useAppStore.setState({ stateProp: value });
```

### 3. API Calls

**All GraphQL calls go through `src/api/graphql/index.ts`:**

- Import the query from `queries/` or mutation from `mutations/`
- Use `GraphQL.query()` or `GraphQL.mutation()`
- Update Zustand state with response data
- Handle loading states with `setLoading()`

### 4. TypeScript

**Strict typing - NO `any` types:**

- Define types in `src/types/index.ts`
- Use `PublicationType` for GraphQL responses
- Use `PostType`, `SeriesType`, `UserType` for data models
- Type all function parameters and return values

### 5. Styling

**CSS Organization:**

- Global styles and shared classes: `src/styles/index.css`
- Bootstrap overrides: `src/styles/bootstrap-custom.css`
- Page-specific styles: `src/styles/[PageName].css`
- Component-specific styles: `src/styles/[ComponentName].css`

**Naming conventions:**

- Use kebab-case for class names: `.blog-card`, `.card-deck-blog`
- Use Bootstrap classes where appropriate: `text-center`, `mb-3`, etc.
- Prefix custom classes to avoid conflicts

### 6. Imports

**Component imports from `src/components/index.tsx`:**

```typescript
import { BlogCard, Loader, Pagination } from '../components';
```

**API imports:**

```typescript
import { getPublication, getSeries } from '../api/graphql';
```

**Type imports:**

```typescript
import type { Post as PostType, Series as SeriesType } from '../types';
```

### 7. File Editing

**NEVER manually edit package.json or other config files to add dependencies:**

- Always use package managers: `npm install`, `yarn add`, etc.
- Package managers handle version resolution and lock file updates

**For code edits:**

- Use `str-replace-editor` tool for existing files
- Use `save-file` tool only for new files
- Make parallel edits when modifying multiple files

## Key Features

### 1. Blog Posts

**Display:**

- Home page: 2 recent posts in 2-column grid with images
- Blog page: 10 posts per page in 2-column grid with images
- Individual post: Full post with cover image, content, metadata
- Search: Vertical list without images (activated when search term > 3 characters)

**Features:**

- Pagination with cursor-based navigation
- Search functionality (triggers API call on 4+ characters)
- Read time estimation
- Tag display
- Author information
- Published date formatting (using moment.js)

### 2. Blog Series

**Display:**

- Home page: 2 recent series in 2-column grid
- Series list page: All series in 2-column grid with pagination
- Series detail page: Series info + paginated posts

**Features:**

- Series cover image (same styling as blog post cover)
- Series description (supports HTML)
- Breadcrumb navigation (Home / Series / {Series Name})
- Pagination for posts within series

### 3. Search

**Behavior:**

- Search bar on Blog page
- API call triggered when `searchTerm.length > 3` (4+ characters)
- View switches to vertical layout only when API returns results
- `isSearchActive` flag prevents premature layout switch
- Clearing search returns to grid view

### 4. Navigation

**Navbar:**

- Highlights "Home" for both `/` and `/series` routes
- Auto-updates on route change (useEffect with `currentNav` dependency)
- Mobile responsive with collapsible menu

**Breadcrumbs:**

- Generic `<Breadcrumb>` component
- Used on BlogPost, Series, and SeriesList pages
- Accepts `items` array with `label` and optional `path`
- Last item is always the current page (no link)

### 5. GitHub Integration

**OpenSource page:**

- Fetches repositories from GitHub API
- Displays repo cards with language, stars, forks
- Sorting options: updated, name, stars
- Language color coding

## Common Patterns

### Fetching Data on Page Load

```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      await getPublication({ count: 10, page: 1 });
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, []);
```

### Conditional Rendering with Loading

```typescript
{loading ? <Loader /> : (
  <>
    {/* Content */}
  </>
)}
```

### Pagination Usage

```typescript
<Pagination
  itemsPerPage={10}
  type="posts"
/>

// For series posts
<Pagination
  itemsPerPage={10}
  type="seriesPosts"
  seriesSlug={slug}
/>
```

### Breadcrumb Usage

```typescript
<Breadcrumb items={[
  { label: 'Home', path: '/' },
  { label: 'Series', path: '/series' },
  { label: seriesName }  // Current page (no path)
]} />
```

### Image Component

```typescript
<Image
  className="cover-img"
  src={imageUrl}
  center
  alt={altText}
/>
```

**Styling:**

- `.cover-img`: 85% width on desktop, 100% on mobile
- `center` prop: Centers the image
- 6px border radius

## Important Notes

### 1. GraphQL Queries

**Query Files:**

- `publication.ts`: Fetches posts AND series (used on home page)
- `publicationSeries.ts`: Fetches ONLY series list (optimized)
- `series.ts`: Fetches series detail with posts
- `postBySlug.ts`: Fetches individual post
- `searchPosts.ts`: Search query

**Fragments:**

- `postFields`: Reusable post fields
- `seriesListFields`: Reusable series list fields

### 2. Pagination Cursors

The app uses **cursor-based pagination**:

- Cursors stored in state: `pagination.cursor`, `seriesPagination.cursor`, `seriesPostsPagination.cursor`
- Format: `{ "1": "", "2": "cursor2", "3": "cursor3" }`
- Page 1 always has empty cursor
- Next page cursor fetched with current page data
- On page 1, prefetch page 2 cursor for smoother navigation

### 3. Search Behavior

**Critical:**

- Search API call: `searchTerm.length > 3` (4+ characters)
- Layout switch: `isSearchActive === true` (only when API returns)
- Clearing search resets both `searchTerm` and `isSearchActive`

### 4. CSS Grid vs Flexbox

**Use `.card-deck-blog` (Grid) for:**

- Blog posts on home page
- Blog posts on blog page (non-search)
- Series cards on home page
- Series list page
- Series posts

**Use `.card-deck-flex` (Flexbox) for:**

- Search results (vertical list)

### 5. Component Exports

All components are exported from `src/components/index.tsx`:

```typescript
export { default as ComponentName } from './ComponentName';
```

Import them in pages:

```typescript
import { BlogCard, SeriesCard, Pagination } from '../components';
```

### 6. Navbar Route Highlighting

The navbar uses `getNavState()` helper to map routes:

- `/` → `"home"`
- `/series` → `"home"` (treated as part of home)
- `/series/:slug` → `"home"`
- `/blog` → `"blog"`
- Other routes map directly

## Troubleshooting

### Issue: Styles not applying

- Check if CSS file is imported in the component
- Verify class names match (case-sensitive)
- Check if Bootstrap classes are being overridden
- Inspect element in browser DevTools

### Issue: State not updating

- Verify Zustand helper function is called
- Check if `setLoading()` is properly used
- Ensure state selector is correct: `useAppStore((state) => state.prop)`

### Issue: Pagination not working

- Verify correct `type` prop is passed
- For `seriesPosts`, ensure `seriesSlug` is provided
- Check cursor storage in pagination state
- Verify API function is fetching next page

### Issue: TypeScript errors

- NO `any` types allowed - define proper types in `src/types/index.ts`
- Import types with `import type { ... }`
- Use `PublicationType` for GraphQL responses

## Development Commands

```bash
# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build

# Preview production build
npm run preview
# or
yarn preview

# Lint
npm run lint
# or
yarn lint
```

## Deployment

The project is deployed on Netlify:

- Build command: `npm run build` or `yarn build`
- Publish directory: `dist`
- Environment variables must be set in Netlify dashboard

## Summary

This is a production-ready React + TypeScript blog application with:

- ✅ Type-safe GraphQL integration
- ✅ Global state management with Zustand
- ✅ Responsive design with Bootstrap + custom CSS
- ✅ Cursor-based pagination
- ✅ Search functionality
- ✅ Series support
- ✅ GitHub integration
- ✅ SEO-friendly routing
- ✅ Comprehensive error handling

When making changes, always:

1. Maintain TypeScript type safety (no `any` types)
2. Use Zustand for state management
3. Follow the established patterns
4. Test pagination and navigation
5. Verify responsive design
6. Check for console errors
