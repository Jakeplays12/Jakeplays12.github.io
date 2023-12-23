
module.exports = function(eleventyConfig) {
  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("img");

  // Copy `css/fonts/` to `_site/css/fonts`
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("assets/");

  // Copy any .jpg file to `_site`, via Glob pattern
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("**/*.jpg");

    eleventyConfig.addPassthroughCopy("robots.txt");
}
