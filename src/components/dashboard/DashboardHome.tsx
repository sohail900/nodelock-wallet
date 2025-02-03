import { ArrowRightLeft, Minus, Plus } from 'lucide-react'

const actionButtons = [
    { id: 1, Icon: Plus, name: 'Buy' },
    { id: 2, Icon: Minus, name: 'Sell' },
    { id: 3, Icon: ArrowRightLeft, name: 'Swap' },
]
const DashboardHome = () => {
    return (
        <section className='pt-12 mx-auto'>
            {/* total income */}
            <div className='text-center'>
                <h1 className='text-2xl font-semibold text-white'>$0.00 USD</h1>
                <h1 className='text-2xl mt-1 font-semibold text-white'>
                    +$0.00
                </h1>
            </div>
            {/* actions */}
            <div className='mt-12 w-full flex items-center justify-center gap-4'>
                {actionButtons.map(({ Icon, id, name }) => (
                    <div className='text-center ' key={id}>
                        <div className='size-11 rounded-full grid place-items-center bg-blue-600 text-white border-2 border-transparent hover:border-blue-600 hover:text-blue-600 hover:bg-transparent cursor-pointer transition ease-linear'>
                            <Icon size={21} />
                        </div>
                        <p className='mt-1 text-sm text-white/80'>{name}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default DashboardHome
