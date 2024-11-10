import { useTranslation } from 'react-i18next';
import { Button } from '../../ui/button';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const IMAGES = {
  background: "/src/assets/img/Recording 2024-11-04 072646 dw- Trim (1).gif",
  president: "/src/assets/img/image.png",
  slide1: "/src/assets/img/image copy 4.png",
  slide2: "/src/assets/img/image copy 5.png",
  slide3: "/src/assets/img/image copy 6.png",
  book1: "/src/assets/img/image copy.png",
  book2: "/src/assets/img/image copy 2.png",
  book3: "/src/assets/img/image copy 3.png",
};

function Home() {
  const { t } = useTranslation();
  document.querySelector('title').innerHTML = t('MH');
  const swiperRef = useRef(null);

  const slidesData = [
    { image: IMAGES.slide1, title: "TE", Link: "#" },
    { image: IMAGES.slide2, title: "MW", Link: "#" },
    { image: IMAGES.slide3, title: "HS", Link: "#" },
  ];

  const PresidentLinks = [
    { title: t('Meetings'), link: 'https://www.president.tj/taxonomy/term/5/58' },
    { title: t('Performances'), link: '/president/performances' },
    { title: t('Decrees'), link: '/president/decrees' },
    { title: t('Visits'), link: '/president/visits' },
    { title: t('Messages'), link: '/president/messages' }
  ];

  const PresidentBooksImages = [
    { src: IMAGES.book1, title: t('HC'), href: 'https://moh.tj/wp-content/uploads/2024/05/programm_2016-2020_tj.pdf' },
    { src: IMAGES.book2, title: t('ND'), href: 'https://moh.tj/wp-content/uploads/2024/05/strategiyai_millii_rushdi_cht_baroi_davrai_to_soli_2030.pdf' },
    { src: IMAGES.book3, title: t('HC'), href: 'https://moh.tj/wp-content/uploads/2024/05/programm_2016-2020_tj.pdf' }
  ];

  const PresidentNews = [
    { date: 'J42', desc: 'OM' },
    { date: 'M22', desc: 'OM2' },
    { date: 'M224', desc: 'OM24' },
    { date: 'J12', desc: 'AW' },
    { date: 'J22', desc: 'CAR' },
  ];

  return (
    <div className="w-full">
      <div className='rounded-xl' style={{ backgroundImage: `url("${IMAGES.background}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex flex-col gap-2 p-4 dark:bg-black/30 bg-white/30 backdrop-blur-sm rounded-md shadow-xl items-center">
          <img className="rounded-lg w-full max-w-[200px] h-auto " src={IMAGES.president} alt="President" />
          <h1 className="dark text-center mt-2 text-lg font-semibold xs-450:text-[14px]">{t('PH')}</h1>
          <div className="flex p-4 gap-2 flex-wrap rounded-md shadow-xl dark:bg-black/30 bg-white/40 items-center py-2">
            {PresidentLinks.map((item, index) => (
              <a target='_blank' key={index} href={item.link}>
                <Button variant='outline' className="py-0 dark:hover:text-purple-400 hover:text-purple-700 flex duration-200 px-2">
                  <p>→</p> {item.title}
                </Button>
              </a>
            ))}
          </div>
          <div className="grid grid-cols-3 md-885:text-[14px] sm-690:grid-cols-2 gap-2 col-start-1 col-end-3 p-2  rounded-md shadow-xl items-center py-2">
            {PresidentBooksImages.map((item, index) => (
              <a target='_blank' key={index} href={item.href} className="text-center dark:hover:bg-black/50 hover:bg-white/50 p-3 xs-450:text-[12px] duration-300 rounded-md flex flex-col mx-auto items-center ">
                <img src={item.src} className='rounded-md sm-690:w-[50px]' alt="" />{item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
      <h1 className='text-center text-2xl my-5'>{t("LN")}</h1>
      <div className="relative w-full max-w-[800px] my-5 mx-auto">
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="rounded-lg w-full h-[400px]"
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full flex flex-col justify-end items-start p-14 rounded-lg bg-cover bg-center backdrop-blur-md"
                style={{ backgroundImage: `url("${slide.image}")` }}
              >
                <h2 className="text-xl xs-600:text-sm xs-450:text-xs font-medium drop-shadow-lg dark:bg-black/40 bg-white/40 backdrop-blur-sm p-2 rounded-md mb-2">{t(slide.title)}</h2>
                <Link to={slide.Link} className='xs-450:mx-auto'>
                  <Button>{t('SM')}</Button>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => swiperRef.current.swiper.slidePrev()}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-[40] active:scale-90 p-2 bg-gradient-to-r from-purple-600 to-transparent rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-[40] active:scale-90 p-2 bg-gradient-to-l from-purple-600 to-transparent rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
      <h1 className='text-center text-2xl my-5'>{t("PN")}</h1>
      <Swiper
        direction="vertical"
        slidesPerView="auto"
        mousewheel={true}
        loop={true}
        spaceBetween={10}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 5000 }}
        modules={[Scrollbar, Mousewheel, Autoplay]}
        className="h-[200px] rounded-lg mx-auto"
      >
        {PresidentNews.map((news, i) => (
          <SwiperSlide key={i}>
            <div className="flex w-full mx-auto max-w-[1000px] mb-8 box-border h-[90%] justify-between flex-col gap-2 p-4 py-6 rounded-md dark:shadow-gray-600 duration-200 active:opacity-70 active:scale-90 shadow-2xl items-center">
              <div>
                <p className="text-lg font-semibold text-center">{t(news.date)}</p>
                <p className="text-md font-semibold">{t(news.desc)}</p>
              </div>
              <Link to={`/news/${news.date}`} className="xs-450:mx-auto">
                <Button>{t('RM')}</Button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div></div>
    </div>
  );
}

export default Home;
