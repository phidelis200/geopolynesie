interface AppLogoIconProps {
    className?: string;
}

export default function AppLogoIcon({ className }: AppLogoIconProps) {
    return (
        <div className={`relative z-20`}>
            <div className="flex items-center">
                <span className={`text-ocean-800 text-xl ${className} font-bold transition-all duration-300 md:text-3xl lg:text-4xl`}>
                    Géo<span className="text-ocean-500">polynésie</span>
                </span>
            </div>
        </div>
    );
}
