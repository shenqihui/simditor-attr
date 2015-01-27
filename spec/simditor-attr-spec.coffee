describe 'Simditor Attr', ->
  editor = null
  $textarea = null
  btn = null
  menu = null

  afterEach ->
    editor?.destroy()
    editor = null
    $textarea.remove()
    $textarea = null
    btn = null
    menu = null

  describe 'features', ->
    beforeEach ->
      $textarea = $('<textarea id="editor"></textarea>').appendTo 'body'
      editor = new Simditor
        textarea: $textarea
        toolbar: ['attr', 'bold']
        attrAllow: ['id', 'class', 'style']
      btn = $('.simditor-toolbar .toolbar-item-attr')
      input = $('.attr-popover .attr-settings input[data-attr]').first()
      sure = $('.simditor-toolbar .attr-sure')


    it 'should render attr button', ->
      expect(btn).toExist()
      expect(menu).toExist()

    it 'should work all right on insert a attr', ->
      editor.focus()
      btn.click()
      input.val('test-attr-class')
      expect(editor.body.find('.test-attr-class')).toExist()

  describe 'config', ->
    beforeEach ->
      $textarea = $('<textarea id="editor"></textarea>').appendTo 'body'

    it 'should work all right on custom config', ->

      editor = new Simditor
        textarea: $textarea
        toolbar: ['attr', 'bold']

      btn = $('.simditor-toolbar .toolbar-item-attr')
      input = $('.attr-popover .attr-settings input[data-attr]')
      sure = $('.simditor-toolbar .attr-sure')

      expect(input.length).toBe 3

