import React, {useEffect,useState,useCallback,useMemo,lazy,Suspense,} from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../src/App.css";
import Cookies from "js-cookie";
import Loader from "../../../../ReusableComponents/Loader/loader";
import {
  useGetRoundQuery,
  useGetAnnounceQuery,
  useUserDataQuery,
} from "../dashBoard/DashboardApliSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CoinRewardModal from './CoinReward'
const ActionButtons = lazy(() => import("./actionComponent/actionCompent"));
const TopCards = lazy(() => import("./cards/cards"));
const SlabTabs = lazy(() => import("./timeTracker/timeTracker"));
const CoinPricePopup=lazy(()=>import("../../../../pages/popups/Coinprice"))
const Dashboard = () => {
  const navigate = useNavigate();
   const [showModal, setShowModal] = useState(false);
  const [modalShownOnce, setModalShownOnce] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const token = Cookies.get("token");
  const { data: userData, refetch: userRefetch } = useUserDataQuery(undefined, {
  skip: !isTokenVerified,
});

const handleComplete = useCallback(async (coins) => {
  setShowModal(false);
  setTotalCoins((prev) => prev + coins);
  console.log(`User earned ${coins} coins!`);
  await userRefetch();
}, [userRefetch]);

  useEffect(() => {
    if (token) {
      setIsTokenVerified(true);
    }
  }, [token]);


  const { data: apiData, refetch: refetchRounds } = useGetRoundQuery();
  const shouldFetch = apiData?.data?.isActiveAnnouncement === true;
  const { data: announceData, isLoading: announceLoading } = useGetAnnounceQuery(
    undefined,
    { skip: !shouldFetch }
  );

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


useEffect(() => {
    const userId = userData?.data?._id || userData?.data?.username || userData?.data?.email;
    if (
      userData?.data &&
      userId &&
      userData?.data?.isRegistrationBonusAwarded === false &&
      userData?.data?.fullKyc === 'approve' &&
      !modalShownOnce
    ) {
      setShowModal(true);
      setModalShownOnce(true);
    }
  }, [userData, modalShownOnce]);

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false,
      pauseOnHover: true,
      adaptiveHeight: true,
    }),
    []
  );


  const showAnnouncementSlider =
    apiData?.data?.isActiveAnnouncement && announceData?.data?.[0]?.slides;

  return (
    <div className="min-h-screen p-0 bg-[#1d8e85] rounded-xl text-sm sm:text-base md:text-lg overflow-auto">

      {/* {showAnnouncementSlider && (
        <>
          <style>{`
            .announcement-slider {
              position: relative;
              // padding-bottom: 8px;
              // margin-bottom: 5px;
            }

            .announcement-slider .slick-slide img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 8px;
            }

            .custom-dots {
              position: absolute;
              bottom: -2px;
              left: 0;
              right: 0;
              width: 100%;
              display: flex !important;
              flex-direction: row;
              flex-wrap: nowrap;
              justify-content: center;
              align-items: center;
              margin: 0 auto;
              padding: 0;
              list-style: none;
              height: 10px;
              text-align: center;
            }

            .custom-dots li {
              display: inline-flex;
              margin: 0 3px;
              vertical-align: middle;
              height: 6px;
            }

            .custom-dots li button {
              padding: 0;
              border: 0;
              background: transparent;
              display: block;
              height: 6px;
              width: 6px;
              border-radius: 50%;
              background-color: rgba(255, 255, 255, 0.5);
              font-size: 0;
              line-height: 0;
              cursor: pointer;
              transition: all 0.3s ease;
            }

            .custom-dots li.slick-active button {
              width: 18px;
              border-radius: 3px;
              background-color: white;
            }

            .slider-container {
              overflow: visible !important;
              position: relative;
              padding:3px;
            }
          `}</style>

          <div className="w-full px-1 sm:px-2 mb-1 block md:hidden">
            <div className="announcement-slider max-w-sm sm:max-w-md mx-auto rounded-lg relative ">
              

              <Slider
                {...settings}
                dotsClass="custom-dots"
                customPaging={(i) => <button aria-label={`Slide ${i + 1}`} />}
                className="slider-container "
              >
                {announceData.data[0].slides.map((slide, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                  >
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </>
      )} */}

<CoinPricePopup/>
      <div className="bg-gray-900 flex flex-col items-center justify-center gap-6">
      <CoinRewardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onComplete={handleComplete}
      />
    </div>


    
      <div className="mb-3">
        <Suspense fallback={<Loader />}>
          <ActionButtons />
        </Suspense>
      </div>



      <div className="flex flex-col lg:flex-row gap-2 mb-3">
        <div className="lg:w-1/3">
          <Suspense fallback={<Loader />}>
            <SlabTabs />
          </Suspense>
        </div>

        <div className="w-full">
          <Suspense fallback={<Loader />}>
            <TopCards />
          </Suspense>
        </div>
      </div>

    </div>
  );
};

export default React.memo(Dashboard);