import Link from 'next/link';

export default function HeroStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-8 items-center w-full px-4">
            {/* Reviews section */}
            <div className="text-center md:text-left text-sm sm:text-base text-white font-medium md:ml-4">
                <p>⭐⭐⭐⭐⭐ <span className="main-color-text">The best sports graphics generator I've used!</span> - John D.</p>
                <p className="mt-4 md:mt-6">⭐⭐⭐⭐⭐ <span className="main-color-text">Instant, professional-quality graphics. Easy to use!</span> - Sarah M.</p>
                <p className="mt-4 md:mt-6">⭐⭐⭐⭐⭐ <span className="main-color-text">A game-changer for content creators!</span> - Alex P.</p>
                <p className="mt-4 md:mt-6">Rating Badge: 4.8/5 ⭐ Trusted by thousands of users!</p>
            </div>

            {/* Stats and CTA section */}
            <div className="flex flex-col items-center md:items-start justify-center mt-6 md:mt-0">
                <div className="text-center">
                    <p className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">10,000+</p>
                    <p className="text-white text-xl md:text-2xl lg:text-3xl mb-6 font-bold">Graphics Made Monthly!</p>
                </div>
                <Link href="/graphic">
                    <button className="md:ml-[3.5rem] rounded-full main-color-bg text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-test p-3 sm:p-4 lg:p-5 cursor-pointer flex items-center justify-center">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
}