import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Favourites',
  description: 'View your saved anime and manga favourites on AniSearch.',
  robots: { index: false, follow: false },
};

export default function FavouriteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
