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
                    {/* <iframe title="Video Presentation" src="/Media/video.mp4" id="Home-Presentation-Media" preload='none' loop={true} type="video/mp4" autoPlay controls muted></iframe> */}
                    {/* <img loading='lazy' src="https://www.techspot.com/images2/news/bigimage/2020/07/2020-07-20-image.png" alt="Main Image" id="Home-Presentation-Media" /> */}
                    <iframe id="Home-Presentation-Media" width="1300" height="728" src={`https://www.youtube.com/embed/WPt-kuKnOG0?autoplay=1&mute=1&color=white&controls=0&hl=${localStorage.getItem('lang')}&loop=1&modestbranding=1&playsinline=1&rel=0&showinfo=0&playlist=WPt-kuKnOG0`} title="Lip dub Lycée Français de Madrid LFM" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
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


            <hr/>
            <h2 id='Home-FAQ-Title' className='Home-SectionTitle'>FAQ</h2>


            <div id="Home-FAQ-Container">
                        <section className="Home-FAQ">
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
                        <section className="Home-FAQ">
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