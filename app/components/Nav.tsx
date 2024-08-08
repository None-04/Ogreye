'use client'

import React, {useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import "./Nav.css"

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setTimeout(() => {
            setIsOpen(!isOpen);
        }, 100);
    }

    return (
        <nav className="nav p-4 w-full text-gray-300 flex flex-row justify-between items-center bg-opacity-50">
            <div>
                <Link href="/">
                    <Image
                        className=''
                        src='/favicon.ico'
                        alt=''
                        width={180}
                        height={150}
                    />
                </Link>
            </div>

            <section className="lg:hidden md:hidden flex">
                <div>
                    <button onClick={handleClick} className="flex flex-col justify-center items-center">
                <span className={`bg-[#e6a40e] block transition-all duration-300 ease-out 
                    h-2 w-10 rounded-sm`}></span>
                        <span className={`bg-[#e6a40e] block transition-all duration-300 ease-out 
                    h-2 w-10 rounded-sm my-0.5`}></span>
                        <span className={`bg-[#e6a40e] block transition-all duration-300 ease-out 
                    h-2 w-10 rounded-sm`}></span>
                    </button>

                    <div className={isOpen ? "showMenuNav" : "hideMenuNav"}>
                        <div
                            className="absolute top-0 right-0 px-8 py-8 menu-z-index"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>


            <div className=' hidden md:flex md:items-center'>
                <ul className="flex items-center justify-center w-full max-w-md mx-auto p-0 list-none text-center">
                    <li className="mr-6">
                        <Link href="/gallery" className="text-4xl font-bold text-center uppercase">
                            <span>Galle<span className='text-[#e6a40e]'>ry</span></span>
                        </Link>
                    </li>

                    <li className=''>
                        <Link href='https://twitter.com/AeonsBTC'>
                            <Image
                                className=''
                                src='/AeonsTwitter60x60.png'
                                alt='Aeons logo'
                                width={60}
                                height={60}
                            />
                        </Link>
                    </li>
                    <li className="">
                        <Link href='https://discord.gg/2zqeHXZ6Tn'>
                            <Image
                                className=''
                                src='/AeonsDiscord60x60.png'
                                alt='Aeons logo'
                                width={60}
                                height={60}
                            />
                        </Link>
                    </li>
                </ul>

            </div>
            <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: black;
        z-index: 50;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
        </nav>
    );
};

export default NavBar;