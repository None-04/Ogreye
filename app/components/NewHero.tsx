import React from 'react'
import Image from 'next/image'

const NewHero = () => {
    return(
        <div className='relative flex flex-col items-center justify-center mt-16'>
            <div className=' -mb-10'>
                <p className='text-7xl sm:text-9xl text-white uppercase'>Explore</p>
            </div>
            <div className=''>
                <Image 
                    src='/AnimatedlogoNew.png'
                    alt='3 lines'
                    className=''
                    width={300}
                    height={350}
                    priority
                />
            </div>
            <div className=' -mt-10'>
                <p className='text-7xl sm:text-9xl text-white uppercase'>Art</p>
            </div>
        </div>
    )
}

export default NewHero;