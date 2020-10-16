$(document).ready(function(){
    showCategories()
    showProducts()
})

function showCategories() {
    $.get( "/categories", function( data ) {
        var html = ''
        data.forEach(function(category) {
            html = html + '<li><a href="#" onClick="showProducts('+category.id+')">'+category.name+'</a></li>'
        })
        $('#categories').html(html)
    });
}

//todo: implement showProducts method
function showProducts(categoryId) {
    if(categoryId) {
        var url = '/categories/'+ categoryId +'/products';
    } else {
        var url = '/products'   
    }
    $.get(url, function(data) {
        var html = '';
        data.forEach(
            function(product) {
                html = html + '<div class="product">'
                  +  '<h2>'+product.name+'</h2>'
                  +  '<p>'+product.description+'</p>'
                  +  '<p>Pret: '+product.price+'</p>'
                  +  '<p>Categorie: '+product.category.name+'</p>'
                + '</div>';
                
                html = html + '<h3>Product reviews</h3>'
                
                if(product.reviews) {
                    product.reviews.forEach(
                        function(reviewData) {
                            html = html + reviewData.name + ' ' + reviewData.content;
                            html = html + '<br>';
                        }
                    )
                }
                
                
            }
        )
        $('#content').html(html);
    })
    //todo: implement showOrders method
function showOrders(productId) {
    if(productId) {
        var url = '/products/'+ productId +'/orders';
    } else {
        var url = '/orders'   
    }
    $.get(url, function(data) {
        var html = '';
        data.forEach(
            function(order) {
                html = html + '<div class="order">'
                  +  '<h2>'+order.name+'</h2>'
                  +  '<p>'+order.modalitate+'</p>'
                  +  '<p>Cantitate: '+order.cantitate+'</p>'
                  +  '<p>Produs: '+order.product.name+'</p>'
                + '</div>';
                
                html = html + '<h3>Order reviews</h3>'
                
               /* if(Order.reviews) {
                    order.reviews.forEach(
                        function(reviewData) {
                            html = html + reviewData.name + ' ' + reviewData.content;
                            html = html + '<br>';
                        }
                    )
                }*/
                
                
            }
        )
        $('#content').html(html);
    })
}