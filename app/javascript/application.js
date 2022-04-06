// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
$(document).ready(function() {
    var flip2 = 0;
    $(document).on("click", ".btn-reply", function() {
        var html = $(".reply-form").html();
        $("#replies-" + $(this).data("comment-id")).append(html);
        $(".input-reply").toggle(flip2++ % 2 === 0);
    });
    $(document).on("click", ".reply-submit", function() {
        var commentId = $(this).closest(".comments").data("id");
        var replyContent = $(this).siblings(".reply-content").val();

        $.ajax({
            url: "/comments",
            type: "POST",
            data: {
                comment: {
                    parent_id: commentId,
                    comment_content: replyContent,
                },
            },
            dataType: "JSON",
            success: function(data) {
                location.reload();
            },
        });
    });



    // $(document).on('click', '.btn-reply', function() {
    //     var micropostId = $(this).data("id")
    //     var parentId = $(this).data("parent-id")
    //     console.log("/microposts/" + micropostId + "/comments/new?parent_id=" + parentId)
    //     $.ajax({
    //         // method: "post",
    //         // url: "/microposts/" + micropostId + "/comments/new?parent_id=" + parentId
    //         url: '/comments',
    //         type: 'POST',
    //         data: {
    //             comment: {
    //                 micropost_id: micropostId,
    //                 comment_content: content
    //             }
    //         },
    //         dataType: 'JSON',
    //     })
    // })
})