'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { Navigation, Mousewheel } from 'swiper/modules'
import {
    ArrowLeft,
    Pencil,
    Plus,
    Settings2,
    ChevronUp,
    ChevronDown,
} from 'lucide-react'
import SidebarAccounts from '@/components/dashboard/SidebarAccounts'
import { useToggleSidebar } from '@/hooks/useToggleSidebar'
import { useCurrentAccount } from '@/hooks/useCurrentAccount'
import 'swiper/css'
import 'swiper/css/navigation'

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useToggleSidebar()
    const [totalAccounts, setTotalAccounts] = useState(1)
    const [isBeginning, setIsBeginning] = useState(true)
    const [isEnd, setIsEnd] = useState(false)
    const { currentAccount, setCurrentAccount } = useCurrentAccount()
    const swiperRef = useRef<SwiperType>(null)

    useEffect(() => {
        if (localStorage.getItem('total-accounts')) {
            setTotalAccounts(Number(localStorage.getItem('total-accounts')))
        }
        if (localStorage.getItem('current-account')) {
            setCurrentAccount(Number(localStorage.getItem('current-account')))
        }
    }, [])

    // Scroll to current account when sidebar is opened
    useEffect(() => {
        if (isSidebarOpen && swiperRef.current) {
            // Add a small delay to ensure Swiper is fully initialized
            setTimeout(() => {
                swiperRef.current?.slideTo(currentAccount, 0)
            }, 100)
        }
    }, [isSidebarOpen])

    // handle add more accounts
    const handleAddMoreAccounts = () => {
        setTotalAccounts((pre) => pre + 1)
        const previousAccounts = Number(localStorage.getItem('total-accounts'))
        localStorage.setItem('total-accounts', String(previousAccounts + 1))
    }

    // handle pre click
    const handlePrevClick = () => {
        if (!isBeginning && swiperRef.current) {
            swiperRef.current.slidePrev()
        }
    }

    // handle next click
    const handleNextClick = () => {
        if (!isEnd && swiperRef.current) {
            swiperRef.current.slideNext()
        }
    }
    return (
        <div
            className={`w-16 bg-black h-[96vh] absolute top-3 rounded-2xl transition-all duration-100 ease-in-out ${
                isSidebarOpen ? 'left-2' : '-left-full'
            } z-50 px-2`}
        >
            <div className='h-full flex items-center justify-between flex-col py-3'>
                <div className='flex-1 flex flex-col gap-2'>
                    <div
                        className='w-9 h-9 mx-auto grid place-items-center rounded-xl transition-all duration-100 ease-in-out hover:bg-white hover:text-black cursor-pointer mb-4'
                        onClick={() => closeSidebar()}
                    >
                        <ArrowLeft size={21} />
                    </div>

                    <div className='relative h-[350px]'>
                        {!isBeginning && (
                            <>
                                <div
                                    className='absolute top-0 left-0 right-0 h-10 z-20 pointer-events-none'
                                    style={{
                                        background:
                                            'linear-gradient(to bottom, rgb(0,0,0) 0%, rgba(0,0,0,0) 100%)',
                                    }}
                                />

                                <div className='absolute w-full -top-3 z-50'>
                                    <ChevronUp
                                        size={20}
                                        onClick={handlePrevClick}
                                        className='swiper-button-prev'
                                    />
                                </div>
                            </>
                        )}

                        <Swiper
                            direction='vertical'
                            slidesPerView={4}
                            spaceBetween={2}
                            className='h-full'
                            modules={[Navigation, Mousewheel]}
                            mousewheel={true}
                            initialSlide={currentAccount}
                            onSlideChange={(swiper) => {
                                setIsBeginning(swiper.isBeginning)
                                setIsEnd(swiper.isEnd)
                            }}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper
                                swiper.slideTo(currentAccount, 0)
                            }}
                            touchRatio={0}
                        >
                            {Array.from({ length: totalAccounts }).map(
                                (_, i) => (
                                    <SwiperSlide key={i + 1}>
                                        <SidebarAccounts
                                            index={i}
                                            currentAccount={currentAccount}
                                            onClick={() => {
                                                localStorage.setItem(
                                                    'current-account',
                                                    String(i)
                                                )
                                                setCurrentAccount(i)
                                            }}
                                        />
                                    </SwiperSlide>
                                )
                            )}
                        </Swiper>
                        {!isEnd && (
                            <>
                                <div className='absolute w-full bottom-2 z-50'>
                                    <ChevronDown
                                        size={20}
                                        onClick={handleNextClick}
                                        className='swiper-button-next'
                                    />
                                </div>

                                <div
                                    className='absolute bottom-0 left-0 right-0 h-20 z-20 pointer-events-none'
                                    style={{
                                        background:
                                            'linear-gradient(to top, rgb(0,0,0) 0%, rgba(0,0,0,0) 100%)',
                                    }}
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className='h-fit w-full mt-4'>
                    <hr className='mb-3 border-none outline-none w-full h-[1px] bg-white/20' />
                    <div className='flex flex-col gap-1'>
                        <div
                            className='w-9 h-9 mx-auto grid place-items-center rounded-xl transition-all duration-100 ease-in-out hover:bg-white hover:text-black cursor-pointer'
                            onClick={handleAddMoreAccounts}
                        >
                            <Plus size={21} />
                        </div>
                        <div className='w-9 h-9 mx-auto grid place-items-center rounded-xl transition-all duration-100 ease-in-out hover:bg-white hover:text-black cursor-pointer'>
                            <Pencil size={21} />
                        </div>
                        <div className='w-9 h-9 mx-auto grid place-items-center rounded-xl transition-all duration-100 ease-in-out hover:bg-white hover:text-black cursor-pointer'>
                            <Settings2 size={21} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
