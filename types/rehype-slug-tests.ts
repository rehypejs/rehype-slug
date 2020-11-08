// Minimum TypeScript Version: 3.0
import unified = require('unified')
import slug = require('rehype-slug')

unified().use(slug)
