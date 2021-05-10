export const FILTER_OPTIONS = [
  {'Country': ['North America', 'Europe', 'Asia', 'Oceania', 'South America', 'Others']},
  {'Language': ['English', 'French', 'Spanish', 'Italian', 'Japanese', 'Chinese', 'Others']},
  {'Genre': ['Drama', 'Comedy', 'Romance', 'Crime', 'Thriller', 'Action', 'Sci-Fi', 'Film-Noir', 'Others']},
  {'Year': ['Latest', '2010s', '2000s', '90s', '80s', '70s', '60s', '50s', 'Earlier']},
  {'Runtime': ['< 30', '< 60', '< 90', '< 120', '< 150', '< 180', 'Others']},
  {'Rating': ['> 2', '> 4', '> 6', '> 8', 'Others']},
]

export const IS_MULTIPLE_OPTIONS = {
  'Country': true,
  'Language': true,
  'Genre': true,
  'Year': true,
  'Runtime': false,
  'Rating': false
}
