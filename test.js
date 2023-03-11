import test from 'tape'
import slugify from 'slugify'
import {rehype} from 'rehype'
import rehypeSlug from './index.js'

test('rehypeSlug', (t) => {
  t.plan(10)

  rehype()
    .data('settings', {fragment: true})
    .use(rehypeSlug)
    .process(
      [
        '<section>',
        '  <h1>Lorem ipsum 😪</h1>',
        '  <h2>dolor—sit—amet</h2>',
        '  <h3>consectetur &amp; adipisicing</h3>',
        '  <h4>elit</h4>',
        '  <h5>Elit</h5>',
        '  <h5>Elit </h5>',
        '  <p>sed</p>',
        '</section>'
      ].join('\n'),
      (error, file) => {
        t.ifErr(error, 'shouldn’t throw')

        t.equal(
          String(file),
          [
            '<section>',
            '  <h1 id="lorem-ipsum-">Lorem ipsum 😪</h1>',
            '  <h2 id="dolorsitamet">dolor—sit—amet</h2>',
            '  <h3 id="consectetur--adipisicing">consectetur &#x26; adipisicing</h3>',
            '  <h4 id="elit">elit</h4>',
            '  <h5 id="elit-1">Elit</h5>',
            '  <h5 id="elit-">Elit </h5>',
            '  <p>sed</p>',
            '</section>'
          ].join('\n'),
          'should match'
        )
      }
    )

  rehype()
    .data('settings', {fragment: true})
    .use(rehypeSlug, {prefix: 'prefix--'})
    .process(
      [
        '<section>',
        '  <h1>Lorem ipsum 😪</h1>',
        '  <h2>dolor—sit—amet</h2>',
        '  <h3>consectetur &amp; adipisicing</h3>',
        '  <h4>elit</h4>',
        '  <h5>Elit</h5>',
        '  <h5>Elit </h5>',
        '  <p>sed</p>',
        '</section>'
      ].join('\n'),
      (error, file) => {
        t.ifErr(error, 'shouldn’t throw')

        t.equal(
          String(file),
          [
            '<section>',
            '  <h1 id="prefix--lorem-ipsum-">Lorem ipsum 😪</h1>',
            '  <h2 id="prefix--dolorsitamet">dolor—sit—amet</h2>',
            '  <h3 id="prefix--consectetur--adipisicing">consectetur &#x26; adipisicing</h3>',
            '  <h4 id="prefix--elit">elit</h4>',
            '  <h5 id="prefix--elit-1">Elit</h5>',
            '  <h5 id="prefix--elit-">Elit </h5>',
            '  <p>sed</p>',
            '</section>'
          ].join('\n'),
          'should match'
        )
      }
    )

  rehype()
    .data('settings', {fragment: true})
    .use(rehypeSlug, {
      slugger: {slug: (_value) => `test--${_value}--test`}
    })
    .process(
      [
        '<section>',
        '  <h1>Lorem ipsum 😪</h1>',
        '  <h2>dolor—sit—amet</h2>',
        '  <h3>consectetur &amp; adipisicing</h3>',
        '  <h4>elit</h4>',
        '  <h5>Elit</h5>',
        '  <h5>Elit </h5>',
        '  <p>sed</p>',
        '</section>'
      ].join('\n'),
      (error, file) => {
        t.ifErr(error, 'shouldn’t throw')

        t.equal(
          String(file),
          [
            '<section>',
            '  <h1 id="test--Lorem ipsum 😪--test">Lorem ipsum 😪</h1>',
            '  <h2 id="test--dolor—sit—amet--test">dolor—sit—amet</h2>',
            '  <h3 id="test--consectetur &#x26; adipisicing--test">consectetur &#x26; adipisicing</h3>',
            '  <h4 id="test--elit--test">elit</h4>',
            '  <h5 id="test--Elit--test">Elit</h5>',
            '  <h5 id="test--Elit --test">Elit </h5>',
            '  <p>sed</p>',
            '</section>'
          ].join('\n'),
          'should match'
        )
      }
    )

  rehype()
    .data('settings', {fragment: true})
    .use(rehypeSlug, {
      prefix: 'prefix--',
      slugger: {
        slug: (_value) =>
          `test--${_value.replace(/\W/g, '').toLowerCase()}--test`
      }
    })
    .process(
      [
        '<section>',
        '  <h1>Lorem ipsum 😪</h1>',
        '  <h2>dolor—sit—amet</h2>',
        '  <h3>consectetur &amp; adipisicing</h3>',
        '  <h4>elit</h4>',
        '  <h5>Elit</h5>',
        '  <h5>Elit </h5>',
        '  <p>sed</p>',
        '</section>'
      ].join('\n'),
      (error, file) => {
        t.ifErr(error, 'shouldn’t throw')

        t.equal(
          String(file),
          [
            '<section>',
            '  <h1 id="prefix--test--loremipsum--test">Lorem ipsum 😪</h1>',
            '  <h2 id="prefix--test--dolorsitamet--test">dolor—sit—amet</h2>',
            '  <h3 id="prefix--test--consecteturadipisicing--test">consectetur &#x26; adipisicing</h3>',
            '  <h4 id="prefix--test--elit--test">elit</h4>',
            '  <h5 id="prefix--test--elit--test">Elit</h5>',
            '  <h5 id="prefix--test--elit--test">Elit </h5>',
            '  <p>sed</p>',
            '</section>'
          ].join('\n'),
          'should match'
        )
      }
    )

  rehype()
    .data('settings', {fragment: true})
    .use(rehypeSlug, {
      prefix: 'prefix--',
      slugger: {
        slug: (_value) =>
          slugify(_value, {lower: true, strict: true, replacement: '__'})
      }
    })
    .process(
      [
        '<section>',
        '  <h1>Lorem ipsum 😪</h1>',
        '  <h2>dolor—sit—amet</h2>',
        '  <h3>consectetur &amp; adipisicing</h3>',
        '  <h4>elit</h4>',
        '  <h5>Elit</h5>',
        '  <h5>Elit </h5>',
        '  <p>sed</p>',
        '</section>'
      ].join('\n'),
      (error, file) => {
        t.ifErr(error, 'shouldn’t throw')

        t.equal(
          String(file),
          [
            '<section>',
            '  <h1 id="prefix--lorem__ipsum">Lorem ipsum 😪</h1>',
            '  <h2 id="prefix--dolorsitamet">dolor—sit—amet</h2>',
            '  <h3 id="prefix--consectetur__and__adipisicing">consectetur &#x26; adipisicing</h3>',
            '  <h4 id="prefix--elit">elit</h4>',
            '  <h5 id="prefix--elit">Elit</h5>',
            '  <h5 id="prefix--elit">Elit </h5>',
            '  <p>sed</p>',
            '</section>'
          ].join('\n'),
          'should match'
        )
      }
    )
})
