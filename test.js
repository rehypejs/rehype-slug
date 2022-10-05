import test from 'tape'
import {rehype} from 'rehype'
import rehypeSlug from './index.js'

test('rehypeSlug', (t) => {
  t.plan(4)

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
        '  <h5>elit</h5>',
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
            '  <h5 id="elit-1">elit</h5>',
            '  <p>sed</p>',
            '</section>'
          ].join('\n'),
          'should match'
        )
      }
    )

  rehype()
    .data('settings', {fragment: true})
    .use(rehypeSlug, { prefix: 'test-'})
    .process(
      [
        '<section>',
        '  <h1>Lorem ipsum 😪</h1>',
        '  <h2>dolor—sit—amet</h2>',
        '  <h3>consectetur &amp; adipisicing</h3>',
        '  <h4>elit</h4>',
        '  <h5>elit</h5>',
        '  <p>sed</p>',
        '</section>'
      ].join('\n'),
      (error, file) => {
        t.ifErr(error, 'shouldn’t throw')

        t.equal(
          String(file),
          [
            '<section>',
            '  <h1 id="test-lorem-ipsum-">Lorem ipsum 😪</h1>',
            '  <h2 id="test-dolorsitamet">dolor—sit—amet</h2>',
            '  <h3 id="test-consectetur--adipisicing">consectetur &#x26; adipisicing</h3>',
            '  <h4 id="test-elit">elit</h4>',
            '  <h5 id="test-elit-1">elit</h5>',
            '  <p>sed</p>',
            '</section>'
          ].join('\n'),
          'should match'
        )
      }
    )
})
