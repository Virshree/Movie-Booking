export const getCurrentFilteredTheatres = (
  allTheatres = [],
  currentMovieId = ""
) => {
  const filteredList = allTheatres.filter((theatre) => {
    const { movies = [] } = theatre;
    return movies.includes(currentMovieId);
  });
  return filteredList;
};
