import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/layout/Layout';

const HomePage        = lazy(() => import('./pages/HomePage'));
const AboutPage       = lazy(() => import('./pages/AboutPage'));
const RoomsPage       = lazy(() => import('./pages/RoomsPage'));
const ServicesPage    = lazy(() => import('./pages/ServicesPage'));
const GalleryPage     = lazy(() => import('./pages/GalleryPage'));
const AttractionsPage = lazy(() => import('./pages/AttractionsPage'));
const LocationPage    = lazy(() => import('./pages/LocationPage'));
const ReservationsPage = lazy(() => import('./pages/ReservationsPage'));
const ContactPage     = lazy(() => import('./pages/ContactPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/"             element={<HomePage />} />
              <Route path="/about"        element={<AboutPage />} />
              <Route path="/rooms"        element={<RoomsPage />} />
              <Route path="/services"     element={<ServicesPage />} />
              <Route path="/gallery"      element={<GalleryPage />} />
              <Route path="/attractions"  element={<AttractionsPage />} />
              <Route path="/location"     element={<LocationPage />} />
              <Route path="/contact"      element={<ContactPage />} />
              <Route path="/reservations" element={<ReservationsPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}
