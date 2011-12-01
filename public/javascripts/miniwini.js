var Miniwini;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Miniwini = (function() {
  function Miniwini() {
    this.doc = $(document);
    this.notificationCheckInterval = 8000;
    this.checkNotification();
    this.noti_count = $('#notifications-count');
    this.noti_list = $('#notifications');
    this.links_trigger = $('#links-trigger');
    this.links_list = $('#links');
    $('#wrapper').css({
      left: parseInt($.cookie('x'))
    });
    $('#wrapper').draggable({
      handle: '#mover',
      axis: 'x',
      stop: __bind(function() {
        var x;
        x = $('#wrapper').offset().left;
        return $.cookie('x', x, {
          expires: 365,
          path: '/'
        });
      }, this)
    });
    this.doc.bind('click', __bind(function(evt) {
      return this.handleClick(evt);
    }, this));
  }
  Miniwini.prototype.handleClick = function(evt) {
    if (evt.target.id === 'links-trigger') {
      this.noti_list.hide();
      this.noti_count.removeClass('opened');
      return;
    }
    if (evt.target.id === 'notifications-count' || evt.target.id === 'notifications-count-data') {
      this.links_list.hide();
      this.links_trigger.removeClass('opened');
      return;
    }
    return this.closeAll();
  };
  Miniwini.prototype.closeAll = function() {
    if (this.noti_count.hasClass('opened')) {
      this.noti_list.hide();
      this.noti_count.removeClass('opened');
    }
    if (this.links_trigger.hasClass('opened')) {
      this.links_list.hide();
      return this.links_trigger.removeClass('opened');
    }
  };
  Miniwini.prototype.logged = function() {
    return $('body').data('user') === 'y';
  };
  Miniwini.prototype.checkNotification = function() {
    try {
      if (!this.logged()) {
        return;
      }
      return $.getJSON('/notification/count', __bind(function(data) {
        var changed;
        changed = false;
        if (data && data.count > 0) {
          changed = data.count !== this.noti_count.html();
          document.title = '(' + data.count + ') ' + document.title.replace(/^\(\d+\) /, '');
          this.noti_count.data('time', data.last_updated_at.toString()).data('count', data.count).html('<span id="notifications-count-data">' + data.count + '</span>').addClass('active');
        } else {
          document.title = document.title.replace(/^\(\d+\)$ /, '');
        }
        return window.setTimeout(__bind(function() {
          return this.checkNotification();
        }, this), this.notificationCheckInterval);
      }, this));
    } catch (err) {

    }
  };
  Miniwini.prototype.notifications = function(src) {
    try {
      if (!this.logged()) {
        return;
      }
      if (!this.noti_count.data('count')) {
        return;
      }
      if (this.noti_count.data('time') === this.noti_list.data('time')) {
        this.noti_list.toggle();
        return this.noti_count[this.noti_list.css('display') !== 'none' ? 'addClass' : 'removeClass']('opened');
      } else {
        if (this.noti_count.data('loading') === 'y') {
          return;
        }
        this.noti_count.addClass('loading');
        this.noti_count.data('loading', 'y');
        return $.getJSON('/notification/all', __bind(function(data) {
          var html;
          this.noti_count.removeClass('loading');
          this.noti_count.data('loading', 'n');
          html = [];
          $.each(data, __bind(function(idx, noti) {
            var h, time;
            switch (noti.action) {
              case "comment_on_topic":
                time = $.timeago(new Date(noti.created_at * 1000));
                h = "<div data-url=\"" + noti.url + "\" data-time=\"" + noti.created_at + "\"><figure data-type=\"avatar-medium\"><img src=\"" + noti.actor_avatar + "\" alt=\"" + noti.actor_name + "\"></figure><p>" + noti.actor_name + "님이 당신의 게시물에 댓글을 남겼습니다. <q>" + noti.body + "</q><time>" + time + "</time></p></div>";
                break;
              case "comment_on_comment":
                time = $.timeago(new Date(noti.created_at * 1000));
                h = "<div data-url=\"" + noti.url + "\" data-time=\"" + noti.created_at + "\"><figure data-type=\"avatar-medium\"><img src=\"" + noti.actor_avatar + "\" alt=\"" + noti.actor_name + "\"></figure><p>" + noti.actor_name + "님이 당신의 댓글에 댓글을 남겼습니다. <q>" + noti.body + "</q><time>" + time + "</time></p></div>";
            }
            if (idx === 0) {
              this.noti_list.data('time', noti.created_at.toString());
            }
            return html.push(h);
          }, this));
          this.noti_list.html(html.join('')).toggle();
          $('#notifications  div[data-url]').click(function() {
            var time, url;
            time = $(this).data('time');
            url = $(this).data('url');
            return $.ajax({
              url: '/notification/read?time=' + time,
              success: function(res) {
                return document.location.href = url;
              }
            });
          });
          return this.noti_count[this.noti_list.css('display') !== 'none' ? 'addClass' : 'removeClass']('opened');
        }, this));
      }
    } catch (err) {

    }
  };
  Miniwini.prototype.messages = function(src) {};
  Miniwini.prototype.links = function(src) {
    if (!this.logged()) {
      return;
    }
    this.links_list.toggle();
    return this.links_trigger[this.links_list.css('display') !== 'none' ? 'addClass' : 'removeClass']('opened');
  };
  Miniwini.prototype.submitPost = function(f) {
    $('#submitButton').attr('disabled', true);
    return true;
  };
  Miniwini.prototype.saveToDraft = function(f) {
    f.elements['state'].value = 'draft';
    return f.submit();
  };
  Miniwini.prototype.selectTab = function(tab) {
    var panel, type;
    try {
      type = $(tab).data('tab');
      panel = $('[data-ui=tabbed-panel]');
      $('[data-tab]', panel).removeClass('active');
      $('[data-tab=' + type + ']', panel).addClass('active');
      $('[id^=panel-]', panel).hide();
      return $('[id=panel-' + type + ']', panel).show();
    } catch (err) {

    }
  };
  Miniwini.prototype.setPostType = function(tab) {
    var body, parser, type;
    this.selectTab(tab);
    type = $(tab).data('tab');
    if (type === 'preview') {
      $('#preview-body').html('');
      if (($('#format').val()) === 'markdown') {
        body = $('#body').val();
        parser = new Showdown.converter();
        $('#preview-body').html(parser.makeHtml(body));
      } else {
        $.ajax({
          url: '/ajax/preview',
          type: 'POST',
          data: {
            body: $('#body').val()
          },
          success: __bind(function(html) {
            return $('#preview-body').html(html);
          }, this)
        });
      }
    }
    $('#preview-section')[type === 'preview' ? 'show' : 'hide']();
    return $('#common-controls')[type === 'preview' ? 'hide' : 'show']();
  };
  return Miniwini;
})();
window.miniwini;
$(function() {
  return window.miniwini = new Miniwini();
});