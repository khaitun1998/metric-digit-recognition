const _token = sessionStorage.getItem('metric_box_token');

$(document).ready(function () {
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');

    $('input[name=uploadImg]').on('change', function(e){
        e.preventDefault();

        let formData = new FormData(this);
    })
});

let uploadImageObj = Object.create({
    img2digit: function(formData, token=_token){
        $.ajax({
            url: '/api/process-image/img2digit',
            method: 'POST',
            beforeSend: xhr => {
                xhr.setRequestHeader('x-access-token', token);
            },
            processData: false,
            contentType: false,
            success: r => {
                if(r.success === true){
                    console.log(r.data)
                }
                else{
                    toastr.warning(r.message);
                }
            },
            error: () => {
                toastr.error(`Xin vui lòng thử lại.`);
            }
        })
    }
})
