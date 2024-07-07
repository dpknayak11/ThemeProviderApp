import { useEffect } from 'react';
// import livetv from '../../images/live-tv.png'
let theme = {};

export const useTheme = () => {

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('domainSetting'));
        theme = {
            backgroundColor: storedData?.themeSetting?.backgroundColor || '#463636',
            aboutUs: storedData?.themeSetting?.aboutUs || "<p><br></p>",
            cacheUrl: storedData?.themeSetting?.cacheUrl || " https://centerpanelsocket.apipro.in/v1/api/oddsData?market_id=1.224123690 ",
            contactUs: storedData?.themeSetting?.contactUs || "<p>asdfasdf</p>",
            country: storedData?.themeSetting?.country || "India",
            currency: storedData?.themeSetting?.currency || "INR",
            darkThemeColor: storedData?.themeSetting?.darkThemeColor || "#ee1414",
            language: storedData?.themeSetting?.language || "Hindi",
            lightThemeColor: storedData?.themeSetting?.lightThemeColor || "#c8e90e",
            scoreUrl: storedData?.themeSetting?.scoreUrl || "asdfasdfa",
            siteName: storedData?.themeSetting?.siteName || "localhost",
            socketUrl: storedData?.themeSetting?.socketUrl || " https://bsf1010.pro ",
            tvUrl: storedData?.themeSetting?.tvUrl || " https://stream.1ex99.com/tv2?EventId=32975936 ",
            websiteType: storedData?.themeSetting?.websiteType || "b2b",
            title: storedData?.themeSetting?.title || "Welcome to localhost:3000",
            userNotification: storedData?.themeSetting?.userNotification || "sdfgasdfa",
            apiKey: storedData?.apiKey || { talkTo: false },
            talkTo: storedData?.talkTo || false,
            assignAgentId: storedData?.assignAgentId || "65a561ed5a2909761a9f7d1f",
            assignSubownerId: storedData?.assignSubownerId || "65a55d765a2909761a9f7b80",
            banner: storedData?.banner || [{ name: "Testbanner", priority: "1", image: "1706682002325.png" }],
            clientNotification: storedData?.clientNotification || "sdfgasdfa",
            domainId: storedData?.domainId || "65b36160601ba9adb81e29ce",
            domainName: storedData?.domainName || "localhost:3000",
            domainUrl: storedData?.domainUrl || " http://localhost:3000 ",
            // favicon: { livetv },
            favicon: storedData?.favicon || "1706515279800.png",
            helplineNumber: storedData?.helplineNumber || 13131,
            isAffilation: storedData?.isAffilation || false,
            isRegister: storedData?.isRegister || false,
            // logo: "../../images/sidebar-logo.png",
            registerBonus: storedData?.registerBonus || 1,
            socialMedia: storedData?.socialMedia || { facebookLink: "facebooklinkasdf", instaLink: "instalinkasdf", linkedInLink: "linkedinlinkasdf" },
            telegramLink: storedData?.telegramLink || "telegramlinkadf",
            sportsSetting: storedData?.sportsSetting || {
                isCricket: true,
                isSoccer: true,
                isTennis: true,
                isIntCasino: true,
                isDiamondCasino: true,
                isGreyHound: true,
                isHorseRacing: true,
                isKabaddi: true,
                isPolitics: true,
            },
            status: storedData?.status || true,
            whatsappNumber: storedData?.whatsappNumber || 6667777,
        };
    }, []);
    return theme;
};

export const ThemeProvider = ({ children }) => children;


// jaha component us hoga :

//  const { backgroundColor } = useTheme();


//  <div className="overflow-hidden h-screen"
//       style={{ backgroundColor }}
    // ></div>