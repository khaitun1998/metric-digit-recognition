const _token = sessionStorage.getItem('metric_box_token');

$(document).ready(function () {
	metricBoxObj.getData();
});

let metricBoxObj = Object.create({
	getData: function(start_month = '', end_month = '', token=_token){
		$.ajax({
			url:`/api/metric-box-digit?start_month=${start_month}&&end_month=${end_month}`,
			method: 'GET',
			beforeSend: xhr => {
				xhr.setRequestHeader('x-access-token', token);
			},
			success: r => {
				if(r.success === true){
					let tmp = r.data;

					tmp.forEach(function(value){
						value.date = moment(value.date).format('MM/YYYY');
					})

					let result = { }, arr_count = [];
					for(let i = 0; i < tmp.length; ++i) {
						if(!result[tmp[i].date])
							result[tmp[i].date] = 0;
						++result[tmp[i].date];
					}

					Object.keys(result).forEach(value => {
						arr_count.push({
							date: value,
							count: result.value
						})
					})

					console.log(result);
					console.log(arr_count);
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
})
