type Artist = { id: string; name: string; description: string };

// allows future extension under favourites to albums, tracks...
type SiteData = {
  favourites: {
    artist: Artist[];
  };
};
