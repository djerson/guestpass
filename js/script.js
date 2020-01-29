/**
 * Created by Jerson on 02/11/2018.
 */

+ function($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

    var startUpload = function(files) {
        // console.log(files)
        for(var i=0; i < files.length; i++)
        {
            var file = files[i]

            if(files[i].type === 'application/vnd.ms-excel')
            {
                extractDataFromFile(file)

                showError(false,file)
            }else{
                showError(true,file)
            }
        }
    }
    
    var extractDataFromFile = function (file) {
        var reader = new FileReader()
        reader.onload = (function () {
            var lines = reader.result.split('\n');
            var htmlContents = '<div id="row">';
            for(var i=1; i< lines.length - 1; i++)
            {
                var line = lines[i].split(',');
                var name = line[0];
                var pass = line[1];
                htmlContents += '<div class="item"><div class="item-head">'+pass+'</div>';
                var expireAt = line[3];
                var d = new Date(expireAt);
                var h = d.toTimeString().split(' ')[0];
                htmlContents += '<div class="item-body"><table width="100%"><tr><td class="item-body-title">' +
                                '- Available : </td> <td class="item-body-value">'+d.toDateString()+'</td></tr>';

                htmlContents += '<tr><td class="item-body-title">- At : </td>' +
                                '<td class="item-body-value">'+h+'</td></tr>'
                htmlContents += '</table></div><table width="100%" border="5px" class="item-head">' +
                                '<tr><td class="item-number"><div>'+i+'</div></td>'
                htmlContents += '<td class="item-msg">Please enjoy it!</td></tr>'
                htmlContents += ' </table></div>'
            }
            htmlContents += '</div>';
            $('#content').append(htmlContents);
        })
        reader.readAsText(file)
    }



    var showError = function (bool,file) {
        if(bool){
            $('.js-upload-finished').show()
            $('.js-upload-finished .list-group')
                .append('<div class="list-group-item list-group-item-warning">' +
                    '<span class="badge alert-warning pull-right">Failed</span>' +
                    file.name+'</div>')
        }else{
            $('.js-upload-finished').show()
            $('.js-upload-finished .list-group')
                .append('<div class="list-group-item list-group-item-success">' +
                    '<span class="badge alert-success pull-right">Success</span>' +
                    file.name+'</div>')
        }
    }

    uploadForm.addEventListener('submit', function(e) {

        var uploadFiles = document.getElementById('js-upload-files').files;
        e.preventDefault()

        startUpload(uploadFiles)
    })

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

}(jQuery);
