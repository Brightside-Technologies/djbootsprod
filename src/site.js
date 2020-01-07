$(document).ready(function() {
    $(".navbar-toggler").on("click", function(e) {
        e.preventDefault();
        $(".navbar").addClass("sticky");
    });

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

    if ($(".testimonials-carousel").length > 0) {
        var testimonialsCarousel = new Flickity(".testimonials-carousel", {
            // cellAlign: "center",
            wrapAround: true,
            setGallerySize: false,
            freeScroll: true,
            autoPlay: 10000
        });
    }

    if ($(".gallery-carousel").length > 0) {
        var gallleryCarousel = new Flickity(".gallery-carousel", {
            cellAlign: "center",
            wrapAround: true,
            freeScroll: true,
            autoPlay: 5000,
            pageDots: false,
            groupCells: true
        });
    }

    if ($(".gallery-packages").length > 0) {
        var carousel = new Flickity(".gallery-packages", {
            cellAlign: "center",
            wrapAround: true,
            freeScroll: true,
            autoPlay: 5000,
            pageDots: false,
            groupCells: true
        });
    }

    if ($(".gallery-videos").length > 0) {
        var carousel = new Flickity(".gallery-videos", {
            cellAlign: "center",
            wrapAround: true,
            freeScroll: true,
            autoPlay: 5000,
            pageDots: false,
            groupCells: true
        });
    }

    $(".service-carousel").each(function(index) {
        var cellCount = $(this).find(".cell").length;
        var isGroupCells = cellCount <= 3;
        var doesWrapAround = cellCount > 3;
        $(this).flickity({
            cellAlign: "center",
            wrapAround: doesWrapAround,
            setGallerySize: false,
            groupCells: isGroupCells,
            initialIndex: 1
        });
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
                        "<strong>Success!</strong> I have received your message and will reply to it as soon as possible.",
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
                        '<strong>Oops!</strong> An error occurred while sending your message. Please try again or email me directly at <a class="alert-link" href="mailto:bryanmaldo7@gmail.com">bryanmaldo7@gmail.com</a>.',
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

    $(".card-reveal").each(function(i) {
        var $this = $(this);
        $this.find(".activator").click(function() {
            $this.addClass("is-revealed");
        });

        $this.find(".close").click(function() {
            $this.removeClass("is-revealed");
        });
    });
});
