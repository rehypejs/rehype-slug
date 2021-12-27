/**
 * @typedef {import('hast').Root} Root
 */

import Slugger from 'github-slugger'
import {hasProperty} from 'hast-util-has-property'
import {headingRank} from 'hast-util-heading-rank'
import {toString} from 'hast-util-to-string'
import {visit} from 'unist-util-visit'

const slugs = new Slugger()

/**
 * Plugin to add `id`s to headings.
 *
 * @type {import('unified').Plugin<Array<void>, Root>}
 */
export default function rehypeSlug() {
  return (tree) => {
    slugs.reset()

    visit(tree, 'element', (node) => {
      if (headingRank(node) && node.properties && !hasProperty(node, 'id')) {
        node.properties.id = slugs.slug(toString(node))
      }
    })
  }
}
