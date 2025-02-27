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

// fileWrite('src/files/output_file_z1.txt', '1 функция записи в файл сообщения');

function fileRead($fileName){
    $fs.readFile($fileName, 'utf8', function ($error, $text) {
        if($error){
            return console.log('Произошла ошибка! Видимо выбранного файла не существует! =^(');
        }
        console.log(`Результатом прочтения файла стало:\n${$text.toString()}`);
    })
}

// fileRead('src/files/input_file_z2.txt');

function fileChangeInformation($filename, $newMessage){
    // 3 Задание информация, которая была в файле раньше =^)
    console.log(`Прошлая информация:\n${$fs.readFileSync($filename).toString()}\n`);

    $fs.writeFile($filename, $newMessage, function ($error) {
        if($error){
            return console.log("Произошла ошибка при записи информации в файл! =^(");
        }
        console.log('Выбранный файл был успешно изменён! =^)');
    });
}

// fileChangeInformation("src/files/input_file_z3.txt", "3 задание функция изменения данных в файле, Новая информация");

function fileDelete($fileName){
    $fs.unlink($fileName, function ($error) {
        if($error){
            return console.log('Произошла ошибка! Видимо выбранного файла не существует! =^(');
        }
        console.log(`Файл "${$fileName}" был успешно удалён! =^)`);
    })
}

fileDelete('src/files/deleted_file_z4.txt');