$(document).ready(function () {
    $('#historyTable').DataTable();
    $('#historyTable_wrapper').find('label').each(function () {
        $(this).parent().append($(this).children());
    });
    $('#historyTable_wrapper .dataTables_length').addClass('d-flex flex-row');
    $('#historyTable_wrapper .dataTables_filter').addClass('md-form');
    $('#historyTable_wrapper select').removeClass(
        'custom-select custom-select-sm form-control form-control-sm');
    $('#historyTable_wrapper select').addClass('mdb-select');
    $('#historyTable_wrapper .mdb-select').materialSelect();
    $('#historyTable_wrapper .dataTables_filter').find('label').remove();
});