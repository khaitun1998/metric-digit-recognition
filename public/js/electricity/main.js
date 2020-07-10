const _token = sessionStorage.getItem('metric_box_token');

$(document).ready(function () {
	let electricPriceType = sessionStorage.getItem('metric_box_price_type'),
		roomList = sessionStorage.getItem('metric_box_user_room_list').split(',');

	let defaultRoom = roomList[0];

	roomList.forEach(value => {
		$('select#roomList').append(`<option value="${value}">${value}</option>`)
	})

	$('button.buttonChangeRoom').on('click', () => {
		let room = $('select#roomList').val();

		toastr.success(`Lựa chọn phòng ${room} thành công`);

		metricBoxObj.getData(room);
	})

	parseInt(electricPriceType) === 0
		? $('input[name=price_type]:eq(0)').attr('checked', true)
		: $('input[name=price_type]:eq(1)').attr('checked', true)
			&& $('input#custom_price_value').val(numeral(sessionStorage.getItem('metric_box_custom_price')).format(0,0));

	metricBoxObj.getData(defaultRoom);

	// set price type
	$('button.buttonAdd').on('click', function() {
		let type = $('input[name=price_type]:checked').val();

		if(parseInt(type) === 0){
			sessionStorage.setItem('metric_box_price_type', '0');
			sessionStorage.setItem('metric_box_custom_price', '0');
		}
		else if(parseInt(type) === 1){
			let custom_price = $('input#custom_price_value').val();

			sessionStorage.setItem('metric_box_price_type', '1');
			sessionStorage.setItem('metric_box_custom_price', custom_price);
		}

		toastr.success('Thay đổi thành công. Trang web sẽ được tải lại để cập nhật lại giá');

		setTimeout(function(){
			location.reload()
		}, 2000);
	})
});

let metricBoxObj = Object.create({
	getData: function(room, start_month = '', end_month = '', token=_token){
		$.ajax({
			url:`/api/metric-box-digit?start_month=${start_month}&&end_month=${end_month}&&room=${room}`,
			method: 'GET',
			beforeSend: xhr => {
				xhr.setRequestHeader('x-access-token', token);
			},
			success: async r => {
				if(r.success === true){
					let tmp = r.data;

					$('#electricityTable > tbody').empty();

					tmp.forEach(function(value){
						value.date = moment(value.date).format('MM/YYYY');
					})

					let result = { }, arr_count = [];
					for(let i = 0; i < tmp.length; ++i) {
						if(!result[tmp[i].date])
							result[tmp[i].date] = 0;
						++result[tmp[i].date];
					}

					let keys_arr_sorted = Object.keys(result).sort(),
						tmp_idx = result[keys_arr_sorted[0]];

					for(let i = 0; i < keys_arr_sorted.length; i++){
						if(i === 0){
							arr_count.push({
								date: keys_arr_sorted[i],
								count: tmp_idx
							})
						}
						else{
							tmp_idx += result[keys_arr_sorted[i]]

							arr_count.push({
								date: keys_arr_sorted[i],
								count: tmp_idx
							})
						}
					}

					for(let i = 0; i < arr_count.length; i++){
						let data_length = r.data.length;

						if(i === 0){
							$('#electricityTable > tbody').append(`<tr>
																<td>${numeral(r.data[data_length - arr_count[i].count].room).format(0,0)}</td>
																<td>${r.data[data_length - arr_count[i].count].date}</td>
																<td>Không có dữ liệu</td>
																<td>${numeral(r.data[data_length - arr_count[i].count].digit).format(0,0)}</td>
																<td>Không có dữ liệu</td>
																<td>Không có dữ liệu</td>
															</tr>`)
						}
						else{
							try{
								let electricPriceType = sessionStorage.getItem('metric_box_price_type'),
									customPrice = sessionStorage.getItem('metric_box_custom_price');

								let	tmp = (r.data[data_length - arr_count[i].count].digit - r.data[data_length - arr_count[i - 1].count].digit),
									electricPriceValue;

								console.log(tmp);

									tmp <= 0
										? electricPriceValue = 'Không có dữ liệu'
										: electricPriceValue = await calculateElectricPrice(tmp, electricPriceType, customPrice);

								$('#electricityTable > tbody').append(`<tr>
																<td>${numeral(r.data[data_length - arr_count[i].count].room).format(0,0)}</td>
																<td>${r.data[data_length - arr_count[i].count].date}</td>
																<td>${numeral(r.data[data_length - arr_count[i - 1].count].digit).format(0,0)}</td>
																<td>${numeral(r.data[data_length - arr_count[i].count].digit).format(0,0)}</td>
																<td>${(r.data[data_length - arr_count[i].count].digit
																	- r.data[data_length - arr_count[i - 1].count].digit) < 0 ? 'Không có dữ liệu'
																	: numeral(r.data[data_length - arr_count[i].count].digit
																		- r.data[data_length - arr_count[i - 1].count].digit).format(0,0)}</td>
																<td>${numeral(electricPriceValue).format(0,0)}</td>
															</tr>`)
							}
							catch (e) {
								toastr.error(e);
							}
						}
					}
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

/*
	type 0: default,
	type 1: custom price
 */

function calculateElectricPrice(digit, type, price){
	return new Promise((resolve, reject) => {
		let result;

		if(parseInt(type) === 0){
			if(digit < 50){
				result = digit * 1510;
			}
			else if(digit < 100){
				result = 50 * 1510 + (digit - 50) * 1561;
			}
			else if(digit < 200){
				result = 50 * 1510 + (100 - 50) * 1561 + (digit - 100) * 1813;
			}
			else if(digit < 300){
				result = 50 * 1510 + (100 - 50) * 1561 + (200 - 100) * 1813 + (digit - 200) * 2282;
			}
			else if(digit < 400){
				result = 50 * 1510 + (100 - 50) * 1561 + (200 - 100) * 1813 + (300 - 200) * 2282 + (digit - 300) * 2834;
			}
			else{
				result = 50 * 1510 + (100 - 50) * 1561 + (200 - 100) * 1813 + (300 - 200) * 2282 + (400 - 300) * 2834 + (digit - 400) * 2927;
			}
		}
		else {
			result = price * digit;
		}

		resolve(Math.round(result + (result * 10) / 100))
	})
}
