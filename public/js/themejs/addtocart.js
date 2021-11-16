
 if(localStorage.getItem('products')){
        var products = JSON.parse(localStorage.getItem('products'));
    document.getElementById("ct_num").innerHTML = products.length
    }
else {
    document.getElementById("ct_num").innerHTML = "0"
}
    

    $('.addToCart').on('click', function () {
        var cart = $('.shopping_cart');
        var data = $(this).data();
        var product_id = data.id
        var image = data.image
        var name = data.name 
        var id = data.id
        var quantity = data.quantity
        var imgtodrag = $(this).parents('div.product-item-container.item--static').find('.product-image-container').find("img").eq(0);
        console.log($("this").parent)
        console.log(imgtodrag)
        	    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    if(products.filter(product => product.id == product_id).length > 0){
        $.alert(name + " already in cart")
    }else {
    products.push({'id' : product_id, "image" : image, "name": name, quantity: quantity});
    localStorage.setItem('products', JSON.stringify(products));
    document.getElementById("ct_num").innerHTML = products.length
    if (imgtodrag) {
            var imgclone = imgtodrag.clone()
                .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
                .css({
                'opacity': '0.5',
                    'position': 'absolute',
                    'height': '150px',
                    'width': '150px',
                    'z-index': '100'
            })
                .appendTo($('body'))
                .animate({
                'top': cart.offset().top + 10,
                    'left': cart.offset().left + 10,
                    'width': 75,
                    'height': 75
            }, 1000, 'easeInOutExpo');
            
            setTimeout(function () {
                cart.effect("shake", {
                    times: 2
                }, 400);
            }, 1500);

            imgclone.animate({
                'width': 0,
                    'height': 0
            }, function () {
                $(this).detach()
            });
        }// Cart add remove functions
    addProductNotice("CART UPDATED", `<h3><a href="#">${name}</a> added to <a href="/cart">shopping cart</a>!</h3>`, 'success');
    }
        
    });	
    
    
	var cart = {
		'add': function(product_id, image, name, quantity) {
		        console.log($(this).attr("class"))
		    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    if(products.filter(product => product.id == product_id).length > 0){
        $.alert(name + " already in cart")
    }else {
    products.push({'id' : product_id, "image" : image, "name": name, quantity: quantity});
    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById("ct_num").innerHTML = products.length// Cart add remove functions
    addProductNotice("CART UPDATED", `<h3><a href="#">${name}</a> added to <a href="/cart">shopping cart</a>!</h3>`, 'success');
    }
    
    
		  //  axios.post("/add-to-cart", {
		  //      part_id: product_id,
		  //      user_id: user_id,
		  //      quantity: "1"
		  //  }).then(res => {
		  //      if(res.data.message){
		  //          addProductNotice(res.data.message, `<h3><a href="#">${name}</a> added to <a href="/cart">shopping cart</a>!</h3>`, 'success');
		  //          document.getElementById("ct_num").innerHTML = res.data.number
		  //      }else if(res.data.error) {
		  //          $.alert(res.data.error)
		  //      }
		  //  }).catch(error => {
		  //      if(error){
		  //          if(error.response){
		  //            $.alert(error.response.data.error)   
		  //          }else {
		  //              $.alert('There was an error with your request please try again')
		  //          }
		  //      }
		  //  })
			
		},
		'addwish': function(product_id, image, name, quantity) {
		    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    if(products.filter(product => product.id == product_id).length > 0){
        $.alert(name + " already in cart")
    }else {
    products.push({'id' : product_id, "image" : image, "name": name, quantity: quantity});
    localStorage.setItem('products', JSON.stringify(products));
    document.getElementById("ct_num").innerHTML = products.length
    addProductNotice("CART UPDATED", `<h3><a href="#">${name}</a> added to <a href="/cart">shopping cart</a>!</h3>`, 'success');
    location.reload()
    }
			
		}
	}

	var wishlist = {
		'add': function(product_id) {
		     axios.post("/add-to-wishlist", {
		        part_id: product_id,
		    }).then(res => {
		        if(res.data.message){
		            addProductNotice(res.data.message, `<h3> WishList Updated!</h3>`, 'success');
		            
		        }else if(res.data.error) {
		            $.alert(res.data.error)
		        }
		    }).catch(error => {
		        if(error){
		            if(error.response){
		              $.alert(error.response.data.error)   
		            }else {
		                $.alert('There was an error with your request please try again')
		            }
		        }
		    })
			//addProductNotice('Product added to Wishlist', '<img src="image/demo/shop/product/e11.jpg" alt="">', '<h3>You must <a href="#">login</a>  to save <a href="#">Apple Cinema 30"</a> to your <a href="#">wish list</a>!</h3>', 'success');
		}
	}
	var compare = {
		'add': function(product_id) {
			addProductNotice('Product added to compare', '<img src="image/demo/shop/product/e11.jpg" alt="">', '<h3>Success: You have added <a href="#">Apple Cinema 30"</a> to your <a href="#">product comparison</a>!</h3>', 'success');
		}
	}

	/* ---------------------------------------------------
		jGrowl – jQuery alerts and message box
	-------------------------------------------------- */
	function addProductNotice(title, thumb, text, type) {
		$.jGrowl.defaults.closer = false;
		//Stop jGrowl
		//$.jGrowl.defaults.sticky = true;
		var tpl = thumb + '<h3>'+text+'</h3>';
		$.jGrowl(tpl, {		
			life: 4000,
			header: title,
			speed: 'slow',
			theme: type
		});
	}

