# rehype-slug

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**rehype**][rehype] plugin to add `id`s to headings.

## Install

[npm][]:

```sh
npm install rehype-slug
```

## Use

Say we have the following file, `fragment.html`:

```html
<h1>Lorem ipsum 😪</h1>
<h2>dolor—sit—amet</h2>
<h3>consectetur &amp; adipisicing</h3>
<h4>elit</h4>
<h5>elit</h5>
```

And our script, `example.js`, looks as follows:

```js
var fs = require('fs')
var rehype = require('rehype')
var slug = require('rehype-slug')

rehype()
  .data('settings', {fragment: true})
  .use(slug)
  .process(fs.readFileSync('fragment.html'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
<h1 id="lorem-ipsum-">Lorem ipsum 😪</h1>
<h2 id="dolorsitamet">dolor—sit—amet</h2>
<h3 id="consectetur--adipisicing">consectetur &#x26; adipisicing</h3>
<h4 id="elit">elit</h4>
<h5 id="elit-1">elit</h5>
```

## API

### `rehype().use(slug)`

Add `id` properties to h1-h6 headings that don’t already have one.

Uses [**github-slugger**][ghslug] to create GitHub style `id`s.

## Related

*   [`remark-slug`](https://github.com/wooorm/remark-slug)
    — Add slugs to headings in markdown

## Contribute

See [`contributing.md`][contributing] in [`rehypejs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/rehypejs/rehype-slug.svg

[build]: https://travis-ci.org/rehypejs/rehype-slug

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-slug.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-slug

[downloads-badge]: https://img.shields.io/npm/dm/rehype-slug.svg

[downloads]: https://www.npmjs.com/package/rehype-slug

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-slug.svg

[size]: https://bundlephobia.com/result?p=rehype-slug

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/master/contributing.md

[support]: https://github.com/rehypejs/.github/blob/master/support.md

[coc]: https://github.com/rehypejs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[rehype]: https://github.com/rehypejs/rehype

[ghslug]: https://github.com/Flet/github-slugger
