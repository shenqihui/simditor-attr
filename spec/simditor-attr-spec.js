(function() {
  describe('Simditor Attr', function() {
    var $textarea, btn, editor, menu;
    editor = null;
    $textarea = null;
    btn = null;
    menu = null;
    afterEach(function() {
      if (editor != null) {
        editor.destroy();
      }
      editor = null;
      $textarea.remove();
      $textarea = null;
      btn = null;
      return menu = null;
    });
    describe('features', function() {
      beforeEach(function() {
        var input, sure;
        $textarea = $('<textarea id="editor"></textarea>').appendTo('body');
        editor = new Simditor({
          textarea: $textarea,
          toolbar: ['attr', 'bold'],
          attrAllow: ['id', 'class', 'style']
        });
        btn = $('.simditor-toolbar .toolbar-item-attr');
        input = $('.attr-popover .attr-settings input[data-attr]').first();
        return sure = $('.attr-popover .attr-sure');
      });
      it('should render attr button', function() {
        expect(btn).toExist();
        expect(input).toExist();
        return expect(sure).toExist();
      });
      return it('should work all right on insert a attr', function() {
        editor.focus();
        btn.click();
        input.val('test-attr-class');
        return expect(editor.body.find('.test-attr-class')).toExist();
      });
    });
    return describe('config', function() {
      beforeEach(function() {
        return $textarea = $('<textarea id="editor"></textarea>').appendTo('body');
      });
      return it('should work all right on custom config', function() {
        var input, sure;
        editor = new Simditor({
          textarea: $textarea,
          toolbar: ['attr', 'bold']
        });
        btn = $('.simditor-toolbar .toolbar-item-attr');
        input = $('.attr-popover .attr-settings input[data-attr]');
        sure = $('.simditor-toolbar .attr-sure');
        return expect(input.length).toBe(3);
      });
    });
  });

}).call(this);
