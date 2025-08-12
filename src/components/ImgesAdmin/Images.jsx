import { useGetSplashImageQuery, useGetSliderImagesQuery } from "./ImagesAdminApiSlice";

export default function ImagesUpload() {
  const { data: splash, isLoading: splashLoading } = useGetSplashImageQuery();
  const { data: sliders, isLoading: slidersLoading } = useGetSliderImagesQuery();

  if (splashLoading || slidersLoading) return <p>Loading...</p>;

  return (
    <div>
      {splash && <img src={splash.imageUrl} alt="Splash" />}
      {sliders?.map((slider) => (
        <img key={slider._id} src={slider.imageUrl} alt="Slider" />
      ))}
    </div>
  );
}
 