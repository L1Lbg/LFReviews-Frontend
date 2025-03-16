import { useTranslation } from "react-i18next"

export default function TOS(){
    const [t] = useTranslation("global")
    return (
        <div className="LegalText">
            <h1>{t("tos.title")}</h1>

            <h2>{t("tos.section1.title")}</h2>
            <p>{t("tos.section1.description", { url: "http://www.lfmreviews.com" })}</p>

            <h2>{t("tos.section2.title")}</h2>
            <p>{t("tos.section2.description")}</p>
            <ul>
                <li>{t("tos.section2.rules.respect")}</li>
                <li>{t("tos.section2.rules.no_inappropriate")}</li>
                <li>{t("tos.section2.rules.laws")}</li>
            </ul>
            <p>{t("tos.section2.consequences")}</p>

            <h2>{t("tos.section3.title")}</h2>
            <p>{t("tos.section3.description")}</p>

            <h2>{t("tos.section4.title")}</h2>
            <p>{t("tos.section4.description")}</p>

            <h2>{t("tos.section5.title")}</h2>
            <p>{t("tos.section5.description")}</p>

            <h2>{t("tos.section6.title")}</h2>
            <p>{t("tos.section6.description")}</p>

            <h2>{t("tos.section7.title")}</h2>
            <p>{t("tos.section7.description", { email: "help@lfmreviews.com" })}</p>

            <h2>{t("tos.section8.title")}</h2>
            <p>{t("tos.section8.description")}</p>

            <h2>{t("tos.section9.title")}</h2>
            <p>{t("tos.section9.description")}</p>

            <h2>{t("tos.section10.title")}</h2>
            <p>{t("tos.section10.description", { email: "help@lfmreviews.com" })}</p>
        </div>
    )
}