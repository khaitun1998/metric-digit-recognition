localStorage.setItem('token',"<%= key %>");

$(document).ready(() => {
    $('#loading').hide();

    $(document).ajaxStart(() => {
        $('#loading').show();
    }).ajaxStop(() => {
        $('#loading').hide();
    })
})