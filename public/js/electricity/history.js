const _token = sessionStorage.getItem('metric_box_token');

$(document).ready(function () {
    historyObj.getHistory();

    $('#buttonYes').on('click', function(){
        let dataID = $('#dataID').val();

        historyObj.deleteHistory(dataID);
    })
});

let historyObj = Object.create({
    getHistory: function(start_month = '', end_month = '', token=_token){
        $.ajax({
            url:`/api/metric-box-digit?start_month=${start_month}&&end_month=${end_month}`,
            method: 'GET',
            beforeSend: xhr => {
                xhr.setRequestHeader('x-access-token', token);
            },
            success: r => {
                if(r.success === true){
                    console.log(r.data);

                    $('table#historyTable > tbody').empty();

                    r.data.forEach(function(value){
                        let parseToken = parseJwt(token),
                            image_path = `/uploads/${parseToken.data}/${value.image_file_name}`

                        $('table#historyTable > tbody')
                            .append(`<tr>
                                        <td>${value.ID}</td>
                                        <td>${moment(value.date).format('MM/YYYY')}</td>
                                        <td><img src="${image_path}" width="250" height="auto"></img></td>
                                        <td>${value.digit}</td>
                                        <td>
                                            <button type="button" class="btn btn-danger btn-sm btn-rounded buttonDelete waves-effect waves-light" data-toggle="modal" data-target="#modalDeleteCell" onclick="$('#dataID').empty().val(${value.ID})">
                                                <i class="fas fa-trash-alt ml-1"></i>
                                            </button>
                                        </td>
                                    </tr>`)

                    })
                }
                else{
                    toastr.warning(r.message);
                }
            },
            error: () => {
                toastr.error('Đã có lỗi xảy ra. Xin vui lòng thử lại');
            }
        })
    },

    deleteHistory: function(dataID, token = _token){
        $.ajax({
            url: `/api/metric-box-digit/${dataID}`,
            method: 'DELETE',
            beforeSend: xhr => {
                xhr.setRequestHeader('x-access-token', token);
            },
            success: r => {
                if(r.success === true){
                    toastr.success('Xóa thành công');
                    historyObj.getHistory();
                }
                else{
                    toastr.warning(r.message);
                }
            },
            error: () => {
                toastr.error('Đã có lỗi xảy ra. Xin vui lòng thử lại');
            }
        })
    }
})

let parseJwt = token => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
