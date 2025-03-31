
interface HeroTextProps {
    heading: string,
    subheading: string,
}

export default function HeroText({heading, subheading} : HeroTextProps) {
    return (
        <div className="ml-6">
            <h1 className="text-8xl font-bold mb-4 text-white">Viral <span className="main-color-text">{heading}</span> In Seconds</h1>
            <p className="text-4xl text-white mb-6">Turn <span className="main-color-text font-bold">legendary moments </span> and <span className="main-color-text font-bold">interviews </span>{subheading} <span className="font-bold main-color-text">effortlessly</span></p>
        </div>
    )
}