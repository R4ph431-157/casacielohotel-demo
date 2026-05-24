import Hero from '../components/sections/Hero';
import BookingBar from '../components/sections/BookingBar';
import Intro from '../components/sections/Intro';
import PhotoShowcase from '../components/sections/PhotoShowcase';
import Testimonial from '../components/sections/Testimonial';
import PageFooter from '../components/layout/PageFooter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BookingBar />
      <Intro />
      <PhotoShowcase />
      <Testimonial />
      <PageFooter />
    </>
  );
}
