export const getLanguageById = (lang) => {

    const language = {
        "c++" : 105,
        "java" : 96,
        "javascript" : 102,
        "c" : 104,
        "go" : 107,
        "kotlin" : 111,
        "php" : 98,
        "python" : 109,
        "ruby" : 72,
        "rust" : 108,
        "swift" : 83,
        "typescript" : 101,


    }

    return language[lang.toLowerCase()];
}