import unified = require('unified')
import slug = require('rehype-slug')

unified().use(slug)
