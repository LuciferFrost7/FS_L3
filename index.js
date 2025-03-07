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
    });
}

// fileDelete('src/files/deleted_file_z4.txt');

function fileUnNoise($fileName){
    try {
        function unNoise($str) {
            const confirmChars = "qwertyuiopasdfghjklzxcvbnm' ";
            let $finalString = '';
            let $count = 0;
            for (let $i = 0; $i < $str.length; $i++) {
                if (confirmChars.includes($str[$i].toLowerCase())) {
                    $finalString += $str[$i].toLowerCase();
                    continue;
                }
                $count++;
            }
            return {"string": $finalString, "count": $count};
        }

        // $$$A$$$$$$b/*-!@#$!@#o!@#$@#^$&^*!@236461283%$$#470b12341234a 123421341$$$$$$2344f!_@#+o12830$@948r ME it's s0ome23$$$$$4123th111in-03214g
        let $result = unNoise($fs.readFileSync($fileName).toString());
        $fs.writeFileSync($fileName, $result["string"]);
        if($result['count']) {
            console.log(`Из файла "${$fileName}" было отчищено (${$result["count"]}) шумов! =^)`);
        }else{
            console.log(`Файл "${$fileName}" не содержит шумов!`);
        }
    }catch(e){
        console.log('Ошибка! Видимо данного файла не существует! =^(');
    }
}

// fileUnNoise('src/files/noise_file_z5.txt');

function copyFileInformation($firstFileName, $secondFileName){
    let $text;
    try{
        $text = $fs.readFileSync($firstFileName).toString();
    }catch(e){
        return console.log(`Ошибка! Видимо первого файла, ${$firstFileName}, не существует! =^(`);
    }
    try{
        $fs.writeFile($secondFileName, $text, function ($error) {
            if($error){
                return console.log('Ошибка при копировании в несуществующий файл! =^(');
            }
            console.log('Данные успешно скопированы в файл! =^)');
        });
    }catch(e){
        return console.log(`Ошибка! Видимо второго файла, ${$secondFileName}, не существует! =^(`);
    }
}

// copyFileInformation('src/files/input_file_z6.txt', 'src/files/output_file_z6.txt');

function directoryCreate($directoryName){
    $fs.mkdir($directoryName, function($error){
        if($error){
            return console.log(`Ошибка при создании папки! =^(`);
        }
        console.log(`Директория ${$directoryName} успешно создана! =^)`)
    });
}


// directoryCreate("src/new_folder");

function directoryDelete($directoryName){
    $fs.rmdir($directoryName, function($error){
        if($error){
            return console.log(`Ошибка при удалении папки! Видимо выбранная папка ${$directoryName} не существует =^(`);
        }
        console.log(`Директория ${$directoryName} успешно удалена! =^)`);
    });
}

// directoryDelete('src/new_folder');

function getAllFilesInDirectory() {
    function getFilesNamesFromDirectory($directoryPath) {
        try {
            let $files = $fs.readdirSync($directoryPath);
            let $lst_dir = {};
            if ($files) {
                for (let $i = 0; $i < $files.length; $i++) {
                    $lst_dir[$files[$i]] = getFilesNamesFromDirectory($directoryPath + '/' + $files[$i]);
                }
            }
            return $lst_dir;
        } catch (e) {
            return 'file';
        }
    }
    return {"src" : getFilesNamesFromDirectory('src')};
}

// console.log(getAllFilesInDirectory());

let $serviceFiles = [
    'src',
    'src\\files',
    'src\\files\\input_file_z2.txt',
    'src\\files\\input_file_z3.txt',
    'src\\files\\input_file_z6.txt',
    'src\\files\\noise_file_z5.txt',
    'src\\libs',
    'src\\libs\\deleted_file_z4.txt'
];

function deleteAllFilesInDirectory() {
    function deleteFilesFromMainDirectory($directoryPath) {
        try{
            let $files = $fs.readdirSync($directoryPath);
            if ($files) {
                for (let $i = 0; $i < $files.length; $i++) {
                    deleteFilesFromMainDirectory($directoryPath + '/' + $files[$i]);
                    let $flag = true;
                    let $fullPath = $fs.realpathSync($directoryPath + '/' + $files[$i]);
                    for(let $j  = 0; $j < $serviceFiles.length; $j++) {
                        if($fullPath.endsWith($serviceFiles[$j])){
                            $flag = false;
                            break;
                        }
                    }
                    if($flag){
                        $fs.rmdir($directoryPath + '/' + $files[$i], function($error){
                            if($error){
                            }
                        });
                        $fs.unlink($directoryPath + '/' + $files[$i], function ($error) {
                            if($error){
                                return console.log('Произошла ошибка! Видимо выбранного файла или директории не существует! =^(');
                            }
                        });
                        console.log(`Директория или файл ${$directoryPath + '/' + $files[$i]} Удалён успешно!`);
                    }
                }
            }
        } catch (e) {
        }
    }
    deleteFilesFromMainDirectory('src');
}

deleteAllFilesInDirectory();