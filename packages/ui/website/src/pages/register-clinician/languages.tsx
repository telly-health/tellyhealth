const languages = [
  {
    id: "ab",
    name: "Abkhaz",
    nativeName: "аҧсуа",
  },
  {
    id: "aa",
    name: "Afar",
    nativeName: "Afaraf",
  },
  {
    id: "af",
    name: "Afrikaans",
    nativeName: "Afrikaans",
  },
  {
    id: "ak",
    name: "Akan",
    nativeName: "Akan",
  },
  {
    id: "sq",
    name: "Albanian",
    nativeName: "Shqip",
  },
  {
    id: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
  },
  {
    id: "ar",
    name: "Arabic",
    nativeName: "العربية",
  },
  {
    id: "an",
    name: "Aragonese",
    nativeName: "Aragonés",
  },
  {
    id: "hy",
    name: "Armenian",
    nativeName: "Հայերեն",
  },
  {
    id: "as",
    name: "Assamese",
    nativeName: "অসমীয়া",
  },
  {
    id: "av",
    name: "Avaric",
    nativeName: "авар мацӀ, магӀарул мацӀ",
  },
  {
    id: "ae",
    name: "Avestan",
    nativeName: "avesta",
  },
  {
    id: "ay",
    name: "Aymara",
    nativeName: "aymar aru",
  },
  {
    id: "az",
    name: "Azerbaijani",
    nativeName: "azərbaycan dili",
  },
  {
    id: "bm",
    name: "Bambara",
    nativeName: "bamanankan",
  },
  {
    id: "ba",
    name: "Bashkir",
    nativeName: "башҡорт теле",
  },
  {
    id: "eu",
    name: "Basque",
    nativeName: "euskara, euskera",
  },
  {
    id: "be",
    name: "Belarusian",
    nativeName: "Беларуская",
  },
  {
    id: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
  },
  {
    id: "bh",
    name: "Bihari",
    nativeName: "भोजपुरी",
  },
  {
    id: "bi",
    name: "Bislama",
    nativeName: "Bislama",
  },
  {
    id: "bs",
    name: "Bosnian",
    nativeName: "bosanski jezik",
  },
  {
    id: "br",
    name: "Breton",
    nativeName: "brezhoneg",
  },
  {
    id: "bg",
    name: "Bulgarian",
    nativeName: "български език",
  },
  {
    id: "my",
    name: "Burmese",
    nativeName: "ဗမာစာ",
  },
  {
    id: "ca",
    name: "Catalan; Valencian",
    nativeName: "Català",
  },
  {
    id: "ch",
    name: "Chamorro",
    nativeName: "Chamoru",
  },
  {
    id: "ce",
    name: "Chechen",
    nativeName: "нохчийн мотт",
  },
  {
    id: "ny",
    name: "Chichewa; Chewa; Nyanja",
    nativeName: "chiCheŵa, chinyanja",
  },
  {
    id: "zh",
    name: "Chinese",
    nativeName: "中文 (Zhōngwén), 汉语, 漢語",
  },
  {
    id: "cv",
    name: "Chuvash",
    nativeName: "чӑваш чӗлхи",
  },
  {
    id: "kw",
    name: "Cornish",
    nativeName: "Kernewek",
  },
  {
    id: "co",
    name: "Corsican",
    nativeName: "corsu, lingua corsa",
  },
  {
    id: "cr",
    name: "Cree",
    nativeName: "ᓀᐦᐃᔭᐍᐏᐣ",
  },
  {
    id: "hr",
    name: "Croatian",
    nativeName: "hrvatski",
  },
  {
    id: "cs",
    name: "Czech",
    nativeName: "česky, čeština",
  },
  {
    id: "da",
    name: "Danish",
    nativeName: "dansk",
  },
  {
    id: "dv",
    name: "Divehi; Dhivehi; Maldivian;",
    nativeName: "ދިވެހި",
  },
  {
    id: "nl",
    name: "Dutch",
    nativeName: "Nederlands, Vlaams",
  },
  {
    id: "en",
    name: "English",
    nativeName: "English",
  },
  {
    id: "eo",
    name: "Esperanto",
    nativeName: "Esperanto",
  },
  {
    id: "et",
    name: "Estonian",
    nativeName: "eesti, eesti keel",
  },
  {
    id: "ee",
    name: "Ewe",
    nativeName: "Eʋegbe",
  },
  {
    id: "fo",
    name: "Faroese",
    nativeName: "føroyskt",
  },
  {
    id: "fj",
    name: "Fijian",
    nativeName: "vosa Vakaviti",
  },
  {
    id: "fi",
    name: "Finnish",
    nativeName: "suomi, suomen kieli",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "français, langue française",
  },
  {
    id: "ff",
    name: "Fula; Fulah; Pulaar; Pular",
    nativeName: "Fulfulde, Pulaar, Pular",
  },
  {
    id: "gl",
    name: "Galician",
    nativeName: "Galego",
  },
  {
    id: "ka",
    name: "Georgian",
    nativeName: "ქართული",
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
  },
  {
    id: "el",
    name: "Greek, Modern",
    nativeName: "Ελληνικά",
  },
  {
    id: "gn",
    name: "Guaraní",
    nativeName: "Avañeẽ",
  },
  {
    id: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
  },
  {
    id: "ht",
    name: "Haitian; Haitian Creole",
    nativeName: "Kreyòl ayisyen",
  },
  {
    id: "ha",
    name: "Hausa",
    nativeName: "Hausa, هَوُسَ",
  },
  {
    id: "he",
    name: "Hebrew",
    nativeName: "עברית",
  },
  {
    id: "iw",
    name: "Hebrew",
    nativeName: "עברית",
  },
  {
    id: "hz",
    name: "Herero",
    nativeName: "Otjiherero",
  },
  {
    id: "hi",
    name: "Hindi",
    nativeName: "हिन्दी, हिंदी",
  },
  {
    id: "ho",
    name: "Hiri Motu",
    nativeName: "Hiri Motu",
  },
  {
    id: "hu",
    name: "Hungarian",
    nativeName: "Magyar",
  },
  {
    id: "ia",
    name: "Interlingua",
    nativeName: "Interlingua",
  },
  {
    id: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
  },
  {
    id: "ie",
    name: "Interlingue",
    nativeName: "Originally called Occidental; then Interlingue after WWII",
  },
  {
    id: "ga",
    name: "Irish",
    nativeName: "Gaeilge",
  },
  {
    id: "ig",
    name: "Igbo",
    nativeName: "Asụsụ Igbo",
  },
  {
    id: "ik",
    name: "Inupiaq",
    nativeName: "Iñupiaq, Iñupiatun",
  },
  {
    id: "io",
    name: "Ido",
    nativeName: "Ido",
  },
  {
    id: "is",
    name: "Icelandic",
    nativeName: "Íslenska",
  },
  {
    id: "it",
    name: "Italian",
    nativeName: "Italiano",
  },
  {
    id: "iu",
    name: "Inuktitut",
    nativeName: "ᐃᓄᒃᑎᑐᑦ",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語 (にほんご／にっぽんご)",
  },
  {
    id: "jv",
    name: "Javanese",
    nativeName: "basa Jawa",
  },
  {
    id: "kl",
    name: "Kalaallisut, Greenlandic",
    nativeName: "kalaallisut, kalaallit oqaasii",
  },
  {
    id: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
  },
  {
    id: "kr",
    name: "Kanuri",
    nativeName: "Kanuri",
  },
  {
    id: "ks",
    name: "Kashmiri",
    nativeName: "कश्मीरी, كشميري‎",
  },
  {
    id: "kk",
    name: "Kazakh",
    nativeName: "Қазақ тілі",
  },
  {
    id: "km",
    name: "Khmer",
    nativeName: "ភាសាខ្មែរ",
  },
  {
    id: "ki",
    name: "Kikuyu, Gikuyu",
    nativeName: "Gĩkũyũ",
  },
  {
    id: "rw",
    name: "Kinyarwanda",
    nativeName: "Ikinyarwanda",
  },
  {
    id: "ky",
    name: "Kirghiz, Kyrgyz",
    nativeName: "кыргыз тили",
  },
  {
    id: "kv",
    name: "Komi",
    nativeName: "коми кыв",
  },
  {
    id: "kg",
    name: "Kongo",
    nativeName: "KiKongo",
  },
  {
    id: "ko",
    name: "Korean",
    nativeName: "한국어 (韓國語), 조선말 (朝鮮語)",
  },
  {
    id: "ku",
    name: "Kurdish",
    nativeName: "Kurdî, كوردی‎",
  },
  {
    id: "kj",
    name: "Kwanyama, Kuanyama",
    nativeName: "Kuanyama",
  },
  {
    id: "la",
    name: "Latin",
    nativeName: "latine, lingua latina",
  },
  {
    id: "lb",
    name: "Luxembourgish, Letzeburgesch",
    nativeName: "Lëtzebuergesch",
  },
  {
    id: "lg",
    name: "Luganda",
    nativeName: "Luganda",
  },
  {
    id: "li",
    name: "Limburgish, Limburgan, Limburger",
    nativeName: "Limburgs",
  },
  {
    id: "ln",
    name: "Lingala",
    nativeName: "Lingála",
  },
  {
    id: "lo",
    name: "Lao",
    nativeName: "ພາສາລາວ",
  },
  {
    id: "lt",
    name: "Lithuanian",
    nativeName: "lietuvių kalba",
  },
  {
    id: "lu",
    name: "Luba-Katanga",
    nativeName: "",
  },
  {
    id: "lv",
    name: "Latvian",
    nativeName: "latviešu valoda",
  },
  {
    id: "gv",
    name: "Manx",
    nativeName: "Gaelg, Gailck",
  },
  {
    id: "mk",
    name: "Macedonian",
    nativeName: "македонски јазик",
  },
  {
    id: "mg",
    name: "Malagasy",
    nativeName: "Malagasy fiteny",
  },
  {
    id: "ms",
    name: "Malay",
    nativeName: "bahasa Melayu, بهاس ملايو‎",
  },
  {
    id: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
  },
  {
    id: "mt",
    name: "Maltese",
    nativeName: "Malti",
  },
  {
    id: "mi",
    name: "Māori",
    nativeName: "te reo Māori",
  },
  {
    id: "mr",
    name: "Marathi (Marāṭhī)",
    nativeName: "मराठी",
  },
  {
    id: "mh",
    name: "Marshallese",
    nativeName: "Kajin M̧ajeļ",
  },
  {
    id: "mn",
    name: "Mongolian",
    nativeName: "монгол",
  },
  {
    id: "na",
    name: "Nauru",
    nativeName: "Ekakairũ Naoero",
  },
  {
    id: "nv",
    name: "Navajo, Navaho",
    nativeName: "Diné bizaad, Dinékʼehǰí",
  },
  {
    id: "nb",
    name: "Norwegian Bokmål",
    nativeName: "Norsk bokmål",
  },
  {
    id: "nd",
    name: "North Ndebele",
    nativeName: "isiNdebele",
  },
  {
    id: "ne",
    name: "Nepali",
    nativeName: "नेपाली",
  },
  {
    id: "ng",
    name: "Ndonga",
    nativeName: "Owambo",
  },
  {
    id: "nn",
    name: "Norwegian Nynorsk",
    nativeName: "Norsk nynorsk",
  },
  {
    id: "no",
    name: "Norwegian",
    nativeName: "Norsk",
  },
  {
    id: "ii",
    name: "Nuosu",
    nativeName: "ꆈꌠ꒿ Nuosuhxop",
  },
  {
    id: "nr",
    name: "South Ndebele",
    nativeName: "isiNdebele",
  },
  {
    id: "oc",
    name: "Occitan",
    nativeName: "Occitan",
  },
  {
    id: "oj",
    name: "Ojibwe, Ojibwa",
    nativeName: "ᐊᓂᔑᓈᐯᒧᐎᓐ",
  },
  {
    id: "cu",
    name:
      "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
    nativeName: "ѩзыкъ словѣньскъ",
  },
  {
    id: "om",
    name: "Oromo",
    nativeName: "Afaan Oromoo",
  },
  {
    id: "or",
    name: "Oriya",
    nativeName: "ଓଡ଼ିଆ",
  },
  {
    id: "os",
    name: "Ossetian, Ossetic",
    nativeName: "ирон æвзаг",
  },
  {
    id: "pa",
    name: "Panjabi, Punjabi",
    nativeName: "ਪੰਜਾਬੀ, پنجابی‎",
  },
  {
    id: "pi",
    name: "Pāli",
    nativeName: "पाऴि",
  },
  {
    id: "fa",
    name: "Persian",
    nativeName: "فارسی",
  },
  {
    id: "pl",
    name: "Polish",
    nativeName: "polski",
  },
  {
    id: "ps",
    name: "Pashto, Pushto",
    nativeName: "پښتو",
  },
  {
    id: "pt",
    name: "Portuguese",
    nativeName: "Português",
  },
  {
    id: "qu",
    name: "Quechua",
    nativeName: "Runa Simi, Kichwa",
  },
  {
    id: "rm",
    name: "Romansh",
    nativeName: "rumantsch grischun",
  },
  {
    id: "rn",
    name: "Kirundi",
    nativeName: "kiRundi",
  },
  {
    id: "ro",
    name: "Romanian, Moldavian, Moldovan",
    nativeName: "română",
  },
  {
    id: "ru",
    name: "Russian",
    nativeName: "русский язык",
  },
  {
    id: "sa",
    name: "Sanskrit (Saṁskṛta)",
    nativeName: "संस्कृतम्",
  },
  {
    id: "sc",
    name: "Sardinian",
    nativeName: "sardu",
  },
  {
    id: "sd",
    name: "Sindhi",
    nativeName: "सिन्धी, سنڌي، سندھی‎",
  },
  {
    id: "se",
    name: "Northern Sami",
    nativeName: "Davvisámegiella",
  },
  {
    id: "sm",
    name: "Samoan",
    nativeName: "gagana faa Samoa",
  },
  {
    id: "sg",
    name: "Sango",
    nativeName: "yângâ tî sängö",
  },
  {
    id: "sr",
    name: "Serbian",
    nativeName: "српски језик",
  },
  {
    id: "gd",
    name: "Scottish Gaelic; Gaelic",
    nativeName: "Gàidhlig",
  },
  {
    id: "sn",
    name: "Shona",
    nativeName: "chiShona",
  },
  {
    id: "si",
    name: "Sinhala, Sinhalese",
    nativeName: "සිංහල",
  },
  {
    id: "sk",
    name: "Slovak",
    nativeName: "slovenčina",
  },
  {
    id: "sl",
    name: "Slovene",
    nativeName: "slovenščina",
  },
  {
    id: "so",
    name: "Somali",
    nativeName: "Soomaaliga, af Soomaali",
  },
  {
    id: "st",
    name: "Southern Sotho",
    nativeName: "Sesotho",
  },
  {
    id: "es",
    name: "Spanish; Castilian",
    nativeName: "español, castellano",
  },
  {
    id: "su",
    name: "Sundanese",
    nativeName: "Basa Sunda",
  },
  {
    id: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
  },
  {
    id: "ss",
    name: "Swati",
    nativeName: "SiSwati",
  },
  {
    id: "sv",
    name: "Swedish",
    nativeName: "svenska",
  },
  {
    id: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
  },
  {
    id: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
  },
  {
    id: "tg",
    name: "Tajik",
    nativeName: "тоҷикӣ, toğikī, تاجیکی‎",
  },
  {
    id: "th",
    name: "Thai",
    nativeName: "ไทย",
  },
  {
    id: "ti",
    name: "Tigrinya",
    nativeName: "ትግርኛ",
  },
  {
    id: "bo",
    name: "Tibetan Standard, Tibetan, Central",
    nativeName: "བོད་ཡིག",
  },
  {
    id: "tk",
    name: "Turkmen",
    nativeName: "Türkmen, Түркмен",
  },
  {
    id: "tl",
    name: "Tagalog",
    nativeName: "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔",
  },
  {
    id: "tn",
    name: "Tswana",
    nativeName: "Setswana",
  },
  {
    id: "to",
    name: "Tonga (Tonga Islands)",
    nativeName: "faka Tonga",
  },
  {
    id: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
  },
  {
    id: "ts",
    name: "Tsonga",
    nativeName: "Xitsonga",
  },
  {
    id: "tt",
    name: "Tatar",
    nativeName: "татарча, tatarça, تاتارچا‎",
  },
  {
    id: "tw",
    name: "Twi",
    nativeName: "Twi",
  },
  {
    id: "ty",
    name: "Tahitian",
    nativeName: "Reo Tahiti",
  },
  {
    id: "ug",
    name: "Uighur, Uyghur",
    nativeName: "Uyƣurqə, ئۇيغۇرچە‎",
  },
  {
    id: "uk",
    name: "Ukrainian",
    nativeName: "українська",
  },
  {
    id: "ur",
    name: "Urdu",
    nativeName: "اردو",
  },
  {
    id: "uz",
    name: "Uzbek",
    nativeName: "zbek, Ўзбек, أۇزبېك‎",
  },
  {
    id: "ve",
    name: "Venda",
    nativeName: "Tshivenḓa",
  },
  {
    id: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
  },
  {
    id: "vo",
    name: "Volapük",
    nativeName: "Volapük",
  },
  {
    id: "wa",
    name: "Walloon",
    nativeName: "Walon",
  },
  {
    id: "cy",
    name: "Welsh",
    nativeName: "Cymraeg",
  },
  {
    id: "wo",
    name: "Wolof",
    nativeName: "Wollof",
  },
  {
    id: "fy",
    name: "Western Frisian",
    nativeName: "Frysk",
  },
  {
    id: "xh",
    name: "Xhosa",
    nativeName: "isiXhosa",
  },
  {
    id: "yi",
    name: "Yiddish",
    nativeName: "ייִדיש",
  },
  {
    id: "yo",
    name: "Yoruba",
    nativeName: "Yorùbá",
  },
  {
    id: "za",
    name: "Zhuang, Chuang",
    nativeName: "Saɯ cueŋƅ, Saw cuengh",
  },
]

export default languages
