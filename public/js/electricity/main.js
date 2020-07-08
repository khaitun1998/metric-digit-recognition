$(document).ready(function () {
    $('#electricityTable').DataTable();
    $('#electricityTable_wrapper').find('label').each(function () {
        $(this).parent().append($(this).children());
    });
    $('#electricityTable_wrapper .dataTables_length').addClass('d-flex flex-row');
    $('#electricityTable_wrapper .dataTables_filter').addClass('md-form');
    $('#electricityTable_wrapper select').removeClass(
        'custom-select custom-select-sm form-control form-control-sm');
    $('#electricityTable_wrapper select').addClass('mdb-select');
    $('#electricityTable_wrapper .mdb-select').materialSelect();
    $('#electricityTable_wrapper .dataTables_filter').find('label').remove();
});