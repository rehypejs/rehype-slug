'use strict'

var slugs = require('github-slugger')()
var visit = require('unist-util-visit')
var toString = require('hast-util-to-string')
var is = require('hast-util-is-element')
var has = require('hast-util-has-property')

module.exports = slug

var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

function slug() {
  return transformer
}

function transformer(tree) {
  slugs.reset()

  visit(tree, 'element', function(node) {
    if (is(node, headings) && !has(node, 'id')) {
      node.properties.id = slugs.slug(toString(node))
    }
  })
}
