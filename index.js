const $fs = require('fs');

function fileWrite($fileName, $message){
    // Запись в файл
    $fs.writeFile($fileName, $message, function ($error) {
        if($error){
            return console.log("Произошла ошибка при записи информации в файл! =^(");
        }
        console.log("Запись произошла успешно! =^)");
    });
}


fileWrite('src/files/output_file_z1.txt', '1 функция записи в файл сообщения');