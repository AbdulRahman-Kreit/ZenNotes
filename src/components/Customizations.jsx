import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeProvider'

export default function Customizations() {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <div className='heading flex flex-row justify-between items-center py-5'>
            <div className='flex items-center'>
                <span className='textmd md:text-xl font-semibold'>
                    Dark Mode
                </span>
                <button onClick={toggleTheme} className='theme-switcher relative 
                inline-flex items-center w-10 h-5 rounded-full mx-1 md:mx-5 bg-white'>
                    <span className='absolute rounded-full w-5 h-5 bg-black
                    duration-500'></span>
                </button>
            </div>
        </div>
    )
}
