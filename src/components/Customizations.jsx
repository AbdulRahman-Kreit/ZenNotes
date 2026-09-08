import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider';

const accentColors = [
    { id: 'blue', name: 'Iris Blue', color: '#2563EB' },
    { id: 'emerald', name: 'Emerald Sage', color: '#059669' },
    { id: 'violet', name: 'Amethyst', color: '#7C3AED' },
    { id: 'amber', name: 'Warm Amber', color: '#D97706' },
    { id: 'rose', name: 'Rose Quartz', color: '#E11D48' },
];

const fonts = [
    { id: 'inter', name: 'Inter (Sans)', family: "'Inter', sans-serif" },
    { id: 'lora', name: 'Lora (Serif)', family: "'Lora', serif" },
    { id: 'mono', name: 'JetBrains (Mono)', family: "'JetBrains Mono', monospace" },
];

export default function Customizations() {
    const { theme, toggleTheme, accentColor, changeAccentColor, font: activeFont, changeFont } = useContext(ThemeContext);

    return (
        <div className='heading flex flex-col justify-center items-center bg-zinc-100 dark:bg-zinc-800/60
        max-w-7xl w-full py-6 md:py-8 px-4 md:px-8 mx-auto rounded-xl gap-y-8 md:gap-y-12 border border-zinc-200 dark:border-zinc-700/60'>
            
            {/* Theme Toggle Section */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full md:w-3/4 lg:w-1/2 gap-4'>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                    Choose the theme:
                </h3>
                <div className='flex items-center'>
                    <span className='text-md md:text-xl font-semibold mr-2'>
                        {theme === 'dark' ? 'Dark' : 'Light'}
                    </span>
                    <button 
                        onClick={toggleTheme} 
                        className='relative inline-flex items-center w-14 h-7 rounded-full ml-1 md:ml-5 accent-bg p-1 transition-colors'
                        aria-label="Toggle Theme"
                    >
                        <span className={`flex items-center justify-center rounded-full w-5 h-5 bg-white text-zinc-900 shadow-md transform transition-transform duration-300 text-xs ${
                            theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
                        }`}>
                            <i className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'} accent-text`}></i>
                        </span>
                    </button>
                </div>
            </div>

            {/* Accent Color Section */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full md:w-3/4 lg:w-1/2 gap-4'>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                    Choose the accent color:
                </h3>
                <div className='flex flex-wrap gap-3 sm:gap-4'>
                    {accentColors.map((color) => {
                        return(
                            <button 
                            key={color.id}
                            title={color.name}
                            onClick={() => changeAccentColor(color.id)}
                            style={{ backgroundColor: color.color }}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                                accentColor === color.id ? 'scale-110 border-black dark:border-white ring-2 ring-zinc-400' : 'border-white'
                            }`}></button>
                        )
                    })}
                </div>
            </div>

            {/* Font Selection Section */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full md:w-3/4 lg:w-1/2 gap-4'>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                    Choose the font:
                </h3>
                <div className='flex flex-wrap gap-2.5 sm:gap-3'>
                    {fonts.map((f) => {
                        const isActive = activeFont === f.id;
                        return(
                            <button 
                            key={f.id}
                            title={f.name}
                            onClick={() => changeFont(f.id)}
                            style={{ fontFamily: f.family }}
                            className={`py-1.5 px-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                                isActive 
                                    ? 'accent-bg text-white border-transparent shadow-md scale-105' 
                                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-600 hover:opacity-80'
                            }`}>
                                {f.name}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}