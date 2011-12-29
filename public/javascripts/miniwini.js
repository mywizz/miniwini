var Miniwini;Miniwini=function(){function a(){var a,b,c=this;this.doc=$(document);this.notificationCheckInterval=7e3;this.checkNotification();this.noti_count=$("#notifications-count");this.noti_list=$("#notifications");this.links_trigger=$("#links-trigger");this.links_list=$("#links");this.context=$("#user-context");this.contextTimer;this.tpl={context:$.template("#tpl-user-context")};$("#wrapper").css({left:parseInt($.cookie("x"))});$("#wrapper").prepend('<div class="mover" id="mover-left"></div>').prepend('<div class="mover" id="mover-right"></div>');$("#wrapper").draggable({handle:".mover",axis:"x",containment:[0,0,window.innerWidth-1056,0],stop:function(){var a;a=$("#wrapper").offset().left;return $.cookie("x",a,{expires:365,path:"/"})}});b=this;this.context.mouseleave(function(){return c.hideContext()});$("figure[data-type^=avatar-]").mouseenter(function(){var a,c,d,e,f=this;d=$(this);a=b.context.hide();c=d.offset();a.html($.tmpl(b.tpl.context,d.data()));e=c.top-a.height();a.css({left:c.left+d.width()/2-a.width()/2,top:e-20,opacity:0,zIndex:-1});return b.contextTimer=window.setTimeout(function(){a.show();return window.setTimeout(function(){return a.css({top:e-10,opacity:1,zIndex:9999999})},1)},600)}).mouseleave(function(){return window.clearTimeout(c.contextTimer)});if(this.logged()){a=$("[data-ui=exp]");if(a.size()){a.css({top:(window.innerHeight-100)/2}).show();window.setTimeout(function(){return a.addClass("active")},400)}}this.doc.bind("click",function(a){return c.handleClick(a)});this.doc.bind("keyup",function(a){return c.handleHotkey(a)})}a.prototype.hideContext=function(){window.clearTimeout(this.contextTimer);return this.context.css({opacity:0,zIndex:-1}).hide()};a.prototype.handleHotkey=function(a){var b,c;if(["html","body"].indexOf(a.target.nodeName.toLowerCase())===-1)return;c=a.which||a.keyCode;b=String.fromCharCode(c);switch(b){case"Q":if(!this.logged())return;return this.noti_list.css("display")!=="none"?$(">div:last-child",this.noti_list).trigger("click"):this.notifications()}};a.prototype.handleClick=function(a){this.hideContext();if(a.target.id==="links-trigger"){this.noti_list.hide();this.noti_count.removeClass("opened");return}if(a.target.id==="notifications-count"||a.target.id==="notifications-count-data"){this.links_list.hide();this.links_trigger.removeClass("opened");return}return this.closeAll()};a.prototype.closeAll=function(){if(this.noti_count.hasClass("opened")){this.noti_list.hide();this.noti_count.removeClass("opened")}if(this.links_trigger.hasClass("opened")){this.links_list.hide();return this.links_trigger.removeClass("opened")}};a.prototype.logged=function(){return $("body").data("user")==="y"};a.prototype.checkNotification=function(){var a=this;try{if(!this.logged())return;return $.getJSON("/notification/count",function(b){var c;c=!1;if(b&&b.count>0){c=b.count!==a.noti_count.html();document.title="("+b.count+") "+document.title.replace(/^\(\d+\) /,"");a.noti_count.data("time",b.last_updated_at.toString()).data("count",b.count).html('<span id="notifications-count-data">'+b.count+"</span>").addClass("active")}else document.title=document.title.replace(/^\(\d+\)$ /,"");return window.setTimeout(function(){return a.checkNotification()},a.notificationCheckInterval)})}catch(b){}};a.prototype.notifications=function(){var a=this;try{if(!this.logged())return;if(!this.noti_count.data("count")){location.href="/notifications";return}if(this.noti_count.data("time")===this.noti_list.data("time")){this.noti_list.toggle();return this.noti_count[this.noti_list.css("display")!=="none"?"addClass":"removeClass"]("opened")}if(this.noti_count.data("loading")==="y")return;this.noti_count.addClass("loading");this.noti_count.data("loading","y");return $.getJSON("/notification/all",function(b){var c;a.noti_count.removeClass("loading");a.noti_count.data("loading","n");c=[];$.each(b,function(b,d){var e,f,g;g=$.timeago(new Date(d.created_at*1e3));d.body=d.body.replace(/(@|\/)(.+?)\1/,"$2");switch(d.action){case"comment_on_topic":e="<p>"+d.actor_name+"님이 당신의 게시물에 댓글을 남겼습니다. <q>"+d.body+"</q>";break;case"comment_and_mention_on_topic":e="<p>"+d.actor_name+"님이 당신을 언급하면서 당신의 게시물에 댓글을 남겼습니다. <q>"+d.body+"</q>";break;case"comment_on_comment":e="<p>"+d.actor_name+"님이 당신의 댓글에 댓글을 남겼습니다. <q>"+d.body+"</q>";break;case"comment_and_mention_on_comment":e="<p>"+d.actor_name+"님이 당신을 언급하면서 당신의 댓글에 댓글을 남겼습니다. <q>"+d.body+"</q>";break;case"mention":e="<p>"+d.actor_name+"님이 당신을 언급했습니다. <q>"+d.body+"</q>"}b===0&&a.noti_list.data("time",d.created_at.toString());f='<div data-url="'+d.url+'" data-time="'+d.created_at+'"><figure data-type="avatar-medium"><img src="'+d.actor_avatar+'" alt="'+d.actor_name+'"></figure>'+e+"<time>"+g+"</time></p></div>";return c.push(f)});a.noti_list.html(c.join("")).toggle();$("#notifications  div[data-url]").click(function(){var a,b;a=$(this).data("time");b=$(this).data("url");return $.ajax({url:"/notification/read?time="+a,success:function(a){return document.location.href=b}})});return a.noti_count[a.noti_list.css("display")!=="none"?"addClass":"removeClass"]("opened")})}catch(b){}};a.prototype.messages=function(a){};a.prototype.links=function(a){if(!this.logged())return;this.links_list.toggle();return this.links_trigger[this.links_list.css("display")!=="none"?"addClass":"removeClass"]("opened")};a.prototype.submitPost=function(a){$("#submitButton").attr("disabled",!0);return!0};a.prototype.saveToDraft=function(a){a.elements.state.value="draft";return a.submit()};a.prototype.selectTab=function(a){var b,c;try{c=$(a).data("tab");b=$("[data-ui=tabbed-panel]");$("[data-tab]",b).removeClass("active");$("[data-tab="+c+"]",b).addClass("active");$("[id^=panel-]",b).hide();return $("[id=panel-"+c+"]",b).show()}catch(d){}};a.prototype.setPostType=function(a){var b,c,d,e=this;this.selectTab(a);d=$(a).data("tab");if(d==="post-type-preview"){$("#preview-body").html("");if($("#format").val()==="markdown"){b=$("#body").val();c=new Showdown.converter;$("#preview-body").html(c.makeHtml(b))}else $.ajax({url:"/ajax/preview",type:"POST",data:{body:$("#body").val()},success:function(a){return $("#preview-body").html(a)}})}$("#preview-section")[d==="post-type-preview"?"show":"hide"]();return $("#common-controls")[d==="post-type-preview"?"hide":"show"]()};a.prototype.uploadPhoto=function(a){if(!a.elements.photo.value)return!1;$("input[type=submit]",a).attr("disabled",!0).hide();$("#upload-waiting").addClass("active");$("input[type=file]",a).hide();return!0};a.prototype.loadRecentPhoto=function(){var a,b,c,d,e,f,g;try{if(!localStorage&&!localStorage.uploadedPhoto)return;c=JSON.parse(localStorage.uploadedPhoto);if(c){a=$("#uploaded-photos");d=$("#tpl-uploaded-photo").template();g=[];for(e=0,f=c.length;e<f;e++){b=c[e];$('img[src="'+b.url+'"]',a).size()===0?g.push(a.append($.tmpl(d,b).html())):g.push(void 0)}return g}}catch(h){}};a.prototype.selectPhoto=function(a){var b,c,d,e,f;d=$("img",a);b=document.getElementById("body");e=d.attr("src");b.focus();f=b.selectionStart;c=b.selectionEnd;$("#format").val()==="markdown"&&(e="![]("+e+")");$(a).addClass("selected");return b.value=b.value.substring(0,f)+e+"\n"+b.value.substring(c,b.value.length)};a.prototype.photoUploadFailed=function(){return alert("업로드 실패")};a.prototype.photoUploaded=function(a){var b,c;if(a&&a.url){c=$("#tpl-uploaded-photo").template();$("#uploaded-photos").prepend($.tmpl(c,a).html());if(typeof localStorage!="undefined"&&localStorage!==null){b=localStorage.uploadedPhoto!=null?JSON.parse(localStorage.uploadedPhoto):[];b.unshift(a);return localStorage.uploadedPhoto=JSON.stringify(b.slice(0,10))}}};return a}();window.miniwini;$(function(){return window.miniwini=new Miniwini});