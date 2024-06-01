$(document).ready(function() {
    // Função para carregar dados da planilha
    function loadData() {
        var timestamp = new Date().getTime();
        $.ajax({
            url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRI2BSsYRmGzu30balUk0UDzwyTdXeyI-RA215Mt3y-44tjQZ1DI5MpjyqcFOzg8b5Q2piuHHia_7Gy/pub?gid=0&single=true&output=csv&_=" + timestamp,
            dataType: 'text',
            success: function(data) {
                var rows = data.split(/\r?\n|\r/);
                var table = '<thead><tr>';
                for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(',');
                    if (i === 0) {
                        for (var j = 0; j < cells.length; j++) {
                            table += '<th>' + cells[j] + '</th>';
                        }
                        table += '</tr></thead><tbody>';
                    } else {
                        table += '<tr>';
                        for (var j = 0; j < cells.length; j++) {
                            table += '<td>' + cells[j] + '</td>';
                        }
                        table += '</tr>';
                    }
                }
                table += '</tbody>';
                $('#tabela').html(table);
            },
            error: function() {
                alert('Erro ao carregar dados da planilha.');
            }
        });
    }

    // Carregar dados ao carregar a página
    loadData();

    $('#addItemForm').submit(function(event) {
        event.preventDefault();
        var form = $(this);

        // Mostrar o pop-up de loading
        $('#loading').show();

        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxWyVSswMpRc_lXWghElfjNKHoiXtDl5CY1M3106L0sFRSTYTBXebDs2vC4DSrBH9bcXg/exec",
            method: "POST",
            data: form.serialize(),
            success: function(response) {
                alert('Item adicionado com sucesso!');

                // Ocultar o pop-up de loading
                $('#loading').hide();

                // Redirecionar e limpar o cache
                var url = window.location.href.split('?')[0];
                window.location.href = url + '?nocache=' + new Date().getTime();
            },
            error: function(error) {
                alert('Erro ao adicionar item: ' + error.responseText);

                // Ocultar o pop-up de loading em caso de erro
                $('#loading').hide();
            }
        });
    });
});