import '../assets/Home.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeCarousel from '../components/HomeCarousel';


const OPTIONS = { dragFree: true, loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export default function Home(){
    const [t] = useTranslation('global')


    return (
        <div id="Home-container">
            <div id="Home-Presentation-Container">
                <div id="Home-Presentation-Media-Container">
                    {/* <img loading='lazy' src="https://www.techspot.com/images2/news/bigimage/2020/07/2020-07-20-image.png" alt="Main Image" id="Home-Presentation-Media" /> */}
                    <iframe id="Home-Presentation-Media" width="1300" height="728" src={`https://www.youtube.com/embed/WPt-kuKnOG0?autoplay=1&mute=1&color=white&controls=0&hl=${localStorage.getItem('lang')}&loop=1&modestbranding=1&playsinline=1&rel=0&showinfo=0&playlist=WPt-kuKnOG0`} title="Lip dub Lycée Français de Madrid LFM" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <p id='Home-Description'>{t('Home.Description')}</p>
            </div>
            
            <div className="flex-center">
                <Link to="/auth" id="Home-AuthButton">{t('Home.AuthButton')}</Link>
            </div>

            <br />
            <br />
            <br />

            <h2 className='Home-SectionTitle'>{t('Home.LastReviews')}</h2>

            <HomeCarousel slides={SLIDES} options={OPTIONS} />

            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7504130752436386"
                crossOrigin="anonymous"></script>
            <ins className="adsbygoogle"
                style={{'display':'block'}}
                data-ad-client="ca-pub-7504130752436386"
                data-ad-slot="7301630973"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>


            <hr/>
            <h2 id='Home-FAQ-Title' className='Home-SectionTitle'>FAQ</h2>

            {/* https://whatfix.com/blog/wp-content/uploads/2021/12/Screen-Shot-2021-12-13-at-12.21.26.png */}

            <div id="Home-FAQ-Container">
                        <section class="Home-FAQ">
                                    <details>
                                        <summary>
                                            {t(`FAQ.Q${1}`)}
                                            
                                        </summary>
                                        <p>{t(`FAQ.R${1}`)}</p>
                                    </details>
                                    <details>
                                        <summary>
                                            {t(`FAQ.Q${2}`)}
                                            
                                        </summary>
                                        <p>{t(`FAQ.R${2}`)}</p>
                                    </details>
                        </section>
                        <section class="Home-FAQ">
                                    <details>
                                        <summary>
                                            {t(`FAQ.Q${3}`)}
                                            
                                        </summary>
                                        <p>{t(`FAQ.R${3}`)}</p>
                                    </details>
                                    <details>
                                        <summary>
                                            {t(`FAQ.Q${4}`)}
                                            
                                        </summary>
                                        <p>{t(`FAQ.R${4}`)}</p>
                                    </details>
                        </section>
            </div>
        </div>
    )
}