import { useHashRoute, Layout, RouteWipe } from "./components.jsx";
import { HomePage } from "./pages/Home.jsx";
import {
  ServicesHubPage,
  ServiceDetailPage,
  NotFoundFragment,
} from "./pages/Services.jsx";
import {
  CaseStudiesPage,
  PortfolioPage,
  BlogPage,
  CareersPage,
} from "./pages/Listings.jsx";
import { AboutPage, ContactPage, LegalPage } from "./pages/AboutContact.jsx";

export default function App() {
  const route = useHashRoute();
  let page = null;

  if (route === "/") {
    page = <HomePage />;
  } else if (route === "/services") {
    page = <ServicesHubPage />;
  } else if (route.startsWith("/services/")) {
    const slug = route.replace(/^\/services\//, "");
    page = <ServiceDetailPage slug={slug} />;
  } else if (route === "/case-studies") {
    page = <CaseStudiesPage />;
  } else if (route === "/portfolio") {
    page = <PortfolioPage />;
  } else if (route === "/about") {
    page = <AboutPage />;
  } else if (route === "/blog") {
    page = <BlogPage />;
  } else if (route === "/careers") {
    page = <CareersPage />;
  } else if (route === "/contact") {
    page = <ContactPage />;
  } else if (route === "/privacy") {
    page = <LegalPage kind="privacy" />;
  } else if (route === "/terms") {
    page = <LegalPage kind="terms" />;
  } else {
    page = <NotFoundFragment label={route} />;
  }

  return (
    <Layout>
      <RouteWipe route={route} />
      <div className="page-transition" key={route}>
        {page}
      </div>
    </Layout>
  );
}
