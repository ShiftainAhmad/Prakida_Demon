import { SiInstagram, SiGmail, SiGooglemaps } from "react-icons/si";

const Footer = () => {
    return (
        <footer id="footer" className="bg-black border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-16">
                    <div className="text-center md:text-left">
                        <a href="#" className="text-3xl font-display font-bold text-white mb-4 block">PRAKIDA</a>
                        <p className="text-gray-500 max-w-sm">
                            Forged in Sportsmanship, Inspired by Hashira. The ultimate inter-college sports festival.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <a href="https://www.instagram.com/bitp_prakrida/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-prakida-flame hover:text-white transition-all" target="_blank">
                            <SiInstagram size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-prakida-sound hover:text-white transition-all">
                            <SiGmail size={20} />
                        </a>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-sm text-gray-600">
                    <div>© 2026 PRAKIDA Sports Fest. All rights reserved.</div>
                    <div className="flex items-center gap-2">
                        <SiGooglemaps size={16} />
                        <span>University Main Ground, Campus Area</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
