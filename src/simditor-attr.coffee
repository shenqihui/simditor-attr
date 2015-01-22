
class AttrButton extends Simditor.Button
  name: 'attr'
  title: '属性编辑'
  icon: 'cogs'
  # htmlTag: 'div, h1, h2, h3, h4, h5, h6, p, pre, img, a, code, table'
  # disableTag: 'hr'
  needFocus: true
  # shortcut: 'cmd+66'

  render: (args...) ->
    super args...
    @attrAllow = @editor.opts.attrAllow || ['id', 'class', 'style', 'width', 'height']
    @popover = new AttrPopover 
      button: @

  command: ->
    range = @editor.selection.getRange()
    startNode = range.startContainer
    $startBlock = @editor.util.closestBlockEl(startNode)

    @attrElem = $($startBlock)

    @popover.one 'popovershow', =>
      console.log 'popovershow'

      @popover.settingsTitle.text $($startBlock).html()+'的'
      # todo init attr value 
      input = @popover.settingsField.find '.attr-value'
      input.map (index, elem) =>
        $self = $ elem
        attr = $self.data 'attr'
        val = @attrElem.attr(attr) || ''
        console.log val
        $self.val val



    hidePopover = (e) =>
      return unless @popover.el.find(e.target).length == 0
      @popover.hide()
      $('body').off 'click', hidePopover
      
    $('body').on 'click', hidePopover

    @popover.show($startBlock)

    @editor.selection.selectRange range
    @editor.trigger 'valuechanged'
    @editor.trigger 'selectionchanged'

    # console.log range, startNode, $startBlock, @attrElem
    # false


class AttrPopover extends Simditor.Popover

  # constructor: (args...) ->
  #   super args...
  #   @attrAllow = attrAllow
  #   console.log @attrAllow

  render: ->
    tpl = """
      <div class="attr-settings">
        <div><span class="attr-for-title"></span>属性编辑器</div>
        <div>
          <ul class="attr-settings-field">
          </ul>
        </div>
        <div class="">
          <button class="attr-sure">Sure</button>
          <button class="attr-cancle">Cancle</button>
        </div>
      </div>
    """
    html = ''
    for name, i in @button.attrAllow
      html += """
        <li data-name='#{ name }'>
          <label for="attr-editor-#{ name }">#{ name }</label>
          <input class="attr-value" data-attr="#{ name }" type="text"/>
        </li>
      """

    @el.addClass('attr-popover')
      .append(tpl)

    @settingsTitle = @el.find '.attr-for-title'
    @settingsField = @el.find '.attr-settings-field'
    @settingsElem = $(html)
    @settingsField.append @settingsElem

    @attrSureEl = @el.find '.attr-sure'
    @attrCancleEl = @el.find '.attr-cancle'

    @attrSureEl.on 'click', (e) =>
      e.preventDefault()
      setTimeout =>
        input = @settingsField.find '.attr-value'
        input.map (index, elem) =>
          $self = $ elem
          attr = $self.data 'attr'
          val = $self.val()
          @button.attrElem.attr attr, val if val
        @hide()
        @editor.trigger 'valuechanged'
      , 0

    @attrCancleEl.on 'click', (e) =>
      e.preventDefault()
      setTimeout =>
        @hide()


  show: (args...) ->
    super args...
    # @attrNameEl.val @target.text()
    # @attrValueEl.val @target.attr('href')


Simditor.Toolbar.addButton AttrButton
