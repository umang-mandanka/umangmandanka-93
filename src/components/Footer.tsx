
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Umang Mandnaka. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6">
            <button 
              onClick={scrollToTop}
              className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="text-primary h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
