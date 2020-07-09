const _token = sessionStorage.getItem('metric_box_token');

$(document).ready(function () {
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');

    // img2digit
    $('#upload-img').on('change', function(){
        readURL(this);

        let formData = new FormData(),
            imageType = ['image/jpeg', 'image/png'],
            fileType = $('#upload-img').prop('files')[0].type;

        formData.append('metric_box_image', $('#upload-img')[0].files[0]);

        imageType.includes(fileType)
            ? uploadImageObj.img2digit(formData)
            : toastr.error('Tệp tải lên không hợp lệ. Vui lòng chỉ lựa chọn loại tệp tin là ẢNH khi tải lên hệ thống!');
    })

    // save image + digit
    $('form').on('submit', function(e){
        e.preventDefault();

        let formData = new FormData(this),
            imageType = ['image/jpeg', 'image/png'],
            fileType = $('#upload-img').prop('files')[0].type;

        imageType.includes(fileType)
            ? uploadImageObj.saveImage(formData)
            : toastr.error('Tệp tải lên không hợp lệ. Vui lòng chỉ lựa chọn loại tệp tin là ẢNH khi tải lên hệ thống!');
    })
});

function readURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        $('div.image-upload')
            .empty()
            .append('<img class="img-upl" src="#">');

        reader.onload = function (e) {
            $('img.img-upl').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}

let uploadImageObj = Object.create({
    img2digit: function(formData, token=_token){
        $.ajax({
            url: '/api/process-image/img2digit',
            method: 'POST',
            beforeSend: xhr => {
                xhr.setRequestHeader('x-access-token', token);
            },
            data: formData,
            processData: false,
            contentType: false,
            success: r => {
                if(r.success === true){
                    toastr.success('Số hóa thành công. Vui lòng kiểm tra chỉ sổ và sửa lại cho đúng');
                    $('input[name="digit_value"]').empty().val(r.data);
                    console.log(r);
                }
                else{
                    toastr.warning(r.message);
                }
            },
            error: () => {
                toastr.error(`Xin vui lòng thử lại.`);
            }
        })
    },

    saveImage: function(formData, token=_token){
        $.ajax({
            url: '/api/metric-box-digit',
            method: 'POST',
            beforeSend: xhr => {
                xhr.setRequestHeader('x-access-token', token);
            },
            data: formData,
            processData: false,
            contentType: false,
            success: r => {
                r.success === true
                    ? toastr.success('Đăng kí dữ liệu mới thành công')
                    : toastr.warning(r.message);
            },
            error: () => {
                toastr.error('Đã có lỗi xảy ra. Vui lòng thử lại sau!')
            }
        })
    }
})
