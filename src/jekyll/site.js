// Famous v1.1
$(document).ready(function() {
    $(".navbar-toggler").on("click", function(e) {
        e.preventDefault();
        $(".navbar").addClass("sticky");
    });

    // Smoth Scroll
    $('a[href^="#"]').on("click", function(e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $("html, body")
            .stop()
            .animate(
                {
                    scrollTop: $target.offset().top - 79
                },
                900,
                "swing"
            );

        $(".navbar-collapse.collapse").removeClass("show");
    });

    //Sticky
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $(".navbar:not(.default)").addClass("sticky");
        } else {
            $(".navbar:not(.default)").removeClass("sticky");
        }
        if ($(window).scrollTop() > 50) {
            $(".scroll-to-top").addClass("affix");
        } else {
            $(".scroll-to-top").removeClass("affix");
        }
    });

    // Carousel;
    // var $item = $(".carousel-item");
    // var $wHeight = $(window).height();
    // $item.eq(0).addClass("active");
    // $item.height($wHeight);
    // $item.addClass("full-screen");

    // $(".carousel img").each(function() {
    //     var $src = $(this).attr("src");
    //     var $color = $(this).attr("data-color");
    //     $(this)
    //         .parent()
    //         .css({
    //             "background-image": "url(" + $src + ")",
    //             "background-color": $color
    //         });
    //     $(this).remove();
    // });

    // $(window).on("resize", function() {
    //     $wHeight = $(window).height();
    //     $item.height($wHeight);
    // });

    $(".testimonials-carousel").flickity({
        cellAlign: "center",
        wrapAround: true,
        setGallerySize: false
        //prevNextButtons: false,
        //freeScroll: true
    });

    $(".trade-shows-package-carousel").flickity({
        cellAlign: "center",
        wrapAround: true,
        setGallerySize: false
        //prevNextButtons: false,
        //freeScroll: true
    });

    var $contactForm = $("#contact-form");
    var $formSubmitButton = $("button.btn-submit");
    $contactForm.submit(function(e) {
        e.preventDefault();

        var $form = $(this);
        if ($form[0].checkValidity()) {
            var $cardContent = $contactForm.parent();
            $.post($form.attr("action"), $form.serialize()).then(
                function success() {
                    var successAlert = [
                        '<div class="mt-3 alert alert-success alert-dismissible fade show" role="alert">',
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">',
                        '<span aria-hidden="true">&times;</span>',
                        "</button>",
                        "<strong>Success!</strong> I have received your message and will reply to as soon as possible.",
                        "</div>"
                    ]
                        .join("")
                        .replace(/\s\s+/g, "");

                    $cardContent.append(successAlert);

                    $contactForm.trigger("reset");
                },
                function error() {
                    var errorAlert = [
                        '<div class="mt-3 alert alert-danger alert-dismissible fade show" role="alert">',
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">',
                        '<span aria-hidden="true">&times;</span>',
                        "</button>",
                        '<strong>Oops!</strong> An error occurred while sending your message. Please try again or email me directly at <a class="alert-link" href="mailto:a.jeffredo2@gmail.com">a.jeffredo2@gmail.com</a>.',
                        "</div>"
                    ]
                        .join("")
                        .replace(/\s\s+/g, "");

                    $cardContent.append(errorAlert);

                    $contactForm.trigger("reset");

                    $formSubmitButton.attr("disabled", true);
                }
            );
        }
    });

    var inputs = document.querySelectorAll("input, select, textarea, select");
    inputs.forEach(function(input) {
        var $input = $(input);
        var $formGroup = $input.parents(".form-group");
        var $feedback = $formGroup.find(".form-control-feedback");

        input.addEventListener("input", function() {
            if (input.validity.valid) {
                $formGroup.removeClass("has-danger");
            } else {
                $formGroup.addClass("has-danger");
                if (input.validity.typeMismatch && $input.attr("name") == "email") {
                    $feedback.html("Please provide a valid email");
                }
                if (input.validity.valueMissing && $input.attr("name") == "email") {
                    $feedback.html("Email is required");
                }
            }

            if ($contactForm[0].checkValidity()) {
                $formSubmitButton.removeAttr("disabled");
            } else {
                $formSubmitButton.attr("disabled", true);
            }
        });
    });
});
