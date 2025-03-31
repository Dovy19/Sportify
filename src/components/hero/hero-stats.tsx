import Link from "next/link";

export default function HeroStats() {
    return (
        <div className="grid grid-cols-[5fr_7fr] items-center w-full">
            {/* Left-aligned "Reviews" text */}
            <div className=" text-base text-white font-medium ml-4">
                <p>⭐⭐⭐⭐⭐ <span className="main-color-text">The best sports graphics generator I've used!</span> - John D.</p>
                <p className="mt-6">⭐⭐⭐⭐⭐ <span className="main-color-text ">Instant, professional-quality graphics. Easy to use!</span> - Sarah M.</p>
                <p className="mt-6">⭐⭐⭐⭐⭐ <span className="main-color-text ">A game-changer for content creators!</span> - Alex P.</p>
                <p className="mt-6">Rating Badge:  4.8/5 ⭐ Trusted by thousands of users!</p>
            </div>

            {/* Centered content */}
            <div className="flex flex-col items-start justify-center">
                <div className="text-center">
                    <p className="text-white text-6xl font-bold"> 10,000+</p>
                    <p className="text-white text-3xl mb-6 font-bold">Graphics Made Monthly!</p>
                </div>
                <Link href="/graphic" className="ml-12">
                    <button className="rounded-full main-color-bg text-white font-bold text-4xl drop-shadow-test p-5 cursor-pointer flex items-center justify-center">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
}