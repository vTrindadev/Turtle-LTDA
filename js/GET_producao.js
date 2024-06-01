$(document).ready(function() {
    function loadData(spreadsheetUrl, tableId) {
        $.ajax({
            url: spreadsheetUrl,
            dataType: 'text',
            success: function(data) {
                var rows = data.split(/\r?\n|\r/);
                var tableBody = $(tableId).find('tbody');
                tableBody.empty(); // Clear the table body to avoid appending duplicate rows
                rows.forEach((row, i) => {
                    if (i === 0) return; // Skip header row
                    var cells = row.split(',');
                    var tableRow = $('<tr></tr>');
                    cells.forEach((cell, j) => {
                        if (j === 1) { // Assume that the second column is the "Status" column
                            var select = $('<select></select>');
                            select.append('<option value="Finalizado">Finalizado</option>');
                            select.append('<option value="Em produção">Em produção</option>');
                            select.append('<option value="A Fazer">A Fazer</option>');
                            select.val(cell);
                            tableRow.append($('<td></td>').append(select));
                        } else {
                            tableRow.append('<td>' + cell + '</td>');
                        }
                    });
                    tableBody.append(tableRow);
                });
            },
            error: function() {
                alert('Erro ao carregar dados da planilha.');
            }
        });
    }

    function updateAllStatus() {
        var updates = [];
        $('#area-tabelas .box-tabela').each(function() {
            var tableId = $(this).find('table').attr('id');
            var sheetName = tableId === 'tabela-atuador' ? 'Atuador' : 'Eixo-Transmissão';
            $(this).find('tbody tr').each(function(rowIndex) {
                var selectedStatus = $(this).find('select').val();
                updates.push({
                    sheetName: sheetName,
                    rowIndex: rowIndex + 1, // Adjust for header row
                    status: selectedStatus
                });
            });
        });

        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbxWyVSswMpRc_lXWghElfjNKHoiXtDl5CY1M3106L0sFRSTYTBXebDs2vC4DSrBH9bcXg/exec',
            method: 'POST',
            data: JSON.stringify(updates),
            contentType: 'application/json',
            success: function(response) {
                alert('Status atualizado com sucesso!');
            },
            error: function() {
                alert('Erro ao atualizar status.');
            }
        });
    }

    // URLs das planilhas
    var atuadorUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRI2BSsYRmGzu30balUk0UDzwyTdXeyI-RA215Mt3y-44tjQZ1DI5MpjyqcFOzg8b5Q2piuHHia_7Gy/pub?gid=347287913&single=true&output=csv";
    var transmissaoUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRI2BSsYRmGzu30balUk0UDzwyTdXeyI-RA215Mt3y-44tjQZ1DI5MpjyqcFOzg8b5Q2piuHHia_7Gy/pub?gid=1071554471&single=true&output=csv";

    // Carregar dados
    loadData(atuadorUrl, '#tabela-atuador');
    loadData(transmissaoUrl, '#tabela-transmissao');

    // Event listener for save all button
    $('#save-all').on('click', updateAllStatus);
});
