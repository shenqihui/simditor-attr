(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simditor-attr', ["jquery",
      "simditor"], function ($, Simditor) {
      return (root.returnExportsGlobal = factory($, Simditor));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),
      require("Simditor"));
  } else {
    root['SimditorAttr'] = factory(jQuery,
      Simditor);
  }
}(this, function ($, Simditor) {

var AttrButton, AttrPopover,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

AttrButton = (function(_super) {
  __extends(AttrButton, _super);

  function AttrButton() {
    return AttrButton.__super__.constructor.apply(this, arguments);
  }

  AttrButton.prototype.name = 'attr';

  AttrButton.prototype.title = '属性编辑';

  AttrButton.prototype.icon = 'cogs';

  AttrButton.prototype.needFocus = true;

  AttrButton.prototype.render = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    AttrButton.__super__.render.apply(this, args);
    this.attrAllow = this.editor.opts.attrAllow || ['id', 'class', 'style', 'width', 'height'];
    return this.popover = new AttrPopover({
      button: this
    });
  };

  AttrButton.prototype.command = function() {
    var $startBlock, hidePopover, range, startNode;
    range = this.editor.selection.getRange();
    startNode = range.startContainer;
    $startBlock = this.editor.util.closestBlockEl(startNode);
    this.attrElem = $($startBlock);
    this.popover.one('popovershow', (function(_this) {
      return function() {
        var input;
        _this.popover.settingsTitle.text($startBlock.get(0).outerHTML + '的');
        input = _this.popover.settingsField.find('.attr-value');
        return input.map(function(index, elem) {
          var $self, attr, val;
          $self = $(elem);
          attr = $self.data('attr');
          val = _this.attrElem.attr(attr) || '';
          return $self.val(val);
        });
      };
    })(this));
    hidePopover = (function(_this) {
      return function(e) {
        if (_this.popover.el.find(e.target).length !== 0) {
          return;
        }
        _this.popover.hide();
        return $('body').off('click', hidePopover);
      };
    })(this);
    $('body').on('click', hidePopover);
    this.popover.show($startBlock);
    this.editor.selection.selectRange(range);
    this.editor.trigger('valuechanged');
    return this.editor.trigger('selectionchanged');
  };

  return AttrButton;

})(Simditor.Button);

AttrPopover = (function(_super) {
  __extends(AttrPopover, _super);

  function AttrPopover() {
    return AttrPopover.__super__.constructor.apply(this, arguments);
  }

  AttrPopover.prototype.render = function() {
    var html, i, name, tpl, _i, _len, _ref;
    tpl = "<div class=\"attr-settings\">\n  <div><span class=\"attr-for-title\"></span>属性编辑器</div>\n  <div class=\"attr-settings-field\">\n    <ul>\n    </ul>\n  </div>\n  <div class=\"action-button\">\n    <button class=\"attr-sure\">Sure</button>\n    <button class=\"attr-cancle\">Cancle</button>\n  </div>\n</div>";
    html = '';
    _ref = this.button.attrAllow;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      name = _ref[i];
      html += "<li data-name='" + name + "'>\n  <label for=\"attr-editor-" + name + "\">" + name + "</label>\n  <input class=\"attr-value\" data-attr=\"" + name + "\" type=\"text\"/>\n</li>";
    }
    this.el.addClass('attr-popover').append(tpl);
    this.settingsTitle = this.el.find('.attr-for-title');
    this.settingsField = this.el.find('.attr-settings-field ul');
    this.settingsElem = $(html);
    this.settingsField.append(this.settingsElem);
    this.attrSureEl = this.el.find('.attr-sure');
    this.attrCancleEl = this.el.find('.attr-cancle');
    this.attrSureEl.on('click', (function(_this) {
      return function(e) {
        e.preventDefault();
        return setTimeout(function() {
          var input;
          input = _this.settingsField.find('.attr-value');
          input.map(function(index, elem) {
            var $self, attr, val;
            $self = $(elem);
            attr = $self.data('attr');
            val = $self.val();
            if (val) {
              return _this.button.attrElem.attr(attr, val);
            }
          });
          _this.hide();
          return _this.editor.trigger('valuechanged');
        }, 0);
      };
    })(this));
    this.attrCancleEl.on('click', (function(_this) {
      return function(e) {
        e.preventDefault();
        return setTimeout(function() {
          return _this.hide();
        });
      };
    })(this));
    return this.el;
  };

  AttrPopover.prototype.show = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return AttrPopover.__super__.show.apply(this, args);
  };

  return AttrPopover;

})(Simditor.Popover);

Simditor.Toolbar.addButton(AttrButton);

return AttrButton;

}));
