import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import ContactContent from "../layouts/contactpage/ContactContent";
import ContactInfo from "../layouts/contactpage/ContactInfo";

function ContactPage() {
  return (
    <>
      <Header />

      <ContactInfo />
      <ContactContent />
      <Footer />
    </>
  );
}

export default ContactPage;
