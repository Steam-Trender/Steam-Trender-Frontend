export function getFlagEmoji(language: string): string {
    const languageMap: { [key: string]: string } = {
        arabic: "🇸🇦", // Saudi Arabia
        bulgarian: "🇧🇬", // Bulgaria
        schinese: "🇨🇳", // Simplified Chinese
        tchinese: "🇹🇼", // Traditional Chinese
        czech: "🇨🇿", // Czech Republic
        danish: "🇩🇰", // Denmark
        dutch: "🇳🇱", // Netherlands
        english: "🇺🇸", // United States
        finnish: "🇫🇮", // Finland
        french: "🇫🇷", // France
        german: "🇩🇪", // Germany
        greek: "🇬🇷", // Greece
        hungarian: "🇭🇺", // Hungary
        indonesian: "🇮🇩", // Indonesia
        italian: "🇮🇹", // Italy
        japanese: "🇯🇵", // Japan
        korean: "🇰🇷", // South Korea
        norwegian: "🇳🇴", // Norway
        polish: "🇵🇱", // Poland
        portuguese: "🇵🇹", // Portugal
        brazilian: "🇧🇷", // Brazil
        romanian: "🇷🇴", // Romania
        russian: "🇷🇺", // Russia
        spanish: "🇪🇸", // Spain
        latam: "🇲🇽", // Latin America → Mexico flag
        swedish: "🇸🇪", // Sweden
        thai: "🇹🇭", // Thailand
        turkish: "🇹🇷", // Turkey
        ukrainian: "🇺🇦", // Ukraine
        vietnamese: "🇻🇳", // Vietnam
        koreana: "🇰🇷", // South Korea
    };

    return languageMap[language.toLowerCase()] || "🏳️"; // fallback flag
}
