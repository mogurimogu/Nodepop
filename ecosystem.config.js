module.exports = {
  apps : [{
    name: 'nodepop',
    script: './bin/www',
    watch: '.'
  }, {
    name: 'Thumbnails',
    script: './microservices/thumbnails/thumbnailsService.js',
  }],
};
