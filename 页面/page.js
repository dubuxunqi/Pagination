;(function($){
    $.fn.extend({
        page:function(opts){
            var options = $.extend({
                currentPage:1,
                totalPage:10,
                showPage:5,
                beginAndEnd:true,
                prevAndNext:true,
                typePage:1,
                callback:function(){
                }
            },opts);
            // 判断是否创建class为page的ul
            if(!$(this).children().hasClass("page")){
                var pages = $("<ul></ul>").addClass("page");
                $(this).append(pages);
            }
            var currentPage = options.currentPage;
            var totalPage = options.totalPage;
            var showPage = options.showPage;
            var beginAndEnd = options.beginAndEnd;
            var prevAndNext = options.prevAndNext;
            var typePage = options.typePage;
            if(beginAndEnd || prevAndNext){
                if(!$(this).children().first().hasClass("pagesBegin")){
                    var pagesBegin = $("<ul></ul>").addClass("pagesBegin");
                    var pagesEnd = $("<ul></ul>").addClass("pagesEnd");
                    if(beginAndEnd){
                        var liFirst = $("<li></li>").addClass("pageFirst").text("首页");
                        var liLast = $("<li></li>").addClass("pageLast").text("尾页");
                        pagesBegin.append(liFirst);
                        pagesEnd.prepend(liLast);
                    }
                    if(prevAndNext){
                        var liPrev = $("<li></li>").addClass("pagePrev").text("上一页");
                        var liNext = $("<li></li>").addClass("pageNext").text("下一页");
                        pagesBegin.append(liPrev);
                        pagesEnd.prepend(liNext);
                    }
                    $(this).prepend(pagesBegin).append(pagesEnd);
                }
            }
            // 为page创建具体页码
            $(".page",this).empty();
            if(totalPage<showPage){
                showPage = totalPage;
                for(var i = 0;i<showPage;i++){
                    var pageLi = $("<li></li>").text(i+1);
                    if(i == currentPage-1){
                        pageLi.addClass("pageActive");
                    }
                    $(".page",this).append(pageLi);
                }
            }else{
                for(var i= 0;i<showPage;i++){
                    var pageLi = $("<li></li>");
                    if(currentPage<=Math.ceil(showPage/2)){
                        pageLi.text(i+1);
                        if(i == currentPage-1) pageLi.addClass("pageActive");
                        $(".page",this).append(pageLi);
                        if(currentPage ==1){
                            if(beginAndEnd) $(".pageFirst",this).addClass("disabled");
                            if(prevAndNext) $(".pagePrev",this).addClass("disabled");
                            $(".pageLast, .pageNext",this).removeClass("disabled");
                        }else{
                            $(".pageFirst, .pagePrev",this).removeClass("disabled");
                        }
                    }else if(totalPage - currentPage<=Math.ceil(showPage/2)){
                        pageLi.text(totalPage-showPage+i+1);
                        if(currentPage == totalPage - showPage + i+1) pageLi.addClass("pageActive");
                        $(".page",this).append(pageLi);
                        if(currentPage == totalPage){
                            if(beginAndEnd) $(".pageLast",this).addClass("disabled");
                            if(prevAndNext) $(".pageNext",this).addClass("disabled");
                            $(".pageFirst, .pagePrev",this).removeClass("disabled");
                        }else{
                            $(".pageLast, .pageNext",this).removeClass("disabled");
                        }
                    }else{
                        pageLi = $("<li></li>").text(i+currentPage-Math.floor(showPage/2));
                        $(".page",this).append(pageLi);
                        if(i == Math.floor(showPage/2)) pageLi.addClass("pageActive");
                        if($(".pageFirst",this).hasClass("disabled")){
                            $(".pageFirst",this).removeClass("disabled");
                        }
                        if($(".pagePrev",this).hasClass("disabled")){
                            $(".pagePrev",this).removeClass("disabled");
                        }
                        if($(".pageLast",this).hasClass("disabled")){
                            $(".pageLast",this).removeClass("disabled");
                        }
                        if($(".pageNext",this).hasClass("disabled")){
                            $(".pageNext",this).removeClass("disabled");
                        }
                    }
                }
            }
            options.callback(currentPage,totalPage,typePage);
            // 点击单个页码
            $(this).each(function(){
                var _this = this;
                $(_this).off("click");
                $(_this).one("click",".page li:not(.pageActive)",function(){
                    $(_this).page({
                        currentPage:parseInt($(this).text()),
                        totalPage:totalPage,
                        showPage:showPage,
                        beginAndEnd:beginAndEnd,
                        prevAndNext:prevAndNext,
                        typePage:typePage,
                        callback:options.callback
                    });
                });
                 // 下一页
                $(_this).one("click",".pagesEnd:not(.disabled) .pageNext",function(){
                        $(_this).page({
                            currentPage:currentPage<totalPage ? currentPage+1 : totalPage,
                            totalPage:totalPage,
                            showPage:showPage,
                            beginAndEnd:beginAndEnd,
                            prevAndNext:prevAndNext,
                            typePage:typePage,
                            callback:options.callback
                        });
                });
                // 上一页
                $(_this).one("click",".pagesBegin:not(.disabled) .pagePrev",function(){
                        $(_this).page({
                            currentPage:currentPage>1 ? currentPage-1 : 1,
                            totalPage:totalPage,
                            showPage:showPage,
                            beginAndEnd:beginAndEnd,
                            prevAndNext:prevAndNext,
                            typePage:typePage,
                            callback:options.callback
                        });
                });
                // 首页
                $(_this).one("click",".pagesBegin:not(.disabled) .pageFirst",function(){
                        $(_this).page({
                            currentPage:1,
                            totalPage:totalPage,
                            showPage:showPage,
                            beginAndEnd:beginAndEnd,
                            prevAndNext:prevAndNext,
                            typePage:typePage,
                            callback:options.callback
                        });
                });
                // 尾页
                $(_this).one("click",".pagesEnd:not(.disabled) .pageLast",function(){
                        $(_this).page({
                            currentPage:totalPage,
                            totalPage:totalPage,
                            showPage:showPage,
                            beginAndEnd:beginAndEnd,
                            prevAndNext:prevAndNext,
                            typePage:typePage,
                            callback:options.callback
                        });
                });
            });
           
        }
    });
})(jQuery);