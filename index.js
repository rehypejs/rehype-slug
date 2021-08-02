import Slugger from 'github-slugger'
import has from 'hast-util-has-property'
import rank from 'hast-util-heading-rank'
import toString from 'hast-util-to-string'
import visit from 'unist-util-visit'

const slugs = new Slugger()

export default function rehypeSlug() {
  return transformer
}

function transformer(tree) {
  slugs.reset()

  visit(tree, 'element', function (node) {
    if (rank(node) && !has(node, 'id')) {
      node.properties.id = slugs.slug(toString(node))
    }
  })
}
