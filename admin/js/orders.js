/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/orders/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td>'+value.id+'</td>'
            + '<td class="product_id">'+ (value.product ? value.product.name : value.product_id) +'</td>'
            + '<td class="name">'+value.name+'</td>'
            + '<td class="modalitate">'+value.modalitate+'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button>'
			+ '</td>';
}

function addRecord() {
    $('#id').val('');
    $('#product_id').val('');
    $('#name').val('');
    $('#modalitate').val('');
    
    
    $('#myModalLabel').html('Add New Order');
}




function goBack() {
  window.history.back();
}


function viewRecord(id) {
    var url = "/orders/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#product_id').val(data.category_id);
        $('#name').val(data.name);
        $('#modalitate').val(data.modalitate);
        $('#cantitate').val(data.cantitate);
        $('#id').val(id);
        $('#myModalLabel').html('Edit Order');
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    //get data from the html form
    var formData = $('#record_form').serializeObject();
    
    console.log(formData)
    if(formData.name=="" || formData.modalitate=="")
    {
        window.alert("Eroare!Te rugam sa completezi toate campurile!")
    }
    //decide if it's an edit or create
    else{
    if(formData.id) {
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/orders/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#articles').append(row);
        } 
    });
}

function updateRecord(formData) {
    $.ajax({
        url: '/orders/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.product_id').html(formData.product_id);
            $('#row_id_'+formData.id+'>td.name').html(formData.name);
            $('#row_id_'+formData.id+'>td.modalitate').html(formData.modalitate);

            $('#add_new_record_modal').modal('hide');
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/orders/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}