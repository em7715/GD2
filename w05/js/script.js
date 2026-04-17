$("#preamble-btn-1").click(function(){
    $("#preamble-btn-2").css({
        "background":"blue",
        "font-size":"20px",
        "padding":"10rem",
    })
})


$("#preamble-btn-2").click(function(){
    $("#preamble-btn-1").css({
        "background":"red",
        "rotate":"45deg",

        // $("#preamble-btn-1").toggleClass("rotate")
    })
})


$(".header-left").click(function(){
    $("#menu").toggleClass("active")
})


// $(document).scroll(function(){
//     let distance = $(document).scrollTop()
//     let height= $(document).height()- $(window).height();
//     let ratio= distance/height;
    
//     $(".header-right").html(ratio)
//     $(h1).css({
//         "transform":"rotate("+720*ratio*360+"deg)"

// })

