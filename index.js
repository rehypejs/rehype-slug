/**
 * @typedef {import('hast').Root} Root
 */

/**
 * @typedef {Function} SlugFunction
 *   Custom `slug` implementation (optional).
 * @param  {string} value
 *   String of text to 'slugify'
 * @return {string}
 *   A unique slug string
 */

/**
 * @typedef {Function} ResetFunction
 *   Custom `reset` implementation (optional).
 */

/**
 * @typedef SluggerImplementation
 *   Custom `Slugger` implementation (optional).
 * @property {SlugFunction} slug
 *   The function to call for `slug(string)`
 * @property {ResetFunction} [reset]
 *   The function to call for `reset()`
 */

/**
 * @typedef Options
 *   Configuration (optional).
 * @property {string} [prefix='']
 *   Prefix to add in front of `id`s.
 * @property {SluggerImplementation} [slugger]
 *  The `Slugger` implementation to use.
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
 * @type {import('unified').Plugin<[Options?]|Array<void>, Root>}
 */
export default function rehypeSlug(options = {}) {
  const prefix = options.prefix || ''
  const slugger = options.slugger || slugs

  return (tree) => {
    if (slugger.reset) {
      slugger.reset()
    }

    visit(tree, 'element', (node) => {
      if (headingRank(node) && node.properties && !hasProperty(node, 'id')) {
        node.properties.id = prefix + slugger.slug(toString(node))
      }
    })
  }
}
