import { useTranslation } from "react-i18next"

export default function CookiePolicy(){
    const [t] = useTranslation('global');
    return (
        <div className="LegalText">
            <h1>{t("cookie_policy.title")}</h1>
            <p>{t("cookie_policy.intro")}</p>

            <h2>{t("cookie_policy.section1.title")}</h2>
            <p>{t("cookie_policy.section1.description")}</p>

            <h2>{t("cookie_policy.section2.title")}</h2>
            <ul>
                <li><strong>{t("cookie_policy.section2.advertising.title")}</strong> {t("cookie_policy.section2.advertising.description")}</li>
            </ul>

            <h2>{t("cookie_policy.section3.title")}</h2>
            <p><strong>{t("cookie_policy.section3.advertising.title")}</strong> {t("cookie_policy.section3.advertising.description")}</p>

            <h2>{t("cookie_policy.section4.title")}</h2>
            <p>{t("cookie_policy.section4.description")}</p>

            <h2>{t("cookie_policy.section5.title")}</h2>
            <p>{t("cookie_policy.section5.description", { email: "help@lfmreviews.com" })}</p>
        </div>
    )
}