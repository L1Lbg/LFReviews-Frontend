import { useTranslation } from 'react-i18next';
import '../assets/LegalTexts.css';

export default function PrivacyPolicy() {
    const [t] = useTranslation('global')

    return (
        <div className="LegalText">
      <h1>{t("privacy_policy.title")}</h1>
      <p dangerouslySetInnerHTML={{ __html: t("privacy_policy.intro", { siteUrl: "https://www.lfmreviews.com" }) }}></p>

      <h2>{t("privacy_policy.section1.title")}</h2>
      <ul>
        <li>
          <strong>{t("privacy_policy.section1.personal_info.title")}</strong>{" "}
          {t("privacy_policy.section1.personal_info.description")}
        </li>
        <li>
          <strong>{t("privacy_policy.section1.usage_data.title")}</strong>{" "}
          {t("privacy_policy.section1.usage_data.description")}
        </li>
        <li>
          <strong>{t("privacy_policy.section1.cookies.title")}</strong>{" "}
          <span dangerouslySetInnerHTML={{ __html: t("privacy_policy.section1.cookies.description", { cookiePolicyUrl: "/politique-des-cookies" }) }}></span>
        </li>
      </ul>

      <h2>{t("privacy_policy.section2.title")}</h2>
      <ul>
        <li>
          <strong>{t("privacy_policy.section2.account_management.title")}</strong>{" "}
          {t("privacy_policy.section2.account_management.description")}
        </li>
        <li>
          <strong>{t("privacy_policy.section2.communications.title")}</strong>{" "}
          {t("privacy_policy.section2.communications.description")}
        </li>
        <li>
          <strong>{t("privacy_policy.section2.advertising.title")}</strong>{" "}
          {t("privacy_policy.section2.advertising.description")}
        </li>
      </ul>

      <h2>{t("privacy_policy.section3.title")}</h2>
      <p>{t("privacy_policy.section3.intro")}</p>
      <ul>
        <li>
          <strong>{t("privacy_policy.section3.service_providers.title")}</strong>{" "}
          {t("privacy_policy.section3.service_providers.description")}
        </li>
        <li>
          <strong>{t("privacy_policy.section3.legal_compliance.title")}</strong>{" "}
          {t("privacy_policy.section3.legal_compliance.description")}
        </li>
      </ul>

      <h2>{t("privacy_policy.section4.title")}</h2>
      <ul>
        <li>
          <strong>{t("privacy_policy.section4.deletion.title")}</strong>{" "}
          {t("privacy_policy.section4.deletion.description")}
        </li>
        <li>
          <strong>{t("privacy_policy.section4.opt_out.title")}</strong>{" "}
          {t("privacy_policy.section4.opt_out.description")}
        </li>
      </ul>

      <h2>{t("privacy_policy.section5.title")}</h2>
      <p>{t("privacy_policy.section5.description")}</p>

      <h2>{t("privacy_policy.section6.title")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("privacy_policy.section6.description", { email: "help@lfmreviews.com" }) }}></p>
    </div>
    );
}