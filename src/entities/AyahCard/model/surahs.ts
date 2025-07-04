export const surahs: Record<string, { arabic: string; russian: string; azerbaijani: string }> = {
    1: { arabic: "الفاتحة", russian: "Открывающая", azerbaijani: "Fatiha" },
    2: { arabic: "البقرة", russian: "Корова", azerbaijani: "Bəqərə" },
    3: { arabic: "آل عمران", russian: "Семейство Имрана", azerbaijani: "Əl-İmran" },
    4: { arabic: "النساء", russian: "Женщины", azerbaijani: "Nisa" },
    5: { arabic: "المائدة", russian: "Трапеза", azerbaijani: "Maidə" },
    6: { arabic: "الأنعام", russian: "Скот", azerbaijani: "Ənam" },
    7: { arabic: "الأعراف", russian: "Перегороженные", azerbaijani: "Ə'raf" },
    8: { arabic: "الأنفال", russian: "Добыча", azerbaijani: "Ənfal" },
    9: { arabic: "التوبة", russian: "Покаяние", azerbaijani: "Tövbə" },
    10: { arabic: "يونس", russian: "Юнус", azerbaijani: "Yunus" },
    11: { arabic: "هود", russian: "Худ", azerbaijani: "Hud" },
    12: { arabic: "يوسف", russian: "Юсуф", azerbaijani: "Yusif" },
    13: { arabic: "الرعد", russian: "Гром", azerbaijani: "Rəd" },
    14: { arabic: "ابراهيم", russian: "Ибрахим", azerbaijani: "İbrahim" },
    15: { arabic: "الحجر", russian: "Камень", azerbaijani: "Hicr" },
    16: { arabic: "النحل", russian: "Пчёлы", azerbaijani: "Nəhl" },
    17: { arabic: "الإسراء", russian: "Ночное путешествие", azerbaijani: "İsra" },
    18: { arabic: "الكهف", russian: "Пещера", azerbaijani: "Kəhf" },
    19: { arabic: "مريم", russian: "Мариям", azerbaijani: "Məryəm" },
    20: { arabic: "طه", russian: "Таха", azerbaijani: "Taha" },
    21: { arabic: "الأنبياء", russian: "Пророки", azerbaijani: "Ənbiya" },
    22: { arabic: "الحج", russian: "Паломничество", azerbaijani: "Həcc" },
    23: { arabic: "المؤمنون", russian: "Верующие", azerbaijani: "Mü’minun" },
    24: { arabic: "النور", russian: "Свет", azerbaijani: "Nur" },
    25: { arabic: "الفرقان", russian: "Различение", azerbaijani: "Furqan" },
    26: { arabic: "الشعراء", russian: "Поэты", azerbaijani: "Şuəra" },
    27: { arabic: "النمل", russian: "Муравьи", azerbaijani: "Nəml" },
    28: { arabic: "القصص", russian: "Истории", azerbaijani: "Qəsəs" },
    29: { arabic: "العنكبوت", russian: "Паук", azerbaijani: "Ənkəbut" },
    30: { arabic: "الروم", russian: "Римляне", azerbaijani: "Rum" },
    31: { arabic: "لقمان", russian: "Лукман", azerbaijani: "Luqman" },
    32: { arabic: "السجدة", russian: "Поклон", azerbaijani: "Səcdə" },
    33: { arabic: "الأحزاب", russian: "Союзники", azerbaijani: "Əhzab" },
    34: { arabic: "سبإ", russian: "Саба", azerbaijani: "Səba" },
    35: { arabic: "فاطر", russian: "Творец", azerbaijani: "Fatir" },
    36: { arabic: "يس", russian: "Йа Син", azerbaijani: "Yasin" },
    37: { arabic: "الصافات", russian: "Стоящие рядами", azerbaijani: "Saffat" },
    38: { arabic: "ص", russian: "Цад", azerbaijani: "Sad" },
    39: { arabic: "الزمر", russian: "Толпы", azerbaijani: "Zumər" },
    40: { arabic: "غافر", russian: "Прощающий", azerbaijani: "Ğafir" },
    41: { arabic: "فصلت", russian: "Разъяснённые", azerbaijani: "Fəsilət" },
    42: { arabic: "الشورى", russian: "Совет", azerbaijani: "Şura" },
    43: { arabic: "الزخرف", russian: "Украшения", azerbaijani: "Zuxruf" },
    44: { arabic: "الدخان", russian: "Дым", azerbaijani: "Duxan" },
    45: { arabic: "الجاثية", russian: "Наклоняющаяся", azerbaijani: "Casiyə" },
    46: { arabic: "الأحقاف", russian: "Песчаные холмы", azerbaijani: "Əhqaf" },
    47: { arabic: "محمد", russian: "Мухаммад", azerbaijani: "Məhəmməd" },
    48: { arabic: "الفتح", russian: "Победа", azerbaijani: "Fətih" },
    49: { arabic: "الحجرات", russian: "Комнаты", azerbaijani: "Hucurat" },
    50: { arabic: "ق", russian: "Каф", azerbaijani: "Qaf" },
    51: { arabic: "الذاريات", russian: "Рассеиватели", azerbaijani: "Zariyat" },
    52: { arabic: "الطور", russian: "Гора", azerbaijani: "Tur" },
    53: { arabic: "النجم", russian: "Звезда", azerbaijani: "Nəcəm" },
    54: { arabic: "القمر", russian: "Луна", azerbaijani: "Qəmər" },
    55: { arabic: "الرحمن", russian: "Милостивый", azerbaijani: "Rəhman" },
    56: { arabic: "الواقعة", russian: "Происшествие", azerbaijani: "Vaqiə" },
    57: { arabic: "الحديد", russian: "Железо", azerbaijani: "Hədid" },
    58: { arabic: "المجادلة", russian: "Спор", azerbaijani: "Məcaələ" },
    59: { arabic: "الحشر", russian: "Сбор", azerbaijani: "Həşr" },
    60: { arabic: "الممتحنة", russian: "Испытуемая", azerbaijani: "Mümtəhənə" },
    61: { arabic: "الصف", russian: "Ряд", azerbaijani: "Saff" },
    62: { arabic: "الجمعة", russian: "Пятница", azerbaijani: "Cümə" },
    63: { arabic: "المنافقون", russian: "Лицемеры", azerbaijani: "Münafiqun" },
    64: { arabic: "التغابن", russian: "Взаимное заблуждение", azerbaijani: "Təğabun" },
    65: { arabic: "الطلاق", russian: "Развод", azerbaijani: "Talaq" },
    66: { arabic: "التحريم", russian: "Запрещение", azerbaijani: "Təhərim" },
    67: { arabic: "الملك", russian: "Царство", azerbaijani: "Mülk" },
    68: { arabic: "القلم", russian: "Перо", azerbaijani: "Qalam" },
    69: { arabic: "الحاقة", russian: "Непременное", azerbaijani: "Haaqqə" },
    70: { arabic: "المعارج", russian: "Ступени", azerbaijani: "Məa’aric" },
    71: { arabic: "نوح", russian: "Нух", azerbaijani: "Nuh" },
    72: { arabic: "الجن", russian: "Джинны", azerbaijani: "Cinn" },
    73: { arabic: "المزّمّل", russian: "Обёрнутый в покрывало", azerbaijani: "Müzzəmmil" },
    74: { arabic: "المدّثر", russian: "Закутавшийся", azerbaijani: "Müddəssir" },
    75: { arabic: "القيامة", russian: "Воскресение", azerbaijani: "Qiyamə" },
    76: { arabic: "الإنسان", russian: "Человек", azerbaijani: "İnsan" },
    77: { arabic: "المرسلات", russian: "Посланники", azerbaijani: "Mürsilat" },
    78: { arabic: "النبأ", russian: "Весть", azerbaijani: "Nəbə" },
    79: { arabic: "النازعات", russian: "Вырывающие", azerbaijani: "Nazi'at" },
    80: { arabic: "عبس", russian: "Он нахмурился", azerbaijani: "Abasa" },
    81: { arabic: "التكوير", russian: "Скручивание", azerbaijani: "Təkvir" },
    82: { arabic: "الإنفطار", russian: "Раскалывание", azerbaijani: "İnfitār" },
    83: { arabic: "المطفّفين", russian: "Обвешивающие", azerbaijani: "Mutəffinun" },
    84: { arabic: "الإنشقاق", russian: "Расщепление", azerbaijani: "İnşiqaq" },
    85: { arabic: "البروج", russian: "Созвездия", azerbaijani: "Büruc" },
    86: { arabic: "الطارق", russian: "Ночной путник", azerbaijani: "Tariq" },
    87: { arabic: "الأعلى", russian: "Всевышний", azerbaijani: "A'la" },
    88: { arabic: "الغاشية", russian: "Обрушивающаяся", azerbaijani: "Ğaşiya" },
    89: { arabic: "الفجر", russian: "Рассвет", azerbaijani: "Fəcr" },
    90: { arabic: "البلد", russian: "Город", azerbaijani: "Bələd" },
    91: { arabic: "الشمس", russian: "Солнце", azerbaijani: "Şəms" },
    92: { arabic: "الليل", russian: "Ночь", azerbaijani: "Layl" },
    93: { arabic: "الضحى", russian: "Утро", azerbaijani: "Duhə" },
    94: { arabic: "الشرح", russian: "Раскрытие", azerbaijani: "Şərh" },
    95: { arabic: "التين", russian: "Инжир", azerbaijani: "Tiin" },
    96: { arabic: "العلق", russian: "Сгусток", azerbaijani: "Əlaq" },
    97: { arabic: "القدر", russian: "Могущества", azerbaijani: "Qədr" },
    98: { arabic: "البينة", russian: "Ясное доказательство", azerbaijani: "Bəyinə" },
    99: { arabic: "الزلزلة", russian: "Землетрясение", azerbaijani: "Zəlzələ" },
    100: { arabic: "العاديات", russian: "Галопирующие", azerbaijani: "Adiyat" },
    101: { arabic: "القارعة", russian: "Сокрушительное событие", azerbaijani: "Qariə" },
    102: { arabic: "التكاثر", russian: "Соперничество", azerbaijani: "Təkasur" },
    103: { arabic: "العصر", russian: "Время", azerbaijani: "Asr" },
    104: { arabic: "الهمزة", russian: "Осуждающий", azerbaijani: "Həməzə" },
    105: { arabic: "الفيل", russian: "Слон", azerbaijani: "Fil" },
    106: { arabic: "قريش", russian: "Курайш", azerbaijani: "Quraysh" },
    107: { arabic: "الماعون", russian: "Малое подаяние", azerbaijani: "Məun" },
    108: { arabic: "الكوثر", russian: "Изобилие", azerbaijani: "Kausar" },
    109: { arabic: "الكافرون", russian: "Неверующие", azerbaijani: "Kafirun" },
    110: { arabic: "النصر", russian: "Помощь", azerbaijani: "Nəsr" },
    111: { arabic: "المسد", russian: "Верёвка", azerbaijani: "Məsəd" },
    112: { arabic: "الإخلاص", russian: "Искренность", azerbaijani: "İxlas" },
    113: { arabic: "الفلق", russian: "Рассвет", azerbaijani: "Fələq" },
    114: { arabic: "الناس", russian: "Люди", azerbaijani: "Nəs" },
  };
  