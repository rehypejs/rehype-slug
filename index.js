'use strict'

var slugs = require('github-slugger')()
var has = require('hast-util-has-property')
var rank = require('hast-util-heading-rank')
var toString = require('hast-util-to-string')
var visit = require('unist-util-visit')

module.exports = slug

function slug() {
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
